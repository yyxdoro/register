# Register Flow Runner

把 `register.md` 和 Charles 抓包里的浏览器注册链路串成一键执行脚本，方便定位卡在邮箱、flow、csrf、验证码、session cookie 还是业务接口。

## 使用

```bash
cd /Users/doro/Desktop/dingyue/register
cp .env.example .env
# 编辑 .env，至少填写 AUTH_BASE_URL
npm run register
```

也可以不用 `.env`，直接传参：

```bash
node index.js --env test --auth-base-url https://auth-staging.tripo3d.ai

# 线上环境：服务域名去掉 staging，APP_ORIGIN 默认 https://studio.tripo3d.ai
node index.js --env production
npm run register:prod
```

指定邮箱或邮箱模板：

```bash
node index.js --env test --auth-base-url https://auth-staging.tripo3d.ai --email 'vast-test{{timestamp}}@otpebox.com'
```

默认邮箱模板就是 `vast-test{{timestamp}}@otpebox.com`，`{{timestamp}}` 会在每个账号注册时替换成唯一中间值，格式包含当前时间、进程、轮次和随机尾巴，避免撞到已有账号。传入其他邮箱域名时脚本也会固定改写为同名 inbox 的 `@otpebox.com` 地址。

串联注册多个账号：

```bash
node index.js --env test --auth-base-url https://auth-staging.tripo3d.ai --count 5
```

多账号默认顺序执行，每个账号使用独立子进程注册，结果保存到：

```text
registered-accounts.json
```

也可以指定输出文件：

```bash
node index.js --count 5 --accounts-file accounts/staging-users.json
```

验证码固定通过 otpebox 获取，域名为 `https://www.otpebox.com`，不再需要配置固定的 `CODE_AUTH_TOKEN` 或 `--code-base-url`。脚本会先为当前邮箱 inbox 调用 `POST /api/v1/inboxes/{inbox}/key` 自主申请 24 小时有效 Token，然后轮询邮件列表并读取邮件详情：

```text
POST /api/v1/inboxes/{inbox}/key
GET /api/v1/inboxes/{inbox}/messages?since=now-10m&until=now&limit=10
GET /api/v1/inboxes/{inbox}/messages/{id}
Authorization: Bearer {{otpebox_key}}
```

最终从邮件详情响应的 `text` 字段中用 6 位数字正则提取验证码。

验证码默认最多查 `60` 次，每 `3000ms` 查一次；可以用 `--code-poll-attempts`、`--code-poll-interval-ms` 或 `.env` 里的 `CODE_POLL_ATTEMPTS`、`CODE_POLL_INTERVAL_MS` 调整。

如果要覆盖抓包中的页面来源，可以传：

```bash
node index.js \
  --web-origin https://web-testing.tripo3d.ai \
  --app-origin https://beta.tripo3d.ai
```

如果要在定期检测里直接调用线上环境接口，可以 import 单独导出的 `runProductionRegisterCheck`：

```js
import { runProductionRegisterCheck } from './index.js';

await runProductionRegisterCheck({
  email: 'vast-test{{timestamp}}@otpebox.com',
  accountsFile: 'registered-accounts.json',
});
```

## 执行链路

1. `POST /idp-ext/auth/check-identifier`
2. `GET /self-service/registration/browser`
3. `POST /self-service/registration?flow={{flow_id}}` 发送注册验证码，浏览器流里 `400 + state=sent_email` 是正常中间态
4. `POST https://www.otpebox.com/api/v1/inboxes/{inbox}/key` 申请当前 inbox 的 Token
5. `GET https://www.otpebox.com/api/v1/inboxes/{inbox}/messages` 获取邮件列表
6. `GET https://www.otpebox.com/api/v1/inboxes/{inbox}/messages/{id}` 获取邮件详情，并从 `text` 字段提取 6 位验证码
7. `POST /self-service/registration?flow={{flow_id}}` 提交验证码完成注册
8. `GET /sessions/whoami?tokenize_as=default_jwt` 使用注册后的 cookie 获取身份和 tokenized JWT
9. `GET /v2/studio/studio/whoami?tokenizeAs=default_jwt` 使用浏览器 cookie 模拟业务会话
10. `GET /v2/web/user/profile/detail` 使用 tokenized JWT 验证业务 profile

## 输出

每一步都会打印：

- HTTP 状态码
- 当前 cookie 名称
- 请求 body 字节数，避免 body 没发出去
- 提取到的 `flow_id`、`csrf_token`、`code`
- 调试文件路径

完整请求/响应会落到：

```text
debug-output/
```

失败时优先看最后一个 debug json。
