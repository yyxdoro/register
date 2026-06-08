import { spawnSync } from 'node:child_process';
import { readFileSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join, isAbsolute } from 'node:path';

const ROOT = dirname(fileURLToPath(import.meta.url));
const DEBUG_DIR = join(ROOT, 'debug-output');
const DEFAULT_ACCOUNTS_FILE = join(ROOT, 'registered-accounts.json');
const OTPEBOX_BASE_URL = 'https://www.otpebox.com';
const OTPEBOX_DOMAIN = 'otpebox.com';
const ENVIRONMENTS = {
  test: {
    authBaseUrl: 'https://auth-staging.tripo3d.ai',
    codeBaseUrl: OTPEBOX_BASE_URL,
    apiBaseUrl: 'https://api-staging.tripo3d.ai',
    webOrigin: 'https://web-testing.tripo3d.ai',
    appOrigin: 'https://beta.tripo3d.ai',
  },
  production: {
    authBaseUrl: 'https://auth.tripo3d.ai',
    codeBaseUrl: OTPEBOX_BASE_URL,
    apiBaseUrl: 'https://api.tripo3d.ai',
    webOrigin: 'https://web.tripo3d.ai',
    appOrigin: 'https://studio.tripo3d.ai',
  },
};
const ENV_ALIASES = {
  testing: 'test',
  staging: 'test',
  prod: 'production',
  online: 'production',
};

let currentEmail = '';

function loadDotEnv(file = '.env') {
  const path = join(ROOT, file);
  if (!existsSync(path)) return false;
  const text = readFileSync(path, 'utf8');
  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const idx = trimmed.indexOf('=');
    if (idx === -1) continue;
    const key = trimmed.slice(0, idx).trim();
    let value = trimmed.slice(idx + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    if (!(key in process.env)) process.env[key] = value;
  }
  return true;
}

function argValue(name) {
  const prefix = `--${name}=`;
  const direct = process.argv.find((arg) => arg.startsWith(prefix));
  if (direct) return direct.slice(prefix.length);
  const idx = process.argv.indexOf(`--${name}`);
  if (idx !== -1) return process.argv[idx + 1];
  return undefined;
}

function flag(name) {
  return process.argv.includes(`--${name}`);
}

function normalizeBaseUrl(value, name) {
  if (!value) throw new Error(`缺少 ${name}。请复制 .env.example 为 .env 并填写，或用 --auth-base-url 传入。`);
  return value.replace(/\/+$/, '');
}

function selectedEnvironmentName() {
  const value = (argValue('env') || process.env.REGISTER_ENV || 'test').toLowerCase();
  const name = ENV_ALIASES[value] || value;
  if (!ENVIRONMENTS[name]) throw new Error(`REGISTER_ENV/--env 只能是 test 或 production，当前值：${value}`);
  return name;
}

function envKey(name, key) {
  return `${name.toUpperCase()}_${key}`;
}

function configValue(name, key, cliName, fallback) {
  return argValue(cliName) || process.env[envKey(name, key)] || (name === 'test' ? process.env[key] : '') || fallback;
}

function environmentConfig(name) {
  const defaults = ENVIRONMENTS[name];
  const authBaseUrl = configValue(name, 'AUTH_BASE_URL', 'auth-base-url', defaults.authBaseUrl);
  return {
    env: name,
    authBaseUrl: normalizeBaseUrl(authBaseUrl, 'AUTH_BASE_URL'),
    codeBaseUrl: OTPEBOX_BASE_URL,
    apiBaseUrl: normalizeBaseUrl(configValue(name, 'API_BASE_URL', 'api-base-url', defaults.apiBaseUrl), 'API_BASE_URL'),
    webOrigin: normalizeBaseUrl(configValue(name, 'WEB_ORIGIN', 'web-origin', defaults.webOrigin), 'WEB_ORIGIN'),
    appOrigin: normalizeBaseUrl(configValue(name, 'APP_ORIGIN', 'app-origin', defaults.appOrigin), 'APP_ORIGIN'),
  };
}

function renderEmail(value, index = 0) {
  return renderEmailTemplate(value, index);
}

function registerOptionsFromInput(options = {}) {
  const env = options.env || selectedEnvironmentName();
  const defaults = ENVIRONMENTS[env];
  if (!defaults) throw new Error(`env 只能是 test 或 production，当前值：${env}`);
  return {
    email: options.email ? renderEmail(options.email) : buildEmail(0),
    accountsFile: resolveOutputFile(options.accountsFile),
    authBaseUrl: normalizeBaseUrl(options.authBaseUrl || defaults.authBaseUrl, 'AUTH_BASE_URL'),
    codeBaseUrl: OTPEBOX_BASE_URL,
    apiBaseUrl: normalizeBaseUrl(options.apiBaseUrl || defaults.apiBaseUrl, 'API_BASE_URL'),
    webOrigin: normalizeBaseUrl(options.webOrigin || defaults.webOrigin, 'WEB_ORIGIN'),
    appOrigin: normalizeBaseUrl(options.appOrigin || defaults.appOrigin, 'APP_ORIGIN'),
    debug: Boolean(options.debug),
  };
}

export async function runProductionRegisterCheck(options = {}) {
  return registerSingle(registerOptionsFromInput({ ...options, env: 'production' }));
}

function browserHeaders(origin, accept = 'application/json') {
  return {
    Accept: accept,
    Origin: origin,
    Referer: `${origin}/`,
  };
}

function appHeaders(origin, tokenizedJwt, accept = 'application/json') {
  const headers = {
    ...browserHeaders(origin, accept),
    'x-tripo-region': 'rg1',
  };
  if (tokenizedJwt) headers.Authorization = `Bearer ${tokenizedJwt}`;
  return headers;
}

async function requestOptional(client, label, baseUrl, path, options) {
  const result = await client.request(label, baseUrl, path, options);
  if (result.response.ok) {
    console.log(`业务 ${label} 查询成功。`);
  } else {
    console.log(`业务 ${label} 查询失败：${result.response.status} ${result.response.statusText}`);
    console.log(`业务 ${label} 响应：${bodySnippet(result.text, 2000)}`);
  }
  return result;
}

function uniqueValue(index = 0) {
  const time = Date.now().toString(36);
  const pid = process.pid.toString(36);
  const seq = index.toString(36);
  const random = Math.random().toString(36).slice(2, 8);
  return `${time}${pid}${seq}${random}`;
}

function renderEmailTemplate(template, index = 0) {
  const value = uniqueValue(index);
  return template.replace(/\{\{\s*(?:timestamp|date\.timestamp|\$date\.timestamp)\s*\}\}/g, value);
}

function buildEmail(index = 0) {
  const cliEmail = argValue('email');
  if (cliEmail) return normalizeRegisterEmail(renderEmailTemplate(cliEmail, index));
  const envEmail = process.env.REGISTER_EMAIL || 'vast-test{{timestamp}}@otpebox.com';
  return normalizeRegisterEmail(renderEmailTemplate(envEmail, index));
}

function normalizeRegisterEmail(email) {
  const [inbox] = String(email).split('@');
  return `${normalizeOtpeboxInbox(inbox)}@${OTPEBOX_DOMAIN}`;
}

function normalizeOtpeboxInbox(inbox) {
  const value = String(inbox || '').trim().toLowerCase();
  if (!/^[a-z0-9._+-]{1,64}$/.test(value)) {
    throw new Error(`otpebox inbox 不合法：${inbox}`);
  }
  return value;
}

function inboxFromEmail(email) {
  return normalizeOtpeboxInbox(String(email).split('@')[0]);
}

function safeJsonParse(text) {
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

function bodySnippet(text, max = 1200) {
  if (!text) return '';
  return text.length > max ? `${text.slice(0, max)}...<truncated ${text.length - max} chars>` : text;
}

class CookieJar {
  constructor() {
    this.cookies = new Map();
  }

  addFromHeaders(headers) {
    const values = [];
    if (typeof headers.getSetCookie === 'function') {
      values.push(...headers.getSetCookie());
    }
    const single = headers.get('set-cookie');
    if (single) values.push(...splitSetCookie(single));

    for (const raw of values) {
      const pair = raw.split(';')[0];
      const eq = pair.indexOf('=');
      if (eq <= 0) continue;
      const name = pair.slice(0, eq).trim();
      const value = pair.slice(eq + 1).trim();
      if (name) this.cookies.set(name, value);
    }
  }

  header() {
    return [...this.cookies.entries()].map(([k, v]) => `${k}=${v}`).join('; ');
  }

  summary() {
    return [...this.cookies.keys()].join(', ') || '(empty)';
  }

  get(name) {
    return this.cookies.get(name) || '';
  }
}

function splitSetCookie(value) {
  // Handles the common case where fetch exposes combined Set-Cookie headers.
  return value.split(/,(?=\s*[^;,\s]+=)/g).map((s) => s.trim()).filter(Boolean);
}

class HttpClient {
  constructor({ authBaseUrl, codeBaseUrl, debug }) {
    this.authBaseUrl = authBaseUrl;
    this.codeBaseUrl = codeBaseUrl;
    this.debug = debug;
    this.jar = new CookieJar();
    this.step = 0;
    mkdirSync(DEBUG_DIR, { recursive: true });
  }

  async request(label, baseUrl, path, options = {}) {
    this.step += 1;
    const url = new URL(path, baseUrl);
    const method = options.method || 'GET';
    const headers = {
      Accept: 'application/json, text/plain, */*',
      Pragma: 'no-cache',
      ...options.headers,
    };

    const cookie = this.jar.header();
    if (cookie && options.sendCookies !== false) headers.Cookie = cookie;

    let body;
    if (options.json !== undefined) {
      body = JSON.stringify(options.json);
      headers['Content-Type'] = headers['Content-Type'] || 'application/json';
    } else if (options.body !== undefined) {
      body = options.body;
    }

    console.log(`\n[${this.step}] ${label}`);
    console.log(`    ${method} ${url}`);
    if (cookie && options.sendCookies !== false) console.log(`    Cookie: ${this.jar.summary()}`);
    if (body) console.log(`    Body bytes: ${Buffer.byteLength(body)}`);

    const response = await fetch(url, { method, headers, body, redirect: options.redirect || 'manual' });
    this.jar.addFromHeaders(response.headers);
    const text = await response.text();
    const json = safeJsonParse(text);

    const record = {
      label,
      request: { method, url: String(url), headers: maskHeaders(headers), body: options.json ?? body ?? null },
      response: {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries()),
        body: json ?? text,
      },
      cookies: this.jar.summary(),
    };
    const file = join(DEBUG_DIR, `${String(this.step).padStart(2, '0')}-${slug(label)}.json`);
    writeFileSync(file, JSON.stringify(record, null, 2));

    console.log(`    Status: ${response.status} ${response.statusText}`);
    console.log(`    Cookies now: ${this.jar.summary()}`);
    console.log(`    Debug: ${file}`);
    if (this.debug || !response.ok) {
      console.log(`    Response: ${bodySnippet(text)}`);
    }

    return { response, text, json, file };
  }
}

function maskHeaders(headers) {
  const result = { ...headers };
  if (result.Cookie) result.Cookie = '<cookie masked>';
  if (result.Authorization) result.Authorization = '<authorization masked>';
  return result;
}

function slug(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60);
}

function findNodeValue(flow, name) {
  const nodes = flow?.ui?.nodes || [];
  const node = nodes.find((item) => item?.attributes?.name === name);
  return node?.attributes?.value ?? '';
}

function assertJson(step, result) {
  if (!result.json) {
    throw new Error(`${step} 没有返回 JSON。状态=${result.response.status}，响应=${bodySnippet(result.text)}`);
  }
  return result.json;
}

function readAccounts(file) {
  if (!existsSync(file)) return [];
  const json = safeJsonParse(readFileSync(file, 'utf8'));
  if (Array.isArray(json)) return json;
  if (Array.isArray(json?.accounts)) return json.accounts;
  return [];
}

function writeAccounts(file, accounts) {
  writeFileSync(file, `${JSON.stringify(accounts, null, 2)}\n`);
}

function saveAccount(file, account) {
  mkdirSync(dirname(file), { recursive: true });
  const accounts = readAccounts(file);
  const existingIndex = accounts.findIndex((item) => item.email === account.email);
  if (existingIndex === -1) {
    accounts.push(account);
  } else {
    accounts[existingIndex] = { ...accounts[existingIndex], ...account };
  }
  writeAccounts(file, accounts);
}

function positiveInteger(value, fallback, name) {
  const parsed = Number(value ?? fallback);
  if (!Number.isInteger(parsed) || parsed < 1) throw new Error(`${name} 必须是正整数。`);
  return parsed;
}

function resolveOutputFile(value) {
  const file = value || process.env.ACCOUNTS_FILE || DEFAULT_ACCOUNTS_FILE;
  return isAbsolute(file) ? file : join(ROOT, file);
}

function profileFields(profileJson) {
  return {
    userId: profileJson?.data?.detail?.userId || profileJson?.data?.user_id || profileJson?.data?.uid || profileJson?.user_id || profileJson?.uid || profileJson?.data?.id || profileJson?.id || '',
    email: profileJson?.data?.detail?.email || profileJson?.data?.email || profileJson?.email || profileJson?.data?.user_email || profileJson?.user_email || '',
  };
}

function removeArg(args, name) {
  const result = [];
  for (let i = 0; i < args.length; i += 1) {
    if (args[i] === `--${name}`) {
      i += 1;
      continue;
    }
    if (args[i].startsWith(`--${name}=`)) continue;
    result.push(args[i]);
  }
  return result;
}

async function runMany(count, accountsFile) {
  const baseArgs = removeArg(removeArg(removeArg(removeArg(process.argv.slice(2), 'count'), 'email'), 'single'), 'accounts-file');
  console.log(`=== Register Flow Runner 批量模式 ===`);
  console.log(`账号数量: ${count}`);
  console.log(`账号输出: ${accountsFile}`);

  for (let i = 0; i < count; i += 1) {
    const email = buildEmail(i);
    console.log(`\n=== [${i + 1}/${count}] 注册 ${email} ===`);
    const child = spawnSync(process.execPath, [process.argv[1], ...baseArgs, '--single', '--email', email, '--accounts-file', accountsFile], {
      cwd: ROOT,
      env: process.env,
      stdio: 'inherit',
    });

    if (child.status !== 0) {
      saveAccount(accountsFile, {
        email,
        status: 'failed',
        exitCode: child.status,
        error: 'child registration process failed',
        debugDir: DEBUG_DIR,
        updatedAt: new Date().toISOString(),
      });
      console.log(`账号 ${email} 注册失败，已记录到 ${accountsFile}。`);
    }
  }
}

function extractCodeFromMailText(text) {
  const match = String(text || '').match(/\b\d{6}\b/);
  return match ? match[0] : '';
}

async function createOtpeboxApiKey(client, codeBaseUrl, inbox) {
  const result = await client.request('create otpebox api key', codeBaseUrl, `/api/v1/inboxes/${encodeURIComponent(inbox)}/key`, {
    method: 'POST',
    sendCookies: false,
  });
  assertOk('create otpebox api key', result);
  const json = assertJson('create otpebox api key', result);
  if (!json.key) throw new Error(`create otpebox api key 没有返回 key。响应=${bodySnippet(result.text)}`);
  return json.key;
}

function isRegistrationConflict(flowType) {
  return flowType && flowType !== 'registration';
}

function assertOk(step, result) {
  if (!result.response.ok) {
    throw new Error(`${step} 失败。状态=${result.response.status}，响应=${bodySnippet(result.text)}`);
  }
}

async function registerSingle({ email, accountsFile, env = 'test', authBaseUrl, codeBaseUrl, apiBaseUrl, webOrigin, appOrigin, debug }) {
  email = normalizeRegisterEmail(email);
  currentEmail = email;
  const client = new HttpClient({ authBaseUrl, codeBaseUrl, debug });

  console.log('=== Register Flow Runner ===');
  console.log(`ENV: ${env}`);
  console.log(`AUTH_BASE_URL: ${authBaseUrl}`);
  console.log(`OTPEBOX_BASE_URL: ${codeBaseUrl}`);
  console.log(`API_BASE_URL: ${apiBaseUrl}`);
  console.log(`WEB_ORIGIN: ${webOrigin}`);
  console.log(`APP_ORIGIN: ${appOrigin}`);
  console.log(`email: ${email}`);
  console.log('code auth token: auto otpebox key');

  const authHeaders = browserHeaders(webOrigin);

  const check = await client.request('check identifier', authBaseUrl, '/idp-ext/auth/check-identifier', {
    method: 'POST',
    headers: { ...authHeaders, Accept: '*/*' },
    json: { identifier: email },
  });
  assertOk('check identifier', check);
  const checkJson = assertJson('check identifier', check);
  const flowType = checkJson?.data?.flow_type;
  console.log(`    flow_type: ${flowType}`);
  if (isRegistrationConflict(flowType)) {
    throw new Error(`该邮箱 flow_type=${flowType}，不是 registration。请换一个未注册邮箱。`);
  }

  const flowResult = await client.request('get registration browser flow', authBaseUrl, '/self-service/registration/browser', {
    method: 'GET',
    headers: authHeaders,
  });
  assertOk('get registration browser flow', flowResult);
  const flow = assertJson('get registration browser flow', flowResult);
  const flowId = flow.id;
  let csrfToken = findNodeValue(flow, 'csrf_token');
  console.log(`    flow_id: ${flowId || '(empty)'}`);
  console.log(`    state: ${flow.state || '(empty)'}`);
  console.log(`    csrf_token: ${csrfToken ? '<present>' : '(empty)'}`);
  if (!flowId) throw new Error('registration/browser 未返回 id，无法继续。');

  // First submit sends the email and asks Ory/Kratos to send the code.
  const sendCodeBody = {
    method: 'code',
    traits: { email },
    transient_payload: { receiveMarketing: true },
  };
  if (csrfToken) sendCodeBody.csrf_token = csrfToken;

  const sendCode = await client.request('send registration code', authBaseUrl, `/self-service/registration?flow=${encodeURIComponent(flowId)}`, {
    method: 'POST',
    headers: authHeaders,
    json: sendCodeBody,
  });
  if (!sendCode.response.ok && sendCode.response.status !== 400) {
    throw new Error(`send registration code 异常。状态=${sendCode.response.status}，响应=${bodySnippet(sendCode.text)}`);
  }
  const sendCodeJson = assertJson('send registration code', sendCode);
  const passedChallenge = sendCodeJson.state === 'sent_email' || sendCodeJson.state === 'passed_challenge' || sendCodeJson.active === 'code';
  const codeFlowId = sendCodeJson.id || flowId;
  const nextCsrf = findNodeValue(sendCodeJson, 'csrf_token');
  if (nextCsrf) csrfToken = nextCsrf;
  console.log(`    code flow id: ${codeFlowId}`);
  console.log(`    active/state: ${sendCodeJson.active || '(empty)'}/${sendCodeJson.state || '(empty)'}`);
  console.log(`    next csrf_token: ${csrfToken ? '<present>' : '(empty)'}`);
  if (!passedChallenge) {
    console.log('    注意：未看到 active=code/state=sent_email，仍会尝试从 otpebox 获取验证码。');
  }

  const inbox = inboxFromEmail(email);

  const codePollSeconds = Number(argValue('code-poll-seconds') || process.env.CODE_POLL_SECONDS || 180);
  const codePollIntervalMs = Number(argValue('code-poll-interval-ms') || process.env.CODE_POLL_INTERVAL_MS || 3000);
  const maxAttempts = positiveInteger(argValue('code-poll-attempts') || process.env.CODE_POLL_ATTEMPTS, Math.ceil((codePollSeconds * 1000) / codePollIntervalMs), 'CODE_POLL_ATTEMPTS/--code-poll-attempts');
  let codeResult;
  let codeJson;
  let code;
  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    codeResult = await client.request(`get email code attempt ${attempt}`, codeBaseUrl, `/api/messages?inbox=${encodeURIComponent(inbox)}`, {
      method: 'GET',
      sendCookies: false,
    });
    codeJson = codeResult.json;
    const message = codeJson?.messages?.[0];
    if (message?.id) {
      const detailResult = await client.request('get email message detail', codeBaseUrl, `/api/message?inbox=${encodeURIComponent(inbox)}&id=${encodeURIComponent(message.id)}`, {
        method: 'GET',
        sendCookies: false,
      });
      if (detailResult.response.ok) code = extractCodeFromMailText(detailResult.json?.text);
    }
    console.log(`    code: ${code || '(empty)'}`);
    if (code) break;
    if (attempt < maxAttempts) {
      console.log(`    验证码还没入库，${codePollIntervalMs}ms 后重试 (${attempt}/${maxAttempts})...`);
      await new Promise((resolve) => setTimeout(resolve, codePollIntervalMs));
    }
  }

  if (!code) {
    throw new Error(`otpebox 邮件详情 text 没有匹配到 6 位验证码。最后状态=${codeResult.response.status}，响应=${bodySnippet(codeResult.text)}`);
  }

  const submitBody = {
    code,
    method: 'code',
    traits: { email },
    transient_payload: { receiveMarketing: true },
  };
  if (csrfToken) submitBody.csrf_token = csrfToken;

  const submit = await client.request('submit registration code', authBaseUrl, `/self-service/registration?flow=${encodeURIComponent(codeFlowId)}`, {
    method: 'POST',
    headers: authHeaders,
    json: submitBody,
  });

  const submitJson = submit.json;
  if (submit.response.ok || [302, 303].includes(submit.response.status)) {
    const account = {
      email,
      status: 'registered',
      auth: {
        identityId: submitJson?.identity?.id || '',
        sessionId: submitJson?.session?.id || '',
        hasSessionToken: Boolean(submitJson?.session_token),
        oryKratosSession: client.jar.get('ory_kratos_session'),
      },
      business: {},
      debugDir: DEBUG_DIR,
      updatedAt: new Date().toISOString(),
    };
    saveAccount(accountsFile, account);
    console.log(`账号基础信息已保存: ${accountsFile}`);
    console.log('\n注册流程执行完成。');
    console.log(`最终状态: ${submit.response.status} ${submit.response.statusText}`);
    if (submitJson?.identity?.id) console.log(`identity_id: ${submitJson.identity.id}`);
    if (submitJson?.session?.id) console.log(`session_id: ${submitJson.session.id}`);

    const sessionToken = submitJson?.session_token;
    account.auth.hasSessionToken = Boolean(sessionToken);
    const whoami = await client.request('whoami identity detail', authBaseUrl, '/sessions/whoami?tokenize_as=default_jwt', {
      method: 'GET',
      headers: authHeaders,
    });
    if (whoami.response.ok) {
      const whoamiJson = assertJson('whoami identity detail', whoami);
      const tokenizedJwt = whoamiJson?.tokenized;
      account.auth.whoamiIdentityId = whoamiJson?.identity?.id || '';
      account.auth.whoamiEmail = whoamiJson?.identity?.traits?.email || '';
      account.auth.hasTokenizedJwt = Boolean(tokenizedJwt);
      console.log('身份详情查询成功。');
      console.log(`whoami identity_id: ${whoamiJson?.identity?.id || '(empty)'}`);
      console.log(`whoami email: ${whoamiJson?.identity?.traits?.email || '(empty)'}`);
      console.log(`tokenized_jwt: ${tokenizedJwt ? '<present>' : '(empty)'}`);

      const businessHeadersWithCookie = appHeaders(appOrigin);
      const studioWhoami = await client.request('studio business whoami', apiBaseUrl, '/v2/studio/studio/whoami?tokenizeAs=default_jwt', {
        method: 'GET',
        headers: businessHeadersWithCookie,
      });
      if (studioWhoami.response.ok) {
        account.business.studioWhoami = 'ok';
        console.log('业务 studio whoami 查询成功。');
      } else {
        account.business.studioWhoami = `${studioWhoami.response.status} ${studioWhoami.response.statusText}`;
        console.log(`业务 studio whoami 查询失败：${studioWhoami.response.status} ${studioWhoami.response.statusText}`);
        console.log(`业务 studio whoami 响应：${bodySnippet(studioWhoami.text, 2000)}`);
      }

      if (tokenizedJwt) {
        const bearerHeaders = appHeaders(appOrigin, tokenizedJwt, '*/*');
        await requestOptional(client, 'profile payment', apiBaseUrl, '/v2/studio/user/profile/payment', {
          method: 'GET',
          headers: bearerHeaders,
          sendCookies: false,
        });
        await requestOptional(client, 'survey industry', apiBaseUrl, '/v2/studio/user/survey/industry', {
          method: 'GET',
          headers: bearerHeaders,
          sendCookies: false,
        });
        await requestOptional(client, 'global messages', apiBaseUrl, '/v2/studio/message/query', {
          method: 'POST',
          headers: appHeaders(appOrigin, tokenizedJwt),
          json: { offset_id: '', size: 20, type: 'global' },
          sendCookies: false,
        });
        await requestOptional(client, 'notify messages', apiBaseUrl, '/v2/studio/message/query', {
          method: 'POST',
          headers: appHeaders(appOrigin, tokenizedJwt),
          json: { offset_id: '', size: 20, type: 'notify' },
          sendCookies: false,
        });
        await requestOptional(client, 'marketing export limit', apiBaseUrl, '/v2/studio/marketing/export-limit', {
          method: 'GET',
          headers: bearerHeaders,
          sendCookies: false,
        });
        await requestOptional(client, 'marketing detail', apiBaseUrl, '/v2/studio/marketing/detail?locale=en', {
          method: 'GET',
          headers: bearerHeaders,
          sendCookies: false,
        });
        await requestOptional(client, 'team list', apiBaseUrl, '/v2/studio/team/list', {
          method: 'GET',
          headers: bearerHeaders,
          sendCookies: false,
        });
        await requestOptional(client, 'image assets', apiBaseUrl, '/v2/studio/image/image_assets', {
          method: 'POST',
          headers: appHeaders(appOrigin, tokenizedJwt),
          json: { page_num: 1, page_size: 8 },
          sendCookies: false,
        });
        await requestOptional(client, 'assets list', apiBaseUrl, '/v2/studio/assets/v2?asset_type=mine&offset=0&size=20&type=all', {
          method: 'GET',
          headers: bearerHeaders,
          sendCookies: false,
        });

        const profileDetail = await client.request('business profile detail', apiBaseUrl, '/v2/web/user/profile/detail', {
          method: 'GET',
          headers: bearerHeaders,
          sendCookies: false,
        });
        if (profileDetail.response.ok) {
          const profileJson = assertJson('business profile detail', profileDetail);
          console.log('业务 profile detail 查询成功。');
          const profile = profileFields(profileJson);
          account.business.profileDetail = 'ok';
          account.business.profileUserId = profile.userId;
          account.business.profileEmail = profile.email;
          console.log(`profile user id: ${profile.userId || '(see debug json)'}`);
          console.log(`profile email: ${profile.email || '(see debug json)'}`);
        } else {
          account.business.profileDetail = `${profileDetail.response.status} ${profileDetail.response.statusText}`;
          console.log(`业务 profile detail 查询失败：${profileDetail.response.status} ${profileDetail.response.statusText}`);
          console.log(`业务 profile detail 响应：${bodySnippet(profileDetail.text, 2000)}`);
        }
      } else {
        console.log('whoami 未返回 tokenized JWT，跳过 Bearer profile detail 查询。');
      }
    } else if (sessionToken) {
      console.log(`cookie whoami 查询失败：${whoami.response.status} ${whoami.response.statusText}，尝试 X-Session-Token。`);
      console.log(`cookie whoami 响应：${bodySnippet(whoami.text, 2000)}`);
      const tokenWhoami = await client.request('whoami identity detail by session token', authBaseUrl, '/sessions/whoami?tokenize_as=default_jwt', {
        method: 'GET',
        headers: {
          ...authHeaders,
          'X-Session-Token': sessionToken,
        },
        sendCookies: false,
      });
      if (!tokenWhoami.response.ok) {
        console.log(`X-Session-Token whoami 查询失败：${tokenWhoami.response.status} ${tokenWhoami.response.statusText}`);
        console.log(`X-Session-Token whoami 响应：${bodySnippet(tokenWhoami.text, 2000)}`);
      }
    } else {
      console.log(`whoami 查询失败：${whoami.response.status} ${whoami.response.statusText}`);
      console.log(`whoami 响应：${bodySnippet(whoami.text, 2000)}`);
    }

    saveAccount(accountsFile, account);
    console.log(`账号已保存: ${accountsFile}`);
    console.log(`调试文件目录: ${DEBUG_DIR}`);
    return;
  }

  throw new Error(`提交注册验证码失败。状态=${submit.response.status}，响应=${bodySnippet(submit.text, 2000)}\n调试文件目录: ${DEBUG_DIR}`);
}

async function runOne() {
  if (!loadDotEnv()) {
    loadDotEnv('.env.example');
  }

  const accountsFile = resolveOutputFile(argValue('accounts-file'));
  const count = positiveInteger(argValue('count') || process.env.REGISTER_COUNT, 1, 'REGISTER_COUNT/--count');
  if (count > 1 && !flag('single')) {
    await runMany(count, accountsFile);
    console.log(`\n批量注册完成。账号文件: ${accountsFile}`);
    return;
  }

  const env = selectedEnvironmentName();
  const config = environmentConfig(env);
  const debug = flag('debug') || process.env.DEBUG === 'true';
  const maxEmailAttempts = positiveInteger(argValue('email-attempts') || process.env.EMAIL_ATTEMPTS, 5, 'EMAIL_ATTEMPTS/--email-attempts');

  let lastError;
  for (let attempt = 0; attempt < maxEmailAttempts; attempt += 1) {
    const email = buildEmail(attempt);
    try {
      await registerSingle({ email, accountsFile, ...config, debug });
      return;
    } catch (error) {
      lastError = error;
      if (!/不是 registration/.test(error.message || '') || attempt === maxEmailAttempts - 1) throw error;
      saveAccount(accountsFile, {
        email,
        status: 'skipped',
        error: error.message,
        debugDir: DEBUG_DIR,
        updatedAt: new Date().toISOString(),
      });
      console.log(`邮箱 ${email} 已存在或不是注册流，自动换一个邮箱重试 (${attempt + 1}/${maxEmailAttempts})。`);
    }
  }
  throw lastError;
}

async function main() {
  try {
    await runOne();
  } catch (error) {
    const accountsFile = resolveOutputFile(argValue('accounts-file'));
    const email = currentEmail || buildEmail();
    saveAccount(accountsFile, {
      email,
      status: 'failed',
      error: error.message || String(error),
      debugDir: DEBUG_DIR,
      updatedAt: new Date().toISOString(),
    });
    console.log(`失败账号已保存: ${accountsFile}`);
    throw error;
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((error) => {
    console.error('\n执行失败：');
    console.error(error.stack || error.message || error);
    process.exitCode = 1;
  });
}
