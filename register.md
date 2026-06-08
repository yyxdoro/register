---
title: Tally Billing
language_tabs:
  - shell: Shell
  - http: HTTP
  - javascript: JavaScript
  - ruby: Ruby
  - python: Python
  - php: PHP
  - java: Java
  - go: Go
toc_footers: []
includes: []
search: true
code_clipboard: true
highlight_theme: darkula
headingLevel: 2
generator: "@tarslib/widdershins v4.0.30"

---

# Tally Billing

Tally支付系统完整业务流程API测试集合，包含健康检查、产品查询、订单创建、支付处理、会员管理和账本操作等核心功能测试。

Base URLs:

# Authentication

# Default

## POST 月付基础包+3席 创建支付意图

POST /api/v1/hub/payment_intent/create

> Body 请求参数

```json
{
  "user_model": {
    "user_id": "{{user_id}}",
    "user_nick": "{{user_nick}}",
    "email": "{{user_email}}"
  },
  "order_id": "{{order_id}}",
  "psp_name": "PSP_NAME_STRIPE",
  "idempotency_key": "pay-{{$timestamp}}-{{order_id}}",
  "redirect_urls": {
    "success_url": "{{success_url}}",
    "cancel_url": "{{cancel_url}}"
  },
  "metadata": {
    "case": "{{case_name}}"
  },
  "extra": {
    "scene": "CREATE_PAYMENT_INTENT"
  }
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Content-Type|header|string| 是 |none|
|Connection|header|string| 否 |none|
|body|body|object| 否 |none|
|» user_model|body|object| 是 |none|
|»» user_id|body|string| 是 |none|
|»» user_nick|body|string| 是 |none|
|»» email|body|string| 是 |none|
|» order_id|body|string| 是 |none|
|» psp_name|body|string| 是 |none|
|» idempotency_key|body|string| 是 |none|
|» redirect_urls|body|object| 是 |none|
|»» success_url|body|string| 是 |none|
|»» cancel_url|body|string| 是 |none|
|» metadata|body|object| 是 |none|
|»» case|body|string| 是 |none|
|» extra|body|object| 是 |none|
|»» scene|body|string| 是 |none|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

# stripe_webhook

## POST 取消完成

POST /api/v1/psp/stripe/webhook

> Body 请求参数

```json
{
  "id": "evt_team_subscription_deleted_001",
  "type": "customer.subscription.deleted",
  "data": {
    "object": {
      "id": "sub_stripe_team_001",
      "status": "canceled",
      "metadata": {
        "internal_subscription_id": "019e1b8b-870d-71c2-8ee5-d6b933f2dfbf"
      }
    }
  }
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Content-Type|header|string| 是 |none|
|Stripe-Signature|header|string| 是 |none|
|Connection|header|string| 否 |none|
|body|body|object| 是 |none|
|» id|body|string| 是 |none|
|» type|body|string| 是 |none|
|» data|body|object| 是 |none|
|»» object|body|object| 是 |none|
|»»» id|body|string| 是 |none|
|»»» status|body|string| 是 |none|
|»»» metadata|body|object| 是 |none|
|»»»» internal_subscription_id|body|string| 是 |none|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

## POST 周期末取消

POST /baseUrl/api/v1/psp/stripe/webhook

> Body 请求参数

```json
{
  "id": "evt_team_subscription_cancel_at_period_end_001",
  "type": "customer.subscription.updated",
  "data": {
    "object": {
      "id": "sub_stripe_team_001",
      "status": "active",
      "cancel_at_period_end": true,
      "current_period_end": 1781172000,
      "metadata": {
        "internal_subscription_id": "{{subscriptionId}}"
      }
    }
  }
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Content-Type|header|string| 是 |none|
|Stripe-Signature|header|string| 是 |none|
|Connection|header|string| 否 |none|
|body|body|object| 是 |none|
|» id|body|string| 是 |none|
|» type|body|string| 是 |none|
|» data|body|object| 是 |none|
|»» object|body|object| 是 |none|
|»»» id|body|string| 是 |none|
|»»» status|body|string| 是 |none|
|»»» cancel_at_period_end|body|boolean| 是 |none|
|»»» current_period_end|body|integer| 是 |none|
|»»» metadata|body|object| 是 |none|
|»»»» internal_subscription_id|body|string| 是 |none|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

# 边界case

## POST 重复创建同一个seatqoata

POST /baseUrl/api/v1/seat_quota/create

> Body 请求参数

```json
{
  "owner": {
    "type": "TEAM",
    "id": "{{teamId}}"
  },
  "source_type": "SOURCE_TYPE_SUBSCRIPTION_TERM",
  "source_id": "{{subscriptionTermId}}",
  "idempotency_key": "apifox-seat-idempotent-001",
  "seat_count": 3,
  "start_date": "{{startDate}}",
  "end_date": "{{endDate}}"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Content-Type|header|string| 是 |none|
|Authorization|header|string| 是 |none|
|Connection|header|string| 否 |none|
|body|body|object| 是 |none|
|» owner|body|object| 是 |none|
|»» type|body|string| 是 |none|
|»» id|body|string| 是 |none|
|» source_type|body|string| 是 |none|
|» source_id|body|string| 是 |none|
|» idempotency_key|body|string| 是 |none|
|» seat_count|body|integer| 是 |none|
|» start_date|body|string| 是 |none|
|» end_date|body|string| 是 |none|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

# 基础年/减少席位

## POST 减少席位

POST /api/v1/hub/quote/calculate-with-coupon

> Body 请求参数

```json
{
  "user_model": {
    "user_id": "{{user_id}}",
    "user_nick": "{{user_id}}",
    "email": "{{user_id}}@qq.com"
  },
  "beneficiary": {
    "type": "TEAM",
    "id": "{{team_id}}"
  },
  "line_items": [
    {
      "services_plan_price_id": "{{baseYearPriceId}}",
      "quantity": 1
    },
    {
      "services_plan_price_id": "{{seatYearPriceId}}",
      "quantity": 5
    }
  ],
  "extra": {
    "scene": "quote_seat_decrease_8_to_5"
  }
}

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Content-Type|header|string| 是 |none|
|Authorization|header|string| 是 |none|
|Connection|header|string| 否 |none|
|body|body|object| 是 |none|
|» user_model|body|object| 是 |none|
|»» user_id|body|string| 是 |none|
|» beneficiary|body|object| 是 |none|
|»» type|body|string| 是 |none|
|»» id|body|string| 是 |none|
|» line_items|body|[object]| 是 |none|
|»» services_plan_price_id|body|string| 是 |none|
|»» quantity|body|integer| 是 |none|
|» extra|body|object| 是 |none|
|»» scene|body|string| 是 |none|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

# 钱包

## POST 指定钱包ID查询交易

POST /api/v1/ledger/transactions/list

> Body 请求参数

```json
{
  "owner_id": "08d857c8-a067-411f-9270-4d4bef7ff909",
  "wallet_ids": ["019ca6b6-620f-72b2-825b-319a6f118256"
  ],
  "statuses": ["TRANSACTION_STATUS_PENDING", "TRANSACTION_STATUS_POST"],
  "directions": ["POSTING_TYPE_CREDIT", "POSTING_TYPE_DEBIT"],
  "minimum_amount": "1.00",
  "start_time": "2026-03-01T00:00:00Z",
  "end_time": "2026-03-03T00:00:00Z",
  "pagination": { "offset": 0, "limit": 50 }
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Connection|header|string| 否 |none|
|body|body|object| 是 |none|

> 返回示例

> 200 Response

```json
{"wallets":[{"id":"019c9e60-eaef-7b6f-83fc-65247e4b2054","ownerId":"yuha20260205——EUR","ledgerId":"tripo","name":"WEB_FREE","category":"WEB_FREE","type":"WALLET_TYPE_CREDIT","status":"WALLET_STATUS_ACTIVE","asset":{"currency":"CRED","scale":0},"balance":{"value":"300"},"pending":{"value":"0"},"maxBalance":null,"minBalance":null,"availableAfter":"2026-02-01T00:00:00Z","availableBefore":"2026-03-01T00:00:00Z","createdAt":"2026-02-27T09:14:37.680477Z","updatedAt":"2026-02-27T09:14:37.681526Z","description":"","metadata":{},"extra":""}]}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

## POST 直接扣减

POST /api/v1/ledger/transactions/direct-priority-debit-by-price

> Body 请求参数

```json
{
  "idempotency_key": "WEB_FREE-wallet-create:08d857c8-a067-411f-9270-4d4bef7ff909:2026-03",
  "ledger_id":"tripo",
  "wallet_ids": ["019ca6b6-620f-72b2-825b-319a6f118256","019ca5cd-1fa5-7428-b07e-3bbc25458661","019ca598-9d69-7c9a-8762-303d4abbe305","019ca599-14fb-7c58-8bff-321e8fc30cd1"],
  "price_id": "tprc_C7ETS26IV32OBXA2FVAG3ALY",
  "quantity": 1,
  "memo": "测试扣减积分",
  "metadata": {
    "task_type": "POINTS_USAGE"
  }
  /*- external_id: string（可选）
- external_timestamp: Timestamp（可选）
- extra: string（可选）*/
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Connection|header|string| 否 |none|
|body|body|object| 是 |none|

> 返回示例

> 200 Response

```json
{"wallets":[{"id":"019c9e60-eaef-7b6f-83fc-65247e4b2054","ownerId":"yuha20260205——EUR","ledgerId":"tripo","name":"WEB_FREE","category":"WEB_FREE","type":"WALLET_TYPE_CREDIT","status":"WALLET_STATUS_ACTIVE","asset":{"currency":"CRED","scale":0},"balance":{"value":"300"},"pending":{"value":"0"},"maxBalance":null,"minBalance":null,"availableAfter":"2026-02-01T00:00:00Z","availableBefore":"2026-03-01T00:00:00Z","createdAt":"2026-02-27T09:14:37.680477Z","updatedAt":"2026-02-27T09:14:37.681526Z","description":"","metadata":{},"extra":""}]}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

## POST 钱包充值

POST /api/v1/ledger/transactions/direct-credit

> Body 请求参数

```json
{
  "idempotency_key": "create-a624dcae-37f0-41b3-a23c-764d071d5e46",
  "ledger_id": "tripo",
  "wallet_id": "019cacda-5de5-7185-964a-6bcf39dc36c4",
  "amount": { "value": "500.00" },
  "memo": "测试充值积分"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Connection|header|string| 否 |none|
|body|body|object| 是 |none|

> 返回示例

> 200 Response

```json
{"wallets":[{"id":"019c9e60-eaef-7b6f-83fc-65247e4b2054","ownerId":"yuha20260205——EUR","ledgerId":"tripo","name":"WEB_FREE","category":"WEB_FREE","type":"WALLET_TYPE_CREDIT","status":"WALLET_STATUS_ACTIVE","asset":{"currency":"CRED","scale":0},"balance":{"value":"300"},"pending":{"value":"0"},"maxBalance":null,"minBalance":null,"availableAfter":"2026-02-01T00:00:00Z","availableBefore":"2026-03-01T00:00:00Z","createdAt":"2026-02-27T09:14:37.680477Z","updatedAt":"2026-02-27T09:14:37.681526Z","description":"","metadata":{},"extra":""}]}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

## POST 批量查询

POST /api/v1/ledger/transactions/batch-get

> Body 请求参数

```json
{
  "transaction_ids": [
    "019c9a44-93eb-7766-874c-9b268073df76",
    "019c9a45-e2c9-77c9-b88a-257ee24b6aaf"
  ]
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Connection|header|string| 否 |none|
|body|body|object| 是 |none|

> 返回示例

> 200 Response

```json
{"wallets":[{"id":"019c9e60-eaef-7b6f-83fc-65247e4b2054","ownerId":"yuha20260205——EUR","ledgerId":"tripo","name":"WEB_FREE","category":"WEB_FREE","type":"WALLET_TYPE_CREDIT","status":"WALLET_STATUS_ACTIVE","asset":{"currency":"CRED","scale":0},"balance":{"value":"300"},"pending":{"value":"0"},"maxBalance":null,"minBalance":null,"availableAfter":"2026-02-01T00:00:00Z","availableBefore":"2026-03-01T00:00:00Z","createdAt":"2026-02-27T09:14:37.680477Z","updatedAt":"2026-02-27T09:14:37.681526Z","description":"","metadata":{},"extra":""}]}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

## POST 价格ID查询

POST /api/v1/ledger/transactions/count-by-price-id

> Body 请求参数

```json
{
  "owner_id": "user_123",
  "price_id": "PRICE_POINTS_1000_CRED",
  "statuses": ["TRANSACTION_STATUS_POST"],
  "start_time": "2026-03-01T00:00:00Z",
  "end_time": "2026-03-31T00:00:00Z",
  "wallet_categories": ["WEB_SUBSCRIPTION", "WEB_FREE"]
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Connection|header|string| 否 |none|
|body|body|object| 是 |none|

> 返回示例

> 200 Response

```json
{"wallets":[{"id":"019c9e60-eaef-7b6f-83fc-65247e4b2054","ownerId":"yuha20260205——EUR","ledgerId":"tripo","name":"WEB_FREE","category":"WEB_FREE","type":"WALLET_TYPE_CREDIT","status":"WALLET_STATUS_ACTIVE","asset":{"currency":"CRED","scale":0},"balance":{"value":"300"},"pending":{"value":"0"},"maxBalance":null,"minBalance":null,"availableAfter":"2026-02-01T00:00:00Z","availableBefore":"2026-03-01T00:00:00Z","createdAt":"2026-02-27T09:14:37.680477Z","updatedAt":"2026-02-27T09:14:37.681526Z","description":"","metadata":{},"extra":""}]}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

## POST 创建待确认交易

POST /api/v1/ledger/transactions/single/wallet/world/wallet/{wallet_id}

> Body 请求参数

```json
{
  "idempotency_key": "stress-void-retry-0001",
  "ledger_id": "WEB_POINTS",
  "direction": "POSTING_TYPE_DEBIT",
  "amount": { "value": "49.99" },
  "expire_by": "2026-03-02T10:00:00Z",
  "memo": "压测-一次下单待确认"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|wallet_id|path|string| 是 |none|
|Connection|header|string| 否 |none|
|body|body|object| 是 |none|

> 返回示例

> 200 Response

```json
{"wallets":[{"id":"019c9e60-eaef-7b6f-83fc-65247e4b2054","ownerId":"yuha20260205——EUR","ledgerId":"tripo","name":"WEB_FREE","category":"WEB_FREE","type":"WALLET_TYPE_CREDIT","status":"WALLET_STATUS_ACTIVE","asset":{"currency":"CRED","scale":0},"balance":{"value":"300"},"pending":{"value":"0"},"maxBalance":null,"minBalance":null,"availableAfter":"2026-02-01T00:00:00Z","availableBefore":"2026-03-01T00:00:00Z","createdAt":"2026-02-27T09:14:37.680477Z","updatedAt":"2026-02-27T09:14:37.681526Z","description":"","metadata":{},"extra":""}]}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

## POST 撤销待确认交易

POST /api/v1/ledger/transactions/transaction/{transaction_id}/void

> Body 请求参数

```json
{
  "transaction_id": "{txn_id}",
  "reason": "压测撤销"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|transaction_id|path|string| 是 |none|
|Connection|header|string| 否 |none|
|body|body|object| 是 |none|

> 返回示例

> 200 Response

```json
{"wallets":[{"id":"019c9e60-eaef-7b6f-83fc-65247e4b2054","ownerId":"yuha20260205——EUR","ledgerId":"tripo","name":"WEB_FREE","category":"WEB_FREE","type":"WALLET_TYPE_CREDIT","status":"WALLET_STATUS_ACTIVE","asset":{"currency":"CRED","scale":0},"balance":{"value":"300"},"pending":{"value":"0"},"maxBalance":null,"minBalance":null,"availableAfter":"2026-02-01T00:00:00Z","availableBefore":"2026-03-01T00:00:00Z","createdAt":"2026-02-27T09:14:37.680477Z","updatedAt":"2026-02-27T09:14:37.681526Z","description":"","metadata":{},"extra":""}]}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

## POST 交易查询

POST /api/v1/ledger/transactions/transaction/{transaction_id}/post

> Body 请求参数

```json
{
  "owner_id": "user_123",
  "wallet_categories": ["WEB_SUBSCRIPTION", "WEB_FREE"],
  "statuses": ["TRANSACTION_STATUS_POST", "TRANSACTION_STATUS_VOID"],
  "directions": ["POSTING_TYPE_DEBIT"],
  "start_time": "2026-03-02T00:00:00Z",
  "end_time": "2026-03-03T00:00:00Z",
  "pagination": { "offset": 0, "limit": 100 }
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|transaction_id|path|string| 是 |none|
|Connection|header|string| 否 |none|
|body|body|object| 是 |none|

> 返回示例

> 200 Response

```json
{"wallets":[{"id":"019c9e60-eaef-7b6f-83fc-65247e4b2054","ownerId":"yuha20260205——EUR","ledgerId":"tripo","name":"WEB_FREE","category":"WEB_FREE","type":"WALLET_TYPE_CREDIT","status":"WALLET_STATUS_ACTIVE","asset":{"currency":"CRED","scale":0},"balance":{"value":"300"},"pending":{"value":"0"},"maxBalance":null,"minBalance":null,"availableAfter":"2026-02-01T00:00:00Z","availableBefore":"2026-03-01T00:00:00Z","createdAt":"2026-02-27T09:14:37.680477Z","updatedAt":"2026-02-27T09:14:37.681526Z","description":"","metadata":{},"extra":""}]}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

# 团队会员&席位

## POST 批量查询月和年团队会员

POST /api/v1/membership/list/current/get_by_subjects

> Body 请求参数

```json
{
  "subjects": [
    {
      "type": "TEAM",
      "id": "team_001"
    },
    {
      "type": "TEAM",
      "id": "team_002"
    }
  ],
  "current_at": "2026-05-11T10:00:00Z"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Content-Type|header|string| 是 |none|
|Authorization|header|string| 是 |none|
|Connection|header|string| 否 |none|
|body|body|object| 是 |none|
|» subjects|body|[object]| 是 |none|
|»» type|body|string| 是 |none|
|»» id|body|string| 是 |none|
|» current_at|body|string| 是 |none|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

## POST 撤销席位

POST /api/v1/seat_quota/revoke

> Body 请求参数

```json
{
  "seat_quota_id": "019e1b25-0d1e-723e-8752-c5b45175830f"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Content-Type|header|string| 是 |none|
|Authorization|header|string| 是 |none|
|Connection|header|string| 否 |none|
|body|body|object| 是 |none|
|» seat_quota_id|body|string| 是 |none|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

## POST source查询团队发放所有席位

POST /api/v1/seat_quota/list_by_source

> Body 请求参数

```json
{
  "source_type": "SOURCE_TYPE_SUBSCRIPTION_TERM",
  "source_id": "{{subscriptionTermId}}"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Content-Type|header|string| 是 |none|
|Authorization|header|string| 是 |none|
|Connection|header|string| 否 |none|
|body|body|object| 是 |none|
|» source_type|body|string| 是 |none|
|» source_id|body|string| 是 |none|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

## POST 批量查询月/年团队席位

POST /api/v1/seat_quota/list_active_by_subjects

> Body 请求参数

```json
{
  "subjects": [
    {
      "type": "TEAM",
      "id": "team_001"
    },
    {
      "type": "TEAM",
      "id": "team_002"
    }
  ],
  "as_of": "2026-05-11T10:00:00Z"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Content-Type|header|string| 是 |none|
|Authorization|header|string| 是 |none|
|Connection|header|string| 否 |none|
|body|body|object| 是 |none|
|» subjects|body|[object]| 是 |none|
|»» type|body|string| 是 |none|
|»» id|body|string| 是 |none|
|» as_of|body|string| 是 |none|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

# 优惠券

## POST 降席取消后再购买年包+3席创建订单

POST /api/v1/hub/order/create

> Body 请求参数

```json
{
  "user_model": {
    "user_id": "admin-{{$timestamp}}",
    "user_nick": "{{$timestamp}}",
    "email": "{{$timestamp}}@qq.com"
  },
  "beneficiary": {
    "type": "TEAM",
    "id": "team-{{$timestamp}}"
  },
  "line_items": [
    {
      "services_plan_price_id": "{{baseYearPriceId}}",
      "quantity": 1
    },
    {
      "services_plan_price_id": "{{seatYearPriceId}}",
      "quantity": 3
    }
  ],
  "metadata": {
    "case": "team_base_year_subscription"
  },
  "idempotency_key": "yuha-test-{{$timestamp}}",
  "extra": {
    "scene": "TEAM_BASE_YEAR_CREATE_ORDER"
  }
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Content-Type|header|string| 是 |none|
|Connection|header|string| 否 |none|
|body|body|object| 否 |none|
|» user_model|body|object| 是 |none|
|»» user_id|body|string| 是 |none|
|»» user_nick|body|string| 是 |none|
|»» email|body|string| 是 |none|
|» beneficiary|body|object| 是 |none|
|»» type|body|string| 是 |none|
|»» id|body|string| 是 |none|
|» line_items|body|[object]| 是 |none|
|»» services_plan_price_id|body|string| 是 |none|
|»» quantity|body|integer| 是 |none|
|» metadata|body|object| 是 |none|
|»» case|body|string| 是 |none|
|» idempotency_key|body|string| 是 |none|
|» extra|body|object| 是 |none|
|»» scene|body|string| 是 |none|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

# 自动化/50-月付升年付链路

## POST E03-人工支付等待1分钟

POST /base_url/api/v1/hub/health

> Body 请求参数

```json
{}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Content-Type|header|string| 是 |none|
|Connection|header|string| 否 |none|
|body|body|object| 否 |none|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

## POST E01-月升年创建订单

POST /base_url/api/v1/hub/order/create

基于月付订阅创建月升年订单。必须先完成月付购买并提取 internal_subscription_id。

> Body 请求参数

```json
{
  "user_model": {
    "user_id": "{{user_id}}",
    "user_nick": "{{user_nick}}",
    "email": "{{user_email}}"
  },
  "idempotency_key": "{{runtime_idem}}_month_to_year_order",
  "beneficiary": {
    "type": "TEAM",
    "id": "{{team_id}}"
  },
  "line_items": [
    {
      "services_plan_price_id": "{{baseYearPriceId}}",
      "quantity": 1
    },
    {
      "services_plan_price_id": "{{seatYearPriceId}}",
      "quantity": 3
    }
  ],
  "metadata": {
    "case": "team_month_to_year_upgrade",
    "internal_subscription_id": "{{internal_subscription_id}}",
    "from_interval": "MONTH",
    "to_interval": "YEAR"
  },
  "extra": {
    "scene": "TEAM_MONTH_TO_YEAR_UPGRADE"
  }
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Content-Type|header|string| 是 |none|
|Connection|header|string| 否 |none|
|body|body|object| 否 |none|
|» user_model|body|object| 是 |none|
|»» user_id|body|string| 是 |none|
|»» user_nick|body|string| 是 |none|
|»» email|body|string| 是 |none|
|» idempotency_key|body|string| 是 |none|
|» beneficiary|body|object| 是 |none|
|»» type|body|string| 是 |none|
|»» id|body|string| 是 |none|
|» line_items|body|[object]| 是 |none|
|»» services_plan_price_id|body|string| 是 |none|
|»» quantity|body|integer| 是 |none|
|» metadata|body|object| 是 |none|
|»» case|body|string| 是 |none|
|»» internal_subscription_id|body|string| 是 |none|
|»» from_interval|body|string| 是 |none|
|»» to_interval|body|string| 是 |none|
|» extra|body|object| 是 |none|
|»» scene|body|string| 是 |none|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

## POST E02-月升年创建支付意图

POST /base_url/api/v1/hub/payment_intent/create

> Body 请求参数

```json
{
  "user_model": {
    "user_id": "{{user_id}}",
    "user_nick": "{{user_nick}}",
    "email": "{{user_email}}"
  },
  "idempotency_key": "{{runtime_idem}}_month_to_year_payment",
  "order_id": "{{month_to_year_order_id}}",
  "psp_name": "STRIPE",
  "redirect_urls": {
    "success_url": "{{success_url}}",
    "cancel_url": "{{cancel_url}}"
  },
  "metadata": {
    "case": "team_month_to_year_payment"
  }
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Content-Type|header|string| 是 |none|
|Connection|header|string| 否 |none|
|body|body|object| 否 |none|
|» user_model|body|object| 是 |none|
|»» user_id|body|string| 是 |none|
|»» user_nick|body|string| 是 |none|
|»» email|body|string| 是 |none|
|» idempotency_key|body|string| 是 |none|
|» order_id|body|string| 是 |none|
|» psp_name|body|string| 是 |none|
|» redirect_urls|body|object| 是 |none|
|»» success_url|body|string| 是 |none|
|»» cancel_url|body|string| 是 |none|
|» metadata|body|object| 是 |none|
|»» case|body|string| 是 |none|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

# 自动化/60-会员查看与撤销链路

## POST F02-撤销团队会员

POST /base_url/api/v1/membership/revoke

撤销团队会员：user_id 必须传 team_id，owner_type 必须传 TEAM。

> Body 请求参数

```json
{
  "user_id": "{{team_id}}",
  "membership_id": "{{membership_id}}",
  "owner_type": "TEAM"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Content-Type|header|string| 是 |none|
|Connection|header|string| 否 |none|
|body|body|object| 否 |none|
|» user_id|body|string| 是 |none|
|» membership_id|body|string| 是 |none|
|» owner_type|body|string| 是 |none|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

# 自动化/70-取消订阅与权益验证链路

## POST G02-取消后查询订阅

POST /base_url/api/v1/subscription/list-by-user-id

> Body 请求参数

```json
{
  "user_id": "{{user_id}}"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Content-Type|header|string| 是 |none|
|Connection|header|string| 否 |none|
|body|body|object| 否 |none|
|» user_id|body|string| 是 |none|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

## POST G03-取消后查询会员

POST /base_url/api/v1/membership/list/current/get

> Body 请求参数

```json
{
  "current_at": "{{current_timestamp}}",
  "subject": {
    "type": "TEAM",
    "id": "{{team_id}}"
  }
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Content-Type|header|string| 是 |none|
|Connection|header|string| 否 |none|
|body|body|object| 否 |none|
|» current_at|body|string| 是 |none|
|» subject|body|object| 是 |none|
|»» type|body|string| 是 |none|
|»» id|body|string| 是 |none|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

## POST G04-取消后查询SeatQuota

POST /base_url/api/v1/seat_quota/list_active_by_owner

> Body 请求参数

```json
{
  "owner_id": "{{team_id}}",
  "owner_type": "TEAM",
  "current_at": "{{current_timestamp}}"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Content-Type|header|string| 是 |none|
|Connection|header|string| 否 |none|
|body|body|object| 否 |none|
|» owner_id|body|string| 是 |none|
|» owner_type|body|string| 是 |none|
|» current_at|body|string| 是 |none|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

## POST G05-取消后查询Voucher

POST /base_url/api/v1/entitlement_steward/vouchers/list

> Body 请求参数

```json
{
  "user_id": "{{team_id}}",
  "owner_type": "TEAM"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Content-Type|header|string| 是 |none|
|Connection|header|string| 否 |none|
|body|body|object| 否 |none|
|» user_id|body|string| 是 |none|
|» owner_type|body|string| 是 |none|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

## POST G01-请求立即取消订阅

POST /base_url/api/v1/subscription/request_cancellation

请求取消订阅。字段名可能随实现变化；如接口要求 cancel_at_period_end/immediate，请按实际 proto 调整。取消最终完成后必须验证 membership/seat/voucher 非 ACTIVE。

> Body 请求参数

```json
{
  "subscription_id": "{{internal_subscription_id}}",
  "user_id": "{{user_id}}",
  "cancel_at_period_end": false,
  "canceled_at": "{{current_timestamp}}"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Content-Type|header|string| 是 |none|
|Connection|header|string| 否 |none|
|body|body|object| 否 |none|
|» subscription_id|body|string| 是 |none|
|» user_id|body|string| 是 |none|
|» cancel_at_period_end|body|boolean| 是 |none|
|» canceled_at|body|string| 是 |none|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

# 80-年包买席位-降席到3-自动续期-期中取消-再购买验证链路

## POST 再购买支付后查询积分/钱包下发情况

POST /api/v1/ledger/wallets/list

> Body 请求参数

```json
{
  "owner": {
    "type": "TEAM",
    "id": "{{team_id}}"
  }
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Content-Type|header|string| 是 |none|
|Connection|header|string| 否 |none|
|body|body|object| 否 |none|
|» owner|body|object| 是 |none|
|»» type|body|string| 是 |none|
|»» id|body|string| 是 |none|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

## POST 再购买支付后查询会员下发情况

POST /api/v1/membership/list/current/get

> Body 请求参数

```json
{
  "user_id": "{{team_id}}",
  "owner_type": "TEAM"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Content-Type|header|string| 是 |none|
|Connection|header|string| 否 |none|
|body|body|object| 否 |none|
|» user_id|body|string| 是 |none|
|» owner_type|body|string| 是 |none|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

## POST 再购买支付后查询席位下发情况

POST /api/v1/seat_quota/list_active_by_owner

> Body 请求参数

```json
{
  "owner": {
    "type": "TEAM",
    "id": "{{team_id}}"
  }
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Content-Type|header|string| 是 |none|
|Connection|header|string| 否 |none|
|body|body|object| 否 |none|
|» owner|body|object| 是 |none|
|»» type|body|string| 是 |none|
|»» id|body|string| 是 |none|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

## POST 取消后撤销订阅权益

POST /api/v1/subscription/revoke_entitlements

> Body 请求参数

```json
{
  "subscription_id": "{{internal_subscription_id}}",
  "user_id": "{{user_id}}",
  "owner_type": "TEAM"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Content-Type|header|string| 是 |none|
|Connection|header|string| 否 |none|
|body|body|object| 否 |none|
|» subscription_id|body|string| 是 |none|
|» user_id|body|string| 是 |none|
|» owner_type|body|string| 是 |none|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

## POST 等待60秒人工支付再购买订单

POST /api/v1/hub/health

> Body 请求参数

```json
{}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Content-Type|header|string| 是 |none|
|Connection|header|string| 否 |none|
|body|body|object| 否 |none|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

## POST 再购买支付后查询订阅并提取 subscription_id

POST /api/v1/subscription/list-by-user-id

> Body 请求参数

```json
{
  "user_id": "{{user_id}}"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Content-Type|header|string| 是 |none|
|Connection|header|string| 否 |none|
|body|body|object| 否 |none|
|» user_id|body|string| 是 |none|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

## POST 再购买支付后查询当前付费周期 term

POST /api/v1/subscription/term/get_current_paid

> Body 请求参数

```json
{
  "subscription_id": "{{internal_subscription_id}}"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Content-Type|header|string| 是 |none|
|Connection|header|string| 否 |none|
|body|body|object| 否 |none|
|» subscription_id|body|string| 是 |none|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

## POST 再购买支付后查询权益券/权益管家下发情况

POST /api/v1/entitlement_steward/vouchers/list

> Body 请求参数

```json
{
  "user_id": "{{team_id}}",
  "source_id": "{{subscription_term_record_id}}"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Content-Type|header|string| 是 |none|
|Connection|header|string| 否 |none|
|body|body|object| 否 |none|
|» user_id|body|string| 是 |none|
|» source_id|body|string| 是 |none|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

## POST 降席链路期中取消订阅

POST /api/v1/subscription/request_cancellation

> Body 请求参数

```json
{
  "subscription_id": "{{internal_subscription_id}}",
  "user_id": "{{user_id}}",
  "cancel_at_period_end": false,
  "reason": "apifox_year_decrease_cancel_then_repurchase"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Content-Type|header|string| 是 |none|
|Connection|header|string| 否 |none|
|body|body|object| 否 |none|
|» subscription_id|body|string| 是 |none|
|» user_id|body|string| 是 |none|
|» cancel_at_period_end|body|boolean| 是 |none|
|» reason|body|string| 是 |none|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

# 注册

## GET browser

GET /self-service/registration/browser

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Pragma|header|string| 是 |none|
|Cookie|header|string| 是 |none|
|Connection|header|string| 否 |none|

> 返回示例

> 200 Response

```json
<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Tripo Studio — Your next 3D workspace with AI</title><script async data-attribution-model="last-click" data-cookie-duration="60" data-product-id="prod_aB4s9Sg3loQlwb" defer fetchpriority="low" src="https://geddle.com/sdk/latest.js" data-hid="geddle"></script><script async data-bot-id="pub-3cb54c47-3b67-4693-9c84-299f8f90c223" defer fetchpriority="low" src="https://chatbox.copilot.livex.ai/livex.min.js" data-hid="livex"></script><script async data-promotekit="031e7e50-161e-4115-a4d3-6c596c671d9d" defer fetchpriority="low" src="https://cdn.promotekit.com/promotekit.js" data-hid="promotekit"></script><link rel="stylesheet" href="/_nuxt/entry.6ryFKTMc.css" crossorigin><link rel="stylesheet" href="/_nuxt/default.DWkX3WEU.css" crossorigin><link rel="stylesheet" href="/_nuxt/index.BiWL0VNR.css" crossorigin><link href="https://www.googletagmanager.com/gtm.js?id=GTM-N5XR5PD8" rel="preload" crossorigin="anonymous" referrerpolicy="no-referrer" fetchpriority="low" as="script"><link href="https://connect.facebook.net/en_US/fbevents.js" rel="preload" referrerpolicy="no-referrer" fetchpriority="low" as="script"><link href="https://analytics.tiktok.com/i18n/pixel/events.js?sdkid=D19VM8BC77UEHH7Q4BG0&lib=ttq" rel="preload" referrerpolicy="no-referrer" fetchpriority="low" as="script"><link href="https://www.redditstatic.com/ads/pixel.js" rel="preload" crossorigin="anonymous" referrerpolicy="no-referrer" fetchpriority="low" as="script"><link href="https://s.pinimg.com/ct/core.js" rel="preload" referrerpolicy="no-referrer" fetchpriority="low" as="script"><link href="https://bat.bing.com/bat.js" rel="preload" referrerpolicy="no-referrer" fetchpriority="low" as="script"><link href="https://t.afi-b.com/jslib/lpcv.js?cid=c2bef2e0&pid=p16464g" rel="preload" referrerpolicy="no-referrer" fetchpriority="low" as="script"><link href="https://s.yimg.jp/images/listing/tool/cv/ytag.js" rel="preload" referrerpolicy="no-referrer" fetchpriority="low" as="script"><link rel="modulepreload" as="script" crossorigin href="/_nuxt/CbPhjnrZ.js"><link rel="modulepreload" as="script" crossorigin href="/_nuxt/khqAYUQj.js"><link rel="modulepreload" as="script" crossorigin href="/_nuxt/ohkdMJqA.js"><link rel="modulepreload" as="script" crossorigin href="/_nuxt/DcbXjMHp.js"><link rel="modulepreload" as="script" crossorigin href="/_nuxt/DM98Jrlz.js"><link rel="modulepreload" as="script" crossorigin href="/_nuxt/DU1X5Qr_.js"><link rel="modulepreload" as="script" crossorigin href="/_nuxt/Dotek_ao.js"><link rel="modulepreload" as="script" crossorigin href="/_nuxt/DjXAR-9A.js"><link rel="modulepreload" as="script" crossorigin href="/_nuxt/BeYwJpS-.js"><link rel="modulepreload" as="script" crossorigin href="/_nuxt/CoY7a5PC.js"><link rel="modulepreload" as="script" crossorigin href="/_nuxt/B6IJ7Zdw.js"><link rel="modulepreload" as="script" crossorigin href="/_nuxt/C0V9FPjj.js"><link rel="modulepreload" as="script" crossorigin href="/_nuxt/Cb6fSOEN.js"><link rel="modulepreload" as="script" crossorigin href="/_nuxt/C7F3ypHJ.js"><script type="module" src="/_nuxt/CbPhjnrZ.js" crossorigin></script><link rel="prefetch" as="image" type="image/webp" href="/_nuxt/matcap.BaVxaw-k.webp"><link rel="prefetch" as="image" type="image/webp" href="/_nuxt/noise-256.DxR1FiyQ.webp"><meta content="nofollow, noarchive" name="Baiduspider"><link href="/favicon.ico" rel="icon" type="image/x-icon"><link href="/logo-32x32.png" rel="icon" sizes="32x32" type="image/png"><link href="/logo-48x48.png" rel="icon" sizes="48x48" type="image/png"><link href="https://studio.tripo3d.ai/" rel="canonical"><meta name="description" content="The best image / text to 3D model generator with all features: 3D generating, segmenting, texturing, rigging, retopology, stylization. Free and AI-powered. The best 3D model maker — create dreamlike 3D models from text or images fast and free with AI. Perfect for artists, game developers, VR/AR creators, and filmmakers."><meta name="keywords" content="Tripo AI, 3D modeling, AI 3D model generator, Ready-to-use 3D models, text-to-3D, image-to-3D, text-2-model, image-2-model, AI 3D generation, AI , 3D design, digital assets, AI 3D Model, AI 3D Generate, character creation, character design, 3D character modeling, avatar design, virtual characters, best 3d ai model generators"><script type="application/ld+json">{"@context":"https://schema.org","@graph":[{"@id":"https://www.tripo3d.ai/#organization","@type":"Organization","alternateName":["Tripo 3D","Tripo 3D AI"],"description":"Tripo AI by VAST: The world's leading 3D Model Generating Tool and Largest 3D Model Community","foundingDate":"2023","logo":{"@id":"https://www.tripo3d.ai/#schema/logo/image/","@type":"ImageObject","caption":"Tripo AI","contentUrl":"https://cdn-web.tripo3d.ai/tripo-web/logo/tripo-logo1.webp","inLanguage":"en-us","url":"https://cdn-web.tripo3d.ai/tripo-web/logo/tripo-logo1.webp"},"name":"Tripo AI","sameAs":["https://twitter.com/tripoai","https://www.youtube.com/channel/UCUxEy0OUAdRja1OOdTNL6oQ","https://discord.gg/tripoai","https://www.reddit.com/r/Tripo_ai/","https://medium.com/@thegodtripo","https://www.facebook.com/profile.php?id=61570035931253","https://www.instagram.com/tripo.ai/","https://www.pinterest.com/TripoAI"],"url":"https://www.tripo3d.ai/"},{"@id":"https://studio.tripo3d.ai/#website","@type":"WebSite","inLanguage":"en-us","name":"Tripo Studio","publisher":{"@id":"https://www.tripo3d.ai/#organization"},"url":"https://studio.tripo3d.ai/"},{"@id":"https://studio.tripo3d.ai/#webpage","@type":["CollectionPage","WebPage"],"about":{"@id":"https://studio.tripo3d.ai/#software"},"description":"Your all-in-one AI 3D workspace.","inLanguage":"en-us","isPartOf":{"@id":"https://studio.tripo3d.ai/#website"},"name":"Tripo Studio","primaryImageOfPage":{"@type":"ImageObject","url":"https://studio.tripo3d.ai/images/home/smart-bg-pc.webp"},"url":"https://studio.tripo3d.ai/"},{"@id":"https://studio.tripo3d.ai/#software","@type":"SoftwareApplication","applicationCategory":"DesignApplication","description":"Your all-in-one AI 3D workspace.","name":"Tripo Studio","operatingSystem":"Web","provider":{"@id":"https://www.tripo3d.ai/#organization"},"publisher":{"@id":"https://www.tripo3d.ai/#organization"},"url":"https://studio.tripo3d.ai/"}]}</script></head><body><div id="__nuxt"><!--[--><main><div class="pt-3 h-15 min-w-320 w-100dvw top-0 absolute z-50" data-v-7114dd32><div class="px-3" data-v-7114dd32><header class="px-2 rounded-25 flex h-12 items-center justify-between overflow-hidden bg-black-40 backdrop-blur-40" data-v-7114dd32><nav class="text-3.5 flex items-center" data-v-7114dd32><a href="https://www.tripo3d.ai/" rel="noopener noreferrer" data-v-7114dd32><div class="p-1.25 flex gap-1 w-fit items-center" data-v-7114dd32><div class="i-tripo:tripo v-mid size-5" data-v-7114dd32><!--[--><!--]--></div><img alt="tripo-logo" src="/images/tripo-text.png" class="ml-1 h-5 object-cover" data-v-7114dd32></div></a><div class="mx-3 bg-white-20 h-3 w-px" data-v-7114dd32></div><!--[--><!--[--><!--[--><!--[--><button class="group c-yellow-1 px-3 py-2 rounded-25 flex gap-1 hover:bg-white-5" data-state="closed" data-grace-area-trigger data-v-7114dd32><!--[--><!--[--><a href="/workspace/generate" class="flex" data-v-7114dd32><p data-v-7114dd32>3D Workspace</p><div class="i-tripo:caret v-mid size-4 rotate-180 transition-transform self-end group-data-[state=delayed-open]:rotate-0" data-v-7114dd32><!--[--><!--]--></div></a><!--]--><!--]--></button><!--v-if--><!--]--><!--]--><!--]--><!--]--><div class="mx-3 bg-white-20 h-3 w-px" data-v-7114dd32></div><div class="flex gap-2" data-v-7114dd32><!--[--><a href="/" class="active c-gray-100 px-3 py-2 rounded-25 relative hover:bg-white-5" data-v-7114dd32><p data-v-7114dd32>Home</p></a><a href="/assets" class="c-gray-100 px-3 py-2 rounded-25 relative hover:bg-white-5" data-v-7114dd32><p data-v-7114dd32>Assets</p></a><a href="https://www.tripo3d.ai/affiliate" rel="noopener noreferrer" class="c-gray-100 px-3 py-2 rounded-25 relative hover:bg-white-5" data-v-7114dd32><p data-v-7114dd32>Affiliate Program</p></a><!--]--></div></nav><div class="flex flex-1 flex-row-reverse gap-2" data-v-7114dd32><button class="tripo-button group text-3.5 font-500 rounded-25 w-fit cursor-pointer relative c-gray-100 px-3 border border-white-5 truncate transition box-border hover:c-yellow-1 hover:border-yellow-1" data-v-7114dd32 data-v-a9ab43b7><div class="background" data-v-a9ab43b7></div><div class="flex gap-1 items-center justify-center relative z-1" data-v-a9ab43b7><!--[-->Sign up/Log in<!--]--></div></button><!--[--><!--[--><!--[--><button class="border border-white-5 rounded-25 shrink-0 size-8.5 relative" id="reka-popover-trigger-v-0-1" type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls data-state="closed"><!--[--><div class="i-tripo:language v-mid m-auto size-4"><!--[--><!--]--></div><!--]--></button><!--v-if--><!--]--><!--]--><!--]--><!----><div class="py-1.25 pl-2.25 pr-1.25 border border-white-5 rounded-25 flex cursor-pointer items-center" data-v-7114dd32><div class="i-tripo:bolt:search v-mid bg-yellow-1 size-4"><!--[--><!--]--></div><p class="text-3 pl-1 pr-3">?</p><button class="tripo-button group font-500 rounded-25 cursor-pointer box-border text-3 c-gray-50 px-2 flex-shrink-0 h-5.5 w-auto relative overflow-hidden from-[#503BE3] to-[#FB23C2] bg-gradient-to-r" data-v-a9ab43b7><div class="background" data-v-a9ab43b7></div><div class="flex gap-1 items-center justify-center relative z-1" data-v-a9ab43b7><!--[--><div class="i-tripo:rocket v-mid size-3.5"><!--[--><!--]--></div> Upgrade <img alt="loading" src="/images/workspace/generate/light.webp" class="opacity-20 h-[200%] w-1/2 transform left-0 absolute animate-left-to-right-infinite -top-1/2"><!--]--></div></button></div><!--[--><!--[--><!--[--><button class="px-2.25 py-1.25 border border-white-5 rounded-25 flex gap-1 cursor-pointer whitespace-nowrap items-center data-[state=open]:c-black data-[state=open]:bg-gray-100" id="reka-popover-trigger-v-0-2" type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls data-state="closed"><!--[--><div class="i-tripo:switch v-mid size-4"><!--[--><!--]--></div><p class="text-3"> DCC Bridge </p><div tabindex="0" role="region" aria-roledescription="carousel" class="relative size-4"><!--[--><div class="h-full overflow-hidden"><div class="flex -mt-4 flex-col h-8"><!--[--><!--[--><div role="group" aria-roledescription="slide" class="min-w-0 shrink-0 grow-0 basis-full pt-4"><!--[--><div class="i-tripo:blender v-mid size-4"><!--[--><!--]--></div><!--]--></div><div role="group" aria-roledescription="slide" class="min-w-0 shrink-0 grow-0 basis-full pt-4"><!--[--><div class="i-tripo:3ds-max v-mid size-4"><!--[--><!--]--></div><!--]--></div><div role="group" aria-roledescription="slide" class="min-w-0 shrink-0 grow-0 basis-full pt-4"><!--[--><div class="i-tripo:unity v-mid size-4"><!--[--><!--]--></div><!--]--></div><div role="group" aria-roledescription="slide" class="min-w-0 shrink-0 grow-0 basis-full pt-4"><!--[--><div class="i-tripo:unreal v-mid size-4"><!--[--><!--]--></div><!--]--></div><div role="group" aria-roledescription="slide" class="min-w-0 shrink-0 grow-0 basis-full pt-4"><!--[--><div class="i-tripo:maya v-mid size-4"><!--[--><!--]--></div><!--]--></div><div role="group" aria-roledescription="slide" class="min-w-0 shrink-0 grow-0 basis-full pt-4"><!--[--><div class="i-tripo:cocos v-mid size-4"><!--[--><!--]--></div><!--]--></div><div role="group" aria-roledescription="slide" class="min-w-0 shrink-0 grow-0 basis-full pt-4"><!--[--><div class="i-tripo:godot v-mid size-4"><!--[--><!--]--></div><!--]--></div><!--]--><!--]--></div></div><!--]--></div><!--]--></button><!--v-if--><!--]--><!--]--><!--]--></div></header></div></div><div dir="ltr" style="position:relative;--reka-scroll-area-corner-width:0px;--reka-scroll-area-corner-height:0px;" class="relative h-100dvh min-w-320 w-100dvw overflow-hidden overflow-x-hidden max-md:min-w-0"><!--[--><!--[--><div data-reka-scroll-area-viewport style="overflow-x:hidden;overflow-y:hidden;" class="outline-none size-full" tabindex="0"><div style=""><!--[--><!--[--><div class="h-15"></div><div class="min-w-320 w-100dvw overflow-x-hidden max-md:min-w-0"><!--[--><div><!--[--><!----><!----><!--]--><!--[--><!----><!----><!--]--><div class="relative z-1 overflow-hidden"><img src="/images/home/smart-bg-pc.webp" class="size-full pointer-events-none inset-0 absolute object-cover max-md:hidden -z-1"><div class="pb-0 pt-9 text-center flex flex-col gap-3 items-center max-md:pt-6"><h1 class="text-10 c-[#f2f2f2] leading-11 font-bold max-md:text-6">Generate Anything in 3D</h1><p class="text-4.5 c-white/60 font-normal max-md:text-3.5">Your All-in-One AI 3D Workspace</p></div><div class="mx-auto px-8 pb-8 flex gap-20 max-w-300 items-start justify-center relative max-md:mt-6 max-md:px-4 max-md:flex-col max-md:gap-6 max-md:items-center"><img src="/images/home/smart-bg-mobile.webp" class="size-full hidden pointer-events-none inset-0 absolute object-cover max-md:block -z-1"><div class="group shrink-0 h-81.5 w-136.75 cursor-pointer relative max-md:rounded-5 max-md:h-45 max-md:w-87.75 max-md:overflow-hidden"><div class="max-md:hidden"><img alt="" src="/images/home/smart-poly-bg-b.webp" class="opacity-100 rounded-5 h-77.5 w-117.25 pointer-events-none transition-opacity duration-500 left-19.5 top-4 absolute object-cover"><img alt="" src="/images/home/smart-poly-bg-b-hover.webp" class="opacity-0 rounded-5 h-77.5 w-117.25 pointer-events-none transition-opacity duration-500 left-19.5 top-4 absolute object-cover"></div><img alt="" src="/images/home/smart-poly-bg-b-mobile.webp" class="rounded-0 h-full w-full hidden pointer-events-none bottom-0 left-0 absolute object-contain max-md:h-40.25 max-md:block"><img alt="" src="/images/home/smart-poly-char-b.webp" class="opacity-100 h-87.25 w-70 pointer-events-none select-none transform-origin-bottom transition-opacity bottom-0 absolute object-cover object-top max-md:h-45 max-md:w-auto -left-7 max-md:left-0"><img alt="" src="/images/home/smart-poly-char-b-hover.webp" class="opacity-0 h-87.25 w-70 pointer-events-none select-none transform-origin-bottom transition-opacity bottom-0 absolute object-cover object-top max-md:h-45 max-md:w-auto -left-7 max-md:left-0"><div class="flex flex-col items-start left-64.75 top-17.5 absolute max-md:w-[50%] max-md:left-[43%] max-md:top-8"><div class="i-tripo:diamond v-mid size-10 max-md:size-5"><!--[--><!--]--></div><div class="mt-3 flex flex-col gap-3 max-md:mt-2 max-md:gap-2"><h2 class="text-6 c-[#fafafa] leading-7 font-bold whitespace-nowrap max-md:text-3.5 max-md:leading-5 max-md:whitespace-normal">High Detail Model</h2><p class="text-4 c-white/60 leading-5.5 font-normal w-63.25 max-md:text-3 max-md:leading-4 max-md:w-auto">Up to 2 Million Polygons for 3D Printing &amp; Visual Art</p></div></div><button class="animate-button group font-500 rounded-25 cursor-pointer box-border group/arrow text-4.25 font-medium px-5 h-14 w-69 bottom-0 right-0 absolute btn-bg-[#1235AE] btn-text-white btn-shadow-[#7AA2FF] btn-glow-[#4F66FD] max-md:text-3.25 max-md:h-10 max-md:w-52.25" data-v-17b3fdb9><div class="background bg-normal always-animate" data-v-17b3fdb9><div class="background overflow-hidden -inset-1!" data-v-17b3fdb9><div class="background animate-outer-glow -inset-4!" data-v-17b3fdb9></div><div class="background animate-inner-glow" data-v-17b3fdb9></div></div></div><div class="flex items-center justify-center relative z-1 wrapper-default gap-3" data-v-17b3fdb9><!--[-->Generate HD Model <div class="group-hover/arrow:animate-bounce-x-infinite"><div class="i-tripo:arrow v-mid size-6 rotate-90"><!--[--><!--]--></div></div><!--]--></div></button></div><div class="group shrink-0 h-81.5 w-136.75 cursor-pointer relative max-md:rounded-5 max-md:h-45 max-md:w-87.75 max-md:overflow-hidden"><div class="max-md:hidden"><img alt="" src="/images/home/smart-poly-bg-r.webp" class="opacity-100 rounded-5 h-77.5 w-117.25 pointer-events-none origin-center transition-all duration-500 left-0 top-4 absolute object-cover"><img alt="" src="/images/home/smart-poly-bg-r-hover.webp" class="opacity-0 rounded-5 h-77.5 w-117.25 pointer-events-none transition-opacity duration-500 left-0 top-4 absolute object-cover"></div><img alt="" src="/images/home/smart-poly-bg-r-mobile.webp" class="rounded-0 h-full w-full hidden pointer-events-none bottom-0 left-0 absolute object-contain max-md:h-40.25 max-md:block"><img alt="" src="/images/home/smart-poly-char-r.webp" class="opacity-100 h-87.25 w-82 pointer-events-none select-none transform-origin-bottom transition-opacity bottom-0 left-70 absolute object-cover object-top max-md:h-45 max-md:w-auto max-md:left-auto max-md:right-0"><img alt="" src="/images/home/smart-poly-char-r-hover.webp" class="opacity-0 h-87.25 w-82 pointer-events-none select-none transform-origin-bottom transition-opacity bottom-0 left-70 absolute object-cover object-top max-md:h-45 max-md:w-auto max-md:left-auto max-md:right-0"><div class="flex flex-col items-start left-8 top-17.5 absolute max-md:w-[60%] max-md:left-7 max-md:top-8"><div class="i-tripo:grid v-mid size-10 max-md:size-5"><!--[--><!--]--></div><div class="mt-3 flex flex-col gap-3 max-md:mt-2 max-md:gap-2"><h2 class="text-6 c-[#fafafa] leading-7 font-bold whitespace-nowrap max-md:text-3.5 max-md:leading-5 max-md:whitespace-normal">Smart Topology Mesh</h2><p class="text-4 c-white/60 leading-5.5 font-normal w-63.25 max-md:text-3 max-md:leading-4 max-md:w-auto">~2s | Clean Topology for Games &amp; Web Apps</p></div></div><button class="animate-button group font-500 rounded-25 cursor-pointer box-border group/arrow text-4.25 font-medium px-5 h-14 w-69 bottom-0 left-0 absolute btn-bg-[#5f2209] btn-text-white btn-shadow-[#FF8F4E] btn-glow-[#DB4203] max-md:text-3.25 max-md:px-0 max-md:h-10 max-md:w-52.25" data-v-17b3fdb9><div class="background bg-normal always-animate" data-v-17b3fdb9><div class="background overflow-hidden -inset-1!" data-v-17b3fdb9><div class="background animate-outer-glow -inset-4!" data-v-17b3fdb9></div><div class="background animate-inner-glow" data-v-17b3fdb9></div></div></div><div class="flex items-center justify-center relative z-1 wrapper-default gap-3" data-v-17b3fdb9><!--[-->Generate Smart Mesh <div class="group-hover/arrow:animate-bounce-x-infinite"><div class="i-tripo:arrow v-mid size-6 rotate-90"><!--[--><!--]--></div></div><!--]--></div></button></div></div></div><div class="px-3 flex flex-col relative z-1"><!--[--><div class="mb-3 flex items-center justify-between"><h2 class="text-5 c-foreground max-md:text-4">Gallery</h2><!----></div><div class="flex w-full items-start"><!--[--><!--[--><!--[--><!--[--><button id="reka-popover-trigger-v-0-0-0" type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls data-state="closed"><!--[--><!--[--><div class="text-3 c-black pl-3 pr-4 rounded-5 bg-gray-50 flex gap-1 h-8 w-24 items-center"><div class="i-tripo:filter v-mid size-4"><!--[--><!--]--></div><p>Filter</p><div class="i-tripo:caret v-mid size-3 rotate-180"><!--[--><!--]--></div></div><!--]--><!--]--></button><!--v-if--><!--]--><!--]--><!--]--><div class="mx-2.5 h-8 w-0.25 from-[#ffffff00] to-[#ffffff00] via-white-40 bg-gradient-to-b"></div><!--]--><!--[--><div class="items-center justify-center rounded-5 bg-black-40 flex gap-2 h-8 backdrop-blur-40" tabindex="-1" dir="ltr" style="outline:none;" role="group"><!--[--><!--[--><!--[--><button type="button" aria-pressed="true" data-state="on" class="transition box-border justify-center text-3 c-gray-200 px-3 rounded-5 flex shrink-0 gap-1 h-8 cursor-pointer items-center data-[state=on]:c-black data-[state=on]:bg-gray-50 hover:bg-white-5 data-[state=on]:hover:bg-gray-50" data-reka-collection-item tabindex="-1" data-active value="all"><!--[--><!--[--><!--[--><div class="i-tripo:grid-square v-mid size-4"><!--[--><!--]--></div> All<!--]--><!--]--><!--]--><!--v-if--></button><button type="button" aria-pressed="false" data-state="off" class="transition box-border justify-center text-3 c-gray-200 px-3 rounded-5 flex shrink-0 gap-1 h-8 cursor-pointer items-center data-[state=on]:c-black data-[state=on]:bg-gray-50 hover:bg-white-5 data-[state=on]:hover:bg-gray-50" data-reka-collection-item tabindex="-1" value="3d_printing"><!--[--><!--[--><!--[--><div class="i-tripo:printing v-mid size-4"><!--[--><!--]--></div> 3D Printing<!--]--><!--]--><!--]--><!--v-if--></button><!--]--><!--]--><!--]--><!--v-if--></div><div class="mx-2.5 h-8 w-0.25 from-[#ffffff00] to-[#ffffff00] via-white-40 bg-gradient-to-b"></div><!--]--><div dir="ltr" style="position:relative;--reka-scroll-area-corner-width:0px;--reka-scroll-area-corner-height:0px;" class="relative mb-1 pb-3 flex-1 overflow-hidden"><!--[--><!--[--><div data-reka-scroll-area-viewport style="overflow-x:hidden;overflow-y:hidden;" class="outline-none size-full rounded-5 bg-black-40 backdrop-blur-40" tabindex="0"><div style=""><!--[--><!--[--><div class="items-center flex gap-2 h-8 justify-start" tabindex="-1" dir="ltr" style="outline:none;" role="group"><!--[--><!--[--><!--[--><button type="button" aria-pressed="true" data-state="on" class="transition box-border justify-center text-3 c-gray-200 px-3 rounded-5 flex shrink-0 gap-1 h-8 cursor-pointer items-center data-[state=on]:c-black data-[state=on]:bg-gray-50 hover:bg-white-5 data-[state=on]:hover:bg-gray-50" data-reka-collection-item tabindex="-1" data-active value="featured"><!--[--><!--[--><!--[--><div class="i-tripo:star-shooting v-mid size-4"><!--[--><!--]--></div> Featured<!--]--><!--]--><!--]--><!--v-if--></button><button type="button" aria-pressed="false" data-state="off" class="transition box-border justify-center text-3 c-gray-200 px-3 rounded-5 flex shrink-0 gap-1 h-8 cursor-pointer items-center data-[state=on]:c-black data-[state=on]:bg-gray-50 hover:bg-white-5 data-[state=on]:hover:bg-gray-50" data-reka-collection-item tabindex="-1" value="character"><!--[--><!--[--><!--[--><div class="i-tripo:personal v-mid size-4"><!--[--><!--]--></div> Character<!--]--><!--]--><!--]--><!--v-if--></button><button type="button" aria-pressed="false" data-state="off" class="transition box-border justify-center text-3 c-gray-200 px-3 rounded-5 flex shrink-0 gap-1 h-8 cursor-pointer items-center data-[state=on]:c-black data-[state=on]:bg-gray-50 hover:bg-white-5 data-[state=on]:hover:bg-gray-50" data-reka-collection-item tabindex="-1" value="vehicle"><!--[--><!--[--><!--[--><div class="i-tripo:taxi v-mid size-4"><!--[--><!--]--></div> Vehicle<!--]--><!--]--><!--]--><!--v-if--></button><button type="button" aria-pressed="false" data-state="off" class="transition box-border justify-center text-3 c-gray-200 px-3 rounded-5 flex shrink-0 gap-1 h-8 cursor-pointer items-center data-[state=on]:c-black data-[state=on]:bg-gray-50 hover:bg-white-5 data-[state=on]:hover:bg-gray-50" data-reka-collection-item tabindex="-1" value="creatures &amp; animals"><!--[--><!--[--><!--[--><div class="i-tripo:animal v-mid size-4"><!--[--><!--]--></div> Animal<!--]--><!--]--><!--]--><!--v-if--></button><button type="button" aria-pressed="false" data-state="off" class="transition box-border justify-center text-3 c-gray-200 px-3 rounded-5 flex shrink-0 gap-1 h-8 cursor-pointer items-center data-[state=on]:c-black data-[state=on]:bg-gray-50 hover:bg-white-5 data-[state=on]:hover:bg-gray-50" data-reka-collection-item tabindex="-1" value="architecture"><!--[--><!--[--><!--[--><div class="i-tripo:building-tree v-mid size-4"><!--[--><!--]--></div> Architecture<!--]--><!--]--><!--]--><!--v-if--></button><button type="button" aria-pressed="false" data-state="off" class="transition box-border justify-center text-3 c-gray-200 px-3 rounded-5 flex shrink-0 gap-1 h-8 cursor-pointer items-center data-[state=on]:c-black data-[state=on]:bg-gray-50 hover:bg-white-5 data-[state=on]:hover:bg-gray-50" data-reka-collection-item tabindex="-1" value="furniture"><!--[--><!--[--><!--[--><div class="i-tripo:sofa v-mid size-4"><!--[--><!--]--></div> Furniture<!--]--><!--]--><!--]--><!--v-if--></button><button type="button" aria-pressed="false" data-state="off" class="transition box-border justify-center text-3 c-gray-200 px-3 rounded-5 flex shrink-0 gap-1 h-8 cursor-pointer items-center data-[state=on]:c-black data-[state=on]:bg-gray-50 hover:bg-white-5 data-[state=on]:hover:bg-gray-50" data-reka-collection-item tabindex="-1" value="props"><!--[--><!--[--><!--[--><div class="i-tripo:box v-mid size-4"><!--[--><!--]--></div> Props<!--]--><!--]--><!--]--><!--v-if--></button><button type="button" aria-pressed="false" data-state="off" class="transition box-border justify-center text-3 c-gray-200 px-3 rounded-5 flex shrink-0 gap-1 h-8 cursor-pointer items-center data-[state=on]:c-black data-[state=on]:bg-gray-50 hover:bg-white-5 data-[state=on]:hover:bg-gray-50" data-reka-collection-item tabindex="-1" value="weapon"><!--[--><!--[--><!--[--><div class="i-tripo:weapon v-mid size-4"><!--[--><!--]--></div> Weapon<!--]--><!--]--><!--]--><!--v-if--></button><button type="button" aria-pressed="false" data-state="off" class="transition box-border justify-center text-3 c-gray-200 px-3 rounded-5 flex shrink-0 gap-1 h-8 cursor-pointer items-center data-[state=on]:c-black data-[state=on]:bg-gray-50 hover:bg-white-5 data-[state=on]:hover:bg-gray-50" data-reka-collection-item tabindex="-1" value="clothing"><!--[--><!--[--><!--[--><div class="i-tripo:clothing v-mid size-4"><!--[--><!--]--></div> Clothing<!--]--><!--]--><!--]--><!--v-if--></button><button type="button" aria-pressed="false" data-state="off" class="transition box-border justify-center text-3 c-gray-200 px-3 rounded-5 flex shrink-0 gap-1 h-8 cursor-pointer items-center data-[state=on]:c-black data-[state=on]:bg-gray-50 hover:bg-white-5 data-[state=on]:hover:bg-gray-50" data-reka-collection-item tabindex="-1" value="machine"><!--[--><!--[--><!--[--><div class="i-tripo:settings v-mid size-4"><!--[--><!--]--></div> Machine<!--]--><!--]--><!--]--><!--v-if--></button><button type="button" aria-pressed="false" data-state="off" class="transition box-border justify-center text-3 c-gray-200 px-3 rounded-5 flex shrink-0 gap-1 h-8 cursor-pointer items-center data-[state=on]:c-black data-[state=on]:bg-gray-50 hover:bg-white-5 data-[state=on]:hover:bg-gray-50" data-reka-collection-item tabindex="-1" value="food"><!--[--><!--[--><!--[--><div class="i-tripo:food-tray v-mid size-4"><!--[--><!--]--></div> Food<!--]--><!--]--><!--]--><!--v-if--></button><button type="button" aria-pressed="false" data-state="off" class="transition box-border justify-center text-3 c-gray-200 px-3 rounded-5 flex shrink-0 gap-1 h-8 cursor-pointer items-center data-[state=on]:c-black data-[state=on]:bg-gray-50 hover:bg-white-5 data-[state=on]:hover:bg-gray-50" data-reka-collection-item tabindex="-1" value="nature &amp; environment"><!--[--><!--[--><!--[--><div class="i-tripo:leaf v-mid size-4"><!--[--><!--]--></div> Nature<!--]--><!--]--><!--]--><!--v-if--></button><button type="button" aria-pressed="false" data-state="off" class="transition box-border justify-center text-3 c-gray-200 px-3 rounded-5 flex shrink-0 gap-1 h-8 cursor-pointer items-center data-[state=on]:c-black data-[state=on]:bg-gray-50 hover:bg-white-5 data-[state=on]:hover:bg-gray-50" data-reka-collection-item tabindex="-1" value="abstract / symbol"><!--[--><!--[--><!--[--><div class="i-tripo:flask v-mid size-4"><!--[--><!--]--></div> Abstract<!--]--><!--]--><!--]--><!--v-if--></button><!--]--><!--]--><!--]--><!--v-if--></div><!--]--><!--]--></div></div><style> /* Hide scrollbars cross-browser and enable momentum scroll for touch devices */ [data-reka-scroll-area-viewport] { scrollbar-width:none; -ms-overflow-style:none; -webkit-overflow-scrolling:touch; } [data-reka-scroll-area-viewport]::-webkit-scrollbar { display:none; } </style><!--]--><!----><!----><!--v-if--><!--]--></div><!--[--><div class="mx-2.5 h-8 w-0.25 from-[#ffffff00] to-[#ffffff00] via-white-40 bg-gradient-to-b"></div><!--[--><!--[--><!--[--><!--[--><div class="relative" data-state="closed" data-grace-area-trigger><!--[--><!--[--><button class="tripo-button group font-500 rounded-25 cursor-pointer box-border relative text-3 c-black font-medium px-4 bg-gray-100 h-8 w-auto hover:bg-gray-200" data-v-a9ab43b7><div class="background bg-default" data-v-a9ab43b7></div><div class="flex gap-1 items-center justify-center relative z-1 wrapper-default" data-v-a9ab43b7><!--[-->Feature My Model<!--]--></div></button><div class="text-3 c-yellow-1 border border-black rounded-5 bg-gray-3 flex h-4 w-11 items-center right-0 absolute -top-2"><p class="ml-auto"> +10 </p><div class="i-tripo:bolt v-mid ml-auto size-4"><!--[--><!--]--></div></div><!--]--><!--]--></div><!--v-if--><!--]--><!--]--><!--]--><!--]--><!--]--></div><!--]--><!--[--><!--[--><div class="flex flex-wrap gap-4 relative"><!----><div class="block" style="width:0px;"><div tabindex="0" role="region" aria-roledescription="carousel" class="rounded-5 relative"><!--[--><div class="h-full overflow-hidden"><div class="flex h-full -ml-4"><!--[--><!--[--><div role="group" aria-roledescription="slide" class="min-w-0 shrink-0 grow-0 basis-full pl-4"><!--[--><div class="rounded-5 bg-gray h-full cursor-pointer"><img alt="/images/home/gen-image-en.webp" src="/images/home/gen-image-en.webp" class="rounded-5 size-full object-cover"></div><!--]--></div><div role="group" aria-roledescription="slide" class="min-w-0 shrink-0 grow-0 basis-full pl-4"><!--[--><div class="rounded-5 bg-gray h-full cursor-pointer"><img alt="/images/home/shop-en.webp" src="/images/home/shop-en.webp" class="rounded-5 size-full object-cover"></div><!--]--></div><div role="group" aria-roledescription="slide" class="min-w-0 shrink-0 grow-0 basis-full pl-4"><!--[--><div class="rounded-5 bg-gray h-full cursor-pointer"><img alt="/images/home/blade-runner.webp" src="/images/home/blade-runner.webp" class="rounded-5 size-full object-cover"></div><!--]--></div><div role="group" aria-roledescription="slide" class="min-w-0 shrink-0 grow-0 basis-full pl-4"><!--[--><div class="rounded-5 bg-gray h-full cursor-pointer"><img alt="/images/home/challenge.webp" src="/images/home/challenge.webp" class="rounded-5 size-full object-cover"></div><!--]--></div><div role="group" aria-roledescription="slide" class="min-w-0 shrink-0 grow-0 basis-full pl-4"><!--[--><div class="rounded-5 bg-gray h-full cursor-pointer"><img alt="/images/home/en.webp" src="/images/home/en.webp" class="rounded-5 size-full object-cover"></div><!--]--></div><div role="group" aria-roledescription="slide" class="min-w-0 shrink-0 grow-0 basis-full pl-4"><!--[--><div class="rounded-5 bg-gray h-full cursor-pointer"><img alt="/images/home/version3-1.webp" src="/images/home/version3-1.webp" class="rounded-5 size-full object-cover"></div><!--]--></div><div role="group" aria-roledescription="slide" class="min-w-0 shrink-0 grow-0 basis-full pl-4"><!--[--><div class="rounded-5 bg-gray h-full cursor-pointer"><img alt="/images/home/tutorial.webp" src="/images/home/tutorial.webp" class="rounded-5 size-full object-cover"></div><!--]--></div><div role="group" aria-roledescription="slide" class="min-w-0 shrink-0 grow-0 basis-full pl-4"><!--[--><div class="rounded-5 bg-gray h-full cursor-pointer"><img alt="/images/home/game-hub.webp" src="/images/home/game-hub.webp" class="rounded-5 size-full object-cover"></div><!--]--></div><div role="group" aria-roledescription="slide" class="min-w-0 shrink-0 grow-0 basis-full pl-4"><!--[--><div class="rounded-5 bg-gray h-full cursor-pointer"><img alt="/images/home/demo-game.webp" src="/images/home/demo-game.webp" class="rounded-5 size-full object-cover"></div><!--]--></div><!--]--><!--]--></div></div><div class="flex gap-1 bottom-6 left-3 absolute"><!--[--><!--]--></div><!--]--></div></div><!--[--><!--[--><div style="width:0px;" class="group rounded-5 bg-black-40 w-full aspect-3/4 cursor-pointer relative overflow-hidden"><a style="--clip-position:0%;" class="rounded-5 size-full block relative overflow-hidden"><img src="https://vast-plugin-data.rg1.data.tripo3d.com/tripo-studio/20260516/72533814-fc69-43a1-b128-1262bb4e362b/studio_mesh.webp?Key-Pair-Id=K2T6H91Q55QW4F&amp;Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLnJnMS5kYXRhLnRyaXBvM2QuY29tL3RyaXBvLXN0dWRpby8yMDI2MDUxNi83MjUzMzgxNC1mYzY5LTQzYTEtYjEyOC0xMjYyYmI0ZTM2MmIvc3R1ZGlvX21lc2gud2VicCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc3OTE0ODgwMH19fV19&amp;Signature=PLXsKaHmlijbt6O~ZA9c5nzg40DTjRi6wD8pAiSkHIomzfhAqobddXs-x-hZMQHXkub6e~Rvi7983RhO3tg7ucMgtwbmfnvBE7PoKuz4JEClS8mOMPpPM8WLPUfYqUG5LcC2kJGO~HPtuvCZ9b~a28I-Zy6wNmQ4ZT4tt1gK~iyeQS~94yUSTVB9ZrWDYveClT0~kVyCo~790Sz1flcxkVkBPG8UZA1OZECkdULm8huaqXKnZ4-gyxGoJxTJsExdGObocXRLQghejQjtj7zqNxH3wE-2wcRcPI3dTr~4~1N6B5KKQUMzOYcQOiVVfJ23mZnPID0gLAak3B-gW3vpwA__" alt="bronze knight statue kneeling with sword intricate engraved armor pa" class="opacity-0 size-full pointer-events-none"><div class="inset-0 absolute bg-cover bg-center bg-no-repeat" style="background-image:url(&#39;https://vast-plugin-data.rg1.data.tripo3d.com/tripo-studio/20260408/2769054a-fab6-49f0-b59f-d57eef3f84b2/studio_wireframe.webp?Key-Pair-Id=K2T6H91Q55QW4F&amp;Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLnJnMS5kYXRhLnRyaXBvM2QuY29tL3RyaXBvLXN0dWRpby8yMDI2MDQwOC8yNzY5MDU0YS1mYWI2LTQ5ZjAtYjU5Zi1kNTdlZWYzZjg0YjIvc3R1ZGlvX3dpcmVmcmFtZS53ZWJwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzc5MTQ4ODAwfX19XX0_&amp;Signature=HRlm6tjb9MiSpNr4Z38wJbUSxJPq1hmmhvBi0o8CDAYJBpbliEfLPuCx3kU7osU4cnF4ZX0kw6qO2gaIaUH6fle4T6YgSyCdwLSe1tEJ1zHzAsbT5cWoCdQfN33ItY9XwC1CG3WED957wpsvPkqGcB73s7WTHMg8Ps0AsbDBPBDQPrltJN8uKMURaGt89nOgCjQb3u-obvtZ8TS8-IeLreBWynhY199XPbpGbsRowy03M6zV9F8O-TzvLe3WPy0J0fyIU5oW~ZXeW-Z3diKBNvoBfzbZigtSWbwGtrqwMnTofBHzd-pYkRz02P3TdEEkQOVbLYS5fetP~usuv63kOg__&#39;);clip-path:polygon(0 0, 0 0, 0 0, 0 0);"></div><div class="inset-0 absolute bg-cover bg-center bg-no-repeat" style="background-image:url(&#39;https://vast-plugin-data.rg1.data.tripo3d.com/tripo-studio/20260516/72533814-fc69-43a1-b128-1262bb4e362b/studio_mesh.webp?Key-Pair-Id=K2T6H91Q55QW4F&amp;Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLnJnMS5kYXRhLnRyaXBvM2QuY29tL3RyaXBvLXN0dWRpby8yMDI2MDUxNi83MjUzMzgxNC1mYzY5LTQzYTEtYjEyOC0xMjYyYmI0ZTM2MmIvc3R1ZGlvX21lc2gud2VicCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc3OTE0ODgwMH19fV19&amp;Signature=PLXsKaHmlijbt6O~ZA9c5nzg40DTjRi6wD8pAiSkHIomzfhAqobddXs-x-hZMQHXkub6e~Rvi7983RhO3tg7ucMgtwbmfnvBE7PoKuz4JEClS8mOMPpPM8WLPUfYqUG5LcC2kJGO~HPtuvCZ9b~a28I-Zy6wNmQ4ZT4tt1gK~iyeQS~94yUSTVB9ZrWDYveClT0~kVyCo~790Sz1flcxkVkBPG8UZA1OZECkdULm8huaqXKnZ4-gyxGoJxTJsExdGObocXRLQghejQjtj7zqNxH3wE-2wcRcPI3dTr~4~1N6B5KKQUMzOYcQOiVVfJ23mZnPID0gLAak3B-gW3vpwA__&#39;);clip-path:polygon(0 0, 100% 0, 100% 100%, 0 100%);"></div></a><!----><!--[--><!--[--><!--[--><button class="p-2 rounded-3 transition left-2 top-2 absolute hover:bg-white-5" id="reka-popover-trigger-v-0-0-17" type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls data-state="closed"><!--[--><div class="i-tripo:info-open v-mid size-5"><!--[--><!--]--></div><!--]--></button><!--v-if--><!--]--><!--]--><!--]--><button class="opacity-0 group-hover:opacity-100 max-md:opacity-100 p-2 rounded-3 transition right-2 top-2 absolute hover:bg-white-5"><div class="i-tripo:favorite v-mid size-5"><!--[--><!--]--></div></button><div class="pl-2 pr-3 flex h-8 w-full items-center bottom-2 justify-between absolute"><div class="flex gap-2 items-center"><img alt="" src="https://staticassets.tripo3d.ai/studio/default-avatar.jpeg" class="rounded-full size-7 object-cover"><p class="text-3 max-w-38 truncate">Anonymous1775624365</p></div><button class="flex gap-1 items-center"><div class="i-tripo:like v-mid size-5"><!--[--><!--]--></div><p class="text-3">3</p></button></div><!----></div><!----><!--]--><!--[--><div style="width:0px;" class="group rounded-5 bg-black-40 w-full aspect-3/4 cursor-pointer relative overflow-hidden"><a style="--clip-position:0%;" class="rounded-5 size-full block relative overflow-hidden"><img src="https://vast-plugin-data.rg1.data.tripo3d.com/tripo-studio/20260516/47849d75-a7dc-46f2-b7a5-5995d2e00f71/studio_mesh.webp?Key-Pair-Id=K2T6H91Q55QW4F&amp;Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLnJnMS5kYXRhLnRyaXBvM2QuY29tL3RyaXBvLXN0dWRpby8yMDI2MDUxNi80Nzg0OWQ3NS1hN2RjLTQ2ZjItYjdhNS01OTk1ZDJlMDBmNzEvc3R1ZGlvX21lc2gud2VicCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc3OTE0ODgwMH19fV19&amp;Signature=yNpBHRliddT7Aiov7XdWgbFB77A4ctrsRFwOxBKBlP35fYNljH8OkhIjBWmsvQNZmLoxGwScFeYfCc8zfGakrIXNe4QBLgNt1WoZjDDY0LjlbpE35jc5a8Qez8DyMZX17lbvNxWecp9fenvQmJAm3DY87jRCkQJD6pl0oOHrAXO4Qgrfvp~GOdvWsZq5~HfsmSn0VghfLlHqRqoBriUwKIo2a1yfSDESTUYPtB8wN9FItHQLwlZFmZCsyKvEu~mZO1UOTnw8pTQO5FIome5BGnnLzV4C1OcjKbLoJCDzpD5a2CADh5VMAfbYbSvS5n6NNfaAfKk6Cr8FZtnZj6OUtg__" alt="futuristic cowboy character in armored outfit with yellow coat hat a" class="opacity-0 size-full pointer-events-none"><div class="inset-0 absolute bg-cover bg-center bg-no-repeat" style="background-image:url(&#39;https://vast-plugin-data.rg1.data.tripo3d.com/tripo-studio/20260516/8ce76088-c982-4163-a7a4-b2299afdba1b/studio_part.webp?Key-Pair-Id=K2T6H91Q55QW4F&amp;Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLnJnMS5kYXRhLnRyaXBvM2QuY29tL3RyaXBvLXN0dWRpby8yMDI2MDUxNi84Y2U3NjA4OC1jOTgyLTQxNjMtYTdhNC1iMjI5OWFmZGJhMWIvc3R1ZGlvX3BhcnQud2VicCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc3OTE0ODgwMH19fV19&amp;Signature=YMhwz-sOokHmQZHQk88JbF6ggz4GMWibjp74fKSh4FxREKYCG2bXDKGfjvpxejMsQ0EpGYWXss4HdZW0IaOYnVPH3cyFQozcg-DCck6Sq87SKJhkJeHYAD7~xpSIu5sQRQ83kNrcYQShNeeoi4~jyjY0DDzhIU4QHqC0JZCQdxDLarNKa4rvxPSOPO1X-UU6OlRNYwlm0YhyI4h7vtTyq0eT4TAuG6mQTVIF404QE7MU2kCcIIrM9zeuk-xwWnpcJ97mMJY~8P8vWMRlOAdwiRAWm-IG~Qfhw62CYqsy-Y0-FOgyIqp~1bhxLVajMkRoMeXj0LXh1JzJACS~ps3n5A__&#39;);clip-path:polygon(0 0, 0 0, 0 0, 0 0);"></div><div class="inset-0 absolute bg-cover bg-center bg-no-repeat" style="background-image:url(&#39;https://vast-plugin-data.rg1.data.tripo3d.com/tripo-studio/20260516/47849d75-a7dc-46f2-b7a5-5995d2e00f71/studio_mesh.webp?Key-Pair-Id=K2T6H91Q55QW4F&amp;Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLnJnMS5kYXRhLnRyaXBvM2QuY29tL3RyaXBvLXN0dWRpby8yMDI2MDUxNi80Nzg0OWQ3NS1hN2RjLTQ2ZjItYjdhNS01OTk1ZDJlMDBmNzEvc3R1ZGlvX21lc2gud2VicCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc3OTE0ODgwMH19fV19&amp;Signature=yNpBHRliddT7Aiov7XdWgbFB77A4ctrsRFwOxBKBlP35fYNljH8OkhIjBWmsvQNZmLoxGwScFeYfCc8zfGakrIXNe4QBLgNt1WoZjDDY0LjlbpE35jc5a8Qez8DyMZX17lbvNxWecp9fenvQmJAm3DY87jRCkQJD6pl0oOHrAXO4Qgrfvp~GOdvWsZq5~HfsmSn0VghfLlHqRqoBriUwKIo2a1yfSDESTUYPtB8wN9FItHQLwlZFmZCsyKvEu~mZO1UOTnw8pTQO5FIome5BGnnLzV4C1OcjKbLoJCDzpD5a2CADh5VMAfbYbSvS5n6NNfaAfKk6Cr8FZtnZj6OUtg__&#39;);clip-path:polygon(0 0, 100% 0, 100% 100%, 0 100%);"></div></a><!----><!--[--><!--[--><!--[--><button class="p-2 rounded-3 transition left-2 top-2 absolute hover:bg-white-5" id="reka-popover-trigger-v-0-0-18" type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls data-state="closed"><!--[--><div class="i-tripo:info-open v-mid size-5"><!--[--><!--]--></div><!--]--></button><!--v-if--><!--]--><!--]--><!--]--><button class="opacity-0 group-hover:opacity-100 max-md:opacity-100 p-2 rounded-3 transition right-2 top-2 absolute hover:bg-white-5"><div class="i-tripo:favorite v-mid size-5"><!--[--><!--]--></div></button><div class="pl-2 pr-3 flex h-8 w-full items-center bottom-2 justify-between absolute"><div class="flex gap-2 items-center"><img alt="" src="https://vast-plugin-data-public.rg1.data.tripo3d.com/tripo-studio/20260306/a7697495-77ba-4756-9e3d-b986846a1fbc/input.webp?Key-Pair-Id=K2T6H91Q55QW4F&amp;Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLXB1YmxpYy5yZzEuZGF0YS50cmlwbzNkLmNvbS90cmlwby1zdHVkaW8vMjAyNjAzMDYvYTc2OTc0OTUtNzdiYS00NzU2LTllM2QtYjk4Njg0NmExZmJjL2lucHV0LndlYnA~Zm9ybWF0PXdlYnBcdTAwMjZ3aWR0aD0xMjUiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3NzkxNDg4MDB9fX1dfQ__&amp;Signature=ijwfK9ExWTsYiEAZ86bsLNqrj5ljOeBzEEoDwvx5VdbA10YFlNusUnnDDpe0mPQoKyeT0vUmiLYyXH6iB8ceH48EogCKvvK~87o4eqzoBGc7FyXpljGc4m9Ek0lo7HSXqK2zSe5NSjbqvsh98qT1cLWan2TY~E43RDKhOYnwekn4~58V6NR5AZROOofkF4~8J77Xb0RIUBTNAkTHFahsRMqbO1DH~W7wqfyOMM5kJBmwi7IRaE79UUgWKRLw8POYMmDG95U7MtTUYJK98LvUDdp2NPOPg63as9EPNR-ens6WTR3qPbwDqFfWNIvfvl6UHRF~IuozNhilxYd1Xwvusg__&amp;format=webp&amp;width=125" class="rounded-full size-7 object-cover"><p class="text-3 max-w-38 truncate">Anonymous1772436997</p></div><button class="flex gap-1 items-center"><div class="i-tripo:like v-mid size-5"><!--[--><!--]--></div><p class="text-3">5</p></button></div><!----></div><!----><!--]--><!--[--><div style="width:0px;" class="group rounded-5 bg-black-40 w-full aspect-3/4 cursor-pointer relative overflow-hidden"><a style="--clip-position:0%;" class="rounded-5 size-full block relative overflow-hidden"><img src="https://vast-plugin-data.rg1.data.tripo3d.com/tripo-studio/20260516/36b11817-66aa-413d-ad3a-053aa948ba2b/studio_mesh.webp?Key-Pair-Id=K2T6H91Q55QW4F&amp;Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLnJnMS5kYXRhLnRyaXBvM2QuY29tL3RyaXBvLXN0dWRpby8yMDI2MDUxNi8zNmIxMTgxNy02NmFhLTQxM2QtYWQzYS0wNTNhYTk0OGJhMmIvc3R1ZGlvX21lc2gud2VicCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc3OTE0ODgwMH19fV19&amp;Signature=pHBc7QHJwc2qrC1URm1UP1NWn7k73dQbU2bp3VXY4Zlt-KgRgvDKZ~EMYTXoe-8xcmziv66oAyFdd2q9VKuev~Df4dd~0FyrsUJHad8VMPq87xXqJet6a~urHBXgLEOgnj07ELI0oQKUMTTNrFwBcNTbhIbIG460c1jfE~An4YoExSx4pMZaVwIkGsTfjLykyawl0OxQZanmg3o6FT0S0WEIaOkUD-ESv1ntwHUmIclx4GzXBMOmWqmxBevr28vwhUGafxPmaj9VRS7bWujcqw93KBfFDPWlKQy-GWzWWm6wzfEQWCqf5Bv4~jQylyGl~RcwNWKbIjdSUVqzZRQ6CA__" alt class="opacity-0 size-full pointer-events-none"><div class="inset-0 absolute bg-cover bg-center bg-no-repeat" style="background-image:url(&#39;https://vast-plugin-data.rg1.data.tripo3d.com/tripo-studio/20250805/e0882191-4272-4dac-9d4b-a69d8aacfbe8/studio_mesh_gray.webp?Key-Pair-Id=K2T6H91Q55QW4F&amp;Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLnJnMS5kYXRhLnRyaXBvM2QuY29tL3RyaXBvLXN0dWRpby8yMDI1MDgwNS9lMDg4MjE5MS00MjcyLTRkYWMtOWQ0Yi1hNjlkOGFhY2ZiZTgvc3R1ZGlvX21lc2hfZ3JheS53ZWJwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzc5MTQ4ODAwfX19XX0_&amp;Signature=x04d1V56e1PTuSQ6mYs9MyTFSwEg-nZDirVb6ORLIJ7BOpxqxhLxv8vnjxDUBCvk5ID~6fsSmmPs-7m8lVLJBcDJDA-jjDEXwXcr2c5LCROfd4v9DYyiSRDnID5AlNQ4zA8KySM6gz8Hig3tj35cn0ZiobbsSvBwLYBrRHs7bVtYIQ64pdMCr3ZyFs5dDsqGNdDzpM25RppvUisfKXKSJRcXvjU1yfH57ci~2umInq1ynn~bEU7JRo3efx2zEYHfswgDSn0hMuX6hD3Q-n2Y4mUVlA5c-P4N5t3GpG~gV7~Pr7qwyRu5VQoSihVh7Ik~vEVLxxPvN0GFdN5HKRJGqg__&#39;);clip-path:polygon(0 0, 0 0, 0 0, 0 0);"></div><div class="inset-0 absolute bg-cover bg-center bg-no-repeat" style="background-image:url(&#39;https://vast-plugin-data.rg1.data.tripo3d.com/tripo-studio/20260516/36b11817-66aa-413d-ad3a-053aa948ba2b/studio_mesh.webp?Key-Pair-Id=K2T6H91Q55QW4F&amp;Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLnJnMS5kYXRhLnRyaXBvM2QuY29tL3RyaXBvLXN0dWRpby8yMDI2MDUxNi8zNmIxMTgxNy02NmFhLTQxM2QtYWQzYS0wNTNhYTk0OGJhMmIvc3R1ZGlvX21lc2gud2VicCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc3OTE0ODgwMH19fV19&amp;Signature=pHBc7QHJwc2qrC1URm1UP1NWn7k73dQbU2bp3VXY4Zlt-KgRgvDKZ~EMYTXoe-8xcmziv66oAyFdd2q9VKuev~Df4dd~0FyrsUJHad8VMPq87xXqJet6a~urHBXgLEOgnj07ELI0oQKUMTTNrFwBcNTbhIbIG460c1jfE~An4YoExSx4pMZaVwIkGsTfjLykyawl0OxQZanmg3o6FT0S0WEIaOkUD-ESv1ntwHUmIclx4GzXBMOmWqmxBevr28vwhUGafxPmaj9VRS7bWujcqw93KBfFDPWlKQy-GWzWWm6wzfEQWCqf5Bv4~jQylyGl~RcwNWKbIjdSUVqzZRQ6CA__&#39;);clip-path:polygon(0 0, 100% 0, 100% 100%, 0 100%);"></div></a><!----><!--[--><!--[--><!--[--><button class="p-2 rounded-3 transition left-2 top-2 absolute hover:bg-white-5" id="reka-popover-trigger-v-0-0-19" type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls data-state="closed"><!--[--><div class="i-tripo:info-open v-mid size-5"><!--[--><!--]--></div><!--]--></button><!--v-if--><!--]--><!--]--><!--]--><button class="opacity-0 group-hover:opacity-100 max-md:opacity-100 p-2 rounded-3 transition right-2 top-2 absolute hover:bg-white-5"><div class="i-tripo:favorite v-mid size-5"><!--[--><!--]--></div></button><div class="pl-2 pr-3 flex h-8 w-full items-center bottom-2 justify-between absolute"><div class="flex gap-2 items-center"><img alt="" src="https://staticassets.tripo3d.ai/studio/default-avatar.jpeg" class="rounded-full size-7 object-cover"><p class="text-3 max-w-38 truncate">Anonymous</p></div><button class="flex gap-1 items-center"><div class="i-tripo:like v-mid size-5"><!--[--><!--]--></div><p class="text-3">7</p></button></div><!----></div><!----><!--]--><!--[--><!----><div style="width:0px;" class="group rounded-5 bg-black-40 w-full aspect-3/4 cursor-pointer relative overflow-hidden"><a href="/collection/diverse-sector-9-e9eba594-4d37-409c-9226-186d99b66de4" class="rounded-5 flex size-full justify-center relative bg-cover bg-center bg-no-repeat"><img src="https://vast-plugin-data.rg1.data.tripo3d.com/tripo-studio-collection/e9eba594-4d37-409c-9226-186d99b66de4/image%20%2818%29.png?Key-Pair-Id=K2T6H91Q55QW4F&amp;Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLnJnMS5kYXRhLnRyaXBvM2QuY29tL3RyaXBvLXN0dWRpby1jb2xsZWN0aW9uL2U5ZWJhNTk0LTRkMzctNDA5Yy05MjI2LTE4NmQ5OWI2NmRlNC9pbWFnZSUyMCUyODE4JTI5LnBuZyIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc3OTE0ODgwMH19fV19&amp;Signature=qtE0TKWELhrljlG9URs8SW3Bctzs1zQbwbO0a-dpL2h8~qWjj3e5kDbgKJftPe6QinKrSRLZumpFJ30drDg4ogZrp4B-fqKxRBxSd~FmwU2C1osQspPmfgzVl2ZRDUVfQcDfzCpI~gKXcRMTNJPMvKbZu-Bmck3GOaPGFYhTEfEdwn1fTTPT22SqfgIGfxLaofiWzd5w-g93w28J9jUsGvaRO7HXBjHXiCcuFKOYIh8YrAjeEscy38gz22tmSCnknOSRBUN1t448ilyysR2Xk6K~5H6dYdVZV4iKAbkwIUlH6IdKm3GDo8fnssckYjPdzhrfgOxNaLGTt1S543dZsA__" alt="Diverse Sector 9" class="size-full inset-0 absolute object-cover"><div class="text-5.5 c-white font-700 bottom-17.5 absolute">Diverse Sector 9</div><div class="text-3 font-500 px-4 py-2 rounded-25 bg-purple-1 w-fit bottom-5 absolute">View Collection</div></a></div><!--]--><!--[--><div style="width:0px;" class="group rounded-5 bg-black-40 w-full aspect-3/4 cursor-pointer relative overflow-hidden"><a style="--clip-position:0%;" class="rounded-5 size-full block relative overflow-hidden"><img src="https://vast-plugin-data.rg1.data.tripo3d.com/tripo-studio/20250729/31bec87d-0be6-497b-9d0b-b10794d3c5dd/studio_mesh.webp?Key-Pair-Id=K2T6H91Q55QW4F&amp;Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLnJnMS5kYXRhLnRyaXBvM2QuY29tL3RyaXBvLXN0dWRpby8yMDI1MDcyOS8zMWJlYzg3ZC0wYmU2LTQ5N2ItOWQwYi1iMTA3OTRkM2M1ZGQvc3R1ZGlvX21lc2gud2VicCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc3OTE0ODgwMH19fV19&amp;Signature=RVObzftPe3EAMYVMhzOtvzclFwQAutjRxDba8BTq2xAKWUlAVL6ItAhbR6~xnTpBsCc40~45GnCWAtPvWfEJtKv5T5HLOtmCJyPlK3OkzMxHaR2XUC1y6ZIK~x3QHVq472Uuyl8ZYvdpSRtXPrEmfiGk1z7sfTQG4od2MKg7LpcvlNpVFLFNUzp3aOOaMH3cOghJOmJl1MBTbiKwlXbrcQb9NyI4OCJTxs0vDRpGwm~38~fhsIi~nycJY7kla9xB6gHOYZaidhIXgsQStGyYi-4A-KAp7uWx0yd1ABXirRPYrIc3GLsNLqUB5Mrk~m3ZH7NPhk-cZV3aUXWW07gQmA__" alt class="opacity-0 size-full pointer-events-none"><div class="inset-0 absolute bg-cover bg-center bg-no-repeat" style="background-image:url(&#39;https://vast-plugin-data.rg1.data.tripo3d.com/tripo-studio/20250729/31bec87d-0be6-497b-9d0b-b10794d3c5dd/studio_mesh_gray.webp?Key-Pair-Id=K2T6H91Q55QW4F&amp;Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLnJnMS5kYXRhLnRyaXBvM2QuY29tL3RyaXBvLXN0dWRpby8yMDI1MDcyOS8zMWJlYzg3ZC0wYmU2LTQ5N2ItOWQwYi1iMTA3OTRkM2M1ZGQvc3R1ZGlvX21lc2hfZ3JheS53ZWJwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzc5MTQ4ODAwfX19XX0_&amp;Signature=BPrRnzLR1C~TGYQYhVWSRY2ascT-HctmCLRZigKN7OsTZWLLz~gEBJiEHMg-qxq~gXKkYRN3a3XQuMCRXWYN1Uw2vme~9WVmzAuMlIWGbtePpnZxLbqQCkMoYGwMItUcHDJL3A1qYbMO-MDXetLJh-m1M3c7VqNYTB317ex4wJsGWRPRB8pnOF~oGoFOXsB2ZMWsOx6nihcIfdgamxBI0Vt0ixFpjEkatNWTdRlB-UUeklkIQIbFoqP6fKDsbiF7hTldd3ShkDj1~hhXcqBFX9aZ-hrqE6NnnQm9-BEY6dbVwYjGVFNlLtUBwZUitQTgVDDXv28KqdhxBdo1NJRxrA__&#39;);clip-path:polygon(0 0, 0 0, 0 0, 0 0);"></div><div class="inset-0 absolute bg-cover bg-center bg-no-repeat" style="background-image:url(&#39;https://vast-plugin-data.rg1.data.tripo3d.com/tripo-studio/20250729/31bec87d-0be6-497b-9d0b-b10794d3c5dd/studio_mesh.webp?Key-Pair-Id=K2T6H91Q55QW4F&amp;Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLnJnMS5kYXRhLnRyaXBvM2QuY29tL3RyaXBvLXN0dWRpby8yMDI1MDcyOS8zMWJlYzg3ZC0wYmU2LTQ5N2ItOWQwYi1iMTA3OTRkM2M1ZGQvc3R1ZGlvX21lc2gud2VicCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc3OTE0ODgwMH19fV19&amp;Signature=RVObzftPe3EAMYVMhzOtvzclFwQAutjRxDba8BTq2xAKWUlAVL6ItAhbR6~xnTpBsCc40~45GnCWAtPvWfEJtKv5T5HLOtmCJyPlK3OkzMxHaR2XUC1y6ZIK~x3QHVq472Uuyl8ZYvdpSRtXPrEmfiGk1z7sfTQG4od2MKg7LpcvlNpVFLFNUzp3aOOaMH3cOghJOmJl1MBTbiKwlXbrcQb9NyI4OCJTxs0vDRpGwm~38~fhsIi~nycJY7kla9xB6gHOYZaidhIXgsQStGyYi-4A-KAp7uWx0yd1ABXirRPYrIc3GLsNLqUB5Mrk~m3ZH7NPhk-cZV3aUXWW07gQmA__&#39;);clip-path:polygon(0 0, 100% 0, 100% 100%, 0 100%);"></div></a><!----><!--[--><!--[--><!--[--><button class="p-2 rounded-3 transition left-2 top-2 absolute hover:bg-white-5" id="reka-popover-trigger-v-0-0-20" type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls data-state="closed"><!--[--><div class="i-tripo:info-open v-mid size-5"><!--[--><!--]--></div><!--]--></button><!--v-if--><!--]--><!--]--><!--]--><button class="opacity-0 group-hover:opacity-100 max-md:opacity-100 p-2 rounded-3 transition right-2 top-2 absolute hover:bg-white-5"><div class="i-tripo:favorite v-mid size-5"><!--[--><!--]--></div></button><div class="pl-2 pr-3 flex h-8 w-full items-center bottom-2 justify-between absolute"><div class="flex gap-2 items-center"><img alt="" src="https://staticassets.tripo3d.ai/studio/default-avatar.jpeg" class="rounded-full size-7 object-cover"><p class="text-3 max-w-38 truncate">Anonymous</p></div><button class="flex gap-1 items-center"><div class="i-tripo:like v-mid size-5"><!--[--><!--]--></div><p class="text-3">1</p></button></div><!----></div><!----><!--]--><!--[--><div style="width:0px;" class="group rounded-5 bg-black-40 w-full aspect-3/4 cursor-pointer relative overflow-hidden"><a style="--clip-position:0%;" class="rounded-5 size-full block relative overflow-hidden"><img src="https://vast-plugin-data.rg1.data.tripo3d.com/tripo-studio/20250522/a808a0fa-58c3-41a4-a050-4c541d6fbdd2/studio_mesh.webp?Key-Pair-Id=K2T6H91Q55QW4F&amp;Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLnJnMS5kYXRhLnRyaXBvM2QuY29tL3RyaXBvLXN0dWRpby8yMDI1MDUyMi9hODA4YTBmYS01OGMzLTQxYTQtYTA1MC00YzU0MWQ2ZmJkZDIvc3R1ZGlvX21lc2gud2VicCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc3OTE0ODgwMH19fV19&amp;Signature=RU~3N0Z05-6e-6nQbsnvEtloIYy~TdRemIASeBe2q3J4eC9pTQS07TyfUOTUAfr1hsMb8~Asd6CPLSw43yqdjWoZBcgsCk6BztO4F2K6tnqiUi~YJ5c4-MB13Oa0PJ1UsbgYnGogV5Vo~G5jwHTgwlLhxmH6DqOcH5qW76SSWoaNtgw0MZo6uXE9TpqoyUHfmtmuwqJ091gSbQdZfNiR5xhOn7TXCXBlMZFFEUrqP-eRH05F5JFb-nGPnIRFfpA4hdVd9pF1ftNfcTGxw4AGu9C9d3kWQaG7III6sNdTsIGqkl-9wTMitidRBSYwg-Yk1aU2r7lY5ynphWX29HMhGA__" alt class="opacity-0 size-full pointer-events-none"><div class="inset-0 absolute bg-cover bg-center bg-no-repeat" style="background-image:url(&#39;https://vast-plugin-data.rg1.data.tripo3d.com/tripo-studio/20250522/fcc7bc32-4506-4858-93d6-ff09312077be/studio_part.webp?Key-Pair-Id=K2T6H91Q55QW4F&amp;Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLnJnMS5kYXRhLnRyaXBvM2QuY29tL3RyaXBvLXN0dWRpby8yMDI1MDUyMi9mY2M3YmMzMi00NTA2LTQ4NTgtOTNkNi1mZjA5MzEyMDc3YmUvc3R1ZGlvX3BhcnQud2VicCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc3OTE0ODgwMH19fV19&amp;Signature=UqAKzvFsoe52fQlT9Vjmzqol6p8srAGLNCnOkBu5hNyAH~X-p1XwQxVDU6rtrNydVabadi4piRwhH1dgbj3WP8TthOCqLUuZ2C-fC2Nxsw61WU9nWzs1WcPakPwQ2QrLEKPJZIbfuCNAsp3ot2xnaPXLVUIdIFWigJCph8z9tfTaZeUTpr2kWdSJ8rjcEpe1mmdoUjPxoHTKu2HR5yQDmlrMwS4Or5Ol4JNGqZ-uzUc6jgmy8OwZmYvk6vx3~9aWhh9-BOlMkiIZFQdqRos1DtiNzAHIhtxWQ-3SKZ-lwkcXI0AzJyOHagWBZwmFe7xuDqrj1KfVWteAtxOY9BHqFg__&#39;);clip-path:polygon(0 0, 0 0, 0 0, 0 0);"></div><div class="inset-0 absolute bg-cover bg-center bg-no-repeat" style="background-image:url(&#39;https://vast-plugin-data.rg1.data.tripo3d.com/tripo-studio/20250522/a808a0fa-58c3-41a4-a050-4c541d6fbdd2/studio_mesh.webp?Key-Pair-Id=K2T6H91Q55QW4F&amp;Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLnJnMS5kYXRhLnRyaXBvM2QuY29tL3RyaXBvLXN0dWRpby8yMDI1MDUyMi9hODA4YTBmYS01OGMzLTQxYTQtYTA1MC00YzU0MWQ2ZmJkZDIvc3R1ZGlvX21lc2gud2VicCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc3OTE0ODgwMH19fV19&amp;Signature=RU~3N0Z05-6e-6nQbsnvEtloIYy~TdRemIASeBe2q3J4eC9pTQS07TyfUOTUAfr1hsMb8~Asd6CPLSw43yqdjWoZBcgsCk6BztO4F2K6tnqiUi~YJ5c4-MB13Oa0PJ1UsbgYnGogV5Vo~G5jwHTgwlLhxmH6DqOcH5qW76SSWoaNtgw0MZo6uXE9TpqoyUHfmtmuwqJ091gSbQdZfNiR5xhOn7TXCXBlMZFFEUrqP-eRH05F5JFb-nGPnIRFfpA4hdVd9pF1ftNfcTGxw4AGu9C9d3kWQaG7III6sNdTsIGqkl-9wTMitidRBSYwg-Yk1aU2r7lY5ynphWX29HMhGA__&#39;);clip-path:polygon(0 0, 100% 0, 100% 100%, 0 100%);"></div></a><!----><!--[--><!--[--><!--[--><button class="p-2 rounded-3 transition left-2 top-2 absolute hover:bg-white-5" id="reka-popover-trigger-v-0-0-21" type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls data-state="closed"><!--[--><div class="i-tripo:info-open v-mid size-5"><!--[--><!--]--></div><!--]--></button><!--v-if--><!--]--><!--]--><!--]--><button class="opacity-0 group-hover:opacity-100 max-md:opacity-100 p-2 rounded-3 transition right-2 top-2 absolute hover:bg-white-5"><div class="i-tripo:favorite v-mid size-5"><!--[--><!--]--></div></button><div class="pl-2 pr-3 flex h-8 w-full items-center bottom-2 justify-between absolute"><div class="flex gap-2 items-center"><img alt="" src="https://vast-plugin-data-public.rg1.data.tripo3d.com/tcli_6440f7102dab48c8bc26ca7882df997b/20250520/a98991ab-d60b-4780-a5ce-d2917b36bdba/input.jpg?Key-Pair-Id=K2T6H91Q55QW4F&amp;Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLXB1YmxpYy5yZzEuZGF0YS50cmlwbzNkLmNvbS90Y2xpXzY0NDBmNzEwMmRhYjQ4YzhiYzI2Y2E3ODgyZGY5OTdiLzIwMjUwNTIwL2E5ODk5MWFiLWQ2MGItNDc4MC1hNWNlLWQyOTE3YjM2YmRiYS9pbnB1dC5qcGc~Zm9ybWF0PXdlYnBcdTAwMjZ3aWR0aD0xMjUiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3NzkxNDg4MDB9fX1dfQ__&amp;Signature=Vpzmb8YBNOmKIhGLQc6xJY4VbKvrtslBc9Rz0DfS-1UcAMD2mkn~k2o8f1uGAWlSP862PpfA7~f41stAqyeiPTt997uq-~xJYsyWnk0ZPD0CdnGXiE-Vm5vFszljAGd1xPa71YFRecT729GjZ1rFxIWKG2c4lqLRFbHNWp3dxKcJMrkt2KsRVM96L70VqVYa3TByoNKimOLQbfqTlIkWMH5gArE0V-kxUa8NXH364YUgKRwpUA01iteK~csNSLEed1JTf0DkvanVsUJzHQYu5nxdhetVZ9-0kZZmOX-YRhUF9-LM8jf-ufrzl~nNh2tzI9kxVBRDWDoPcEPu4h~2Vg__&amp;format=webp&amp;width=125" class="rounded-full size-7 object-cover"><p class="text-3 max-w-38 truncate">Roxie LI</p></div><button class="flex gap-1 items-center"><div class="i-tripo:like v-mid size-5"><!--[--><!--]--></div><p class="text-3">4</p></button></div><!----></div><!----><!--]--><!--[--><div style="width:0px;" class="group rounded-5 bg-black-40 w-full aspect-3/4 cursor-pointer relative overflow-hidden"><a style="--clip-position:0%;" class="rounded-5 size-full block relative overflow-hidden"><img src="https://vast-plugin-data.rg1.data.tripo3d.com/tripo-studio/20250522/da0329e8-25fc-4cdb-9289-423c234b4e6d/studio_mesh.webp?Key-Pair-Id=K2T6H91Q55QW4F&amp;Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLnJnMS5kYXRhLnRyaXBvM2QuY29tL3RyaXBvLXN0dWRpby8yMDI1MDUyMi9kYTAzMjllOC0yNWZjLTRjZGItOTI4OS00MjNjMjM0YjRlNmQvc3R1ZGlvX21lc2gud2VicCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc3OTE0ODgwMH19fV19&amp;Signature=grMBgXoveGpvgLgRM48dt5JJEJ8rJB5Fy7nyYf8UAuKTLoAEa1esY6sLC~TzGsLaM5Oygjvd5aAY3XXf1grhAocenJu2Vzibpi9-2WvnnntJ2z7n094YX1Uii1GLaEy4iXXmVSejfRQ1~FwY0GJYyX9mcJCfnAL0ylYWXbU2Whp2vuPL99kJuVt4WggFZ27aDvdA6A~pTt0mUrKcSsPO9croJt1Dzj4TVb3aK2tsEUipPHpFBDByf8H~PdY0vd0-tPDG82L3g34DeGaYsV~dfg7uKsvesM-WL9uJRyzQRKS758h07rxmshL6HAtsI~d3DOrAEaAGYdIum9smOBhTLg__" alt class="opacity-0 size-full pointer-events-none"><div class="inset-0 absolute bg-cover bg-center bg-no-repeat" style="background-image:url(&#39;https://vast-plugin-data.rg1.data.tripo3d.com/tripo-studio/20250522/a81e1959-84ed-4de8-83db-9c7835c2549d/studio_part.webp?Key-Pair-Id=K2T6H91Q55QW4F&amp;Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLnJnMS5kYXRhLnRyaXBvM2QuY29tL3RyaXBvLXN0dWRpby8yMDI1MDUyMi9hODFlMTk1OS04NGVkLTRkZTgtODNkYi05Yzc4MzVjMjU0OWQvc3R1ZGlvX3BhcnQud2VicCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc3OTE0ODgwMH19fV19&amp;Signature=I7kkE-sJ1bNCvFvm2GFGQHyJowC1Qnx-RYDseYbVml2pTP2d5VEfTzFS6ydGlIBKY5PPxSLx4swxAP2PT~Is9luP30aWvjNP4xCWKugnC~Z~9A60M3qeZcYz0-Id8jJ2w1I-llqu10ofZwbvKSHnxVM7baxFmySaJ47AfkDHoOxj-6BmJdUqo5xELjhynyHCvnmD2FVUx2lXxOP29PifAMBziD0OH82hf-OWa0hFBSxi1PtpafAsPMuTM33snwYjR0wEUuSxAP7Hzun-tuJB3n5xj0mS4pZwXprWeWCW6xSm3sklbPhuASTWBke-n6oBjApoCBiUnfFY5SszxNxpCA__&#39;);clip-path:polygon(0 0, 0 0, 0 0, 0 0);"></div><div class="inset-0 absolute bg-cover bg-center bg-no-repeat" style="background-image:url(&#39;https://vast-plugin-data.rg1.data.tripo3d.com/tripo-studio/20250522/da0329e8-25fc-4cdb-9289-423c234b4e6d/studio_mesh.webp?Key-Pair-Id=K2T6H91Q55QW4F&amp;Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLnJnMS5kYXRhLnRyaXBvM2QuY29tL3RyaXBvLXN0dWRpby8yMDI1MDUyMi9kYTAzMjllOC0yNWZjLTRjZGItOTI4OS00MjNjMjM0YjRlNmQvc3R1ZGlvX21lc2gud2VicCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc3OTE0ODgwMH19fV19&amp;Signature=grMBgXoveGpvgLgRM48dt5JJEJ8rJB5Fy7nyYf8UAuKTLoAEa1esY6sLC~TzGsLaM5Oygjvd5aAY3XXf1grhAocenJu2Vzibpi9-2WvnnntJ2z7n094YX1Uii1GLaEy4iXXmVSejfRQ1~FwY0GJYyX9mcJCfnAL0ylYWXbU2Whp2vuPL99kJuVt4WggFZ27aDvdA6A~pTt0mUrKcSsPO9croJt1Dzj4TVb3aK2tsEUipPHpFBDByf8H~PdY0vd0-tPDG82L3g34DeGaYsV~dfg7uKsvesM-WL9uJRyzQRKS758h07rxmshL6HAtsI~d3DOrAEaAGYdIum9smOBhTLg__&#39;);clip-path:polygon(0 0, 100% 0, 100% 100%, 0 100%);"></div></a><!----><!--[--><!--[--><!--[--><button class="p-2 rounded-3 transition left-2 top-2 absolute hover:bg-white-5" id="reka-popover-trigger-v-0-0-22" type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls data-state="closed"><!--[--><div class="i-tripo:info-open v-mid size-5"><!--[--><!--]--></div><!--]--></button><!--v-if--><!--]--><!--]--><!--]--><button class="opacity-0 group-hover:opacity-100 max-md:opacity-100 p-2 rounded-3 transition right-2 top-2 absolute hover:bg-white-5"><div class="i-tripo:favorite v-mid size-5"><!--[--><!--]--></div></button><div class="pl-2 pr-3 flex h-8 w-full items-center bottom-2 justify-between absolute"><div class="flex gap-2 items-center"><img alt="" src="https://vast-plugin-data-public.rg1.data.tripo3d.com/tcli_6440f7102dab48c8bc26ca7882df997b/20250520/a98991ab-d60b-4780-a5ce-d2917b36bdba/input.jpg?Key-Pair-Id=K2T6H91Q55QW4F&amp;Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLXB1YmxpYy5yZzEuZGF0YS50cmlwbzNkLmNvbS90Y2xpXzY0NDBmNzEwMmRhYjQ4YzhiYzI2Y2E3ODgyZGY5OTdiLzIwMjUwNTIwL2E5ODk5MWFiLWQ2MGItNDc4MC1hNWNlLWQyOTE3YjM2YmRiYS9pbnB1dC5qcGc~Zm9ybWF0PXdlYnBcdTAwMjZ3aWR0aD0xMjUiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3NzkxNDg4MDB9fX1dfQ__&amp;Signature=Vpzmb8YBNOmKIhGLQc6xJY4VbKvrtslBc9Rz0DfS-1UcAMD2mkn~k2o8f1uGAWlSP862PpfA7~f41stAqyeiPTt997uq-~xJYsyWnk0ZPD0CdnGXiE-Vm5vFszljAGd1xPa71YFRecT729GjZ1rFxIWKG2c4lqLRFbHNWp3dxKcJMrkt2KsRVM96L70VqVYa3TByoNKimOLQbfqTlIkWMH5gArE0V-kxUa8NXH364YUgKRwpUA01iteK~csNSLEed1JTf0DkvanVsUJzHQYu5nxdhetVZ9-0kZZmOX-YRhUF9-LM8jf-ufrzl~nNh2tzI9kxVBRDWDoPcEPu4h~2Vg__&amp;format=webp&amp;width=125" class="rounded-full size-7 object-cover"><p class="text-3 max-w-38 truncate">Roxie LI</p></div><button class="flex gap-1 items-center"><div class="i-tripo:like v-mid size-5"><!--[--><!--]--></div><p class="text-3">6</p></button></div><!----></div><!----><!--]--><!--[--><div style="width:0px;" class="group rounded-5 bg-black-40 w-full aspect-3/4 cursor-pointer relative overflow-hidden"><a style="--clip-position:0%;" class="rounded-5 size-full block relative overflow-hidden"><img src="https://vast-plugin-data.rg1.data.tripo3d.com/tripo-studio/20250704/fb874c6e-5d8e-4b21-8aaf-88e8aa53a1a7/studio_mesh.webp?Key-Pair-Id=K2T6H91Q55QW4F&amp;Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLnJnMS5kYXRhLnRyaXBvM2QuY29tL3RyaXBvLXN0dWRpby8yMDI1MDcwNC9mYjg3NGM2ZS01ZDhlLTRiMjEtOGFhZi04OGU4YWE1M2ExYTcvc3R1ZGlvX21lc2gud2VicCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc3OTE0ODgwMH19fV19&amp;Signature=v9t9AhsMGKVLP6GpYmEZrVWAZHKPdoxT6EVtJgJ5xP7bU1efs~Yb17cPo8nPNFJugKpKl~v~hx6CNOUHzQUCd2wVFXBsCXG-oJk0IBeViBjPrY~IMYkQQVPSMfqg743Atu72d7OuOWbUG2F90prbai9PHnMpZs76SEINqE~isNugnnz367dFTqVcVodPDYzPf6KAVDuGCDQFFgrffwnkA6E6qo3sepMRIMgAIGD1yEcw8yE-FBIygNcUECcSu63Sy~maBnfNR4qbLAYHeMGhypG-Cd4h~bRCtAl25PvdIvyTzLk2jN-Tfb8MMYtj9za0tqvDMvgwSpBMQYxYvfTbNw__" alt class="opacity-0 size-full pointer-events-none"><div class="inset-0 absolute bg-cover bg-center bg-no-repeat" style="background-image:url(&#39;https://vast-plugin-data.rg1.data.tripo3d.com/tripo-studio/20250704/fb874c6e-5d8e-4b21-8aaf-88e8aa53a1a7/studio_mesh_gray.webp?Key-Pair-Id=K2T6H91Q55QW4F&amp;Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLnJnMS5kYXRhLnRyaXBvM2QuY29tL3RyaXBvLXN0dWRpby8yMDI1MDcwNC9mYjg3NGM2ZS01ZDhlLTRiMjEtOGFhZi04OGU4YWE1M2ExYTcvc3R1ZGlvX21lc2hfZ3JheS53ZWJwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzc5MTQ4ODAwfX19XX0_&amp;Signature=IW443pwEvvmtKRRSgLxDcYoio54xBFe28bSVACG-GZ3kY1uKI5utXxgL921i84iMb4fLY7O4QRmcswOtt-EN78eiJRlQ6sPeaO1yuN8ADxawwqjJIFmFS7AtlynnRf7wu1ls2doU5IrUjV4udpZmQWZa-JsbxPajqxTHdRZBfUTAyV1pz5sRG7V1KMsQFBnihpfxe0YPRlx15NnP1p3Cd2iQuk~cMg5~gb0KWZ6qBA-Y~nyPPdsZGtQkBU0PLODr6mDmC-WO44fJwkMh3XMvVuzK6JZR5xV85LZfFFcR6Pg1frTY5Ynetj0lMOHSy-vqq8K9PVs9xjGDokKnLmPfJQ__&#39;);clip-path:polygon(0 0, 0 0, 0 0, 0 0);"></div><div class="inset-0 absolute bg-cover bg-center bg-no-repeat" style="background-image:url(&#39;https://vast-plugin-data.rg1.data.tripo3d.com/tripo-studio/20250704/fb874c6e-5d8e-4b21-8aaf-88e8aa53a1a7/studio_mesh.webp?Key-Pair-Id=K2T6H91Q55QW4F&amp;Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLnJnMS5kYXRhLnRyaXBvM2QuY29tL3RyaXBvLXN0dWRpby8yMDI1MDcwNC9mYjg3NGM2ZS01ZDhlLTRiMjEtOGFhZi04OGU4YWE1M2ExYTcvc3R1ZGlvX21lc2gud2VicCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc3OTE0ODgwMH19fV19&amp;Signature=v9t9AhsMGKVLP6GpYmEZrVWAZHKPdoxT6EVtJgJ5xP7bU1efs~Yb17cPo8nPNFJugKpKl~v~hx6CNOUHzQUCd2wVFXBsCXG-oJk0IBeViBjPrY~IMYkQQVPSMfqg743Atu72d7OuOWbUG2F90prbai9PHnMpZs76SEINqE~isNugnnz367dFTqVcVodPDYzPf6KAVDuGCDQFFgrffwnkA6E6qo3sepMRIMgAIGD1yEcw8yE-FBIygNcUECcSu63Sy~maBnfNR4qbLAYHeMGhypG-Cd4h~bRCtAl25PvdIvyTzLk2jN-Tfb8MMYtj9za0tqvDMvgwSpBMQYxYvfTbNw__&#39;);clip-path:polygon(0 0, 100% 0, 100% 100%, 0 100%);"></div></a><!----><!--[--><!--[--><!--[--><button class="p-2 rounded-3 transition left-2 top-2 absolute hover:bg-white-5" id="reka-popover-trigger-v-0-0-23" type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls data-state="closed"><!--[--><div class="i-tripo:info-open v-mid size-5"><!--[--><!--]--></div><!--]--></button><!--v-if--><!--]--><!--]--><!--]--><button class="opacity-0 group-hover:opacity-100 max-md:opacity-100 p-2 rounded-3 transition right-2 top-2 absolute hover:bg-white-5"><div class="i-tripo:favorite v-mid size-5"><!--[--><!--]--></div></button><div class="pl-2 pr-3 flex h-8 w-full items-center bottom-2 justify-between absolute"><div class="flex gap-2 items-center"><img alt="" src="https://vast-plugin-data-public.rg1.data.tripo3d.com/tcli_6440f7102dab48c8bc26ca7882df997b/20241206/cc08a424-6996-46c3-b4df-85bbf43efbbe/input.jpeg?Key-Pair-Id=K2T6H91Q55QW4F&amp;Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLXB1YmxpYy5yZzEuZGF0YS50cmlwbzNkLmNvbS90Y2xpXzY0NDBmNzEwMmRhYjQ4YzhiYzI2Y2E3ODgyZGY5OTdiLzIwMjQxMjA2L2NjMDhhNDI0LTY5OTYtNDZjMy1iNGRmLTg1YmJmNDNlZmJiZS9pbnB1dC5qcGVnP2Zvcm1hdD13ZWJwXHUwMDI2d2lkdGg9MTI1IiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzc5MTQ4ODAwfX19XX0_&amp;Signature=k4TUf-z-nBxfq~LVS4fGyLLjnK81kuRnrwjAhj4K2yA9Li8fZNhnvcRsn1ju48HHQtyfKwF-ha8AFufsCAaYdMSQ8geE5CI~fk~uagtLOnyiN9sRNN7d-ZlUjFdJTPt8NOrIY4lUO2MtGA~AGWaRcMrZpEOJa4mAuF-QZXZFlwpptJyNorb-wkzm1rzy7RYWtJzr05~b8dYPdW2Pce-c4uLH9mAnSccPX~-108VfCDDmTA07dwvKO-fc8liGQSKORmWMSuE0tq9Wf-gkgttTeyNCZWD0grcdW9LlbEZ9UaPNlcZvUgirIRY6956WxJJPzfE1-R60XkfrzN1Cq2hmSQ__&amp;format=webp&amp;width=125" class="rounded-full size-7 object-cover"><p class="text-3 max-w-38 truncate">Yi Song </p></div><button class="flex gap-1 items-center"><div class="i-tripo:like v-mid size-5"><!--[--><!--]--></div><p class="text-3">3</p></button></div><!----></div><!----><!--]--><!--[--><div style="width:0px;" class="group rounded-5 bg-black-40 w-full aspect-3/4 cursor-pointer relative overflow-hidden"><a style="--clip-position:0%;" class="rounded-5 size-full block relative overflow-hidden"><img src="https://vast-plugin-data.rg1.data.tripo3d.com/tripo-studio/20260516/c5e1ae7f-ab7d-4ebf-96f2-8d833deb4f11/studio_mesh.webp?Key-Pair-Id=K2T6H91Q55QW4F&amp;Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLnJnMS5kYXRhLnRyaXBvM2QuY29tL3RyaXBvLXN0dWRpby8yMDI2MDUxNi9jNWUxYWU3Zi1hYjdkLTRlYmYtOTZmMi04ZDgzM2RlYjRmMTEvc3R1ZGlvX21lc2gud2VicCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc3OTE0ODgwMH19fV19&amp;Signature=ob~O3djeL5sxjye2VJFOj8pLtD6gV5a4Wmi9yURJwKNyVUPdy6cw7gUCe8JduEqNlalrORGKFx-VcML~OIsL0e8gOImR9ueG4DglPGN6csDLUR2mxnXaDAcufrDVTYcgGztT8kxEMW1brvzWx2JoCx8BR9Yj9cTAy-h7ufaU9DOkxo99MQ6T2SYUjTZjqaSPAGjpgSciCGQPlsoKpPDts7-DajA0upVYNQyNuUw-l1ePJrnNuSYMXeyCdD5WsluRNnF3bAcTsfP1LkhRXmkjk0Dd0lqZ3JUJJAhwkHG0oRPm5VaYhoa60e9FpqXFdXrJOqQAOOaTnbKr~Lwj1LIFzA__" alt class="opacity-0 size-full pointer-events-none"><div class="inset-0 absolute bg-cover bg-center bg-no-repeat" style="background-image:url(&#39;https://vast-plugin-data.rg1.data.tripo3d.com/tripo-studio/20250520/14e99d5d-e7a3-4058-85a0-9dc568f2e3d1/studio_part.webp?Key-Pair-Id=K2T6H91Q55QW4F&amp;Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLnJnMS5kYXRhLnRyaXBvM2QuY29tL3RyaXBvLXN0dWRpby8yMDI1MDUyMC8xNGU5OWQ1ZC1lN2EzLTQwNTgtODVhMC05ZGM1NjhmMmUzZDEvc3R1ZGlvX3BhcnQud2VicCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc3OTE0ODgwMH19fV19&amp;Signature=jY~6Omjw4QE9PHV5FjGpSZSCE~8QTsnM0zkOXyjLzgZc6oxTMq4olikTtz3rz6knGpD8rQ8CJv8NXvSVObi2C8neIYwlSE0DsEkRBlYXFlYKegnta0t3hiUrl8tJDWmKNFUqSuj28BLF~Ft3Shi4JDPYlrDSoszMwJVWHecU-cE8mrJ0h9rYjXNkgtuxtjZjlwHNcFivcQ9bYTtrhUN0lmZGakKKhfE2-2Mnr2iRDdtvn6GjzV-Pl4r2LXIs~siKeXeSy7R9vnChKkvjht5vDM9BdpoTPB2wqEHQcktOYUnkp4DCg53PFidMV5PO8MOt1UZuSvdenoduR90gZSmsOA__&#39;);clip-path:polygon(0 0, 0 0, 0 0, 0 0);"></div><div class="inset-0 absolute bg-cover bg-center bg-no-repeat" style="background-image:url(&#39;https://vast-plugin-data.rg1.data.tripo3d.com/tripo-studio/20260516/c5e1ae7f-ab7d-4ebf-96f2-8d833deb4f11/studio_mesh.webp?Key-Pair-Id=K2T6H91Q55QW4F&amp;Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLnJnMS5kYXRhLnRyaXBvM2QuY29tL3RyaXBvLXN0dWRpby8yMDI2MDUxNi9jNWUxYWU3Zi1hYjdkLTRlYmYtOTZmMi04ZDgzM2RlYjRmMTEvc3R1ZGlvX21lc2gud2VicCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc3OTE0ODgwMH19fV19&amp;Signature=ob~O3djeL5sxjye2VJFOj8pLtD6gV5a4Wmi9yURJwKNyVUPdy6cw7gUCe8JduEqNlalrORGKFx-VcML~OIsL0e8gOImR9ueG4DglPGN6csDLUR2mxnXaDAcufrDVTYcgGztT8kxEMW1brvzWx2JoCx8BR9Yj9cTAy-h7ufaU9DOkxo99MQ6T2SYUjTZjqaSPAGjpgSciCGQPlsoKpPDts7-DajA0upVYNQyNuUw-l1ePJrnNuSYMXeyCdD5WsluRNnF3bAcTsfP1LkhRXmkjk0Dd0lqZ3JUJJAhwkHG0oRPm5VaYhoa60e9FpqXFdXrJOqQAOOaTnbKr~Lwj1LIFzA__&#39;);clip-path:polygon(0 0, 100% 0, 100% 100%, 0 100%);"></div></a><!----><!--[--><!--[--><!--[--><button class="p-2 rounded-3 transition left-2 top-2 absolute hover:bg-white-5" id="reka-popover-trigger-v-0-0-24" type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls data-state="closed"><!--[--><div class="i-tripo:info-open v-mid size-5"><!--[--><!--]--></div><!--]--></button><!--v-if--><!--]--><!--]--><!--]--><button class="opacity-0 group-hover:opacity-100 max-md:opacity-100 p-2 rounded-3 transition right-2 top-2 absolute hover:bg-white-5"><div class="i-tripo:favorite v-mid size-5"><!--[--><!--]--></div></button><div class="pl-2 pr-3 flex h-8 w-full items-center bottom-2 justify-between absolute"><div class="flex gap-2 items-center"><img alt="" src="https://vast-plugin-data-public.rg1.data.tripo3d.com/tcli_6440f7102dab48c8bc26ca7882df997b/20250522/1b9284ca-cc8d-4788-989f-f22adc390457/input.jpeg?Key-Pair-Id=K2T6H91Q55QW4F&amp;Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLXB1YmxpYy5yZzEuZGF0YS50cmlwbzNkLmNvbS90Y2xpXzY0NDBmNzEwMmRhYjQ4YzhiYzI2Y2E3ODgyZGY5OTdiLzIwMjUwNTIyLzFiOTI4NGNhLWNjOGQtNDc4OC05ODlmLWYyMmFkYzM5MDQ1Ny9pbnB1dC5qcGVnP2Zvcm1hdD13ZWJwXHUwMDI2d2lkdGg9MTI1IiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzc5MTQ4ODAwfX19XX0_&amp;Signature=KzlwEV7pWKkp~0cEI5iuh6z8KfgX6yE-4WZbn8~9FStYXIpe~6-jR6iIyYcI~qxSbFFZp55QZrAAUtkosgboBqgLt1TkMH-Talnz8VbQY7zeL-mMdx4JOL3wWIzIXFbMt8DNMaCd24JLdftmQ2voePsIdxjNNhO8cMdBQgH9MXjCF2Ee78vF8JsZrNTVS3LJCANp3x71wWFk20dgqhwy2CZgSI-QKcDSXR7hpbi7Snuulu06EHHi0quSL8~hDITuqFNrJukS9Z2ZFvWVEjMbc-5dCtbxcwZaqcVI1ZABnyvOUHoyrgZdgbrrG1q6O45zPcXJRdN~JqKcyi2GI59oIA__&amp;format=webp&amp;width=125" class="rounded-full size-7 object-cover"><p class="text-3 max-w-38 truncate">MYTYPE</p></div><button class="flex gap-1 items-center"><div class="i-tripo:like v-mid size-5"><!--[--><!--]--></div><p class="text-3">2</p></button></div><!----></div><!----><!--]--><!--[--><div style="width:0px;" class="group rounded-5 bg-black-40 w-full aspect-3/4 cursor-pointer relative overflow-hidden"><a style="--clip-position:0%;" class="rounded-5 size-full block relative overflow-hidden"><img src="https://vast-plugin-data.rg1.data.tripo3d.com/tripo-studio/20250520/593187c7-b9ea-402e-b1a8-a6124aab1f47/studio_mesh.webp?Key-Pair-Id=K2T6H91Q55QW4F&amp;Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLnJnMS5kYXRhLnRyaXBvM2QuY29tL3RyaXBvLXN0dWRpby8yMDI1MDUyMC81OTMxODdjNy1iOWVhLTQwMmUtYjFhOC1hNjEyNGFhYjFmNDcvc3R1ZGlvX21lc2gud2VicCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc3OTE0ODgwMH19fV19&amp;Signature=pGnaTkt63kSChaH3e8appMIM0nxJk4x9xjti5V4SboXI9k2BcRVd1xyH5yLL7L2uhRpljTbOf2aPfQYHRrPKXZVRuQVyBDXU7PewXKNIF7FpwTonLbnUBDNLgchpDqoeeZZpGYOjdyQSvMAIABAXfjcvLTUzCyB3zH550TNb~wwgZI-SaqtajBGvNPbNTApqo63DxFX9yw7D1jRUyoSdalr7gvWJA3Qnq2JzTuQlaoekw-Xi3iNegX~Nhjj88VqJmRy5eeY6h-5fQQjS0RUnI7tEjNNHVUzEMELXq-CCzGSHJM3VgeEPlT-JIbU8IJKzPdLGMtvVd3v4OpWQ3wBhyw__" alt class="opacity-0 size-full pointer-events-none"><div class="inset-0 absolute bg-cover bg-center bg-no-repeat" style="background-image:url(&#39;https://vast-plugin-data.rg1.data.tripo3d.com/tripo-studio/20250520/b0db5514-472d-41d4-866b-61fb43f633d6/studio_part.webp?Key-Pair-Id=K2T6H91Q55QW4F&amp;Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLnJnMS5kYXRhLnRyaXBvM2QuY29tL3RyaXBvLXN0dWRpby8yMDI1MDUyMC9iMGRiNTUxNC00NzJkLTQxZDQtODY2Yi02MWZiNDNmNjMzZDYvc3R1ZGlvX3BhcnQud2VicCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc3OTE0ODgwMH19fV19&amp;Signature=tiDwmpmViJr24cIbZmTsJ0XXQNJnhaMt8uJ2AU78h0nYfLGkk-aX1johputrx96ZbFaaUPL-9r1bTlcDCQ~sTpRJ4snC5ZH3gvpnDMuT3XWJn4jC-DO5akPf~XxooWR8Igqa2~ALU~Uiw0PMAb9r488P2n46dwIcnEILnaxj~sEouG93WbPxAH3lzOQDfWjDxA3cMObjZNPdLeVhtjBwjUa3-05Yig8kZ0s2qBqHwniVJEmxKlku7J2FaTwzwBSzomhwYLKAv3hOMuJgw9BpFEwWOu7Fd6HPPgLWFRmzg9qfIoK6X26j2TsDuF6BXm1mDjTG6qKeK-vwN86nzPnMSw__&#39;);clip-path:polygon(0 0, 0 0, 0 0, 0 0);"></div><div class="inset-0 absolute bg-cover bg-center bg-no-repeat" style="background-image:url(&#39;https://vast-plugin-data.rg1.data.tripo3d.com/tripo-studio/20250520/593187c7-b9ea-402e-b1a8-a6124aab1f47/studio_mesh.webp?Key-Pair-Id=K2T6H91Q55QW4F&amp;Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLnJnMS5kYXRhLnRyaXBvM2QuY29tL3RyaXBvLXN0dWRpby8yMDI1MDUyMC81OTMxODdjNy1iOWVhLTQwMmUtYjFhOC1hNjEyNGFhYjFmNDcvc3R1ZGlvX21lc2gud2VicCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc3OTE0ODgwMH19fV19&amp;Signature=pGnaTkt63kSChaH3e8appMIM0nxJk4x9xjti5V4SboXI9k2BcRVd1xyH5yLL7L2uhRpljTbOf2aPfQYHRrPKXZVRuQVyBDXU7PewXKNIF7FpwTonLbnUBDNLgchpDqoeeZZpGYOjdyQSvMAIABAXfjcvLTUzCyB3zH550TNb~wwgZI-SaqtajBGvNPbNTApqo63DxFX9yw7D1jRUyoSdalr7gvWJA3Qnq2JzTuQlaoekw-Xi3iNegX~Nhjj88VqJmRy5eeY6h-5fQQjS0RUnI7tEjNNHVUzEMELXq-CCzGSHJM3VgeEPlT-JIbU8IJKzPdLGMtvVd3v4OpWQ3wBhyw__&#39;);clip-path:polygon(0 0, 100% 0, 100% 100%, 0 100%);"></div></a><!----><!--[--><!--[--><!--[--><button class="p-2 rounded-3 transition left-2 top-2 absolute hover:bg-white-5" id="reka-popover-trigger-v-0-0-25" type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls data-state="closed"><!--[--><div class="i-tripo:info-open v-mid size-5"><!--[--><!--]--></div><!--]--></button><!--v-if--><!--]--><!--]--><!--]--><button class="opacity-0 group-hover:opacity-100 max-md:opacity-100 p-2 rounded-3 transition right-2 top-2 absolute hover:bg-white-5"><div class="i-tripo:favorite v-mid size-5"><!--[--><!--]--></div></button><div class="pl-2 pr-3 flex h-8 w-full items-center bottom-2 justify-between absolute"><div class="flex gap-2 items-center"><img alt="" src="https://vast-plugin-data-public.rg1.data.tripo3d.com/tcli_6440f7102dab48c8bc26ca7882df997b/20250522/1b9284ca-cc8d-4788-989f-f22adc390457/input.jpeg?Key-Pair-Id=K2T6H91Q55QW4F&amp;Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLXB1YmxpYy5yZzEuZGF0YS50cmlwbzNkLmNvbS90Y2xpXzY0NDBmNzEwMmRhYjQ4YzhiYzI2Y2E3ODgyZGY5OTdiLzIwMjUwNTIyLzFiOTI4NGNhLWNjOGQtNDc4OC05ODlmLWYyMmFkYzM5MDQ1Ny9pbnB1dC5qcGVnP2Zvcm1hdD13ZWJwXHUwMDI2d2lkdGg9MTI1IiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzc5MTQ4ODAwfX19XX0_&amp;Signature=KzlwEV7pWKkp~0cEI5iuh6z8KfgX6yE-4WZbn8~9FStYXIpe~6-jR6iIyYcI~qxSbFFZp55QZrAAUtkosgboBqgLt1TkMH-Talnz8VbQY7zeL-mMdx4JOL3wWIzIXFbMt8DNMaCd24JLdftmQ2voePsIdxjNNhO8cMdBQgH9MXjCF2Ee78vF8JsZrNTVS3LJCANp3x71wWFk20dgqhwy2CZgSI-QKcDSXR7hpbi7Snuulu06EHHi0quSL8~hDITuqFNrJukS9Z2ZFvWVEjMbc-5dCtbxcwZaqcVI1ZABnyvOUHoyrgZdgbrrG1q6O45zPcXJRdN~JqKcyi2GI59oIA__&amp;format=webp&amp;width=125" class="rounded-full size-7 object-cover"><p class="text-3 max-w-38 truncate">MYTYPE</p></div><button class="flex gap-1 items-center"><div class="i-tripo:like v-mid size-5"><!--[--><!--]--></div><p class="text-3">0</p></button></div><!----></div><!----><!--]--><!--[--><!----><div style="width:0px;" class="group rounded-5 bg-black-40 w-full aspect-3/4 cursor-pointer relative overflow-hidden"><a href="/collection/3d%E6%A8%A1%E5%9E%8B%E7%B2%BE%E9%80%89%E9%9B%86-603ac872-d884-42e1-8986-cdc123168f87" class="rounded-5 flex size-full justify-center relative bg-cover bg-center bg-no-repeat"><img src="https://vast-plugin-data.rg1.data.tripo3d.com/tripo-studio/20250509/d36494c1-dc00-4f10-8db8-9d7c13a8ffd3/studio.webp?Key-Pair-Id=K2T6H91Q55QW4F&amp;Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLnJnMS5kYXRhLnRyaXBvM2QuY29tL3RyaXBvLXN0dWRpby8yMDI1MDUwOS9kMzY0OTRjMS1kYzAwLTRmMTAtOGRiOC05ZDdjMTNhOGZmZDMvc3R1ZGlvLndlYnAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3NzkxNDg4MDB9fX1dfQ__&amp;Signature=xDoPRvuRbXTsEDAOeSt~GEbedXPTUY-G-4lP-OfgfMU2yV09gKna4dJKE7B654u2BOq8ypJ~BN~U~cd0qcGRI25io1Yk0cfsVkUD8RLPwm1qjHkIHPCBR0zCRxx3x1qcFQoR7G~8c3G4eNOJkd3HARnfkhobizz6LNUZWOKvubUswB2JBLeufY30If-~g2yNUTnG-Se2dXTW5iQUy8aaDgLdHdjQ5nF5wIaNR5~mlFARsfXC5xDu~76LzEMH4JwrSGMu6cLe0D3cSGOWFkglTW9zRvSeBhzJO-u7EEL0uwFlF9ujWKRxy~oZJaB9K47I~l3FJh4apBxttfhdgSM3lA__" alt="3D模型精选集" class="size-full inset-0 absolute object-cover"><div class="text-5.5 c-white font-700 bottom-17.5 absolute">3D模型精选集</div><div class="text-3 font-500 px-4 py-2 rounded-25 bg-purple-1 w-fit bottom-5 absolute">View Collection</div></a></div><!--]--><!--[--><div style="width:0px;" class="group rounded-5 bg-black-40 w-full aspect-3/4 cursor-pointer relative overflow-hidden"><a style="--clip-position:0%;" class="rounded-5 size-full block relative overflow-hidden"><img src="https://vast-plugin-data.rg1.data.tripo3d.com/tripo-studio/20250725/995d7a08-ce85-46a0-8220-6b246973d28c/studio_wireframe.webp?Key-Pair-Id=K2T6H91Q55QW4F&amp;Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLnJnMS5kYXRhLnRyaXBvM2QuY29tL3RyaXBvLXN0dWRpby8yMDI1MDcyNS85OTVkN2EwOC1jZTg1LTQ2YTAtODIyMC02YjI0Njk3M2QyOGMvc3R1ZGlvX3dpcmVmcmFtZS53ZWJwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzc5MTQ4ODAwfX19XX0_&amp;Signature=rAszojx18h08ysFYk7~QkXT0riDp9AA2HJxs8ZEpTn~XB7iUTp8fMNQtNcc7sebqtasWEWdxp3e-b8HRMdzLdvzIxmm2g2BLzY5I4O-3FObX3s7T4L1pj4Ycwt6Wd0fMAcsV-sifCtcgMPLNAgN6iPCzsgxQnLDjIjbUE02mrZF5ytYLADwtagHGShdxJAACTMKtlL6pY55GrqDbbeJH7gg3ni~9wvytyJMULBsNfAnG8vY1Lmc~TDJuNjKm7~B7qfnoXA0lnPASO8Ge5s1SjyLmIfDMF6X7TXGPiwiOBkVnbkErBz5NAHC47I5FmfsjYmOBDXkzVux6xjbd4-Nvig__" alt class="opacity-0 size-full pointer-events-none"><div class="inset-0 absolute bg-cover bg-center bg-no-repeat" style="background-image:url(&#39;https://vast-plugin-data.rg1.data.tripo3d.com/tripo-studio/20250725/995d7a08-ce85-46a0-8220-6b246973d28c/studio_wireframe.webp?Key-Pair-Id=K2T6H91Q55QW4F&amp;Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLnJnMS5kYXRhLnRyaXBvM2QuY29tL3RyaXBvLXN0dWRpby8yMDI1MDcyNS85OTVkN2EwOC1jZTg1LTQ2YTAtODIyMC02YjI0Njk3M2QyOGMvc3R1ZGlvX3dpcmVmcmFtZS53ZWJwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzc5MTQ4ODAwfX19XX0_&amp;Signature=rAszojx18h08ysFYk7~QkXT0riDp9AA2HJxs8ZEpTn~XB7iUTp8fMNQtNcc7sebqtasWEWdxp3e-b8HRMdzLdvzIxmm2g2BLzY5I4O-3FObX3s7T4L1pj4Ycwt6Wd0fMAcsV-sifCtcgMPLNAgN6iPCzsgxQnLDjIjbUE02mrZF5ytYLADwtagHGShdxJAACTMKtlL6pY55GrqDbbeJH7gg3ni~9wvytyJMULBsNfAnG8vY1Lmc~TDJuNjKm7~B7qfnoXA0lnPASO8Ge5s1SjyLmIfDMF6X7TXGPiwiOBkVnbkErBz5NAHC47I5FmfsjYmOBDXkzVux6xjbd4-Nvig__&#39;);clip-path:polygon(0 0, 0 0, 0 0, 0 0);"></div><div class="inset-0 absolute bg-cover bg-center bg-no-repeat" style="background-image:url(&#39;https://vast-plugin-data.rg1.data.tripo3d.com/tripo-studio/20250725/995d7a08-ce85-46a0-8220-6b246973d28c/studio_wireframe.webp?Key-Pair-Id=K2T6H91Q55QW4F&amp;Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLnJnMS5kYXRhLnRyaXBvM2QuY29tL3RyaXBvLXN0dWRpby8yMDI1MDcyNS85OTVkN2EwOC1jZTg1LTQ2YTAtODIyMC02YjI0Njk3M2QyOGMvc3R1ZGlvX3dpcmVmcmFtZS53ZWJwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzc5MTQ4ODAwfX19XX0_&amp;Signature=rAszojx18h08ysFYk7~QkXT0riDp9AA2HJxs8ZEpTn~XB7iUTp8fMNQtNcc7sebqtasWEWdxp3e-b8HRMdzLdvzIxmm2g2BLzY5I4O-3FObX3s7T4L1pj4Ycwt6Wd0fMAcsV-sifCtcgMPLNAgN6iPCzsgxQnLDjIjbUE02mrZF5ytYLADwtagHGShdxJAACTMKtlL6pY55GrqDbbeJH7gg3ni~9wvytyJMULBsNfAnG8vY1Lmc~TDJuNjKm7~B7qfnoXA0lnPASO8Ge5s1SjyLmIfDMF6X7TXGPiwiOBkVnbkErBz5NAHC47I5FmfsjYmOBDXkzVux6xjbd4-Nvig__&#39;);clip-path:polygon(0 0, 100% 0, 100% 100%, 0 100%);"></div></a><!----><!--[--><!--[--><!--[--><button class="p-2 rounded-3 transition left-2 top-2 absolute hover:bg-white-5" id="reka-popover-trigger-v-0-0-26" type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls data-state="closed"><!--[--><div class="i-tripo:info-open v-mid size-5"><!--[--><!--]--></div><!--]--></button><!--v-if--><!--]--><!--]--><!--]--><button class="opacity-0 group-hover:opacity-100 max-md:opacity-100 p-2 rounded-3 transition right-2 top-2 absolute hover:bg-white-5"><div class="i-tripo:favorite v-mid size-5"><!--[--><!--]--></div></button><div class="pl-2 pr-3 flex h-8 w-full items-center bottom-2 justify-between absolute"><div class="flex gap-2 items-center"><img alt="" src="https://vast-plugin-data-public.rg1.data.tripo3d.com/tcli_6440f7102dab48c8bc26ca7882df997b/20250326/e0d33138-1f4a-476f-98b1-e2fdd5275185/input.webp?Key-Pair-Id=K2T6H91Q55QW4F&amp;Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLXB1YmxpYy5yZzEuZGF0YS50cmlwbzNkLmNvbS90Y2xpXzY0NDBmNzEwMmRhYjQ4YzhiYzI2Y2E3ODgyZGY5OTdiLzIwMjUwMzI2L2UwZDMzMTM4LTFmNGEtNDc2Zi05OGIxLWUyZmRkNTI3NTE4NS9pbnB1dC53ZWJwP2Zvcm1hdD13ZWJwXHUwMDI2d2lkdGg9MTI1IiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzc5MTQ4ODAwfX19XX0_&amp;Signature=HUVnElHnQSz5-c4WnlNVSEoF3MFb5Zxt7JWsZWhMolp0n90A6L1xQPOP5d6Gsp63jndmimNQXB3HPlxszZ-4OKz1NVUN5BUWsqrP5A248kCBWbYObODHXlnOTWylKfvBnKFeDWGobgBH7-DgcYmh-RH4Rz7MpXQ0Or5iPeAViiUWni8~1SCYFXI7KWIA88MGt9w4vqnnzl06eNxcC5iZ9QEunvdzrX1mlHSpF4jDX4apgpC9VTBQnYQ9I4nnTSWHjEqXc72z82TP70l98A8UE9OrBy7GlMbsvEgZ1EWJWH1QT7F8qTX~wDB~2WErSTkdSgCvKBzWJYoudI05U8AjsA__&amp;format=webp&amp;width=125" class="rounded-full size-7 object-cover"><p class="text-3 max-w-38 truncate">Anonymous1735206895</p></div><button class="flex gap-1 items-center"><div class="i-tripo:like v-mid size-5"><!--[--><!--]--></div><p class="text-3">1</p></button></div><!----></div><!----><!--]--><!--[--><div style="width:0px;" class="group rounded-5 bg-black-40 w-full aspect-3/4 cursor-pointer relative overflow-hidden"><a style="--clip-position:0%;" class="rounded-5 size-full block relative overflow-hidden"><img src="https://vast-plugin-data.rg1.data.tripo3d.com/tripo-studio/20250725/6bf1df55-7447-4b99-9fee-c3ad9e63e6f0/studio_part.webp?Key-Pair-Id=K2T6H91Q55QW4F&amp;Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLnJnMS5kYXRhLnRyaXBvM2QuY29tL3RyaXBvLXN0dWRpby8yMDI1MDcyNS82YmYxZGY1NS03NDQ3LTRiOTktOWZlZS1jM2FkOWU2M2U2ZjAvc3R1ZGlvX3BhcnQud2VicCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc3OTE0ODgwMH19fV19&amp;Signature=kmDpEuG7twrKgsE9LGW25y1iHLGsGCIjWX7MD4CRO38GwCRDif1R4xWVJNPMkRxXiMy3iiL-r5WzLOfKO5-lz84vW7kXgwMSVgiJLan7cEmRI2WzUjT92VW59iqRghuz~rjr5tKXL3q5kPL~urUVhmj2aFXfb5UWcjscwnLzVgaX1UX14BTpmBy7G4-CJwlvy3-AeSw11PZeJzlLXDAZhk~D79WGk-~dfFJ2GpksA7aLqcQf6qXxeJZVnCIp1XleqS4rZ8J585lAoqbb4sc~86Qj9X9vWPy1yJ0Ut4675W8Z3L1DRCBQHUsnu37M2jdQfamo0dodz~rahmdVE7qSvA__" alt class="opacity-0 size-full pointer-events-none"><div class="inset-0 absolute bg-cover bg-center bg-no-repeat" style="background-image:url(&#39;https://vast-plugin-data.rg1.data.tripo3d.com/tripo-studio/20250725/6bf1df55-7447-4b99-9fee-c3ad9e63e6f0/studio_part.webp?Key-Pair-Id=K2T6H91Q55QW4F&amp;Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLnJnMS5kYXRhLnRyaXBvM2QuY29tL3RyaXBvLXN0dWRpby8yMDI1MDcyNS82YmYxZGY1NS03NDQ3LTRiOTktOWZlZS1jM2FkOWU2M2U2ZjAvc3R1ZGlvX3BhcnQud2VicCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc3OTE0ODgwMH19fV19&amp;Signature=kmDpEuG7twrKgsE9LGW25y1iHLGsGCIjWX7MD4CRO38GwCRDif1R4xWVJNPMkRxXiMy3iiL-r5WzLOfKO5-lz84vW7kXgwMSVgiJLan7cEmRI2WzUjT92VW59iqRghuz~rjr5tKXL3q5kPL~urUVhmj2aFXfb5UWcjscwnLzVgaX1UX14BTpmBy7G4-CJwlvy3-AeSw11PZeJzlLXDAZhk~D79WGk-~dfFJ2GpksA7aLqcQf6qXxeJZVnCIp1XleqS4rZ8J585lAoqbb4sc~86Qj9X9vWPy1yJ0Ut4675W8Z3L1DRCBQHUsnu37M2jdQfamo0dodz~rahmdVE7qSvA__&#39;);clip-path:polygon(0 0, 0 0, 0 0, 0 0);"></div><div class="inset-0 absolute bg-cover bg-center bg-no-repeat" style="background-image:url(&#39;https://vast-plugin-data.rg1.data.tripo3d.com/tripo-studio/20250725/6bf1df55-7447-4b99-9fee-c3ad9e63e6f0/studio_part.webp?Key-Pair-Id=K2T6H91Q55QW4F&amp;Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLnJnMS5kYXRhLnRyaXBvM2QuY29tL3RyaXBvLXN0dWRpby8yMDI1MDcyNS82YmYxZGY1NS03NDQ3LTRiOTktOWZlZS1jM2FkOWU2M2U2ZjAvc3R1ZGlvX3BhcnQud2VicCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc3OTE0ODgwMH19fV19&amp;Signature=kmDpEuG7twrKgsE9LGW25y1iHLGsGCIjWX7MD4CRO38GwCRDif1R4xWVJNPMkRxXiMy3iiL-r5WzLOfKO5-lz84vW7kXgwMSVgiJLan7cEmRI2WzUjT92VW59iqRghuz~rjr5tKXL3q5kPL~urUVhmj2aFXfb5UWcjscwnLzVgaX1UX14BTpmBy7G4-CJwlvy3-AeSw11PZeJzlLXDAZhk~D79WGk-~dfFJ2GpksA7aLqcQf6qXxeJZVnCIp1XleqS4rZ8J585lAoqbb4sc~86Qj9X9vWPy1yJ0Ut4675W8Z3L1DRCBQHUsnu37M2jdQfamo0dodz~rahmdVE7qSvA__&#39;);clip-path:polygon(0 0, 100% 0, 100% 100%, 0 100%);"></div></a><!----><!--[--><!--[--><!--[--><button class="p-2 rounded-3 transition left-2 top-2 absolute hover:bg-white-5" id="reka-popover-trigger-v-0-0-27" type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls data-state="closed"><!--[--><div class="i-tripo:info-open v-mid size-5"><!--[--><!--]--></div><!--]--></button><!--v-if--><!--]--><!--]--><!--]--><button class="opacity-0 group-hover:opacity-100 max-md:opacity-100 p-2 rounded-3 transition right-2 top-2 absolute hover:bg-white-5"><div class="i-tripo:favorite v-mid size-5"><!--[--><!--]--></div></button><div class="pl-2 pr-3 flex h-8 w-full items-center bottom-2 justify-between absolute"><div class="flex gap-2 items-center"><img alt="" src="https://vast-plugin-data-public.rg1.data.tripo3d.com/tcli_6440f7102dab48c8bc26ca7882df997b/20250326/e0d33138-1f4a-476f-98b1-e2fdd5275185/input.webp?Key-Pair-Id=K2T6H91Q55QW4F&amp;Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLXB1YmxpYy5yZzEuZGF0YS50cmlwbzNkLmNvbS90Y2xpXzY0NDBmNzEwMmRhYjQ4YzhiYzI2Y2E3ODgyZGY5OTdiLzIwMjUwMzI2L2UwZDMzMTM4LTFmNGEtNDc2Zi05OGIxLWUyZmRkNTI3NTE4NS9pbnB1dC53ZWJwP2Zvcm1hdD13ZWJwXHUwMDI2d2lkdGg9MTI1IiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzc5MTQ4ODAwfX19XX0_&amp;Signature=HUVnElHnQSz5-c4WnlNVSEoF3MFb5Zxt7JWsZWhMolp0n90A6L1xQPOP5d6Gsp63jndmimNQXB3HPlxszZ-4OKz1NVUN5BUWsqrP5A248kCBWbYObODHXlnOTWylKfvBnKFeDWGobgBH7-DgcYmh-RH4Rz7MpXQ0Or5iPeAViiUWni8~1SCYFXI7KWIA88MGt9w4vqnnzl06eNxcC5iZ9QEunvdzrX1mlHSpF4jDX4apgpC9VTBQnYQ9I4nnTSWHjEqXc72z82TP70l98A8UE9OrBy7GlMbsvEgZ1EWJWH1QT7F8qTX~wDB~2WErSTkdSgCvKBzWJYoudI05U8AjsA__&amp;format=webp&amp;width=125" class="rounded-full size-7 object-cover"><p class="text-3 max-w-38 truncate">Anonymous1735206895</p></div><button class="flex gap-1 items-center"><div class="i-tripo:like v-mid size-5"><!--[--><!--]--></div><p class="text-3">0</p></button></div><!----></div><!----><!--]--><!--[--><div style="width:0px;" class="group rounded-5 bg-black-40 w-full aspect-3/4 cursor-pointer relative overflow-hidden"><a style="--clip-position:0%;" class="rounded-5 size-full block relative overflow-hidden"><img src="https://vast-plugin-data.rg1.data.tripo3d.com/tripo-studio/20250522/7470a3bd-4c95-4c95-9352-c259305f3c1e/studio_mesh.webp?Key-Pair-Id=K2T6H91Q55QW4F&amp;Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLnJnMS5kYXRhLnRyaXBvM2QuY29tL3RyaXBvLXN0dWRpby8yMDI1MDUyMi83NDcwYTNiZC00Yzk1LTRjOTUtOTM1Mi1jMjU5MzA1ZjNjMWUvc3R1ZGlvX21lc2gud2VicCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc3OTE0ODgwMH19fV19&amp;Signature=eHW09Y1UfUJxD0gqd-evEwCDqdzzWFrzRq~4Bc~a01yJnx6VTXxyc~npQDjRi34ps6LDR6tk4NtenDo222OhjpX~q4H6bv7gJt7Phi9Yn~jS5jnsHik3wN50MLUixP3SyqJ4WODOH-j7xtNiutcif0O8H9fXCMaWfL~k-CwuVMd~Ojr9LOFif0q0zKR8zX6Czubl~7R5uBUh77SKelP1OoAzX3a4mCKD9wQij~X3GIuWuMMSSdKIVL8OTCh3CPVgtfcxilQQxBvHM9EkN~V-3gccjTpLFKNx1akuT68f9vx9AzaJmUAYr9b-MQpUUMNYuyY~bJk64Afzb4QJ7R7kZQ__" alt class="opacity-0 size-full pointer-events-none"><div class="inset-0 absolute bg-cover bg-center bg-no-repeat" style="background-image:url(&#39;https://vast-plugin-data.rg1.data.tripo3d.com/tripo-studio/20250522/5e6eb658-606e-48eb-8f20-fd11d1b38a89/studio_part.webp?Key-Pair-Id=K2T6H91Q55QW4F&amp;Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLnJnMS5kYXRhLnRyaXBvM2QuY29tL3RyaXBvLXN0dWRpby8yMDI1MDUyMi81ZTZlYjY1OC02MDZlLTQ4ZWItOGYyMC1mZDExZDFiMzhhODkvc3R1ZGlvX3BhcnQud2VicCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc3OTE0ODgwMH19fV19&amp;Signature=sghJssFyxl8o2~MGiWkRX0D~PH7dZXFxlKzt0XYd-N~bm0qwWWsRuYaTGQakZxB1ymzwKaj40s850sjWSlRRZD2fGVxWJSxcO0rrhe3mGMN3pEy61ovL1eqpubK1xdosQ5t-jFNkmYf1Up6GZ66KJ8QXbGLvNY9l4yuErx4RuA9VJnWX5FWKNryGpT74zxlWFiUVA~UlVWYdG~SPi7ceRvdXlrQR6Y1prZUSpO-re49hmda6cykeht2Zx7UyPLjdFUxT~3CaAD-vNPFHK3DloYQbZ~Mqa7I9qi0pYNJx1S-M9rYRro6IMGbJvTJ-LZ3Jv4J0sMdRMey2pvGdTOTdWw__&#39;);clip-path:polygon(0 0, 0 0, 0 0, 0 0);"></div><div class="inset-0 absolute bg-cover bg-center bg-no-repeat" style="background-image:url(&#39;https://vast-plugin-data.rg1.data.tripo3d.com/tripo-studio/20250522/7470a3bd-4c95-4c95-9352-c259305f3c1e/studio_mesh.webp?Key-Pair-Id=K2T6H91Q55QW4F&amp;Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLnJnMS5kYXRhLnRyaXBvM2QuY29tL3RyaXBvLXN0dWRpby8yMDI1MDUyMi83NDcwYTNiZC00Yzk1LTRjOTUtOTM1Mi1jMjU5MzA1ZjNjMWUvc3R1ZGlvX21lc2gud2VicCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc3OTE0ODgwMH19fV19&amp;Signature=eHW09Y1UfUJxD0gqd-evEwCDqdzzWFrzRq~4Bc~a01yJnx6VTXxyc~npQDjRi34ps6LDR6tk4NtenDo222OhjpX~q4H6bv7gJt7Phi9Yn~jS5jnsHik3wN50MLUixP3SyqJ4WODOH-j7xtNiutcif0O8H9fXCMaWfL~k-CwuVMd~Ojr9LOFif0q0zKR8zX6Czubl~7R5uBUh77SKelP1OoAzX3a4mCKD9wQij~X3GIuWuMMSSdKIVL8OTCh3CPVgtfcxilQQxBvHM9EkN~V-3gccjTpLFKNx1akuT68f9vx9AzaJmUAYr9b-MQpUUMNYuyY~bJk64Afzb4QJ7R7kZQ__&#39;);clip-path:polygon(0 0, 100% 0, 100% 100%, 0 100%);"></div></a><!----><!--[--><!--[--><!--[--><button class="p-2 rounded-3 transition left-2 top-2 absolute hover:bg-white-5" id="reka-popover-trigger-v-0-0-28" type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls data-state="closed"><!--[--><div class="i-tripo:info-open v-mid size-5"><!--[--><!--]--></div><!--]--></button><!--v-if--><!--]--><!--]--><!--]--><button class="opacity-0 group-hover:opacity-100 max-md:opacity-100 p-2 rounded-3 transition right-2 top-2 absolute hover:bg-white-5"><div class="i-tripo:favorite v-mid size-5"><!--[--><!--]--></div></button><div class="pl-2 pr-3 flex h-8 w-full items-center bottom-2 justify-between absolute"><div class="flex gap-2 items-center"><img alt="" src="https://vast-plugin-data-public.rg1.data.tripo3d.com/tcli_6440f7102dab48c8bc26ca7882df997b/20250520/a98991ab-d60b-4780-a5ce-d2917b36bdba/input.jpg?Key-Pair-Id=K2T6H91Q55QW4F&amp;Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLXB1YmxpYy5yZzEuZGF0YS50cmlwbzNkLmNvbS90Y2xpXzY0NDBmNzEwMmRhYjQ4YzhiYzI2Y2E3ODgyZGY5OTdiLzIwMjUwNTIwL2E5ODk5MWFiLWQ2MGItNDc4MC1hNWNlLWQyOTE3YjM2YmRiYS9pbnB1dC5qcGc~Zm9ybWF0PXdlYnBcdTAwMjZ3aWR0aD0xMjUiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3NzkxNDg4MDB9fX1dfQ__&amp;Signature=Vpzmb8YBNOmKIhGLQc6xJY4VbKvrtslBc9Rz0DfS-1UcAMD2mkn~k2o8f1uGAWlSP862PpfA7~f41stAqyeiPTt997uq-~xJYsyWnk0ZPD0CdnGXiE-Vm5vFszljAGd1xPa71YFRecT729GjZ1rFxIWKG2c4lqLRFbHNWp3dxKcJMrkt2KsRVM96L70VqVYa3TByoNKimOLQbfqTlIkWMH5gArE0V-kxUa8NXH364YUgKRwpUA01iteK~csNSLEed1JTf0DkvanVsUJzHQYu5nxdhetVZ9-0kZZmOX-YRhUF9-LM8jf-ufrzl~nNh2tzI9kxVBRDWDoPcEPu4h~2Vg__&amp;format=webp&amp;width=125" class="rounded-full size-7 object-cover"><p class="text-3 max-w-38 truncate">Roxie LI</p></div><button class="flex gap-1 items-center"><div class="i-tripo:like v-mid size-5"><!--[--><!--]--></div><p class="text-3">3</p></button></div><!----></div><!----><!--]--><!--[--><div style="width:0px;" class="group rounded-5 bg-black-40 w-full aspect-3/4 cursor-pointer relative overflow-hidden"><a style="--clip-position:0%;" class="rounded-5 size-full block relative overflow-hidden"><img src="https://vast-plugin-data.rg1.data.tripo3d.com/tripo-studio/20250522/ebe16460-cda1-4ee4-b756-603cc55db87e/studio_mesh.webp?Key-Pair-Id=K2T6H91Q55QW4F&amp;Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLnJnMS5kYXRhLnRyaXBvM2QuY29tL3RyaXBvLXN0dWRpby8yMDI1MDUyMi9lYmUxNjQ2MC1jZGExLTRlZTQtYjc1Ni02MDNjYzU1ZGI4N2Uvc3R1ZGlvX21lc2gud2VicCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc3OTE0ODgwMH19fV19&amp;Signature=G6zhY4FA4tntlk3Ect85VTCSyh9QL-07-h5F6jPvFJd-V--Noj5YiHlRVSLsVuJKj8~6LmFfWgx0R0OavEWsPBiz6JolJB0say~yxjp5UA3j6Zb6W0g3nRThfox0Iy~GZIldx~dVcBEmAStWpOZygVQbggOyU9uc9nPABYaugSwyCxsVxh2pOzxuEoUoYgPAGPPiOvPaPmEczKN5kgsFJkgtwEjZmdVHNfmykZ4yilKxkYux6RFjoY4L8nYkYBWspz6w-dF7dhw~s774nm1GRTMJE~swm1XbrFCaC6Vohucv3UxcRWfVsvnAzVScBBeWwN2sbprYSznXpBhYDXFqmg__" alt class="opacity-0 size-full pointer-events-none"><div class="inset-0 absolute bg-cover bg-center bg-no-repeat" style="background-image:url(&#39;https://vast-plugin-data.rg1.data.tripo3d.com/tripo-studio/20250522/4e6cc562-1165-4f0b-b288-32bc6e0ff993/studio_part.webp?Key-Pair-Id=K2T6H91Q55QW4F&amp;Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLnJnMS5kYXRhLnRyaXBvM2QuY29tL3RyaXBvLXN0dWRpby8yMDI1MDUyMi80ZTZjYzU2Mi0xMTY1LTRmMGItYjI4OC0zMmJjNmUwZmY5OTMvc3R1ZGlvX3BhcnQud2VicCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc3OTE0ODgwMH19fV19&amp;Signature=ag5dVoiKS25IDpjjy0-DmUQsxfRtreYHeyPygrzfrjyZSoLf5LfGDAdWupJuJGS1XN7DzluI6iz6IfvDTDMDIqAnjJ6wnEtzSqhH9pz1LK2wHTCz7NMzHflFXQyzxP4kj8yd0XeXICxVomC5EKyT8mbllgDtyvFTjOGYfkjECYfHI~AC~I7Q5kaTJt1sRDxSg8e8a9ZvTvu6HUxGG0lBW6uW~lagX39TySumfNTaC8zSsbORcRon89gXTcdmDP~~UVwXJNXflKsTCWekPt0lB7Btlc6Vi94K53~eixDwvMeSRy0Yuo~MR6b9TEZUXHc0~f5cttj-DvxZbicVdIfLvA__&#39;);clip-path:polygon(0 0, 0 0, 0 0, 0 0);"></div><div class="inset-0 absolute bg-cover bg-center bg-no-repeat" style="background-image:url(&#39;https://vast-plugin-data.rg1.data.tripo3d.com/tripo-studio/20250522/ebe16460-cda1-4ee4-b756-603cc55db87e/studio_mesh.webp?Key-Pair-Id=K2T6H91Q55QW4F&amp;Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLnJnMS5kYXRhLnRyaXBvM2QuY29tL3RyaXBvLXN0dWRpby8yMDI1MDUyMi9lYmUxNjQ2MC1jZGExLTRlZTQtYjc1Ni02MDNjYzU1ZGI4N2Uvc3R1ZGlvX21lc2gud2VicCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc3OTE0ODgwMH19fV19&amp;Signature=G6zhY4FA4tntlk3Ect85VTCSyh9QL-07-h5F6jPvFJd-V--Noj5YiHlRVSLsVuJKj8~6LmFfWgx0R0OavEWsPBiz6JolJB0say~yxjp5UA3j6Zb6W0g3nRThfox0Iy~GZIldx~dVcBEmAStWpOZygVQbggOyU9uc9nPABYaugSwyCxsVxh2pOzxuEoUoYgPAGPPiOvPaPmEczKN5kgsFJkgtwEjZmdVHNfmykZ4yilKxkYux6RFjoY4L8nYkYBWspz6w-dF7dhw~s774nm1GRTMJE~swm1XbrFCaC6Vohucv3UxcRWfVsvnAzVScBBeWwN2sbprYSznXpBhYDXFqmg__&#39;);clip-path:polygon(0 0, 100% 0, 100% 100%, 0 100%);"></div></a><!----><!--[--><!--[--><!--[--><button class="p-2 rounded-3 transition left-2 top-2 absolute hover:bg-white-5" id="reka-popover-trigger-v-0-0-29" type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls data-state="closed"><!--[--><div class="i-tripo:info-open v-mid size-5"><!--[--><!--]--></div><!--]--></button><!--v-if--><!--]--><!--]--><!--]--><button class="opacity-0 group-hover:opacity-100 max-md:opacity-100 p-2 rounded-3 transition right-2 top-2 absolute hover:bg-white-5"><div class="i-tripo:favorite v-mid size-5"><!--[--><!--]--></div></button><div class="pl-2 pr-3 flex h-8 w-full items-center bottom-2 justify-between absolute"><div class="flex gap-2 items-center"><img alt="" src="https://vast-plugin-data-public.rg1.data.tripo3d.com/tcli_6440f7102dab48c8bc26ca7882df997b/20250520/a98991ab-d60b-4780-a5ce-d2917b36bdba/input.jpg?Key-Pair-Id=K2T6H91Q55QW4F&amp;Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLXB1YmxpYy5yZzEuZGF0YS50cmlwbzNkLmNvbS90Y2xpXzY0NDBmNzEwMmRhYjQ4YzhiYzI2Y2E3ODgyZGY5OTdiLzIwMjUwNTIwL2E5ODk5MWFiLWQ2MGItNDc4MC1hNWNlLWQyOTE3YjM2YmRiYS9pbnB1dC5qcGc~Zm9ybWF0PXdlYnBcdTAwMjZ3aWR0aD0xMjUiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3NzkxNDg4MDB9fX1dfQ__&amp;Signature=Vpzmb8YBNOmKIhGLQc6xJY4VbKvrtslBc9Rz0DfS-1UcAMD2mkn~k2o8f1uGAWlSP862PpfA7~f41stAqyeiPTt997uq-~xJYsyWnk0ZPD0CdnGXiE-Vm5vFszljAGd1xPa71YFRecT729GjZ1rFxIWKG2c4lqLRFbHNWp3dxKcJMrkt2KsRVM96L70VqVYa3TByoNKimOLQbfqTlIkWMH5gArE0V-kxUa8NXH364YUgKRwpUA01iteK~csNSLEed1JTf0DkvanVsUJzHQYu5nxdhetVZ9-0kZZmOX-YRhUF9-LM8jf-ufrzl~nNh2tzI9kxVBRDWDoPcEPu4h~2Vg__&amp;format=webp&amp;width=125" class="rounded-full size-7 object-cover"><p class="text-3 max-w-38 truncate">Roxie LI</p></div><button class="flex gap-1 items-center"><div class="i-tripo:like v-mid size-5"><!--[--><!--]--></div><p class="text-3">0</p></button></div><!----></div><!----><!--]--><!--[--><div style="width:0px;" class="group rounded-5 bg-black-40 w-full aspect-3/4 cursor-pointer relative overflow-hidden"><a style="--clip-position:0%;" class="rounded-5 size-full block relative overflow-hidden"><img src="https://vast-plugin-data.rg1.data.tripo3d.com/tripo-studio/20250522/6e195280-ffc5-467e-ba33-728e1045dace/studio_mesh.webp?Key-Pair-Id=K2T6H91Q55QW4F&amp;Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLnJnMS5kYXRhLnRyaXBvM2QuY29tL3RyaXBvLXN0dWRpby8yMDI1MDUyMi82ZTE5NTI4MC1mZmM1LTQ2N2UtYmEzMy03MjhlMTA0NWRhY2Uvc3R1ZGlvX21lc2gud2VicCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc3OTE0ODgwMH19fV19&amp;Signature=omsC4ZgEQ~wPEOJlKy-OMUU3EC~3IGDaa3IsBz47pLvceChxToHpMY630S9sNs3u~m2rFnH966Nh4FNDQ-mWxAOuBRQu2dFYxHcI12j~sloy7AHSvMu24kog-szQe7MXrUhB8bo3ZPsNea4RtxdnEjy8-o-Vh6xSuppt5bMtkc67tIARnvSw1hnQdwdeOrJ1mL-qirC2uaVtqCzZAC970YgZ2TxonrVMBlTUOjKy2cIIN6kYAeEb2BKKh5-JexzJG15mc6P6X8KxpTmBUlwr~RhQRLQATwmDtTE8NGGyD76gcsAgDTiRRhjYIy3UFLMYqyvyybiVK8Lx1OPUlDzHhg__" alt class="opacity-0 size-full pointer-events-none"><div class="inset-0 absolute bg-cover bg-center bg-no-repeat" style="background-image:url(&#39;https://vast-plugin-data.rg1.data.tripo3d.com/tripo-studio/20250522/1550b325-8385-478d-9048-37f4fe6873cc/studio_mesh.webp?Key-Pair-Id=K2T6H91Q55QW4F&amp;Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLnJnMS5kYXRhLnRyaXBvM2QuY29tL3RyaXBvLXN0dWRpby8yMDI1MDUyMi8xNTUwYjMyNS04Mzg1LTQ3OGQtOTA0OC0zN2Y0ZmU2ODczY2Mvc3R1ZGlvX21lc2gud2VicCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc3OTE0ODgwMH19fV19&amp;Signature=Y2yNdF1J0JAhTzQpNRsxLAAjBSG6bdT3Fxpn9aXHp1xzxFwUxZC4zw75zUDOvWlWKDHeh3T7Z4eVcc-IrCW2XGDNamd6Nmd3RUI~G-17aBX4j9jemfCnb20mfqS7-q0fin9rTafeF5syaX9tqVOz-5LCDtHkFunyOl9Kp6Qp0Rsg~BcyrKotAeNw21Pe4-c8IRo1hY~ftI0KAxhVYN-3bHQwQ~bPiwsyH2H7d5E9P7f1ZP0vnMDtwHiXl24MhwFslslaO-L1cYxqdXlZ8llyH5LCw4RMhaaWjvRB5DeHwgCL2B8ptXx738CV6anE6yC984htf1ezH0qVdMLKGD1qBA__&#39;);clip-path:polygon(0 0, 0 0, 0 0, 0 0);"></div><div class="inset-0 absolute bg-cover bg-center bg-no-repeat" style="background-image:url(&#39;https://vast-plugin-data.rg1.data.tripo3d.com/tripo-studio/20250522/6e195280-ffc5-467e-ba33-728e1045dace/studio_mesh.webp?Key-Pair-Id=K2T6H91Q55QW4F&amp;Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLnJnMS5kYXRhLnRyaXBvM2QuY29tL3RyaXBvLXN0dWRpby8yMDI1MDUyMi82ZTE5NTI4MC1mZmM1LTQ2N2UtYmEzMy03MjhlMTA0NWRhY2Uvc3R1ZGlvX21lc2gud2VicCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc3OTE0ODgwMH19fV19&amp;Signature=omsC4ZgEQ~wPEOJlKy-OMUU3EC~3IGDaa3IsBz47pLvceChxToHpMY630S9sNs3u~m2rFnH966Nh4FNDQ-mWxAOuBRQu2dFYxHcI12j~sloy7AHSvMu24kog-szQe7MXrUhB8bo3ZPsNea4RtxdnEjy8-o-Vh6xSuppt5bMtkc67tIARnvSw1hnQdwdeOrJ1mL-qirC2uaVtqCzZAC970YgZ2TxonrVMBlTUOjKy2cIIN6kYAeEb2BKKh5-JexzJG15mc6P6X8KxpTmBUlwr~RhQRLQATwmDtTE8NGGyD76gcsAgDTiRRhjYIy3UFLMYqyvyybiVK8Lx1OPUlDzHhg__&#39;);clip-path:polygon(0 0, 100% 0, 100% 100%, 0 100%);"></div></a><!----><!--[--><!--[--><!--[--><button class="p-2 rounded-3 transition left-2 top-2 absolute hover:bg-white-5" id="reka-popover-trigger-v-0-0-30" type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls data-state="closed"><!--[--><div class="i-tripo:info-open v-mid size-5"><!--[--><!--]--></div><!--]--></button><!--v-if--><!--]--><!--]--><!--]--><button class="opacity-0 group-hover:opacity-100 max-md:opacity-100 p-2 rounded-3 transition right-2 top-2 absolute hover:bg-white-5"><div class="i-tripo:favorite v-mid size-5"><!--[--><!--]--></div></button><div class="pl-2 pr-3 flex h-8 w-full items-center bottom-2 justify-between absolute"><div class="flex gap-2 items-center"><img alt="" src="https://vast-plugin-data-public.rg1.data.tripo3d.com/tcli_6440f7102dab48c8bc26ca7882df997b/20250520/a98991ab-d60b-4780-a5ce-d2917b36bdba/input.jpg?Key-Pair-Id=K2T6H91Q55QW4F&amp;Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLXB1YmxpYy5yZzEuZGF0YS50cmlwbzNkLmNvbS90Y2xpXzY0NDBmNzEwMmRhYjQ4YzhiYzI2Y2E3ODgyZGY5OTdiLzIwMjUwNTIwL2E5ODk5MWFiLWQ2MGItNDc4MC1hNWNlLWQyOTE3YjM2YmRiYS9pbnB1dC5qcGc~Zm9ybWF0PXdlYnBcdTAwMjZ3aWR0aD0xMjUiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3NzkxNDg4MDB9fX1dfQ__&amp;Signature=Vpzmb8YBNOmKIhGLQc6xJY4VbKvrtslBc9Rz0DfS-1UcAMD2mkn~k2o8f1uGAWlSP862PpfA7~f41stAqyeiPTt997uq-~xJYsyWnk0ZPD0CdnGXiE-Vm5vFszljAGd1xPa71YFRecT729GjZ1rFxIWKG2c4lqLRFbHNWp3dxKcJMrkt2KsRVM96L70VqVYa3TByoNKimOLQbfqTlIkWMH5gArE0V-kxUa8NXH364YUgKRwpUA01iteK~csNSLEed1JTf0DkvanVsUJzHQYu5nxdhetVZ9-0kZZmOX-YRhUF9-LM8jf-ufrzl~nNh2tzI9kxVBRDWDoPcEPu4h~2Vg__&amp;format=webp&amp;width=125" class="rounded-full size-7 object-cover"><p class="text-3 max-w-38 truncate">Roxie LI</p></div><button class="flex gap-1 items-center"><div class="i-tripo:like v-mid size-5"><!--[--><!--]--></div><p class="text-3">0</p></button></div><!----></div><!----><!--]--><!--[--><div style="width:0px;" class="group rounded-5 bg-black-40 w-full aspect-3/4 cursor-pointer relative overflow-hidden"><a style="--clip-position:0%;" class="rounded-5 size-full block relative overflow-hidden"><img src="https://vast-plugin-data.rg1.data.tripo3d.com/tripo-studio/20260516/43c81114-e668-4e1b-abfb-cdefa9964f90/studio_mesh.webp?Key-Pair-Id=K2T6H91Q55QW4F&amp;Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLnJnMS5kYXRhLnRyaXBvM2QuY29tL3RyaXBvLXN0dWRpby8yMDI2MDUxNi80M2M4MTExNC1lNjY4LTRlMWItYWJmYi1jZGVmYTk5NjRmOTAvc3R1ZGlvX21lc2gud2VicCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc3OTE0ODgwMH19fV19&amp;Signature=psVyDVGueMre7M3tkhfXriXl-dqOFyAQxgmCDbFurvciFrog9hSwUqivdS0~FCYcZtNqawbvQcKnZIpi3hE99Q-U~nyTyjtMSYF7GlQryHHIktdI2TpO1GC7mj-n9H90xPQDbKfuaOmanS5P049LVjRKEGnDwI4MCVyff7UklFsZzBigEONKr2hwfUEcexV7TTVXMte4U4zI6ta20yTlhymhoL2KGgYoZo030KljdeC7vTI6VAjZAoOCXj2HgeNbm7bDJQbqRcK7pCAG73DKOFNulFBGfcrLx41r3rbCx7M6cHBbKSoORyvs0ZT43dccf3pnsAvwtHujaqtwyRPWLQ__" alt class="opacity-0 size-full pointer-events-none"><div class="inset-0 absolute bg-cover bg-center bg-no-repeat" style="background-image:url(&#39;https://vast-plugin-data.rg1.data.tripo3d.com/tripo-studio/20250522/0604f88a-a497-44ec-8e1b-2b62579b058b/studio_part.webp?Key-Pair-Id=K2T6H91Q55QW4F&amp;Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLnJnMS5kYXRhLnRyaXBvM2QuY29tL3RyaXBvLXN0dWRpby8yMDI1MDUyMi8wNjA0Zjg4YS1hNDk3LTQ0ZWMtOGUxYi0yYjYyNTc5YjA1OGIvc3R1ZGlvX3BhcnQud2VicCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc3OTE0ODgwMH19fV19&amp;Signature=s2Ozxu76wLbQ7PjR-~PF-4u5Gt3aucSQrvVKKbp9rzvjbVMYtNn75mbecD5IXBxXzUl9uTPKcun8MBrzcvuTjqUgHbIU8XHpRLB3zsfQCFPsoHbOTs0VY~ehD6b6jjgWfX9ZkegI8313j1qmUtJBfCwWmyG5Ikt7Wp-lMopn6UBQesUj9XKrtB5AA3B38KNWPrqDBImNkzkR75iKXAlBDTGRmz~J3TnrO1ltYvfNrX-aeGSlRCvcXnOAmY-SpYOZ0z6QkE0gpbHIIRYm5soveQvj5JDYWGChUGeg266FT1xQbeGXoZ4CgjFhfPG~1CwYhcEbUQ7tdJAbPplNMTxw~A__&#39;);clip-path:polygon(0 0, 0 0, 0 0, 0 0);"></div><div class="inset-0 absolute bg-cover bg-center bg-no-repeat" style="background-image:url(&#39;https://vast-plugin-data.rg1.data.tripo3d.com/tripo-studio/20260516/43c81114-e668-4e1b-abfb-cdefa9964f90/studio_mesh.webp?Key-Pair-Id=K2T6H91Q55QW4F&amp;Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLnJnMS5kYXRhLnRyaXBvM2QuY29tL3RyaXBvLXN0dWRpby8yMDI2MDUxNi80M2M4MTExNC1lNjY4LTRlMWItYWJmYi1jZGVmYTk5NjRmOTAvc3R1ZGlvX21lc2gud2VicCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc3OTE0ODgwMH19fV19&amp;Signature=psVyDVGueMre7M3tkhfXriXl-dqOFyAQxgmCDbFurvciFrog9hSwUqivdS0~FCYcZtNqawbvQcKnZIpi3hE99Q-U~nyTyjtMSYF7GlQryHHIktdI2TpO1GC7mj-n9H90xPQDbKfuaOmanS5P049LVjRKEGnDwI4MCVyff7UklFsZzBigEONKr2hwfUEcexV7TTVXMte4U4zI6ta20yTlhymhoL2KGgYoZo030KljdeC7vTI6VAjZAoOCXj2HgeNbm7bDJQbqRcK7pCAG73DKOFNulFBGfcrLx41r3rbCx7M6cHBbKSoORyvs0ZT43dccf3pnsAvwtHujaqtwyRPWLQ__&#39;);clip-path:polygon(0 0, 100% 0, 100% 100%, 0 100%);"></div></a><!----><!--[--><!--[--><!--[--><button class="p-2 rounded-3 transition left-2 top-2 absolute hover:bg-white-5" id="reka-popover-trigger-v-0-0-31" type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls data-state="closed"><!--[--><div class="i-tripo:info-open v-mid size-5"><!--[--><!--]--></div><!--]--></button><!--v-if--><!--]--><!--]--><!--]--><button class="opacity-0 group-hover:opacity-100 max-md:opacity-100 p-2 rounded-3 transition right-2 top-2 absolute hover:bg-white-5"><div class="i-tripo:favorite v-mid size-5"><!--[--><!--]--></div></button><div class="pl-2 pr-3 flex h-8 w-full items-center bottom-2 justify-between absolute"><div class="flex gap-2 items-center"><img alt="" src="https://vast-plugin-data-public.rg1.data.tripo3d.com/tcli_6440f7102dab48c8bc26ca7882df997b/20250522/1b9284ca-cc8d-4788-989f-f22adc390457/input.jpeg?Key-Pair-Id=K2T6H91Q55QW4F&amp;Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLXB1YmxpYy5yZzEuZGF0YS50cmlwbzNkLmNvbS90Y2xpXzY0NDBmNzEwMmRhYjQ4YzhiYzI2Y2E3ODgyZGY5OTdiLzIwMjUwNTIyLzFiOTI4NGNhLWNjOGQtNDc4OC05ODlmLWYyMmFkYzM5MDQ1Ny9pbnB1dC5qcGVnP2Zvcm1hdD13ZWJwXHUwMDI2d2lkdGg9MTI1IiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzc5MTQ4ODAwfX19XX0_&amp;Signature=KzlwEV7pWKkp~0cEI5iuh6z8KfgX6yE-4WZbn8~9FStYXIpe~6-jR6iIyYcI~qxSbFFZp55QZrAAUtkosgboBqgLt1TkMH-Talnz8VbQY7zeL-mMdx4JOL3wWIzIXFbMt8DNMaCd24JLdftmQ2voePsIdxjNNhO8cMdBQgH9MXjCF2Ee78vF8JsZrNTVS3LJCANp3x71wWFk20dgqhwy2CZgSI-QKcDSXR7hpbi7Snuulu06EHHi0quSL8~hDITuqFNrJukS9Z2ZFvWVEjMbc-5dCtbxcwZaqcVI1ZABnyvOUHoyrgZdgbrrG1q6O45zPcXJRdN~JqKcyi2GI59oIA__&amp;format=webp&amp;width=125" class="rounded-full size-7 object-cover"><p class="text-3 max-w-38 truncate">MYTYPE</p></div><button class="flex gap-1 items-center"><div class="i-tripo:like v-mid size-5"><!--[--><!--]--></div><p class="text-3">2</p></button></div><!----></div><!----><!--]--><!--[--><div style="width:0px;" class="group rounded-5 bg-black-40 w-full aspect-3/4 cursor-pointer relative overflow-hidden"><a style="--clip-position:0%;" class="rounded-5 size-full block relative overflow-hidden"><img src="https://vast-plugin-data.rg1.data.tripo3d.com/tripo-studio/20250522/d561fb4d-42b2-41fc-ba14-575ba54669cf/studio_mesh.webp?Key-Pair-Id=K2T6H91Q55QW4F&amp;Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLnJnMS5kYXRhLnRyaXBvM2QuY29tL3RyaXBvLXN0dWRpby8yMDI1MDUyMi9kNTYxZmI0ZC00MmIyLTQxZmMtYmExNC01NzViYTU0NjY5Y2Yvc3R1ZGlvX21lc2gud2VicCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc3OTE0ODgwMH19fV19&amp;Signature=bhdCJAVs0JfhmKUnB9yJZ6BaBxUNgg-EW1ozrRQK2BnUUozQlhSAeT03r4D~UdAY7dtB~3c0baYeInHB~fh5~4vRdeXPTf505cQAtMDu5aQBibCm9cJtlBesnpX59im5Jr6r-uY8~dD67i-XaTmzc0veANgKbIiWaaliVPvvi~CaNZu0K6Jb5C~63NQ43iyBqD97vsBAJ2bsJJz364GhaCrAFZ~BHCEL0bPqEXMsT6pvmH8xT7tRP2L7lN3fDHDI99SoieIPLi~4BL2ILC9S4HWMicLrujce-H9VF3fOVjFnrRw~7vsySJ69Tbf0nrlg-8McLGqmYjAjL8YKvPMSaw__" alt class="opacity-0 size-full pointer-events-none"><div class="inset-0 absolute bg-cover bg-center bg-no-repeat" style="background-image:url(&#39;https://vast-plugin-data.rg1.data.tripo3d.com/tripo-studio/20250522/1a494534-c097-45be-aa93-cca479b15e81/studio_wireframe.webp?Key-Pair-Id=K2T6H91Q55QW4F&amp;Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLnJnMS5kYXRhLnRyaXBvM2QuY29tL3RyaXBvLXN0dWRpby8yMDI1MDUyMi8xYTQ5NDUzNC1jMDk3LTQ1YmUtYWE5My1jY2E0NzliMTVlODEvc3R1ZGlvX3dpcmVmcmFtZS53ZWJwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzc5MTQ4ODAwfX19XX0_&amp;Signature=XT6VeErvvZZbotLiwBOqBwxzVLYDzA~N664AYmDWADb9~ph4jaau0OCJ23deT-rdJ0NcuZBtF77mWjQkekE~rbuBKWwiMpf65ttLbmw3sz8jwkgyvHwa-NYqfu4jnXSuct-eFDWvieh-khVVwc3ps1DTqknKwrzMixywLktn6bWf2jzFsC0rrpkXhNiJbQ94g-bygTkJ9KXLVAGy5kiQKMaJHIuXRkEqqLkyqS1eBffdZ4QbeBJ43T-W34Q00BQlXjygnmztNtfH~BrubwTzeYVIKSDPmT8~RnBF938fzdjGkh9~htEj0cWEUodT5ajKgfSB8u3N2S5Ka2P35ZvHlw__&#39;);clip-path:polygon(0 0, 0 0, 0 0, 0 0);"></div><div class="inset-0 absolute bg-cover bg-center bg-no-repeat" style="background-image:url(&#39;https://vast-plugin-data.rg1.data.tripo3d.com/tripo-studio/20250522/d561fb4d-42b2-41fc-ba14-575ba54669cf/studio_mesh.webp?Key-Pair-Id=K2T6H91Q55QW4F&amp;Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLnJnMS5kYXRhLnRyaXBvM2QuY29tL3RyaXBvLXN0dWRpby8yMDI1MDUyMi9kNTYxZmI0ZC00MmIyLTQxZmMtYmExNC01NzViYTU0NjY5Y2Yvc3R1ZGlvX21lc2gud2VicCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc3OTE0ODgwMH19fV19&amp;Signature=bhdCJAVs0JfhmKUnB9yJZ6BaBxUNgg-EW1ozrRQK2BnUUozQlhSAeT03r4D~UdAY7dtB~3c0baYeInHB~fh5~4vRdeXPTf505cQAtMDu5aQBibCm9cJtlBesnpX59im5Jr6r-uY8~dD67i-XaTmzc0veANgKbIiWaaliVPvvi~CaNZu0K6Jb5C~63NQ43iyBqD97vsBAJ2bsJJz364GhaCrAFZ~BHCEL0bPqEXMsT6pvmH8xT7tRP2L7lN3fDHDI99SoieIPLi~4BL2ILC9S4HWMicLrujce-H9VF3fOVjFnrRw~7vsySJ69Tbf0nrlg-8McLGqmYjAjL8YKvPMSaw__&#39;);clip-path:polygon(0 0, 100% 0, 100% 100%, 0 100%);"></div></a><!----><!--[--><!--[--><!--[--><button class="p-2 rounded-3 transition left-2 top-2 absolute hover:bg-white-5" id="reka-popover-trigger-v-0-0-32" type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls data-state="closed"><!--[--><div class="i-tripo:info-open v-mid size-5"><!--[--><!--]--></div><!--]--></button><!--v-if--><!--]--><!--]--><!--]--><button class="opacity-0 group-hover:opacity-100 max-md:opacity-100 p-2 rounded-3 transition right-2 top-2 absolute hover:bg-white-5"><div class="i-tripo:favorite v-mid size-5"><!--[--><!--]--></div></button><div class="pl-2 pr-3 flex h-8 w-full items-center bottom-2 justify-between absolute"><div class="flex gap-2 items-center"><img alt="" src="https://vast-plugin-data-public.rg1.data.tripo3d.com/tcli_6440f7102dab48c8bc26ca7882df997b/20250520/a98991ab-d60b-4780-a5ce-d2917b36bdba/input.jpg?Key-Pair-Id=K2T6H91Q55QW4F&amp;Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLXB1YmxpYy5yZzEuZGF0YS50cmlwbzNkLmNvbS90Y2xpXzY0NDBmNzEwMmRhYjQ4YzhiYzI2Y2E3ODgyZGY5OTdiLzIwMjUwNTIwL2E5ODk5MWFiLWQ2MGItNDc4MC1hNWNlLWQyOTE3YjM2YmRiYS9pbnB1dC5qcGc~Zm9ybWF0PXdlYnBcdTAwMjZ3aWR0aD0xMjUiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3NzkxNDg4MDB9fX1dfQ__&amp;Signature=Vpzmb8YBNOmKIhGLQc6xJY4VbKvrtslBc9Rz0DfS-1UcAMD2mkn~k2o8f1uGAWlSP862PpfA7~f41stAqyeiPTt997uq-~xJYsyWnk0ZPD0CdnGXiE-Vm5vFszljAGd1xPa71YFRecT729GjZ1rFxIWKG2c4lqLRFbHNWp3dxKcJMrkt2KsRVM96L70VqVYa3TByoNKimOLQbfqTlIkWMH5gArE0V-kxUa8NXH364YUgKRwpUA01iteK~csNSLEed1JTf0DkvanVsUJzHQYu5nxdhetVZ9-0kZZmOX-YRhUF9-LM8jf-ufrzl~nNh2tzI9kxVBRDWDoPcEPu4h~2Vg__&amp;format=webp&amp;width=125" class="rounded-full size-7 object-cover"><p class="text-3 max-w-38 truncate">Roxie LI</p></div><button class="flex gap-1 items-center"><div class="i-tripo:like v-mid size-5"><!--[--><!--]--></div><p class="text-3">2</p></button></div><!----></div><!----><!--]--><!--[--><div style="width:0px;" class="group rounded-5 bg-black-40 w-full aspect-3/4 cursor-pointer relative overflow-hidden"><a style="--clip-position:0%;" class="rounded-5 size-full block relative overflow-hidden"><img src="https://vast-plugin-data.rg1.data.tripo3d.com/tripo-studio/20250522/8ba33416-9e76-4f40-861e-53c92d5e7028/studio_mesh.webp?Key-Pair-Id=K2T6H91Q55QW4F&amp;Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLnJnMS5kYXRhLnRyaXBvM2QuY29tL3RyaXBvLXN0dWRpby8yMDI1MDUyMi84YmEzMzQxNi05ZTc2LTRmNDAtODYxZS01M2M5MmQ1ZTcwMjgvc3R1ZGlvX21lc2gud2VicCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc3OTE0ODgwMH19fV19&amp;Signature=Rsjwl7JlGM70UKP2PmZY~8mR~qbRV61GvLItji91A7K66RUVo38SBN7rOO6ljjk1Cc3bEjLyGKt12qEXjBpREav-w41e-OjKuW50qlj-N0KbpT8igSiSKtu-J9PCRTDBWdwXgyXko4v3TIJRVJA-82Jl2BC-~nV8kyfgbdX3Qa56to~lEuvokb8-wlXxA8lzbSNNW2Mc7yqqazoll7DkVKfgGzxkdyOXvRP0AbqNH~N016nBvng36fqR1BZdE5AA4eePYUhEAqpZIuyd8FPVOI-g7aV2T~yR02-IzUhaC8RKjSqbfUZYtO5j3~2v3J-vUoM6hdkjjUn5ujJxIeQ2eQ__" alt class="opacity-0 size-full pointer-events-none"><div class="inset-0 absolute bg-cover bg-center bg-no-repeat" style="background-image:url(&#39;https://vast-plugin-data.rg1.data.tripo3d.com/tripo-studio/20250522/34ecd62a-95d8-4a4e-baee-ee362b3de8cd/studio_wireframe.webp?Key-Pair-Id=K2T6H91Q55QW4F&amp;Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLnJnMS5kYXRhLnRyaXBvM2QuY29tL3RyaXBvLXN0dWRpby8yMDI1MDUyMi8zNGVjZDYyYS05NWQ4LTRhNGUtYmFlZS1lZTM2MmIzZGU4Y2Qvc3R1ZGlvX3dpcmVmcmFtZS53ZWJwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzc5MTQ4ODAwfX19XX0_&amp;Signature=Sd10OfIRUzCseoKl9Ys1EjzdItYoOH0Wd2MV-VvTU9T9zKJpAv-XG-MIfsQ2EgDN96C3AEqFEJo979r7E4QqtrIIVAu4u9WvevoBpgambTjtkBLgxz-OYEDfsBleeGqCy32mlmpAwuuXpScQagVgNnYX~u-Bdpzo7RjDCoVoZoQeoJWEAaR-IAErJnSstfp8CpqmXggF-8x0IC3~qV5Rh7yNs9H5CImCIyN9~58M4qwxCLgIut1YuIbyNFIPwv0LPXUCr7-iiSWE4o5E6gqxComIaUhqmjxLgN-sX9NcucAg6Cl97wC9GJve6kzteYiSrKAlqrQXD0dae3F7xYM0wg__&#39;);clip-path:polygon(0 0, 0 0, 0 0, 0 0);"></div><div class="inset-0 absolute bg-cover bg-center bg-no-repeat" style="background-image:url(&#39;https://vast-plugin-data.rg1.data.tripo3d.com/tripo-studio/20250522/8ba33416-9e76-4f40-861e-53c92d5e7028/studio_mesh.webp?Key-Pair-Id=K2T6H91Q55QW4F&amp;Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLnJnMS5kYXRhLnRyaXBvM2QuY29tL3RyaXBvLXN0dWRpby8yMDI1MDUyMi84YmEzMzQxNi05ZTc2LTRmNDAtODYxZS01M2M5MmQ1ZTcwMjgvc3R1ZGlvX21lc2gud2VicCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc3OTE0ODgwMH19fV19&amp;Signature=Rsjwl7JlGM70UKP2PmZY~8mR~qbRV61GvLItji91A7K66RUVo38SBN7rOO6ljjk1Cc3bEjLyGKt12qEXjBpREav-w41e-OjKuW50qlj-N0KbpT8igSiSKtu-J9PCRTDBWdwXgyXko4v3TIJRVJA-82Jl2BC-~nV8kyfgbdX3Qa56to~lEuvokb8-wlXxA8lzbSNNW2Mc7yqqazoll7DkVKfgGzxkdyOXvRP0AbqNH~N016nBvng36fqR1BZdE5AA4eePYUhEAqpZIuyd8FPVOI-g7aV2T~yR02-IzUhaC8RKjSqbfUZYtO5j3~2v3J-vUoM6hdkjjUn5ujJxIeQ2eQ__&#39;);clip-path:polygon(0 0, 100% 0, 100% 100%, 0 100%);"></div></a><!----><!--[--><!--[--><!--[--><button class="p-2 rounded-3 transition left-2 top-2 absolute hover:bg-white-5" id="reka-popover-trigger-v-0-0-33" type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls data-state="closed"><!--[--><div class="i-tripo:info-open v-mid size-5"><!--[--><!--]--></div><!--]--></button><!--v-if--><!--]--><!--]--><!--]--><button class="opacity-0 group-hover:opacity-100 max-md:opacity-100 p-2 rounded-3 transition right-2 top-2 absolute hover:bg-white-5"><div class="i-tripo:favorite v-mid size-5"><!--[--><!--]--></div></button><div class="pl-2 pr-3 flex h-8 w-full items-center bottom-2 justify-between absolute"><div class="flex gap-2 items-center"><img alt="" src="https://staticassets.tripo3d.ai/studio/default-avatar.jpeg" class="rounded-full size-7 object-cover"><p class="text-3 max-w-38 truncate">Anonymous1747400941</p></div><button class="flex gap-1 items-center"><div class="i-tripo:like v-mid size-5"><!--[--><!--]--></div><p class="text-3">1</p></button></div><!----></div><!----><!--]--><!--]--></div><!--]--><div class="min-h-10 w-full"><!----></div><!--]--></div></div><!--]--></div><!--]--><!--]--></div></div><style> /* Hide scrollbars cross-browser and enable momentum scroll for touch devices */ [data-reka-scroll-area-viewport] { scrollbar-width:none; -ms-overflow-style:none; -webkit-overflow-scrolling:touch; } [data-reka-scroll-area-viewport]::-webkit-scrollbar { display:none; } </style><!--]--><!----><!----><!--v-if--><!--]--></div></main><!--[--><!--]--><!--[--><!--v-if--><!--]--><!--[--><!-- Remove item from normal navigation flow, only available via hotkey --><section aria-label="Notifications alt+T" tabindex="-1" aria-live="polite" aria-relevant="additions text" aria-atomic="false"><!--[--><ol data-sonner-toaster data-sonner-theme="light" class="w-[calc(100dvw-144px)] cursor-pointer pointer-events-auto max-md:w-[calc(100dvw-48px)]" dir="ltr" tabindex="-1" data-theme="light" data-rich-colors="false" data-y-position="top" data-x-position="center" style="--front-toast-height:0px;--width:356px;--gap:14px;--offset-top:72px;--offset-right:72px;--offset-bottom:72px;--offset-left:72px;--mobile-offset-top:24px;--mobile-offset-right:24px;--mobile-offset-bottom:24px;--mobile-offset-left:24px;"><!--[--><!--]--></ol><!--]--></section><!--]--><div style="display:none;" data-v-86d17214><div class="invite-float text-3.5 px-3 py-2 rounded-l-full bg-[url(&#39;/images/invite-float-sub.webp&#39;)] flex cursor-pointer items-center right-0 top-29 fixed z-50 bg-cover bg-center max-md:top-31" style="display:none;" data-v-86d17214><div class="i-tripo:add-credits v-mid c-yellow-1 mr-1 size-5" data-v-86d17214><!--[--><!--]--></div> Enter invite code</div><div class="invite-float p-3 rounded-4 bg-[url(&#39;/images/invite-float-bg.webp&#39;)] flex flex-col gap-2 h-30.5 w-46 box-border right-3 top-29 fixed z-50 bg-cover bg-center max-md:w-[calc(100dvw-1.5rem)] max-md:right-3 max-md:top-31" style="" data-v-86d17214><div class="i-tripo:add-credits v-mid c-yellow-1 size-5 left-2 top-2 absolute" data-v-86d17214><!--[--><!--]--></div><div class="i-tripo:arrow-right-to-line v-mid opacity-60 size-4 cursor-pointer right-2 top-2 absolute" data-v-86d17214><!--[--><!--]--></div><div class="text-3.5 c-white px-6 text-center flex w-full items-center justify-center" data-v-86d17214><!----> Enter invite code to get credits!</div><div class="flex h-8 w-full box-border justify-between max-md:h-10" data-v-86d17214><input value="" class="text-3.5 c-white px-4 py-3 rounded-6 bg-black-40 h-full w-30 max-md:flex-1" data-v-86d17214><button disabled class="tripo-button group text-3.5 font-500 box-border relative rounded-full bg-white flex size-8 cursor-pointer transition-opacity items-center justify-center max-md:ml-2" data-v-a9ab43b7 data-v-86d17214><div class="background bg-disabled" data-v-a9ab43b7></div><div class="flex gap-1 items-center justify-center relative z-1 wrapper-disabled" data-v-a9ab43b7><!--[--><div class="i-tripo:check v-mid c-black size-5" data-v-86d17214><!--[--><!--]--></div><!--]--></div></button></div><span data-v-86d17214></span></div></div><!--]--></div><div id="teleports"></div><script>window.__NUXT__={};window.__NUXT__.config={public:{"nuxt-scripts":{version:"",prefix:"/_scripts",defaultScriptOptions:{trigger:"onNuxtReady"},googleStaticMapsProxy:"",endpoints:{}},posthog:{publicKey:"phc_avMshN0l7NiHSfgKBAjLke3il4P2sGBzOvj2LFGyTV9",host:"https://us.i.posthog.com",debug:false},posthogClientConfig:{api_host:"https://e-p.tripo3d.ai/",autocapture:false,capture_exceptions:false,debug:false,disable_session_recording:true,ui_host:"https://us.posthog.com"},i18n:{baseUrl:"https://studio.tripo3d.ai",defaultLocale:"en",rootRedirect:"",redirectStatusCode:302,skipSettingLocaleOnNavigate:false,locales:[{code:"en",name:"English",language:""},{code:"zh",name:"中文",language:""},{code:"es",name:"Español",language:""},{code:"ko",name:"한국어",language:""},{code:"ru",name:"Русский",language:""},{code:"pt",name:"Português",language:""},{code:"ja",name:"日本語",language:""},{code:"de",name:"Deutsch",language:""},{code:"it",name:"Italiano",language:""},{code:"tr",name:"Türkçe",language:""},{code:"fr",name:"Français",language:""}],detectBrowserLanguage:{alwaysRedirect:false,cookieCrossOrigin:false,cookieDomain:"",cookieKey:"i18n_redirected",cookieSecure:false,fallbackLocale:"",redirectOn:"root",useCookie:true},experimental:{localeDetector:"",typedPages:true,typedOptionsAndMessages:false,alternateLinkCanonicalQueries:true,devCache:false,cacheLifetime:"",stripMessagesPayload:false,preload:false,strictSeo:false,nitroContextDetection:true,httpCacheDuration:10,compactRoutes:false},domainLocales:{en:{domain:""},zh:{domain:""},es:{domain:""},ko:{domain:""},ru:{domain:""},pt:{domain:""},ja:{domain:""},de:{domain:""},it:{domain:""},tr:{domain:""},fr:{domain:""}}}},app:{baseURL:"/",buildId:"827cf7b7-578d-4c93-84c8-f99ce34b7cca",buildAssetsDir:"/_nuxt/",cdnURL:""}}</script><script type="application/json" data-nuxt-data="nuxt-app" data-ssr="true" id="__NUXT_DATA__">[["ShallowReactive",1],{"data":2,"state":6,"once":34,"_errors":36,"serverRendered":11,"path":38,"pinia":39},["ShallowReactive",3],{"user-token":4,"region":5},"","rg1",["Reactive",7],{"$si18n:cached-locale-configs":8,"$si18n:resolved-locale":4,"$steam-invite-onboarding-active-count":32,"$steam-active-workspace":33},{"en":9,"zh":12,"es":14,"ko":16,"ru":18,"pt":20,"ja":22,"de":24,"it":26,"tr":28,"fr":30},{"fallbacks":10,"cacheable":11},[],true,{"fallbacks":13,"cacheable":11},[],{"fallbacks":15,"cacheable":11},[],{"fallbacks":17,"cacheable":11},[],{"fallbacks":19,"cacheable":11},[],{"fallbacks":21,"cacheable":11},[],{"fallbacks":23,"cacheable":11},[],{"fallbacks":25,"cacheable":11},[],{"fallbacks":27,"cacheable":11},[],{"fallbacks":29,"cacheable":11},[],{"fallbacks":31,"cacheable":11},[],0,"personal",["Set",35],"home-init",["ShallowReactive",37],{"user-token":-1,"region":-1},"\u002Flogin\u002Fedge?flow=a8438000-7c43-4048-b882-c1b7f3d2391a",["Reactive",40],{"request-store":41,"user-store":50,"workspace-store":71,"3d-model-store":106,"message-store":129,"config-store":141,"workspace-generate-store":166,"team-workspace-store":187,"operator-store":195,"export-store":199,"home-store":208},{"serverError":42,"serverLog":45},["Ref",43],["Reactive",44],[],["Ref",46],["Reactive",47],[48,49],"[Server Request] https:\u002F\u002Fapi-staging.tripo3d.ai\u002Fv2\u002Fstudio\u002Fmarketing\u002Fdetail?locale=en - 175.34555999998702ms; traceparent: 00-7feba6d34c7cd742f82b4dbfaefe8318-3abb7e16584e15b1-01","[Server Request] https:\u002F\u002Fapi-staging.tripo3d.ai\u002Fv2\u002Fstudio\u002Fgallery\u002Flist - 477.61664399999427ms; traceparent: 00-e014970813ba23d283129064bee91c9b-69ed359b7b9f7ff2-01",{"detail":51,"industry":56,"payment":58},["Ref",52],["Reactive",53],{"basic_info":54,"detail":55,"onboarded":11},{"avatar":4,"nick_name":4},{"email":4,"userId":4},["EmptyRef",57],"\"\"",["Ref",59],["Reactive",60],{"invitation":61,"member":63,"subscription":67,"wallet":70},{"code":4,"get_member_condition":32,"get_member_process":32,"if_received_free_member":62,"register_generation_amount":32,"register_generation_limit":32,"register_generation_process":32,"register_payment_amount":32,"total_credit_earned":32},false,{"end_time":4,"free_trial":62,"main_user_membership_type":64,"start_time":65,"type":64,"valid_until":66},"basic","2026-05-17T00:00:00.000Z","2026-06-17",{"current_type":68,"has_history":62,"if_first_buy":62,"period":69,"type":64,"valid_until":66},"team","monthly",{"expiring_credit":32,"expiring_date":66,"total_credit":32},{"assets":72,"assetsInitLoading":77,"assetsType":79,"assetTab":81,"gizmo":83,"project":86,"projectInitLoading":103,"tab":104},["Ref",73],["Reactive",74],{"max_assets":75,"projects":76,"total":32},20,[],["EmptyRef",78],"false",["Ref",80],"all",["Ref",82],"mine",["Ref",84],["Reactive",85],{"grid":62,"historyBadge":62,"historyPanel":62,"stepGuide":62},["Ref",87],["Reactive",88],{"biz_info":89,"category":4,"collect_count":32,"collected":62,"content_risk_level":90,"cover_image":91,"custom_tags":92,"id":4,"is_featured":62,"is_nsfw":62,"is_owner":62,"like_count":32,"liked":62,"model_url":4,"operator":93,"original_avatar":4,"original_name":4,"owner_avatar":4,"owner_name":4,"point_cloud_model_url":4,"project_name":4,"retry_info":100,"style":4,"type":101,"use_case":4,"visibility":102},{"description":4,"display_image":4,"short_description":4},"normal",[4,4],[],{"created_at":32,"is_hd_textured":62,"is_latest_operator":62,"is_nexus_mesh":62,"is_pbr":62,"is_rigged":62,"is_segmented":62,"is_textured":62,"metadata":94,"operator_id":4},{"children_deleted":95,"children_rename":96,"children_transform_matrix":97,"material_factor":98},[],{},{},{"metallic":32,"roughness":99},0.5,{"can_retry":62,"can_show_retry":62,"max_retries":32,"remaining_retries":32,"used_retries":32},"generate","public",["EmptyRef",78],["Ref",105],"assets",{"effect":107,"gizmo":110,"project":113,"relatedModels":126},["Ref",108],["Reactive",109],{"rigging":62},["Ref",111],["Reactive",112],{"grid":62},["Ref",114],["Reactive",115],{"biz_info":116,"category":4,"collect_count":32,"collected":62,"content_risk_level":90,"cover_image":117,"custom_tags":118,"id":4,"is_featured":62,"is_nsfw":62,"is_owner":62,"like_count":32,"liked":62,"model_url":4,"operator":119,"original_avatar":4,"original_name":4,"owner_avatar":4,"owner_name":4,"point_cloud_model_url":4,"project_name":4,"retry_info":125,"style":4,"type":101,"use_case":4,"visibility":102},{"description":4,"display_image":4,"short_description":4},[4,4],[],{"created_at":32,"is_hd_textured":62,"is_latest_operator":62,"is_nexus_mesh":62,"is_pbr":62,"is_rigged":62,"is_segmented":62,"is_textured":62,"metadata":120,"operator_id":4},{"children_deleted":121,"children_rename":122,"children_transform_matrix":123,"material_factor":124},[],{},{},{"metallic":32,"roughness":99},{"can_retry":62,"can_show_retry":62,"max_retries":32,"remaining_retries":32,"used_retries":32},["Ref",127],["Reactive",128],[],{"globalData":130,"notifyData":134,"readIds":138},["Ref",131],["Reactive",132],{"has_more":62,"message_list":133,"unread_count":32},[],["Ref",135],["Reactive",136],{"has_more":62,"message_list":137,"unread_count":32},[],["Ref",139],["Reactive",140],[],{"annualPlanFigurine":142,"basicInfo":145,"exportLimit":149,"oneClickBenefit":152,"retentionPopupImageUrl":153,"nexusTrial":154,"trialMap":156,"imageGenTrial":159,"upscalerTrial":162,"welcomePopupImageUrl":165},["Ref",143],["Reactive",144],{"end_time":32,"event_id":4,"is_active":62,"start_time":32},["Ref",146],["Reactive",147],{"current_time":148},1779014137,["Ref",150],["Reactive",151],{"total_count":32,"used_count":32},["EmptyRef",78],["EmptyRef",57],["EmptyRef",155],"null",["Ref",157],["Reactive",158],{},["Ref",160],["Reactive",161],{"total_count":32,"used_count":32},["Ref",163],["Reactive",164],{"total_count":32,"used_count":32},["EmptyRef",57],{"batchUploadItems":167,"genMultiViewLoading":170,"imageToModel":171,"imageToModelUploading":172,"mode":173,"multiViewImages":175,"multiViewUploading":179,"tab":182,"textToModel":184},["Ref",168],["Reactive",169],[],["EmptyRef",78],["EmptyRef",155],["EmptyRef",78],["Ref",174],"imageToModel",["Ref",176],["Reactive",177],[178,178,178,178],null,["Ref",180],["Reactive",181],[62,62,62,62],["Ref",183],"high_detail",["Ref",185],["Reactive",186],{"prompt":4,"t_pose":62},{"activeWorkspace":188,"loaded":189,"primaryAccountInfo":190,"switching":191,"teams":192},["Ref",33],["EmptyRef",78],["EmptyRef",155],["EmptyRef",78],["Ref",193],["Reactive",194],[],{"operatorMap":196},["Ref",197],["Reactive",198],["Map"],{"batchSelectedProjectIds":200,"frontendExportSize":203,"operatorMap":205},["Ref",201],["Reactive",202],[],["EmptyRef",204],"0",["Ref",206],["Reactive",207],["Map"],{"category":209,"galleryInitLoading":211,"galleryList":212,"modelType":895,"next_cursor":896,"recommended":898,"reduceGenerateCardScale":900,"useCase":901},["Ref",210],"featured",["EmptyRef",78],["Ref",213],["Reactive",214],[215,279,331,384,390,422,455,488,512,564,603,608,642,671,700,729,766,814,853],{"id":216,"type":217,"project":218},"fa330b19-88e7-43f0-b180-82e640cd851b","project",{"owner_name":219,"owner_avatar":220,"id":216,"project_name":221,"like_count":222,"collect_count":223,"liked":62,"collected":62,"type":101,"visibility":102,"biz_info":224,"custom_tags":228,"category":229,"style":230,"use_case":231,"is_featured":11,"cover_image":232,"is_nsfw":62,"content_risk_level":4,"model_url":235,"is_owner":62,"operator":236,"retry_info":278},"Anonymous1775624365","https:\u002F\u002Fstaticassets.tripo3d.ai\u002Fstudio\u002Fdefault-avatar.jpeg","bronze knight statue 3d model",3,2,{"description":225,"short_description":226,"display_image":227},"bronze knight statue kneeling with sword, intricate engraved armor, patinated surface, detailed fabric folds, prop","bronze knight statue kneeling with sword intricate engraved armor pa","https:\u002F\u002Ftripo-public-test.tripo3d.ai\u002Fstudio\u002Fproject\u002Ffa330b19-88e7-43f0-b180-82e640cd851b\u002Fbronze-knight-statue-kneeling-with-sword-intricate-engraved-armor-pa.webp",[],"props","realistic","game asset",[233,234],"https:\u002F\u002Fvast-plugin-data.rg1.data.tripo3d.com\u002Ftripo-studio\u002F20260516\u002F72533814-fc69-43a1-b128-1262bb4e362b\u002Fstudio_mesh.webp?Key-Pair-Id=K2T6H91Q55QW4F&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLnJnMS5kYXRhLnRyaXBvM2QuY29tL3RyaXBvLXN0dWRpby8yMDI2MDUxNi83MjUzMzgxNC1mYzY5LTQzYTEtYjEyOC0xMjYyYmI0ZTM2MmIvc3R1ZGlvX21lc2gud2VicCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc3OTE0ODgwMH19fV19&Signature=PLXsKaHmlijbt6O~ZA9c5nzg40DTjRi6wD8pAiSkHIomzfhAqobddXs-x-hZMQHXkub6e~Rvi7983RhO3tg7ucMgtwbmfnvBE7PoKuz4JEClS8mOMPpPM8WLPUfYqUG5LcC2kJGO~HPtuvCZ9b~a28I-Zy6wNmQ4ZT4tt1gK~iyeQS~94yUSTVB9ZrWDYveClT0~kVyCo~790Sz1flcxkVkBPG8UZA1OZECkdULm8huaqXKnZ4-gyxGoJxTJsExdGObocXRLQghejQjtj7zqNxH3wE-2wcRcPI3dTr~4~1N6B5KKQUMzOYcQOiVVfJ23mZnPID0gLAak3B-gW3vpwA__","https:\u002F\u002Fvast-plugin-data.rg1.data.tripo3d.com\u002Ftripo-studio\u002F20260408\u002F2769054a-fab6-49f0-b59f-d57eef3f84b2\u002Fstudio_wireframe.webp?Key-Pair-Id=K2T6H91Q55QW4F&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLnJnMS5kYXRhLnRyaXBvM2QuY29tL3RyaXBvLXN0dWRpby8yMDI2MDQwOC8yNzY5MDU0YS1mYWI2LTQ5ZjAtYjU5Zi1kNTdlZWYzZjg0YjIvc3R1ZGlvX3dpcmVmcmFtZS53ZWJwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzc5MTQ4ODAwfX19XX0_&Signature=HRlm6tjb9MiSpNr4Z38wJbUSxJPq1hmmhvBi0o8CDAYJBpbliEfLPuCx3kU7osU4cnF4ZX0kw6qO2gaIaUH6fle4T6YgSyCdwLSe1tEJ1zHzAsbT5cWoCdQfN33ItY9XwC1CG3WED957wpsvPkqGcB73s7WTHMg8Ps0AsbDBPBDQPrltJN8uKMURaGt89nOgCjQb3u-obvtZ8TS8-IeLreBWynhY199XPbpGbsRowy03M6zV9F8O-TzvLe3WPy0J0fyIU5oW~ZXeW-Z3diKBNvoBfzbZigtSWbwGtrqwMnTofBHzd-pYkRz02P3TdEEkQOVbLYS5fetP~usuv63kOg__","https:\u002F\u002Fvast-plugin-data.rg1.data.tripo3d.com\u002Ftripo-studio\u002F20260516\u002F72533814-fc69-43a1-b128-1262bb4e362b\u002Ftripo_texture_72533814-fc69-43a1-b128-1262bb4e362b_meshopt.glb?Key-Pair-Id=K2T6H91Q55QW4F&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLnJnMS5kYXRhLnRyaXBvM2QuY29tL3RyaXBvLXN0dWRpby8yMDI2MDUxNi83MjUzMzgxNC1mYzY5LTQzYTEtYjEyOC0xMjYyYmI0ZTM2MmIvdHJpcG9fdGV4dHVyZV83MjUzMzgxNC1mYzY5LTQzYTEtYjEyOC0xMjYyYmI0ZTM2MmJfbWVzaG9wdC5nbGIiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3NzkxNDg4MDB9fX1dfQ__&Signature=RuyMfKhgW8SU0x6J7P8XCKKsl30MMFHHotEtrZZcGrDTCabSDQcLSuO-V8ScPV8jr4AtPgQgDjaTDsUBUvvWXQicDlQ9bmkDWlUPWjI4hOp9p2IKeW-sjXQWnbRTtWk838fz6Pk1RuxclRSPaQEsDRDdVQWheX7zuYBHwwSH0ISbPxhzF0Ny-badFD-SFXZ0yzksHj8sbeA5Y~WLmVxjYgkgxjQzhQJwVI1oItpy6uhZvgbZWUxc9OMO6E-X-J4m7NR9a5ke5nvNKFiWEZ5jqM49IPqBBF4TqwRCqI4Z7Zikb~ZNOLcOZt43vwj3XMudH2PBeefApRI0eN3ueHDc4w__",{"operator_id":237,"model_version":238,"model_url":235,"metadata":239,"status":245,"cover_image":246,"is_owner":62,"created_at":247,"updated_at":248,"type":249,"texture":250,"is_segmented":62,"is_textured":11,"is_rigged":62,"is_rigged_by_tripo":62,"is_stylized":62,"is_pbr":62,"is_hd_textured":11,"is_ultra_textured":62,"is_nexus_mesh":11,"is_nsfw":62,"content_risk_level":4,"image_to_model":261,"texture_generation":272,"is_latest_operator":11},"72533814-fc69-43a1-b128-1262bb4e362b","v3.0-20250812",{"transform_matrix":240,"children_transform_matrix":241,"children_deleted":242,"children_rename":243,"material_factor":244},[],{},[],{},{"metallic":32,"roughness":99},"success",[233,234],1778927581,1778996054,"texture_generation",{"operator_id":237,"id":237,"status":245,"generate_image":251,"generate_image_object":253,"texture_quality":257,"part_names":258,"texture_alignment":260},[252],"https:\u002F\u002Fvast-plugin-data.rg1.data.tripo3d.com\u002Ftripo-studio\u002F20260516\u002F25410e7b-7d88-48a6-b402-69de705fefdf\u002Finput.jpg?Key-Pair-Id=K2T6H91Q55QW4F&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLnJnMS5kYXRhLnRyaXBvM2QuY29tL3RyaXBvLXN0dWRpby8yMDI2MDUxNi8yNTQxMGU3Yi03ZDg4LTQ4YTYtYjQwMi02OWRlNzA1ZmVmZGYvaW5wdXQuanBnIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzc5MTQ4ODAwfX19XX0_&Signature=xVadRwqTne38yoxHag6jhRoZR1oCQb3tPMMpWFQHv2jza0bdFDncbmHa5KISeX4lUC11JbvJeQenX8ImI244mLpvXZsuOSxbHyysfiHeR617LjCohhV8tSSfbHD8djzrTzrMvEar~Qvs51744fJnKIcMoKPSoPgyvLG3H5PsN08L3RrAomUKqfYp5iCSfzpxB~LxpRqJkvP2xvmFKzCKFY3kxtIyCP8AlGBKu7EyoTCN9AiiltQoFEGBrd0lcUv0efRt4fL~MfoXFEftXocIQZZhkDhjw7J7ood1ak2bMxhMvPU8ccXlJ2FaUfQO3HGHSyj8EGxAgDOOf947Vug6-g__",[254],{"bucket":255,"key":256,"url":252},"vast-plugin-data","tripo-studio\u002F20260516\u002F25410e7b-7d88-48a6-b402-69de705fefdf\u002Finput.jpg","detailed",[259],"geometry_0","original_image",{"image":262,"style":178,"style_image":178,"prompt":225,"negative_prompt":178,"quad":178,"smart_poly":178,"face_limit":266,"texture":62,"pbr":178,"texture_quality":178,"texture_alignment":178,"generate_parts":178,"texture_seed":178,"geometry_quality":178,"visibility":102,"export_uv":178,"enable_image_autofix":178,"generate_image":267,"generate_image_object":269,"model_version":271},{"bucket":255,"key":263,"image_audit_result":264,"image_source":265},"tripo-studio\u002F20260408\u002F51cf7822-127c-472d-84e6-17a042d33616\u002Finput.png","pass","upload",5000,[268],"https:\u002F\u002Fvast-plugin-data.rg1.data.tripo3d.com\u002Ftripo-studio\u002F20260408\u002F51cf7822-127c-472d-84e6-17a042d33616\u002Finput.png?Key-Pair-Id=K2T6H91Q55QW4F&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLnJnMS5kYXRhLnRyaXBvM2QuY29tL3RyaXBvLXN0dWRpby8yMDI2MDQwOC81MWNmNzgyMi0xMjdjLTQ3MmQtODRlNi0xN2EwNDJkMzM2MTYvaW5wdXQucG5nIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzc5MTQ4ODAwfX19XX0_&Signature=Rfvyq8W6lmy9vdheaTM~d5yLJu8c-rALexTXdVgVSx6btRybfWRnF8zLY2Dr7irOxxWwWzqH7PXbBniYf0rc9GrAw--9tuXiTVVyypvmbJMQ9F8OXcyrSEDfNclC90ZGihRRgdAR5QVeb7h75tWs8s-tBHr2ptfLGsCnHFFQt8-bZNjPDD-h1wv4I3Nm8lCH2r~iy2kbD3WyZfVwVOuvn3javPMX5bGihxuRUQd8jG6G5KwpqnsblLIIO0thjX~zHRu3DgJLt7DwK7GKOGI2dlhJk0Y-45tASK3NS7oZSBs~2krL7RdVIC8rIeFZ53DmSbCughonTaTpO-DnFm~BGw__",[270],{"bucket":255,"key":263,"url":268},"Nexus-v1.0-20260214",{"project_id":216,"texture_quality":257,"texture_alignment":260,"part_names":273,"texture_seed":178,"image":274,"generate_image":275,"generate_image_object":276,"model_version":238},[259],{"bucket":255,"key":256,"image_audit_result":264,"image_source":265},[252],[277],{"bucket":255,"key":256,"url":252},{"max_retries":32,"used_retries":32,"remaining_retries":32,"can_retry":62,"can_show_retry":62},{"id":280,"type":217,"project":281},"b5724459-2af4-4d3e-a97d-5340932c0643",{"owner_name":282,"owner_avatar":283,"id":280,"project_name":284,"like_count":285,"collect_count":223,"liked":62,"collected":62,"type":101,"visibility":102,"biz_info":286,"custom_tags":290,"category":291,"style":230,"use_case":292,"is_featured":11,"cover_image":293,"is_nsfw":62,"content_risk_level":4,"model_url":296,"is_owner":62,"operator":297,"retry_info":330},"Anonymous1772436997","https:\u002F\u002Fvast-plugin-data-public.rg1.data.tripo3d.com\u002Ftripo-studio\u002F20260306\u002Fa7697495-77ba-4756-9e3d-b986846a1fbc\u002Finput.webp?Key-Pair-Id=K2T6H91Q55QW4F&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLXB1YmxpYy5yZzEuZGF0YS50cmlwbzNkLmNvbS90cmlwby1zdHVkaW8vMjAyNjAzMDYvYTc2OTc0OTUtNzdiYS00NzU2LTllM2QtYjk4Njg0NmExZmJjL2lucHV0LndlYnA~Zm9ybWF0PXdlYnBcdTAwMjZ3aWR0aD0xMjUiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3NzkxNDg4MDB9fX1dfQ__&Signature=ijwfK9ExWTsYiEAZ86bsLNqrj5ljOeBzEEoDwvx5VdbA10YFlNusUnnDDpe0mPQoKyeT0vUmiLYyXH6iB8ceH48EogCKvvK~87o4eqzoBGc7FyXpljGc4m9Ek0lo7HSXqK2zSe5NSjbqvsh98qT1cLWan2TY~E43RDKhOYnwekn4~58V6NR5AZROOofkF4~8J77Xb0RIUBTNAkTHFahsRMqbO1DH~W7wqfyOMM5kJBmwi7IRaE79UUgWKRLw8POYMmDG95U7MtTUYJK98LvUDdp2NPOPg63as9EPNR-ens6WTR3qPbwDqFfWNIvfvl6UHRF~IuozNhilxYd1Xwvusg__&format=webp&width=125","futuristic cowboy 3d model",5,{"description":287,"short_description":288,"display_image":289},"futuristic cowboy character in armored outfit with yellow coat, hat, and knee guards.","futuristic cowboy character in armored outfit with yellow coat hat a","https:\u002F\u002Ftripo-public-test.tripo3d.ai\u002Fstudio\u002Fproject\u002Fb5724459-2af4-4d3e-a97d-5340932c0643\u002Ffuturistic-cowboy-character-in-armored-outfit-with-yellow-coat-hat-a.webp",[],"character","rendering",[294,295],"https:\u002F\u002Fvast-plugin-data.rg1.data.tripo3d.com\u002Ftripo-studio\u002F20260516\u002F47849d75-a7dc-46f2-b7a5-5995d2e00f71\u002Fstudio_mesh.webp?Key-Pair-Id=K2T6H91Q55QW4F&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLnJnMS5kYXRhLnRyaXBvM2QuY29tL3RyaXBvLXN0dWRpby8yMDI2MDUxNi80Nzg0OWQ3NS1hN2RjLTQ2ZjItYjdhNS01OTk1ZDJlMDBmNzEvc3R1ZGlvX21lc2gud2VicCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc3OTE0ODgwMH19fV19&Signature=yNpBHRliddT7Aiov7XdWgbFB77A4ctrsRFwOxBKBlP35fYNljH8OkhIjBWmsvQNZmLoxGwScFeYfCc8zfGakrIXNe4QBLgNt1WoZjDDY0LjlbpE35jc5a8Qez8DyMZX17lbvNxWecp9fenvQmJAm3DY87jRCkQJD6pl0oOHrAXO4Qgrfvp~GOdvWsZq5~HfsmSn0VghfLlHqRqoBriUwKIo2a1yfSDESTUYPtB8wN9FItHQLwlZFmZCsyKvEu~mZO1UOTnw8pTQO5FIome5BGnnLzV4C1OcjKbLoJCDzpD5a2CADh5VMAfbYbSvS5n6NNfaAfKk6Cr8FZtnZj6OUtg__","https:\u002F\u002Fvast-plugin-data.rg1.data.tripo3d.com\u002Ftripo-studio\u002F20260516\u002F8ce76088-c982-4163-a7a4-b2299afdba1b\u002Fstudio_part.webp?Key-Pair-Id=K2T6H91Q55QW4F&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLnJnMS5kYXRhLnRyaXBvM2QuY29tL3RyaXBvLXN0dWRpby8yMDI2MDUxNi84Y2U3NjA4OC1jOTgyLTQxNjMtYTdhNC1iMjI5OWFmZGJhMWIvc3R1ZGlvX3BhcnQud2VicCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc3OTE0ODgwMH19fV19&Signature=YMhwz-sOokHmQZHQk88JbF6ggz4GMWibjp74fKSh4FxREKYCG2bXDKGfjvpxejMsQ0EpGYWXss4HdZW0IaOYnVPH3cyFQozcg-DCck6Sq87SKJhkJeHYAD7~xpSIu5sQRQ83kNrcYQShNeeoi4~jyjY0DDzhIU4QHqC0JZCQdxDLarNKa4rvxPSOPO1X-UU6OlRNYwlm0YhyI4h7vtTyq0eT4TAuG6mQTVIF404QE7MU2kCcIIrM9zeuk-xwWnpcJ97mMJY~8P8vWMRlOAdwiRAWm-IG~Qfhw62CYqsy-Y0-FOgyIqp~1bhxLVajMkRoMeXj0LXh1JzJACS~ps3n5A__","https:\u002F\u002Fvast-plugin-data.rg1.data.tripo3d.com\u002Ftripo-studio\u002F20260516\u002F8ce76088-c982-4163-a7a4-b2299afdba1b\u002Ftripo_mesh_seg_8ce76088-c982-4163-a7a4-b2299afdba1b_meshopt.glb?Key-Pair-Id=K2T6H91Q55QW4F&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLnJnMS5kYXRhLnRyaXBvM2QuY29tL3RyaXBvLXN0dWRpby8yMDI2MDUxNi84Y2U3NjA4OC1jOTgyLTQxNjMtYTdhNC1iMjI5OWFmZGJhMWIvdHJpcG9fbWVzaF9zZWdfOGNlNzYwODgtYzk4Mi00MTYzLWE3YTQtYjIyOTlhZmRiYTFiX21lc2hvcHQuZ2xiIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzc5MTQ4ODAwfX19XX0_&Signature=D~alpgjFRZUcwvOUPaZM~3HlCUDuMoscgzdbHQ1Chtqeh~-E8dDObf4-CBodipAVnDlhv-SHcE4Hny-XxFdk3-nbwviZwkNDeegnfcoR-VQOvmZJd4yxCBkXEdlhX9gHqkHFgc7kRsqJRf237LeT63k2j8IVb8xTLlFJI8LZ9zIygeERkr3R7-e~qajtTJd91Z-Fx1NUPKYY8qA7k~LWkn84TEAj9B15eS5VO5cp2zhf0ZvnsZG-uPHGPBNVBZEMy~7wHIx25EEkzjDhFuJduv-wkpYHQ~WvCK8Ip9MBL6BwgA8uPfPNq2OFjUGat1vOO0Ae3snpwJ-japqleE8K5Q__",{"operator_id":298,"model_version":238,"model_url":296,"metadata":299,"status":245,"cover_image":305,"is_owner":62,"created_at":306,"updated_at":248,"type":307,"texture":308,"is_segmented":11,"is_textured":11,"is_rigged":62,"is_rigged_by_tripo":62,"is_stylized":62,"is_pbr":62,"is_hd_textured":11,"is_ultra_textured":62,"is_nexus_mesh":11,"is_nsfw":62,"content_risk_level":4,"image_to_model":316,"texture_generation":324,"is_latest_operator":11},"8ce76088-c982-4163-a7a4-b2299afdba1b",{"transform_matrix":300,"children_transform_matrix":301,"children_deleted":302,"children_rename":303,"material_factor":304},[],{},[],{},{"metallic":32,"roughness":99},[294,295],1778927911,"ai_segmentation",{"operator_id":309,"id":309,"status":245,"generate_image":310,"generate_image_object":312,"texture_quality":257,"part_names":315,"texture_alignment":260},"47849d75-a7dc-46f2-b7a5-5995d2e00f71",[311],"https:\u002F\u002Fvast-plugin-data.rg1.data.tripo3d.com\u002Ftripo-studio\u002F20260516\u002F855a13f4-0ea0-4ee4-9f0c-d3965b2cb5d6\u002Finput.png?Key-Pair-Id=K2T6H91Q55QW4F&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLnJnMS5kYXRhLnRyaXBvM2QuY29tL3RyaXBvLXN0dWRpby8yMDI2MDUxNi84NTVhMTNmNC0wZWEwLTRlZTQtOWYwYy1kMzk2NWIyY2I1ZDYvaW5wdXQucG5nIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzc5MTQ4ODAwfX19XX0_&Signature=w8~joid~MApoqdmUt6H-2yc0SaYp2zuDQi7oJ3KakBUcKpXxRsiyfIiAE~NYwj2jIeghbWY3AIDoDItQTC2NdNqgGOmGz0Vemi1BWSGBVWLYrRmg6UZcRynIALhdhJsF24~3efa0ha-E7pGUBvOkj0Wyx5cIvEklfGhN0Ko2BJhyCtfvsCYpNCEDfRez1jkokmFvDuLE0gxpHcJLyvNfqF-Qf-X0wY6omU30am~A99ECaDlQa9-Q36fnYjafNfdO-NFY7Zv2zJNyHZjXIc5rm2-GQgmrGli40L4W3pDBE8n8RtB0yP7S8tt4thwAYEunIh~ykbTU8Ne~nMCmXrtpnQ__",[313],{"bucket":255,"key":314,"url":311},"tripo-studio\u002F20260516\u002F855a13f4-0ea0-4ee4-9f0c-d3965b2cb5d6\u002Finput.png",[259],{"image":317,"style":178,"style_image":178,"prompt":287,"negative_prompt":178,"quad":178,"smart_poly":178,"face_limit":266,"texture":62,"pbr":178,"texture_quality":178,"texture_alignment":178,"generate_parts":178,"texture_seed":178,"geometry_quality":178,"visibility":319,"export_uv":178,"enable_image_autofix":178,"generate_image":320,"generate_image_object":322,"model_version":271},{"bucket":255,"key":318,"image_audit_result":178,"image_source":178},"tripo-studio\u002F20260303\u002F8d8576dd-1ee8-4ee4-981b-88c461a346a7\u002Finput.webp","shareable",[321],"https:\u002F\u002Fvast-plugin-data.rg1.data.tripo3d.com\u002Ftripo-studio\u002F20260303\u002F8d8576dd-1ee8-4ee4-981b-88c461a346a7\u002Finput.webp?Key-Pair-Id=K2T6H91Q55QW4F&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLnJnMS5kYXRhLnRyaXBvM2QuY29tL3RyaXBvLXN0dWRpby8yMDI2MDMwMy84ZDg1NzZkZC0xZWU4LTRlZTQtOTgxYi04OGM0NjFhMzQ2YTcvaW5wdXQud2VicCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc3OTE0ODgwMH19fV19&Signature=dq6QQW1~tQkt7cX6amoijX-5Y8JdHYHA6aWvcGKK0mgn3-DeI8QXwLgS2dfAGHwb1dGNs2NoUFHvJ7mjBXVaIwpmH5KekhWnNfuCGpc9dHImw0cPzGT6moFqbBs3JH57pIgJYlI~Fqd9SWHeIgGGYt3wvjJlY8ce04fj6RdgeGWiAW2RYRUyLZJHQ5JNG1Vg4nTmI3YpQzN9YZpNzZYcAyGQ2MxFqB0pYv1KG5fIWqqH8R6L4iOBGLMJfBgMLFQ4YuIP7O37~~AZ1Yk4jf2uA-qLacJzM2kqQPUeqs6l8iXAsjALArvkFVTz4eq6bE~CqeczB7aUmjn01N4jrVQPJQ__",[323],{"bucket":255,"key":318,"url":321},{"project_id":280,"texture_quality":257,"texture_alignment":260,"part_names":325,"texture_seed":178,"image":326,"generate_image":327,"generate_image_object":328,"model_version":238},[259],{"bucket":255,"key":314,"image_audit_result":264,"image_source":265},[311],[329],{"bucket":255,"key":314,"url":311},{"max_retries":32,"used_retries":32,"remaining_retries":32,"can_retry":62,"can_show_retry":62},{"id":332,"type":217,"project":333},"90b7ae11-40c8-46d9-88c5-adb154464e82",{"owner_name":334,"owner_avatar":220,"id":332,"project_name":332,"like_count":335,"collect_count":336,"liked":62,"collected":62,"type":101,"visibility":102,"biz_info":337,"custom_tags":339,"category":340,"style":341,"use_case":231,"is_featured":11,"cover_image":342,"is_nsfw":62,"content_risk_level":4,"model_url":345,"is_owner":62,"operator":346,"retry_info":383},"Anonymous",7,6,{"description":4,"short_description":4,"display_image":338},"https:\u002F\u002Ftripo-public-test.tripo3d.ai\u002Fstudio\u002Fproject\u002F90b7ae11-40c8-46d9-88c5-adb154464e82\u002Fdisplay.webp",[],"creatures & animals","stylized",[343,344],"https:\u002F\u002Fvast-plugin-data.rg1.data.tripo3d.com\u002Ftripo-studio\u002F20260516\u002F36b11817-66aa-413d-ad3a-053aa948ba2b\u002Fstudio_mesh.webp?Key-Pair-Id=K2T6H91Q55QW4F&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLnJnMS5kYXRhLnRyaXBvM2QuY29tL3RyaXBvLXN0dWRpby8yMDI2MDUxNi8zNmIxMTgxNy02NmFhLTQxM2QtYWQzYS0wNTNhYTk0OGJhMmIvc3R1ZGlvX21lc2gud2VicCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc3OTE0ODgwMH19fV19&Signature=pHBc7QHJwc2qrC1URm1UP1NWn7k73dQbU2bp3VXY4Zlt-KgRgvDKZ~EMYTXoe-8xcmziv66oAyFdd2q9VKuev~Df4dd~0FyrsUJHad8VMPq87xXqJet6a~urHBXgLEOgnj07ELI0oQKUMTTNrFwBcNTbhIbIG460c1jfE~An4YoExSx4pMZaVwIkGsTfjLykyawl0OxQZanmg3o6FT0S0WEIaOkUD-ESv1ntwHUmIclx4GzXBMOmWqmxBevr28vwhUGafxPmaj9VRS7bWujcqw93KBfFDPWlKQy-GWzWWm6wzfEQWCqf5Bv4~jQylyGl~RcwNWKbIjdSUVqzZRQ6CA__","https:\u002F\u002Fvast-plugin-data.rg1.data.tripo3d.com\u002Ftripo-studio\u002F20250805\u002Fe0882191-4272-4dac-9d4b-a69d8aacfbe8\u002Fstudio_mesh_gray.webp?Key-Pair-Id=K2T6H91Q55QW4F&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLnJnMS5kYXRhLnRyaXBvM2QuY29tL3RyaXBvLXN0dWRpby8yMDI1MDgwNS9lMDg4MjE5MS00MjcyLTRkYWMtOWQ0Yi1hNjlkOGFhY2ZiZTgvc3R1ZGlvX21lc2hfZ3JheS53ZWJwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzc5MTQ4ODAwfX19XX0_&Signature=x04d1V56e1PTuSQ6mYs9MyTFSwEg-nZDirVb6ORLIJ7BOpxqxhLxv8vnjxDUBCvk5ID~6fsSmmPs-7m8lVLJBcDJDA-jjDEXwXcr2c5LCROfd4v9DYyiSRDnID5AlNQ4zA8KySM6gz8Hig3tj35cn0ZiobbsSvBwLYBrRHs7bVtYIQ64pdMCr3ZyFs5dDsqGNdDzpM25RppvUisfKXKSJRcXvjU1yfH57ci~2umInq1ynn~bEU7JRo3efx2zEYHfswgDSn0hMuX6hD3Q-n2Y4mUVlA5c-P4N5t3GpG~gV7~Pr7qwyRu5VQoSihVh7Ik~vEVLxxPvN0GFdN5HKRJGqg__","https:\u002F\u002Fvast-plugin-data.rg1.data.tripo3d.com\u002Ftripo-studio\u002F20260516\u002F4a8dec99-c24b-4a03-8934-50a5ec992723\u002Ftripo_convert_4a8dec99-c24b-4a03-8934-50a5ec992723.fbx?Key-Pair-Id=K2T6H91Q55QW4F&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLnJnMS5kYXRhLnRyaXBvM2QuY29tL3RyaXBvLXN0dWRpby8yMDI2MDUxNi80YThkZWM5OS1jMjRiLTRhMDMtODkzNC01MGE1ZWM5OTI3MjMvdHJpcG9fY29udmVydF80YThkZWM5OS1jMjRiLTRhMDMtODkzNC01MGE1ZWM5OTI3MjMuZmJ4IiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzc5MTQ4ODAwfX19XX0_&Signature=iX-m5FjB1cPuWTpBW63QBY3F29DkqskFH-QsSgrk7w0WEEdXAufYE3lWj9ugOl6nEwhuICV3oNHTj1dth1lGRhWoQtP3MfRj4MjXJkAAGZlI5Ed55p3CiUO5ETEEsjjFeWHJSWBwtItA9D~2-rsTCv0EY5nYvdQW5p-zD1L1fBwe65avdVY2mHrdKQz4lcXl12Dn8JAl9x3U~JaYUGeCZo0k75jSB2orBNb8JnoZXRT3gIPkSQ39Wdk3A6uU~P5AudZe8vHX8TtiC0JUF8ER-qnqeJ2ycJl8Y-teVE8UkmzwlrrJjSjJ0EFlsJsP6sU9XbSyYyNtY4oUaFr8Ajhg8w__",{"operator_id":347,"model_version":238,"model_url":345,"metadata":348,"status":245,"cover_image":354,"is_owner":62,"created_at":355,"updated_at":356,"type":357,"texture":358,"is_segmented":62,"is_textured":11,"is_rigged":62,"is_rigged_by_tripo":62,"is_stylized":62,"is_pbr":62,"is_hd_textured":11,"is_ultra_textured":62,"is_nexus_mesh":62,"is_nsfw":62,"content_risk_level":4,"image_to_model":367,"texture_generation":377,"is_latest_operator":11},"4a8dec99-c24b-4a03-8934-50a5ec992723",{"transform_matrix":349,"children_transform_matrix":350,"children_deleted":351,"children_rename":352,"material_factor":353},[],{},[],{},{"metallic":32,"roughness":99},[343,344],1778928011,1778996055,"remesh",{"operator_id":359,"id":359,"status":245,"generate_image":360,"generate_image_object":362,"texture_quality":257,"part_names":365,"texture_alignment":260},"36b11817-66aa-413d-ad3a-053aa948ba2b",[361],"https:\u002F\u002Fvast-plugin-data.rg1.data.tripo3d.com\u002Ftripo-studio\u002F20260516\u002F488324e7-6d62-48b6-9dfd-5678e7d01ed3\u002Finput.png?Key-Pair-Id=K2T6H91Q55QW4F&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLnJnMS5kYXRhLnRyaXBvM2QuY29tL3RyaXBvLXN0dWRpby8yMDI2MDUxNi80ODgzMjRlNy02ZDYyLTQ4YjYtOWRmZC01Njc4ZTdkMDFlZDMvaW5wdXQucG5nIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzc5MTQ4ODAwfX19XX0_&Signature=c-kI0p-WzCTIBDYhAMRRX7jaxXho44ctbhNAKSwEtxW3-HlQGsNdDBnHdw2EbJzpSlFVqbuqFKBoSzQflDyeCEa4zdvso8xENEBfALFpv~qdKkd6UxPP6x5g6f-2IyQ2kOPXKcPgB4DwQcAjoflzKrbU4YxcU0OXtBw6jzlupuw6tGjOFAMSSSP0PVKXaPa5GOeZJbig7bBMMGlbw6rrx5h17O199KlJ6bGFk7kaCZsEgCSxwOdfNc0-jgTOfxEea8Jh2y9ihTdqkZoMWox5jJ5Gvu0DlVlNOk1SOh4UVzCLCKuFd8olzzjFBxIz1jVZSFe9x31OdtleE5Cq5L2esg__",[363],{"bucket":255,"key":364,"url":361},"tripo-studio\u002F20260516\u002F488324e7-6d62-48b6-9dfd-5678e7d01ed3\u002Finput.png",[366],"tripo_node_e0882191-4272-4dac-9d4b-a69d8aacfbe8",{"image":368,"style":4,"style_image":178,"prompt":370,"negative_prompt":4,"quad":62,"smart_poly":62,"face_limit":32,"texture":11,"pbr":11,"texture_quality":371,"texture_alignment":260,"generate_parts":178,"texture_seed":178,"geometry_quality":178,"visibility":4,"export_uv":178,"enable_image_autofix":178,"generate_image":372,"generate_image_object":374,"model_version":376},{"bucket":255,"key":369,"image_audit_result":178,"image_source":178},"tcli_6440f7102dab48c8bc26ca7882df997b\u002F20250805\u002F4f580365-3254-4085-9fd8-f20fdda11a3f\u002Finput.png","这是一个GC猪，并且穿着蓝色的衣服","standard",[373],"https:\u002F\u002Fvast-plugin-data.rg1.data.tripo3d.com\u002Ftcli_6440f7102dab48c8bc26ca7882df997b\u002F20250805\u002F4f580365-3254-4085-9fd8-f20fdda11a3f\u002Finput.png?Key-Pair-Id=K2T6H91Q55QW4F&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLnJnMS5kYXRhLnRyaXBvM2QuY29tL3RjbGlfNjQ0MGY3MTAyZGFiNDhjOGJjMjZjYTc4ODJkZjk5N2IvMjAyNTA4MDUvNGY1ODAzNjUtMzI1NC00MDg1LTlmZDgtZjIwZmRkYTExYTNmL2lucHV0LnBuZyIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc3OTE0ODgwMH19fV19&Signature=mrVGQlsldyeNe9HEJTvrzkaqzKn7E8ZChQvZzYDAaYyBf7gI21xBu2fJG6v6geMzoCQb79qSORXxIoHlN~~NRFyxDYSLWNaLvHz2iecoukclkDGST6EqyxZcGSpjZduAtxKT5s3eaWJA8RVbkJ1vreReu80sXDj1~BkyZowRVf7bSW8YzKV8~lfTsD-D-dnJIYu6N3y2JZV3Wyfv3PyVxtirDbw-RqGVg5drQmg6r8YXpgC~tyfeiqSZXvF3lBFSsXBjuA7QiALkpfgK0P8C-QOq5C0BezByerKFSl05zw1HHzzqDd1mPKnQ0VHnnz~ggFMc7BJWsaFheGnP8Wm4lQ__",[375],{"bucket":255,"key":369,"url":373},"v2.5-20250123",{"project_id":332,"texture_quality":257,"texture_alignment":260,"part_names":378,"texture_seed":178,"image":379,"generate_image":380,"generate_image_object":381,"model_version":238},[366],{"bucket":255,"key":364,"image_audit_result":264,"image_source":265},[361],[382],{"bucket":255,"key":364,"url":361},{"max_retries":32,"used_retries":32,"remaining_retries":32,"can_retry":62,"can_show_retry":62},{"id":385,"type":386,"collection":387},"e9eba594-4d37-409c-9226-186d99b66de4","collection",{"collection_id":385,"collection_name":388,"cover_image":389},"Diverse Sector 9","https:\u002F\u002Fvast-plugin-data.rg1.data.tripo3d.com\u002Ftripo-studio-collection\u002Fe9eba594-4d37-409c-9226-186d99b66de4\u002Fimage%20%2818%29.png?Key-Pair-Id=K2T6H91Q55QW4F&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLnJnMS5kYXRhLnRyaXBvM2QuY29tL3RyaXBvLXN0dWRpby1jb2xsZWN0aW9uL2U5ZWJhNTk0LTRkMzctNDA5Yy05MjI2LTE4NmQ5OWI2NmRlNC9pbWFnZSUyMCUyODE4JTI5LnBuZyIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc3OTE0ODgwMH19fV19&Signature=qtE0TKWELhrljlG9URs8SW3Bctzs1zQbwbO0a-dpL2h8~qWjj3e5kDbgKJftPe6QinKrSRLZumpFJ30drDg4ogZrp4B-fqKxRBxSd~FmwU2C1osQspPmfgzVl2ZRDUVfQcDfzCpI~gKXcRMTNJPMvKbZu-Bmck3GOaPGFYhTEfEdwn1fTTPT22SqfgIGfxLaofiWzd5w-g93w28J9jUsGvaRO7HXBjHXiCcuFKOYIh8YrAjeEscy38gz22tmSCnknOSRBUN1t448ilyysR2Xk6K~5H6dYdVZV4iKAbkwIUlH6IdKm3GDo8fnssckYjPdzhrfgOxNaLGTt1S543dZsA__",{"id":391,"type":217,"project":392},"8924b6a5-70db-4120-8faf-4973678b48f7",{"owner_name":334,"owner_avatar":220,"id":391,"project_name":391,"like_count":393,"collect_count":222,"liked":62,"collected":62,"type":101,"visibility":102,"biz_info":394,"custom_tags":395,"category":396,"style":230,"use_case":292,"is_featured":11,"cover_image":397,"is_nsfw":62,"content_risk_level":4,"model_url":400,"is_owner":62,"operator":401,"retry_info":421},1,{"description":4,"short_description":4,"display_image":4},[],"clothing",[398,399],"https:\u002F\u002Fvast-plugin-data.rg1.data.tripo3d.com\u002Ftripo-studio\u002F20250729\u002F31bec87d-0be6-497b-9d0b-b10794d3c5dd\u002Fstudio_mesh.webp?Key-Pair-Id=K2T6H91Q55QW4F&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLnJnMS5kYXRhLnRyaXBvM2QuY29tL3RyaXBvLXN0dWRpby8yMDI1MDcyOS8zMWJlYzg3ZC0wYmU2LTQ5N2ItOWQwYi1iMTA3OTRkM2M1ZGQvc3R1ZGlvX21lc2gud2VicCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc3OTE0ODgwMH19fV19&Signature=RVObzftPe3EAMYVMhzOtvzclFwQAutjRxDba8BTq2xAKWUlAVL6ItAhbR6~xnTpBsCc40~45GnCWAtPvWfEJtKv5T5HLOtmCJyPlK3OkzMxHaR2XUC1y6ZIK~x3QHVq472Uuyl8ZYvdpSRtXPrEmfiGk1z7sfTQG4od2MKg7LpcvlNpVFLFNUzp3aOOaMH3cOghJOmJl1MBTbiKwlXbrcQb9NyI4OCJTxs0vDRpGwm~38~fhsIi~nycJY7kla9xB6gHOYZaidhIXgsQStGyYi-4A-KAp7uWx0yd1ABXirRPYrIc3GLsNLqUB5Mrk~m3ZH7NPhk-cZV3aUXWW07gQmA__","https:\u002F\u002Fvast-plugin-data.rg1.data.tripo3d.com\u002Ftripo-studio\u002F20250729\u002F31bec87d-0be6-497b-9d0b-b10794d3c5dd\u002Fstudio_mesh_gray.webp?Key-Pair-Id=K2T6H91Q55QW4F&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLnJnMS5kYXRhLnRyaXBvM2QuY29tL3RyaXBvLXN0dWRpby8yMDI1MDcyOS8zMWJlYzg3ZC0wYmU2LTQ5N2ItOWQwYi1iMTA3OTRkM2M1ZGQvc3R1ZGlvX21lc2hfZ3JheS53ZWJwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzc5MTQ4ODAwfX19XX0_&Signature=BPrRnzLR1C~TGYQYhVWSRY2ascT-HctmCLRZigKN7OsTZWLLz~gEBJiEHMg-qxq~gXKkYRN3a3XQuMCRXWYN1Uw2vme~9WVmzAuMlIWGbtePpnZxLbqQCkMoYGwMItUcHDJL3A1qYbMO-MDXetLJh-m1M3c7VqNYTB317ex4wJsGWRPRB8pnOF~oGoFOXsB2ZMWsOx6nihcIfdgamxBI0Vt0ixFpjEkatNWTdRlB-UUeklkIQIbFoqP6fKDsbiF7hTldd3ShkDj1~hhXcqBFX9aZ-hrqE6NnnQm9-BEY6dbVwYjGVFNlLtUBwZUitQTgVDDXv28KqdhxBdo1NJRxrA__","https:\u002F\u002Fvast-plugin-data.rg1.data.tripo3d.com\u002Ftripo-studio\u002F20250729\u002F31bec87d-0be6-497b-9d0b-b10794d3c5dd\u002Ftripo_pbr_model_31bec87d-0be6-497b-9d0b-b10794d3c5dd.glb?Key-Pair-Id=K2T6H91Q55QW4F&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLnJnMS5kYXRhLnRyaXBvM2QuY29tL3RyaXBvLXN0dWRpby8yMDI1MDcyOS8zMWJlYzg3ZC0wYmU2LTQ5N2ItOWQwYi1iMTA3OTRkM2M1ZGQvdHJpcG9fcGJyX21vZGVsXzMxYmVjODdkLTBiZTYtNDk3Yi05ZDBiLWIxMDc5NGQzYzVkZC5nbGIiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3NzkxNDg4MDB9fX1dfQ__&Signature=KvQ9cVeJ8rC5luWRam2dnDVaNYdUEncHMhBfcKt0TwhFhhk8NSO4qxCGEsqukyUaxnZB-QKGd3P2bPY~Jn4xWKD7LcrQF-3f5TI3pRaFgjl2YY~ycPv7m8YTXoOSXATH74~A2~QjuSJ-nlGIAz7n0jhhljEg7PJVTGXwuRya2LnYWWeRVSyNvm8PDxi~-nHWf6Lk0OtkasLaBpdgrNbeiaNTQb31J71YhshawPnAdJ3~FH2UxzR2GxK~uKb-4PkjRB8J-76eTdn3z8nW84cmK5q00dS8HqafDC1mBt~L~XUAmwrenZhATY1yrGzFNmaOoYTZm6~C15kNB4ZOIPEFtQ__",{"operator_id":402,"model_version":376,"model_url":400,"metadata":403,"status":245,"cover_image":409,"is_owner":62,"created_at":410,"updated_at":411,"type":412,"is_segmented":62,"is_textured":11,"is_rigged":62,"is_rigged_by_tripo":62,"is_stylized":62,"is_pbr":11,"is_hd_textured":62,"is_ultra_textured":62,"is_nexus_mesh":62,"is_nsfw":62,"content_risk_level":4,"image_to_model":413,"is_latest_operator":11},"31bec87d-0be6-497b-9d0b-b10794d3c5dd",{"transform_matrix":404,"children_transform_matrix":405,"children_deleted":406,"children_rename":407,"material_factor":408},[],{},[],{},{"metallic":393,"roughness":393},[398,399],1753758963,1753759097,"image_to_model",{"image":414,"style":4,"style_image":178,"prompt":416,"negative_prompt":178,"quad":62,"smart_poly":62,"face_limit":32,"texture":11,"pbr":11,"texture_quality":257,"texture_alignment":260,"generate_parts":178,"texture_seed":178,"geometry_quality":178,"visibility":4,"export_uv":178,"enable_image_autofix":178,"generate_image":417,"generate_image_object":419,"model_version":376},{"bucket":255,"key":415,"image_audit_result":178,"image_source":178},"tcli_6440f7102dab48c8bc26ca7882df997b\u002F20250729\u002Fe45fa93a-7167-438c-9287-fd0e38e15ccd\u002Finput.jpeg","A young girl wearing a rust-colored sweater and a denim skirt with a button-down design, standing with her arms outstretched in a relaxed pose.",[418],"https:\u002F\u002Fvast-plugin-data.rg1.data.tripo3d.com\u002Ftcli_6440f7102dab48c8bc26ca7882df997b\u002F20250729\u002Fe45fa93a-7167-438c-9287-fd0e38e15ccd\u002Finput.jpeg?Key-Pair-Id=K2T6H91Q55QW4F&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLnJnMS5kYXRhLnRyaXBvM2QuY29tL3RjbGlfNjQ0MGY3MTAyZGFiNDhjOGJjMjZjYTc4ODJkZjk5N2IvMjAyNTA3MjkvZTQ1ZmE5M2EtNzE2Ny00MzhjLTkyODctZmQwZTM4ZTE1Y2NkL2lucHV0LmpwZWciLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3NzkxNDg4MDB9fX1dfQ__&Signature=Au0qiiUe4IHJvweWSnro7rqZKaicb71vgRNR8dZhnbRtJi-Y95CnLUEXYB4pi5NVaWK-tSWPKpkN5o2S1RZ0fQDn2hkEW4h7NoESRpteqU8rMb-igPlsX10h0gMUhB3MwkYFCHfVbk7Q3Df7heuzr6djYshWXgZCffaT2kYQcYRugIsNeMDS1NE08~-bh9TvNh9Gpvn34OxXaPp7jQf2qPeK5khZuJomKVck8XNaY~frBjIBGJp~NfAWYua0Qv0Wc-UX3z8elLKrZPq5gAb39YWzpAYd3PBjJ3~3SgYcx3ZLc2eOpg20tqVoGz2QymGQyRtlU4H1lylFO1I2AZgotg__",[420],{"bucket":255,"key":415,"url":418},{"max_retries":32,"used_retries":32,"remaining_retries":32,"can_retry":62,"can_show_retry":62},{"id":423,"type":217,"project":424},"687f6b6b-3a8c-45af-97e9-d37d1ddbca8f",{"owner_name":425,"owner_avatar":426,"id":423,"project_name":423,"like_count":427,"collect_count":32,"liked":62,"collected":62,"type":101,"visibility":102,"biz_info":428,"custom_tags":429,"category":4,"style":4,"use_case":4,"is_featured":11,"cover_image":430,"is_nsfw":62,"content_risk_level":4,"model_url":433,"is_owner":62,"operator":434,"retry_info":454},"Roxie LI","https:\u002F\u002Fvast-plugin-data-public.rg1.data.tripo3d.com\u002Ftcli_6440f7102dab48c8bc26ca7882df997b\u002F20250520\u002Fa98991ab-d60b-4780-a5ce-d2917b36bdba\u002Finput.jpg?Key-Pair-Id=K2T6H91Q55QW4F&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLXB1YmxpYy5yZzEuZGF0YS50cmlwbzNkLmNvbS90Y2xpXzY0NDBmNzEwMmRhYjQ4YzhiYzI2Y2E3ODgyZGY5OTdiLzIwMjUwNTIwL2E5ODk5MWFiLWQ2MGItNDc4MC1hNWNlLWQyOTE3YjM2YmRiYS9pbnB1dC5qcGc~Zm9ybWF0PXdlYnBcdTAwMjZ3aWR0aD0xMjUiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3NzkxNDg4MDB9fX1dfQ__&Signature=Vpzmb8YBNOmKIhGLQc6xJY4VbKvrtslBc9Rz0DfS-1UcAMD2mkn~k2o8f1uGAWlSP862PpfA7~f41stAqyeiPTt997uq-~xJYsyWnk0ZPD0CdnGXiE-Vm5vFszljAGd1xPa71YFRecT729GjZ1rFxIWKG2c4lqLRFbHNWp3dxKcJMrkt2KsRVM96L70VqVYa3TByoNKimOLQbfqTlIkWMH5gArE0V-kxUa8NXH364YUgKRwpUA01iteK~csNSLEed1JTf0DkvanVsUJzHQYu5nxdhetVZ9-0kZZmOX-YRhUF9-LM8jf-ufrzl~nNh2tzI9kxVBRDWDoPcEPu4h~2Vg__&format=webp&width=125",4,{"description":4,"short_description":4,"display_image":4},[],[431,432],"https:\u002F\u002Fvast-plugin-data.rg1.data.tripo3d.com\u002Ftripo-studio\u002F20250522\u002Fa808a0fa-58c3-41a4-a050-4c541d6fbdd2\u002Fstudio_mesh.webp?Key-Pair-Id=K2T6H91Q55QW4F&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLnJnMS5kYXRhLnRyaXBvM2QuY29tL3RyaXBvLXN0dWRpby8yMDI1MDUyMi9hODA4YTBmYS01OGMzLTQxYTQtYTA1MC00YzU0MWQ2ZmJkZDIvc3R1ZGlvX21lc2gud2VicCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc3OTE0ODgwMH19fV19&Signature=RU~3N0Z05-6e-6nQbsnvEtloIYy~TdRemIASeBe2q3J4eC9pTQS07TyfUOTUAfr1hsMb8~Asd6CPLSw43yqdjWoZBcgsCk6BztO4F2K6tnqiUi~YJ5c4-MB13Oa0PJ1UsbgYnGogV5Vo~G5jwHTgwlLhxmH6DqOcH5qW76SSWoaNtgw0MZo6uXE9TpqoyUHfmtmuwqJ091gSbQdZfNiR5xhOn7TXCXBlMZFFEUrqP-eRH05F5JFb-nGPnIRFfpA4hdVd9pF1ftNfcTGxw4AGu9C9d3kWQaG7III6sNdTsIGqkl-9wTMitidRBSYwg-Yk1aU2r7lY5ynphWX29HMhGA__","https:\u002F\u002Fvast-plugin-data.rg1.data.tripo3d.com\u002Ftripo-studio\u002F20250522\u002Ffcc7bc32-4506-4858-93d6-ff09312077be\u002Fstudio_part.webp?Key-Pair-Id=K2T6H91Q55QW4F&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLnJnMS5kYXRhLnRyaXBvM2QuY29tL3RyaXBvLXN0dWRpby8yMDI1MDUyMi9mY2M3YmMzMi00NTA2LTQ4NTgtOTNkNi1mZjA5MzEyMDc3YmUvc3R1ZGlvX3BhcnQud2VicCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc3OTE0ODgwMH19fV19&Signature=UqAKzvFsoe52fQlT9Vjmzqol6p8srAGLNCnOkBu5hNyAH~X-p1XwQxVDU6rtrNydVabadi4piRwhH1dgbj3WP8TthOCqLUuZ2C-fC2Nxsw61WU9nWzs1WcPakPwQ2QrLEKPJZIbfuCNAsp3ot2xnaPXLVUIdIFWigJCph8z9tfTaZeUTpr2kWdSJ8rjcEpe1mmdoUjPxoHTKu2HR5yQDmlrMwS4Or5Ol4JNGqZ-uzUc6jgmy8OwZmYvk6vx3~9aWhh9-BOlMkiIZFQdqRos1DtiNzAHIhtxWQ-3SKZ-lwkcXI0AzJyOHagWBZwmFe7xuDqrj1KfVWteAtxOY9BHqFg__","https:\u002F\u002Fvast-plugin-data.rg1.data.tripo3d.com\u002Ftripo-studio\u002F20250522\u002Ffcc7bc32-4506-4858-93d6-ff09312077be\u002Ftripo_input_fcc7bc32-4506-4858-93d6-ff09312077be.glb?Key-Pair-Id=K2T6H91Q55QW4F&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLnJnMS5kYXRhLnRyaXBvM2QuY29tL3RyaXBvLXN0dWRpby8yMDI1MDUyMi9mY2M3YmMzMi00NTA2LTQ4NTgtOTNkNi1mZjA5MzEyMDc3YmUvdHJpcG9faW5wdXRfZmNjN2JjMzItNDUwNi00ODU4LTkzZDYtZmYwOTMxMjA3N2JlLmdsYiIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc3OTE0ODgwMH19fV19&Signature=jzoFjH6R7GZsvy9pjcfcSgyk4jI9sbguZlwNWqTvHbvvykrUUfwoHs-UDLjPUT0kpKcWazRxti2yCTIPDahwEzvc1elV22BnsKv4eGL9CCde4~AINEq40zXsl66SkCo83k4f1lhdrENqADH9NoQ3MnwIcdVl3zXxoSb7Klo6Eohhvnl5qKhztZaUj6hHpgnk8frFtipQvZbEPFPK83pt~XVR94K0MAyHgb4BhpMkXlsIG8TiNclgZ-hkFF1oB7wk5C9m9durWXI1RruMzk1j1EzOhk85cDEoyRAqSMjgda7speOfjd3Wqo7-P9fs5VGzj-CJr-uv~yrF2C~mt7c9xQ__",{"operator_id":435,"model_version":376,"model_url":433,"metadata":436,"status":245,"cover_image":442,"is_owner":62,"created_at":443,"updated_at":444,"type":445,"is_segmented":11,"is_textured":11,"is_rigged":62,"is_rigged_by_tripo":62,"is_stylized":62,"is_pbr":11,"is_hd_textured":62,"is_ultra_textured":62,"is_nexus_mesh":62,"is_nsfw":62,"content_risk_level":4,"image_to_model":446,"is_latest_operator":11},"fcc7bc32-4506-4858-93d6-ff09312077be",{"transform_matrix":437,"children_transform_matrix":438,"children_deleted":439,"children_rename":440,"material_factor":441},[],{},[],{},{"metallic":393,"roughness":393},[431,432],1747905524,1747905558,"modification",{"image":447,"style":4,"style_image":178,"prompt":449,"negative_prompt":178,"quad":62,"smart_poly":62,"face_limit":32,"texture":11,"pbr":11,"texture_quality":257,"texture_alignment":260,"generate_parts":178,"texture_seed":178,"geometry_quality":178,"visibility":4,"export_uv":178,"enable_image_autofix":178,"generate_image":450,"generate_image_object":452,"model_version":376},{"bucket":255,"key":448,"image_audit_result":178,"image_source":178},"tcli_6440f7102dab48c8bc26ca7882df997b\u002F20250522\u002F57dab8b7-f779-4949-93e0-f8c9c4a3f2bf\u002Finput.png","Heavily-armored futuristic tank-like military vehicle with a prominent turret cannon and tracked treads for improved mobility and terrain traversal.",[451],"https:\u002F\u002Fvast-plugin-data.rg1.data.tripo3d.com\u002Ftcli_6440f7102dab48c8bc26ca7882df997b\u002F20250522\u002F57dab8b7-f779-4949-93e0-f8c9c4a3f2bf\u002Finput.png?Key-Pair-Id=K2T6H91Q55QW4F&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLnJnMS5kYXRhLnRyaXBvM2QuY29tL3RjbGlfNjQ0MGY3MTAyZGFiNDhjOGJjMjZjYTc4ODJkZjk5N2IvMjAyNTA1MjIvNTdkYWI4YjctZjc3OS00OTQ5LTkzZTAtZjhjOWM0YTNmMmJmL2lucHV0LnBuZyIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc3OTE0ODgwMH19fV19&Signature=cJJwlJyHwr4kVW39K8Tv6MX8~OoBghfsHU4NUb7DqxT57uFCNY8zY9uPhFDTc8TBQCtGMu7YUpvFbPsXa4sGmtZQer-pRxyu01j3OAAAslvocXY7OXZlvnACKGDaYU~SGeQN5pLfh3JMRA78cXSmwE6Nfxn-dWCY4YXxTBAM5hxxy80Sv5zM0Gwwc7cPBtVyKutN26RV18uzv2lieA2Qb6z4u8JJl0riAgaWgcFMRlNc0joq3Ntb3k1bqEKSXtoIVGAPkSs-3o5nwOqTFGLuzjo99KrRiWFNc~9UcrjhN8B6T8Xe9QbkZTxR0TJQFv-0PXvHavKmDMQR9hU46Zr7XA__",[453],{"bucket":255,"key":448,"url":451},{"max_retries":32,"used_retries":32,"remaining_retries":32,"can_retry":62,"can_show_retry":62},{"id":456,"type":217,"project":457},"e33fd5ec-1032-49bc-81ac-cf0e1acbdddf",{"owner_name":425,"owner_avatar":426,"id":456,"project_name":456,"like_count":336,"collect_count":336,"liked":62,"collected":62,"type":101,"visibility":102,"biz_info":458,"custom_tags":459,"category":4,"style":4,"use_case":4,"is_featured":11,"cover_image":460,"is_nsfw":62,"content_risk_level":4,"model_url":463,"is_owner":62,"operator":464,"retry_info":487},{"description":4,"short_description":4,"display_image":4},[],[461,462],"https:\u002F\u002Fvast-plugin-data.rg1.data.tripo3d.com\u002Ftripo-studio\u002F20250522\u002Fda0329e8-25fc-4cdb-9289-423c234b4e6d\u002Fstudio_mesh.webp?Key-Pair-Id=K2T6H91Q55QW4F&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLnJnMS5kYXRhLnRyaXBvM2QuY29tL3RyaXBvLXN0dWRpby8yMDI1MDUyMi9kYTAzMjllOC0yNWZjLTRjZGItOTI4OS00MjNjMjM0YjRlNmQvc3R1ZGlvX21lc2gud2VicCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc3OTE0ODgwMH19fV19&Signature=grMBgXoveGpvgLgRM48dt5JJEJ8rJB5Fy7nyYf8UAuKTLoAEa1esY6sLC~TzGsLaM5Oygjvd5aAY3XXf1grhAocenJu2Vzibpi9-2WvnnntJ2z7n094YX1Uii1GLaEy4iXXmVSejfRQ1~FwY0GJYyX9mcJCfnAL0ylYWXbU2Whp2vuPL99kJuVt4WggFZ27aDvdA6A~pTt0mUrKcSsPO9croJt1Dzj4TVb3aK2tsEUipPHpFBDByf8H~PdY0vd0-tPDG82L3g34DeGaYsV~dfg7uKsvesM-WL9uJRyzQRKS758h07rxmshL6HAtsI~d3DOrAEaAGYdIum9smOBhTLg__","https:\u002F\u002Fvast-plugin-data.rg1.data.tripo3d.com\u002Ftripo-studio\u002F20250522\u002Fa81e1959-84ed-4de8-83db-9c7835c2549d\u002Fstudio_part.webp?Key-Pair-Id=K2T6H91Q55QW4F&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLnJnMS5kYXRhLnRyaXBvM2QuY29tL3RyaXBvLXN0dWRpby8yMDI1MDUyMi9hODFlMTk1OS04NGVkLTRkZTgtODNkYi05Yzc4MzVjMjU0OWQvc3R1ZGlvX3BhcnQud2VicCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc3OTE0ODgwMH19fV19&Signature=I7kkE-sJ1bNCvFvm2GFGQHyJowC1Qnx-RYDseYbVml2pTP2d5VEfTzFS6ydGlIBKY5PPxSLx4swxAP2PT~Is9luP30aWvjNP4xCWKugnC~Z~9A60M3qeZcYz0-Id8jJ2w1I-llqu10ofZwbvKSHnxVM7baxFmySaJ47AfkDHoOxj-6BmJdUqo5xELjhynyHCvnmD2FVUx2lXxOP29PifAMBziD0OH82hf-OWa0hFBSxi1PtpafAsPMuTM33snwYjR0wEUuSxAP7Hzun-tuJB3n5xj0mS4pZwXprWeWCW6xSm3sklbPhuASTWBke-n6oBjApoCBiUnfFY5SszxNxpCA__","https:\u002F\u002Fvast-plugin-data.rg1.data.tripo3d.com\u002Ftripo-studio\u002F20250522\u002Fa81e1959-84ed-4de8-83db-9c7835c2549d\u002Ftripo_input_a81e1959-84ed-4de8-83db-9c7835c2549d.glb?Key-Pair-Id=K2T6H91Q55QW4F&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLnJnMS5kYXRhLnRyaXBvM2QuY29tL3RyaXBvLXN0dWRpby8yMDI1MDUyMi9hODFlMTk1OS04NGVkLTRkZTgtODNkYi05Yzc4MzVjMjU0OWQvdHJpcG9faW5wdXRfYTgxZTE5NTktODRlZC00ZGU4LTgzZGItOWM3ODM1YzI1NDlkLmdsYiIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc3OTE0ODgwMH19fV19&Signature=mjrSigoFfeXJUo4t0nF8l2vkTB-r-jmJRtr4NUX4se7EY63Wno9weLUH1fW9e7nn4DNrNHP7GfsEmnQKAw1Yh-74Sd5ze388kwkcaLdf6xTtJEGJBef6FnARNzZ0rnoRqoZi5FWBT9p1E4QDphiqelE2lHk7cUZzOAaGlrASE1HKYOSgxy4LYnZEivp-c7Wg4G4~necoJ01HD6RRyUNfSKmJtYdYYqJoKBZBNAh4uv6tbGHoi9ztx2no5jjW~ElGV3KyXvy6pJbKVd3ubkN42nPhwIVzQQlMkkFPMqu7PkdhGwpSCs8TY3q1njmZXqAgTRugbzDk6AQ8n669wNs35g__",{"operator_id":465,"model_version":376,"model_url":463,"metadata":466,"status":245,"cover_image":472,"is_owner":62,"created_at":473,"updated_at":474,"type":445,"rigging":475,"is_segmented":11,"is_textured":11,"is_rigged":11,"is_rigged_by_tripo":11,"is_stylized":62,"is_pbr":11,"is_hd_textured":62,"is_ultra_textured":62,"is_nexus_mesh":62,"is_nsfw":62,"content_risk_level":4,"image_to_model":479,"is_latest_operator":11},"a81e1959-84ed-4de8-83db-9c7835c2549d",{"transform_matrix":467,"children_transform_matrix":468,"children_deleted":469,"children_rename":470,"material_factor":471},[],{},[],{},{"metallic":393,"roughness":393},[461,462],1747906299,1747906324,{"operator_id":476,"id":476,"status":245,"type":477,"model_url":478},"aeac45e8-4917-4457-b69f-5bb9c39d890b","biped","https:\u002F\u002Fvast-plugin-data.rg1.data.tripo3d.com\u002Ftripo-studio\u002F20250522\u002Faeac45e8-4917-4457-b69f-5bb9c39d890b\u002Ftripo_rigging_aeac45e8-4917-4457-b69f-5bb9c39d890b.glb?Key-Pair-Id=K2T6H91Q55QW4F&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLnJnMS5kYXRhLnRyaXBvM2QuY29tL3RyaXBvLXN0dWRpby8yMDI1MDUyMi9hZWFjNDVlOC00OTE3LTQ0NTctYjY5Zi01YmI5YzM5ZDg5MGIvdHJpcG9fcmlnZ2luZ19hZWFjNDVlOC00OTE3LTQ0NTctYjY5Zi01YmI5YzM5ZDg5MGIuZ2xiIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzc5MTAwNTM3fX19XX0_&Signature=vx0Ki78FcplA84-vjdMo2BrJ2szEXGA5BRmelhJkCOJ5mVooVt9dZFeTU0d3oHdkZIcvbcrIB8GTmKX-mGFVUDC7f6-XgzAUJAe6XH-4Fxo83McbYK596uJzNYYGN88nL-mqdJEpwK7W-SWLfEqIOseucA3Ihzfj5BBCc1FBHuS19CJ3lodxGQHWG8yvF7dhZi6k-3XsLcd8wfYZhqTL8u89s3N6pN78dtnHefaTGGABuBaANgdD7CNpoAXAgKdiqLpK4z~ZdnIQOeCIMk2OXTyphTuvW9-lJvs6rBFsSjrYLwwW7IR2aW~bB42qf0Ph8F1ZRaK-OSxBEnBE3O4W5A__",{"image":480,"style":4,"style_image":178,"prompt":482,"negative_prompt":178,"quad":62,"smart_poly":62,"face_limit":32,"texture":11,"pbr":11,"texture_quality":257,"texture_alignment":260,"generate_parts":178,"texture_seed":178,"geometry_quality":178,"visibility":4,"export_uv":178,"enable_image_autofix":178,"generate_image":483,"generate_image_object":485,"model_version":376},{"bucket":255,"key":481,"image_audit_result":178,"image_source":178},"tcli_6440f7102dab48c8bc26ca7882df997b\u002F20250522\u002Fef3cd735-74ff-474d-b91e-0d1ffe356938\u002Finput.png","Detailed golden mechanical robot figure with a spherical central body and articulated limbs, featuring a sleek, futuristic design with advanced technological components.",[484],"https:\u002F\u002Fvast-plugin-data.rg1.data.tripo3d.com\u002Ftcli_6440f7102dab48c8bc26ca7882df997b\u002F20250522\u002Fef3cd735-74ff-474d-b91e-0d1ffe356938\u002Finput.png?Key-Pair-Id=K2T6H91Q55QW4F&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLnJnMS5kYXRhLnRyaXBvM2QuY29tL3RjbGlfNjQ0MGY3MTAyZGFiNDhjOGJjMjZjYTc4ODJkZjk5N2IvMjAyNTA1MjIvZWYzY2Q3MzUtNzRmZi00NzRkLWI5MWUtMGQxZmZlMzU2OTM4L2lucHV0LnBuZyIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc3OTE0ODgwMH19fV19&Signature=VBpXr7uZgAIL63zXwPVIG18MNWZIjUdB8E8cJEC2GMxPnC-FSDvN5tzgBQA~xJ7wyE7dQuMxN0ICh1mP6PkiWgg8KAckTss-32k8qxZ-hRQ~dQ4koeqnW8li6hgcT0~VMsoBGgaj9We1gZnPTdkwzqDYNSGVS~PvycNA1iY1DLq4szDc~SizznT~GFx9i1Esza3I~qJMa5rUk79R1HUvJOA~~itQAXZao3KwaFz4e51nOBV35F345hy9lpob8BkEvlx-49qV2EHKcQW8YQK6ok16~ie0KuiV48ndyXtfDTEsdVp04krNuu4tNlNcpLq~6nWcSMabHni5vAEYh70iqg__",[486],{"bucket":255,"key":481,"url":484},{"max_retries":32,"used_retries":32,"remaining_retries":32,"can_retry":62,"can_show_retry":62},{"id":489,"type":217,"project":490},"a8d31a75-5083-465d-972b-cf63c7229fac",{"owner_name":491,"owner_avatar":492,"id":489,"project_name":489,"like_count":222,"collect_count":32,"liked":62,"collected":62,"type":493,"visibility":102,"biz_info":494,"custom_tags":495,"category":4,"style":4,"use_case":4,"is_featured":11,"cover_image":496,"is_nsfw":62,"content_risk_level":4,"model_url":499,"is_owner":62,"operator":500,"retry_info":511},"Yi Song ","https:\u002F\u002Fvast-plugin-data-public.rg1.data.tripo3d.com\u002Ftcli_6440f7102dab48c8bc26ca7882df997b\u002F20241206\u002Fcc08a424-6996-46c3-b4df-85bbf43efbbe\u002Finput.jpeg?Key-Pair-Id=K2T6H91Q55QW4F&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLXB1YmxpYy5yZzEuZGF0YS50cmlwbzNkLmNvbS90Y2xpXzY0NDBmNzEwMmRhYjQ4YzhiYzI2Y2E3ODgyZGY5OTdiLzIwMjQxMjA2L2NjMDhhNDI0LTY5OTYtNDZjMy1iNGRmLTg1YmJmNDNlZmJiZS9pbnB1dC5qcGVnP2Zvcm1hdD13ZWJwXHUwMDI2d2lkdGg9MTI1IiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzc5MTQ4ODAwfX19XX0_&Signature=k4TUf-z-nBxfq~LVS4fGyLLjnK81kuRnrwjAhj4K2yA9Li8fZNhnvcRsn1ju48HHQtyfKwF-ha8AFufsCAaYdMSQ8geE5CI~fk~uagtLOnyiN9sRNN7d-ZlUjFdJTPt8NOrIY4lUO2MtGA~AGWaRcMrZpEOJa4mAuF-QZXZFlwpptJyNorb-wkzm1rzy7RYWtJzr05~b8dYPdW2Pce-c4uLH9mAnSccPX~-108VfCDDmTA07dwvKO-fc8liGQSKORmWMSuE0tq9Wf-gkgttTeyNCZWD0grcdW9LlbEZ9UaPNlcZvUgirIRY6956WxJJPzfE1-R60XkfrzN1Cq2hmSQ__&format=webp&width=125","fork",{"description":4,"short_description":4,"display_image":4},[],[497,498],"https:\u002F\u002Fvast-plugin-data.rg1.data.tripo3d.com\u002Ftripo-studio\u002F20250704\u002Ffb874c6e-5d8e-4b21-8aaf-88e8aa53a1a7\u002Fstudio_mesh.webp?Key-Pair-Id=K2T6H91Q55QW4F&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLnJnMS5kYXRhLnRyaXBvM2QuY29tL3RyaXBvLXN0dWRpby8yMDI1MDcwNC9mYjg3NGM2ZS01ZDhlLTRiMjEtOGFhZi04OGU4YWE1M2ExYTcvc3R1ZGlvX21lc2gud2VicCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc3OTE0ODgwMH19fV19&Signature=v9t9AhsMGKVLP6GpYmEZrVWAZHKPdoxT6EVtJgJ5xP7bU1efs~Yb17cPo8nPNFJugKpKl~v~hx6CNOUHzQUCd2wVFXBsCXG-oJk0IBeViBjPrY~IMYkQQVPSMfqg743Atu72d7OuOWbUG2F90prbai9PHnMpZs76SEINqE~isNugnnz367dFTqVcVodPDYzPf6KAVDuGCDQFFgrffwnkA6E6qo3sepMRIMgAIGD1yEcw8yE-FBIygNcUECcSu63Sy~maBnfNR4qbLAYHeMGhypG-Cd4h~bRCtAl25PvdIvyTzLk2jN-Tfb8MMYtj9za0tqvDMvgwSpBMQYxYvfTbNw__","https:\u002F\u002Fvast-plugin-data.rg1.data.tripo3d.com\u002Ftripo-studio\u002F20250704\u002Ffb874c6e-5d8e-4b21-8aaf-88e8aa53a1a7\u002Fstudio_mesh_gray.webp?Key-Pair-Id=K2T6H91Q55QW4F&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLnJnMS5kYXRhLnRyaXBvM2QuY29tL3RyaXBvLXN0dWRpby8yMDI1MDcwNC9mYjg3NGM2ZS01ZDhlLTRiMjEtOGFhZi04OGU4YWE1M2ExYTcvc3R1ZGlvX21lc2hfZ3JheS53ZWJwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzc5MTQ4ODAwfX19XX0_&Signature=IW443pwEvvmtKRRSgLxDcYoio54xBFe28bSVACG-GZ3kY1uKI5utXxgL921i84iMb4fLY7O4QRmcswOtt-EN78eiJRlQ6sPeaO1yuN8ADxawwqjJIFmFS7AtlynnRf7wu1ls2doU5IrUjV4udpZmQWZa-JsbxPajqxTHdRZBfUTAyV1pz5sRG7V1KMsQFBnihpfxe0YPRlx15NnP1p3Cd2iQuk~cMg5~gb0KWZ6qBA-Y~nyPPdsZGtQkBU0PLODr6mDmC-WO44fJwkMh3XMvVuzK6JZR5xV85LZfFFcR6Pg1frTY5Ynetj0lMOHSy-vqq8K9PVs9xjGDokKnLmPfJQ__","https:\u002F\u002Fvast-plugin-data.rg1.data.tripo3d.com\u002Ftripo-studio\u002F20250704\u002F6f8080c7-705d-49c3-8db4-295089252936\u002Fpro_refine_6f8080c7-705d-49c3-8db4-295089252936.glb?Key-Pair-Id=K2T6H91Q55QW4F&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLnJnMS5kYXRhLnRyaXBvM2QuY29tL3RyaXBvLXN0dWRpby8yMDI1MDcwNC82ZjgwODBjNy03MDVkLTQ5YzMtOGRiNC0yOTUwODkyNTI5MzYvcHJvX3JlZmluZV82ZjgwODBjNy03MDVkLTQ5YzMtOGRiNC0yOTUwODkyNTI5MzYuZ2xiIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzc5MTQ4ODAwfX19XX0_&Signature=D9eBsHjL-QELfYtsV9Pp9aTwWXfOXu7bTZJShd3YnJAONQo7~GcQ2RSM4s73pATP~6rd9yiUfm-ViEuYKGtWDnPW9Mo99ZeWOPwiUip1LR9~RR1g9SyLmKmrlWCG62K7QaHH7t9t2gUCi69MSLGHtmMoPCDuQBoLOCGmm2sf0BjBdqebQNt4CoGmXmT0E8XoyLJEcYo6NPhi0u58bOobn~cAMtfcTE1EwOS2lAAF0wf8Zyy-kmHNgDzFnrT-K~dmpQ64OkbofPd6GuJhpmrovWdrzvFSRQOz70kxYuXfFOXDQjWoZfrvc9~V8PXJ1kZuM8zst1V6uPBG9hSBDNeQ-A__",{"operator_id":501,"model_version":376,"model_url":499,"metadata":502,"status":245,"cover_image":508,"is_owner":62,"created_at":509,"updated_at":509,"type":510,"is_segmented":62,"is_textured":62,"is_rigged":62,"is_rigged_by_tripo":62,"is_stylized":62,"is_pbr":62,"is_hd_textured":62,"is_ultra_textured":62,"is_nexus_mesh":62,"is_nsfw":62,"content_risk_level":4,"is_latest_operator":11},"6f8080c7-705d-49c3-8db4-295089252936",{"transform_matrix":503,"children_transform_matrix":504,"children_deleted":505,"children_rename":506,"material_factor":507},[],{},[],{},{"metallic":32,"roughness":99},[497,498],1751622872,"pro_refine",{"max_retries":32,"used_retries":32,"remaining_retries":32,"can_retry":62,"can_show_retry":62},{"id":513,"type":217,"project":514},"b4e80afa-c0a3-4e56-b829-c77e01e0f112",{"owner_name":515,"owner_avatar":516,"id":513,"project_name":513,"like_count":223,"collect_count":393,"liked":62,"collected":62,"type":101,"visibility":319,"biz_info":517,"custom_tags":519,"category":4,"style":4,"use_case":4,"is_featured":11,"cover_image":520,"is_nsfw":62,"content_risk_level":4,"model_url":523,"is_owner":62,"operator":524,"retry_info":563},"MYTYPE","https:\u002F\u002Fvast-plugin-data-public.rg1.data.tripo3d.com\u002Ftcli_6440f7102dab48c8bc26ca7882df997b\u002F20250522\u002F1b9284ca-cc8d-4788-989f-f22adc390457\u002Finput.jpeg?Key-Pair-Id=K2T6H91Q55QW4F&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLXB1YmxpYy5yZzEuZGF0YS50cmlwbzNkLmNvbS90Y2xpXzY0NDBmNzEwMmRhYjQ4YzhiYzI2Y2E3ODgyZGY5OTdiLzIwMjUwNTIyLzFiOTI4NGNhLWNjOGQtNDc4OC05ODlmLWYyMmFkYzM5MDQ1Ny9pbnB1dC5qcGVnP2Zvcm1hdD13ZWJwXHUwMDI2d2lkdGg9MTI1IiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzc5MTQ4ODAwfX19XX0_&Signature=KzlwEV7pWKkp~0cEI5iuh6z8KfgX6yE-4WZbn8~9FStYXIpe~6-jR6iIyYcI~qxSbFFZp55QZrAAUtkosgboBqgLt1TkMH-Talnz8VbQY7zeL-mMdx4JOL3wWIzIXFbMt8DNMaCd24JLdftmQ2voePsIdxjNNhO8cMdBQgH9MXjCF2Ee78vF8JsZrNTVS3LJCANp3x71wWFk20dgqhwy2CZgSI-QKcDSXR7hpbi7Snuulu06EHHi0quSL8~hDITuqFNrJukS9Z2ZFvWVEjMbc-5dCtbxcwZaqcVI1ZABnyvOUHoyrgZdgbrrG1q6O45zPcXJRdN~JqKcyi2GI59oIA__&format=webp&width=125",{"description":4,"short_description":4,"display_image":518},"https:\u002F\u002Ftripo-public-test.tripo3d.ai\u002Fstudio\u002Fproject\u002Fb4e80afa-c0a3-4e56-b829-c77e01e0f112\u002Fdisplay.webp",[],[521,522],"https:\u002F\u002Fvast-plugin-data.rg1.data.tripo3d.com\u002Ftripo-studio\u002F20260516\u002Fc5e1ae7f-ab7d-4ebf-96f2-8d833deb4f11\u002Fstudio_mesh.webp?Key-Pair-Id=K2T6H91Q55QW4F&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLnJnMS5kYXRhLnRyaXBvM2QuY29tL3RyaXBvLXN0dWRpby8yMDI2MDUxNi9jNWUxYWU3Zi1hYjdkLTRlYmYtOTZmMi04ZDgzM2RlYjRmMTEvc3R1ZGlvX21lc2gud2VicCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc3OTE0ODgwMH19fV19&Signature=ob~O3djeL5sxjye2VJFOj8pLtD6gV5a4Wmi9yURJwKNyVUPdy6cw7gUCe8JduEqNlalrORGKFx-VcML~OIsL0e8gOImR9ueG4DglPGN6csDLUR2mxnXaDAcufrDVTYcgGztT8kxEMW1brvzWx2JoCx8BR9Yj9cTAy-h7ufaU9DOkxo99MQ6T2SYUjTZjqaSPAGjpgSciCGQPlsoKpPDts7-DajA0upVYNQyNuUw-l1ePJrnNuSYMXeyCdD5WsluRNnF3bAcTsfP1LkhRXmkjk0Dd0lqZ3JUJJAhwkHG0oRPm5VaYhoa60e9FpqXFdXrJOqQAOOaTnbKr~Lwj1LIFzA__","https:\u002F\u002Fvast-plugin-data.rg1.data.tripo3d.com\u002Ftripo-studio\u002F20250520\u002F14e99d5d-e7a3-4058-85a0-9dc568f2e3d1\u002Fstudio_part.webp?Key-Pair-Id=K2T6H91Q55QW4F&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLnJnMS5kYXRhLnRyaXBvM2QuY29tL3RyaXBvLXN0dWRpby8yMDI1MDUyMC8xNGU5OWQ1ZC1lN2EzLTQwNTgtODVhMC05ZGM1NjhmMmUzZDEvc3R1ZGlvX3BhcnQud2VicCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc3OTE0ODgwMH19fV19&Signature=jY~6Omjw4QE9PHV5FjGpSZSCE~8QTsnM0zkOXyjLzgZc6oxTMq4olikTtz3rz6knGpD8rQ8CJv8NXvSVObi2C8neIYwlSE0DsEkRBlYXFlYKegnta0t3hiUrl8tJDWmKNFUqSuj28BLF~Ft3Shi4JDPYlrDSoszMwJVWHecU-cE8mrJ0h9rYjXNkgtuxtjZjlwHNcFivcQ9bYTtrhUN0lmZGakKKhfE2-2Mnr2iRDdtvn6GjzV-Pl4r2LXIs~siKeXeSy7R9vnChKkvjht5vDM9BdpoTPB2wqEHQcktOYUnkp4DCg53PFidMV5PO8MOt1UZuSvdenoduR90gZSmsOA__","https:\u002F\u002Fvast-plugin-data.rg1.data.tripo3d.com\u002Ftripo-studio\u002F20260516\u002Fc5e1ae7f-ab7d-4ebf-96f2-8d833deb4f11\u002Ftripo_texture_c5e1ae7f-ab7d-4ebf-96f2-8d833deb4f11_meshopt.glb?Key-Pair-Id=K2T6H91Q55QW4F&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLnJnMS5kYXRhLnRyaXBvM2QuY29tL3RyaXBvLXN0dWRpby8yMDI2MDUxNi9jNWUxYWU3Zi1hYjdkLTRlYmYtOTZmMi04ZDgzM2RlYjRmMTEvdHJpcG9fdGV4dHVyZV9jNWUxYWU3Zi1hYjdkLTRlYmYtOTZmMi04ZDgzM2RlYjRmMTFfbWVzaG9wdC5nbGIiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3NzkxNDg4MDB9fX1dfQ__&Signature=X7mH3XFhBY-GKo5njAV795fpPZWc7Ptiy11lDY5JfYEiqA-IKLfWYbrqvyLt0WFE2bVpxo9i1pygBlNEIQ3rEIfpsSzBRrmzpuA3mjPVHQF3CIMCb58cWS2PDNMFGx-MgbqGyNKuvOuy95F7Wk3wbveEsJ8dtDwobw2fZfy~1-Fi4D7s21JeuTJEq-Yb3bQJrXfqcXRu7GfFslAzqxgMEZREvJBTu49FRgMfW-xhFhhFYiI~nHX-dJQcVxe5aK1039fpYaoPi5vO3vNvh7a3iAA2uZXobm6DCMJ8kIodRgNpEX6Afz3ONMS13BljBYXqrXn5F05Et6UiItpnOmbS5g__",{"operator_id":525,"model_version":238,"model_url":523,"metadata":526,"status":245,"cover_image":532,"is_owner":62,"created_at":533,"updated_at":248,"type":249,"texture":534,"is_segmented":11,"is_textured":11,"is_rigged":62,"is_rigged_by_tripo":62,"is_stylized":62,"is_pbr":62,"is_hd_textured":11,"is_ultra_textured":62,"is_nexus_mesh":62,"is_nsfw":62,"content_risk_level":4,"image_to_model":549,"texture_generation":557,"is_latest_operator":11},"c5e1ae7f-ab7d-4ebf-96f2-8d833deb4f11",{"transform_matrix":527,"children_transform_matrix":528,"children_deleted":529,"children_rename":530,"material_factor":531},[],{},[],{},{"metallic":32,"roughness":99},[521,522],1778927682,{"operator_id":525,"id":525,"status":245,"generate_image":535,"generate_image_object":537,"texture_quality":257,"part_names":540,"texture_alignment":260},[536],"https:\u002F\u002Fvast-plugin-data.rg1.data.tripo3d.com\u002Ftripo-studio\u002F20260516\u002F025529b6-9576-4295-84b8-372014ec9da1\u002Finput.png?Key-Pair-Id=K2T6H91Q55QW4F&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLnJnMS5kYXRhLnRyaXBvM2QuY29tL3RyaXBvLXN0dWRpby8yMDI2MDUxNi8wMjU1MjliNi05NTc2LTQyOTUtODRiOC0zNzIwMTRlYzlkYTEvaW5wdXQucG5nIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzc5MTQ4ODAwfX19XX0_&Signature=qWSxUWWZUMNQdIQeAD7U5SiJiDHHHAZVzMnj7dyLuwmsC9KvOvy6Q936OvWaAWksSYDwV348t6iBbW3QbBaCQKH5cAw7p73sJlfNtpdbN5J9lu75ERgyFKVfcudGoexYizYKi3zli~eMaHLauytO7eGSJw8RYxZ5l~4oXwFFguHVVkCU8AQXrysgw-LswQis511QtvEPM1vSVFJtc8pH3aAV-tO75mPYW8PsK1R1MYPW1KEdxSQc3O0KDNlgHhVzZi3jQK4p2g1UZ4cXaXjtKMTJeXRb3vAufpz64Ihjs6VoL66lwxrsXPWGaF~56jfkXryDNuKaW7ztWHmWmlHTow__",[538],{"bucket":255,"key":539,"url":536},"tripo-studio\u002F20260516\u002F025529b6-9576-4295-84b8-372014ec9da1\u002Finput.png",[541,542,543,544,545,546,547,548],"tripo_part_15","tripo_part_14","tripo_part_11","tripo_part_9","tripo_part_8","tripo_part_7","tripo_part_5","tripo_part_4",{"image":550,"style":552,"style_image":178,"prompt":4,"negative_prompt":178,"quad":62,"smart_poly":62,"face_limit":32,"texture":11,"pbr":11,"texture_quality":257,"texture_alignment":260,"generate_parts":178,"texture_seed":178,"geometry_quality":178,"visibility":4,"export_uv":178,"enable_image_autofix":178,"generate_image":553,"generate_image_object":555,"model_version":376},{"bucket":255,"key":551,"image_audit_result":178,"image_source":178},"tcli_6440f7102dab48c8bc26ca7882df997b\u002F20250520\u002Fbe6ef58f-7753-4983-8c9f-e081413a7cec\u002Finput.jpeg","person:person2cartoon",[554],"https:\u002F\u002Fvast-plugin-data.rg1.data.tripo3d.com\u002Ftcli_6440f7102dab48c8bc26ca7882df997b\u002F20250520\u002Fbe6ef58f-7753-4983-8c9f-e081413a7cec\u002Finput.jpeg?Key-Pair-Id=K2T6H91Q55QW4F&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLnJnMS5kYXRhLnRyaXBvM2QuY29tL3RjbGlfNjQ0MGY3MTAyZGFiNDhjOGJjMjZjYTc4ODJkZjk5N2IvMjAyNTA1MjAvYmU2ZWY1OGYtNzc1My00OTgzLThjOWYtZTA4MTQxM2E3Y2VjL2lucHV0LmpwZWciLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3NzkxNDg4MDB9fX1dfQ__&Signature=N-HyNGPb0jDO3z7Uxj~RGnp6sGpj55HDlJnWnDnFcfBK6aFJOuOuxQxfNbNgtwwhmBo0xtoe90bFjTh88r6ufnpF~FMyXrzhZdzF~p3cWkY0rQrol3HTXHWKwU1Cy7c5WkFmY1oF~DIPU6Lz-fLGXB83GF3hFCikch3nSEb55G24a4gDUi3DV5Zknb2T9eReIBdaLSyxPZDU1Bk-pa7~rX2m5xXNaG1~pwGCP0~O3VXluKg~~IIUVpWXpcakfybVG6smp8yokxGjj0Lt27WqYDis0cQGSP2s1Cs8KAwqHJwZD5V8P8IqUWdgB52KrcFW~ByYy2WyNAeq6KO7~DLj1Q__",[556],{"bucket":255,"key":551,"url":554},{"project_id":513,"texture_quality":257,"texture_alignment":260,"part_names":558,"texture_seed":178,"image":559,"generate_image":560,"generate_image_object":561,"model_version":238},[541,542,543,544,545,546,547,548],{"bucket":255,"key":539,"image_audit_result":264,"image_source":265},[536],[562],{"bucket":255,"key":539,"url":536},{"max_retries":32,"used_retries":32,"remaining_retries":32,"can_retry":62,"can_show_retry":62},{"id":565,"type":217,"project":566},"49f9543b-81a3-434f-b384-cb4d7bf854f6",{"owner_name":515,"owner_avatar":516,"id":565,"project_name":565,"like_count":32,"collect_count":393,"liked":62,"collected":62,"type":101,"visibility":319,"biz_info":567,"custom_tags":568,"category":4,"style":4,"use_case":4,"is_featured":11,"cover_image":569,"is_nsfw":62,"content_risk_level":4,"model_url":572,"is_owner":62,"operator":573,"retry_info":602},{"description":4,"short_description":4,"display_image":4},[],[570,571],"https:\u002F\u002Fvast-plugin-data.rg1.data.tripo3d.com\u002Ftripo-studio\u002F20250520\u002F593187c7-b9ea-402e-b1a8-a6124aab1f47\u002Fstudio_mesh.webp?Key-Pair-Id=K2T6H91Q55QW4F&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLnJnMS5kYXRhLnRyaXBvM2QuY29tL3RyaXBvLXN0dWRpby8yMDI1MDUyMC81OTMxODdjNy1iOWVhLTQwMmUtYjFhOC1hNjEyNGFhYjFmNDcvc3R1ZGlvX21lc2gud2VicCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc3OTE0ODgwMH19fV19&Signature=pGnaTkt63kSChaH3e8appMIM0nxJk4x9xjti5V4SboXI9k2BcRVd1xyH5yLL7L2uhRpljTbOf2aPfQYHRrPKXZVRuQVyBDXU7PewXKNIF7FpwTonLbnUBDNLgchpDqoeeZZpGYOjdyQSvMAIABAXfjcvLTUzCyB3zH550TNb~wwgZI-SaqtajBGvNPbNTApqo63DxFX9yw7D1jRUyoSdalr7gvWJA3Qnq2JzTuQlaoekw-Xi3iNegX~Nhjj88VqJmRy5eeY6h-5fQQjS0RUnI7tEjNNHVUzEMELXq-CCzGSHJM3VgeEPlT-JIbU8IJKzPdLGMtvVd3v4OpWQ3wBhyw__","https:\u002F\u002Fvast-plugin-data.rg1.data.tripo3d.com\u002Ftripo-studio\u002F20250520\u002Fb0db5514-472d-41d4-866b-61fb43f633d6\u002Fstudio_part.webp?Key-Pair-Id=K2T6H91Q55QW4F&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLnJnMS5kYXRhLnRyaXBvM2QuY29tL3RyaXBvLXN0dWRpby8yMDI1MDUyMC9iMGRiNTUxNC00NzJkLTQxZDQtODY2Yi02MWZiNDNmNjMzZDYvc3R1ZGlvX3BhcnQud2VicCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc3OTE0ODgwMH19fV19&Signature=tiDwmpmViJr24cIbZmTsJ0XXQNJnhaMt8uJ2AU78h0nYfLGkk-aX1johputrx96ZbFaaUPL-9r1bTlcDCQ~sTpRJ4snC5ZH3gvpnDMuT3XWJn4jC-DO5akPf~XxooWR8Igqa2~ALU~Uiw0PMAb9r488P2n46dwIcnEILnaxj~sEouG93WbPxAH3lzOQDfWjDxA3cMObjZNPdLeVhtjBwjUa3-05Yig8kZ0s2qBqHwniVJEmxKlku7J2FaTwzwBSzomhwYLKAv3hOMuJgw9BpFEwWOu7Fd6HPPgLWFRmzg9qfIoK6X26j2TsDuF6BXm1mDjTG6qKeK-vwN86nzPnMSw__","https:\u002F\u002Fvast-plugin-data.rg1.data.tripo3d.com\u002Ftripo-studio\u002F20250520\u002Fb0db5514-472d-41d4-866b-61fb43f633d6\u002Ftripo_input_b0db5514-472d-41d4-866b-61fb43f633d6.glb?Key-Pair-Id=K2T6H91Q55QW4F&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLnJnMS5kYXRhLnRyaXBvM2QuY29tL3RyaXBvLXN0dWRpby8yMDI1MDUyMC9iMGRiNTUxNC00NzJkLTQxZDQtODY2Yi02MWZiNDNmNjMzZDYvdHJpcG9faW5wdXRfYjBkYjU1MTQtNDcyZC00MWQ0LTg2NmItNjFmYjQzZjYzM2Q2LmdsYiIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc3OTE0ODgwMH19fV19&Signature=nbru~sS-hgUjXvBTiHiiZA11u2IiQdLED2eWRcuoO-RNatgYwfQwiK0K26lcIhv7vPB-AFXr2oOL94A-4XHPwEbHWZIk9NrhOU2egGWtLZ2T4E1p~M-LO3nRHi5JllEWQwEDepDVzlLaLd6ftVlAjlXO4nNXNAtQwLl0TZc8iajEged-em34j~wvVi0~Oz0Hn7PC5TMm7fOSfOgsZNuMS3Sqdkc~qx~hB~LK1txhsILGHXzZuIX~04Y8m4XYvkASdFij7B24rAV50kaZ87h4wx3GbOnEl3PB1MUv-FaDA18BGEe6ldAfwX-MiigOfujv8R1Xe01mnHemT9ERSa9Uww__",{"operator_id":574,"model_version":376,"model_url":572,"metadata":575,"status":245,"cover_image":581,"is_owner":62,"created_at":582,"updated_at":583,"type":445,"texture":584,"is_segmented":11,"is_textured":11,"is_rigged":62,"is_rigged_by_tripo":62,"is_stylized":62,"is_pbr":62,"is_hd_textured":62,"is_ultra_textured":62,"is_nexus_mesh":62,"is_nsfw":62,"content_risk_level":4,"image_to_model":591,"texture_generation":596,"is_latest_operator":11},"b0db5514-472d-41d4-866b-61fb43f633d6",{"transform_matrix":576,"children_transform_matrix":577,"children_deleted":578,"children_rename":579,"material_factor":580},[],{},[],{},{"metallic":32,"roughness":99},[570,571],1747719945,1747719968,{"operator_id":585,"id":585,"status":245,"generate_image":586,"generate_image_object":588,"texture_quality":257,"part_names":178,"texture_alignment":260},"593187c7-b9ea-402e-b1a8-a6124aab1f47",[587],"https:\u002F\u002Fvast-plugin-data.rg1.data.tripo3d.com\u002Ftcli_6440f7102dab48c8bc26ca7882df997b\u002F20250520\u002F38e14bd0-348b-4893-a608-48504e4f7237\u002Finput.png?Key-Pair-Id=K2T6H91Q55QW4F&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLnJnMS5kYXRhLnRyaXBvM2QuY29tL3RjbGlfNjQ0MGY3MTAyZGFiNDhjOGJjMjZjYTc4ODJkZjk5N2IvMjAyNTA1MjAvMzhlMTRiZDAtMzQ4Yi00ODkzLWE2MDgtNDg1MDRlNGY3MjM3L2lucHV0LnBuZyIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc3OTE0ODgwMH19fV19&Signature=gxI~f-~21mmWsoRxeqVgMeGUeAnMR~3O6E5yBOkL9Z4qLF9GQQ~cf~H6Xfm~poKkZMfePf~gQIrqVbw7geNpyZTHToEVX88izCqho2LONjeeTpAf3b-E-~55ErsEyNH1082Ysg5BYNG9w~aQw5vpyxUAsTBMScIrgEMuiZeEet~UtOXNJK7SZ-B~I3ORofLGZzFiksRrJfWMXZ8ekCgBrOOywU7XlGk-TUi6rj03IJZzUYixzxJIC1bmDFw2Sb98DhtTkvq6DHx3Vf38dBygHJkiXeqL4lL-QxpxfWJs7Ylyw7qk49t2L-Nxg-DHNufxqbr~PavtCl6uvxzantITlg__",[589],{"bucket":255,"key":590,"url":587},"tcli_6440f7102dab48c8bc26ca7882df997b\u002F20250520\u002F38e14bd0-348b-4893-a608-48504e4f7237\u002Finput.png",{"image":592,"style":552,"style_image":178,"prompt":4,"negative_prompt":178,"quad":62,"smart_poly":62,"face_limit":32,"texture":11,"pbr":11,"texture_quality":257,"texture_alignment":260,"generate_parts":178,"texture_seed":178,"geometry_quality":178,"visibility":4,"export_uv":178,"enable_image_autofix":178,"generate_image":593,"generate_image_object":594,"model_version":376},{"bucket":255,"key":551,"image_audit_result":178,"image_source":178},[554],[595],{"bucket":255,"key":551,"url":554},{"project_id":565,"texture_quality":257,"texture_alignment":260,"part_names":178,"texture_seed":178,"prompt_text":597,"image":598,"generate_image":599,"generate_image_object":600,"model_version":376},"A 3D-rendered fantasy character with large pointed ears, an expressive face, and detailed ornamental clothing holding a wooden staff or weapon.",{"bucket":255,"key":590,"image_audit_result":178,"image_source":178},[587],[601],{"bucket":255,"key":590,"url":587},{"max_retries":32,"used_retries":32,"remaining_retries":32,"can_retry":62,"can_show_retry":62},{"id":604,"type":386,"collection":605},"603ac872-d884-42e1-8986-cdc123168f87",{"collection_id":604,"collection_name":606,"cover_image":607},"3D模型精选集","https:\u002F\u002Fvast-plugin-data.rg1.data.tripo3d.com\u002Ftripo-studio\u002F20250509\u002Fd36494c1-dc00-4f10-8db8-9d7c13a8ffd3\u002Fstudio.webp?Key-Pair-Id=K2T6H91Q55QW4F&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLnJnMS5kYXRhLnRyaXBvM2QuY29tL3RyaXBvLXN0dWRpby8yMDI1MDUwOS9kMzY0OTRjMS1kYzAwLTRmMTAtOGRiOC05ZDdjMTNhOGZmZDMvc3R1ZGlvLndlYnAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3NzkxNDg4MDB9fX1dfQ__&Signature=xDoPRvuRbXTsEDAOeSt~GEbedXPTUY-G-4lP-OfgfMU2yV09gKna4dJKE7B654u2BOq8ypJ~BN~U~cd0qcGRI25io1Yk0cfsVkUD8RLPwm1qjHkIHPCBR0zCRxx3x1qcFQoR7G~8c3G4eNOJkd3HARnfkhobizz6LNUZWOKvubUswB2JBLeufY30If-~g2yNUTnG-Se2dXTW5iQUy8aaDgLdHdjQ5nF5wIaNR5~mlFARsfXC5xDu~76LzEMH4JwrSGMu6cLe0D3cSGOWFkglTW9zRvSeBhzJO-u7EEL0uwFlF9ujWKRxy~oZJaB9K47I~l3FJh4apBxttfhdgSM3lA__",{"id":609,"type":217,"project":610},"a327cc28-ca51-468e-bd4a-330736954552",{"owner_name":611,"owner_avatar":612,"id":609,"project_name":609,"like_count":393,"collect_count":393,"liked":62,"collected":62,"type":101,"visibility":319,"biz_info":613,"custom_tags":614,"category":615,"style":616,"use_case":231,"is_featured":11,"cover_image":617,"is_nsfw":62,"content_risk_level":4,"model_url":619,"point_cloud_model_url":620,"is_owner":62,"operator":621,"retry_info":641},"Anonymous1735206895","https:\u002F\u002Fvast-plugin-data-public.rg1.data.tripo3d.com\u002Ftcli_6440f7102dab48c8bc26ca7882df997b\u002F20250326\u002Fe0d33138-1f4a-476f-98b1-e2fdd5275185\u002Finput.webp?Key-Pair-Id=K2T6H91Q55QW4F&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLXB1YmxpYy5yZzEuZGF0YS50cmlwbzNkLmNvbS90Y2xpXzY0NDBmNzEwMmRhYjQ4YzhiYzI2Y2E3ODgyZGY5OTdiLzIwMjUwMzI2L2UwZDMzMTM4LTFmNGEtNDc2Zi05OGIxLWUyZmRkNTI3NTE4NS9pbnB1dC53ZWJwP2Zvcm1hdD13ZWJwXHUwMDI2d2lkdGg9MTI1IiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzc5MTQ4ODAwfX19XX0_&Signature=HUVnElHnQSz5-c4WnlNVSEoF3MFb5Zxt7JWsZWhMolp0n90A6L1xQPOP5d6Gsp63jndmimNQXB3HPlxszZ-4OKz1NVUN5BUWsqrP5A248kCBWbYObODHXlnOTWylKfvBnKFeDWGobgBH7-DgcYmh-RH4Rz7MpXQ0Or5iPeAViiUWni8~1SCYFXI7KWIA88MGt9w4vqnnzl06eNxcC5iZ9QEunvdzrX1mlHSpF4jDX4apgpC9VTBQnYQ9I4nnTSWHjEqXc72z82TP70l98A8UE9OrBy7GlMbsvEgZ1EWJWH1QT7F8qTX~wDB~2WErSTkdSgCvKBzWJYoudI05U8AjsA__&format=webp&width=125",{"description":4,"short_description":4,"display_image":4},[],"nature & environment","fantasy",[618],"https:\u002F\u002Fvast-plugin-data.rg1.data.tripo3d.com\u002Ftripo-studio\u002F20250725\u002F995d7a08-ce85-46a0-8220-6b246973d28c\u002Fstudio_wireframe.webp?Key-Pair-Id=K2T6H91Q55QW4F&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLnJnMS5kYXRhLnRyaXBvM2QuY29tL3RyaXBvLXN0dWRpby8yMDI1MDcyNS85OTVkN2EwOC1jZTg1LTQ2YTAtODIyMC02YjI0Njk3M2QyOGMvc3R1ZGlvX3dpcmVmcmFtZS53ZWJwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzc5MTQ4ODAwfX19XX0_&Signature=rAszojx18h08ysFYk7~QkXT0riDp9AA2HJxs8ZEpTn~XB7iUTp8fMNQtNcc7sebqtasWEWdxp3e-b8HRMdzLdvzIxmm2g2BLzY5I4O-3FObX3s7T4L1pj4Ycwt6Wd0fMAcsV-sifCtcgMPLNAgN6iPCzsgxQnLDjIjbUE02mrZF5ytYLADwtagHGShdxJAACTMKtlL6pY55GrqDbbeJH7gg3ni~9wvytyJMULBsNfAnG8vY1Lmc~TDJuNjKm7~B7qfnoXA0lnPASO8Ge5s1SjyLmIfDMF6X7TXGPiwiOBkVnbkErBz5NAHC47I5FmfsjYmOBDXkzVux6xjbd4-Nvig__","https:\u002F\u002Fvast-plugin-data.rg1.data.tripo3d.com\u002Ftripo-studio\u002F20250725\u002F995d7a08-ce85-46a0-8220-6b246973d28c\u002Ftripo_base_model_995d7a08-ce85-46a0-8220-6b246973d28c.glb?Key-Pair-Id=K2T6H91Q55QW4F&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLnJnMS5kYXRhLnRyaXBvM2QuY29tL3RyaXBvLXN0dWRpby8yMDI1MDcyNS85OTVkN2EwOC1jZTg1LTQ2YTAtODIyMC02YjI0Njk3M2QyOGMvdHJpcG9fYmFzZV9tb2RlbF85OTVkN2EwOC1jZTg1LTQ2YTAtODIyMC02YjI0Njk3M2QyOGMuZ2xiIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzc5MTQ4ODAwfX19XX0_&Signature=G5deFj0mu0y8C-FK2Nw5Nzes2dM6PzVB-KHbYdffxHHo65gleuLS2DmnPvGMkQ5VTdke7DTjS5yu6PJ4MhDdofum6~jBbm00VarMY5Y~E0dEefW6y~oa6ykFr3RaMsMjA5LxUgMqn8nwqG6oradwE11mWq-eAmnclLfUKYTjEh97Rcz1Ganopma63EELq7hmQVa0zE6YRSpckJjXVqjqv0XgOIztHNWzJZ-U1Oy-6vZQFo14SR-imslUdWU53n9l0MmQIVmLJ5f2pxySyfcoLcYcATDfonn5xqoH3RpLErf3fMra4wrFCisYYG~dl0mCx5AS2J5vzZ4See20vauacQ__","https:\u002F\u002Fvast-plugin-data.rg1.data.tripo3d.com\u002Ftripo-studio\u002F20250725\u002F995d7a08-ce85-46a0-8220-6b246973d28c\u002Fstructure_point_cloud.glb?Key-Pair-Id=K2T6H91Q55QW4F&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLnJnMS5kYXRhLnRyaXBvM2QuY29tL3RyaXBvLXN0dWRpby8yMDI1MDcyNS85OTVkN2EwOC1jZTg1LTQ2YTAtODIyMC02YjI0Njk3M2QyOGMvc3RydWN0dXJlX3BvaW50X2Nsb3VkLmdsYiIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc3OTE0ODgwMH19fV19&Signature=df2A8L9DYt80NyQrNrCr2a3dWBzGeOzGoveXsx6mmmk~JuYUJeKQ9pg8geLpJiys8KkHnV3pNMB~4H~ZQSE4yrlLw4boN2Xe--01NfdB-3UfGUq5aSwzHfJqQrpu~Qmz6gXmWxnNaLQUUoVAU58zJGHsFtj2VPjAiABuWjSMWML7QpkSRlAMmoN~2dz1BUjualy0fvg7E48a6wVw280uIYeVkCA9rMck1t8r0ZY2~xhCcoNwe6sWeAoPHRwP9rIqQ2LHOofgljoUZmijdlFneRBzWnJmj-pi4GV-eWbLuOcuXf7Khb2MuSx02UeVRzqI46-CGEaXPlsF~IAGEI4yTA__",{"operator_id":622,"model_version":623,"model_url":619,"metadata":624,"status":245,"cover_image":630,"is_owner":62,"created_at":631,"updated_at":632,"type":412,"point_cloud_model_url":620,"is_segmented":62,"is_textured":62,"is_rigged":62,"is_rigged_by_tripo":62,"is_stylized":62,"is_pbr":62,"is_hd_textured":62,"is_ultra_textured":62,"is_nexus_mesh":62,"is_nsfw":62,"content_risk_level":4,"image_to_model":633,"is_latest_operator":11},"995d7a08-ce85-46a0-8220-6b246973d28c","v3.0-20250729",{"transform_matrix":625,"children_transform_matrix":626,"children_deleted":627,"children_rename":628,"material_factor":629},[],{},[],{},{"metallic":32,"roughness":99},[178,618],1753415029,1753415432,{"image":634,"style":4,"style_image":178,"prompt":636,"negative_prompt":178,"quad":62,"smart_poly":11,"face_limit":32,"texture":62,"pbr":178,"texture_quality":178,"texture_alignment":178,"generate_parts":62,"texture_seed":178,"geometry_quality":178,"visibility":4,"export_uv":178,"enable_image_autofix":178,"generate_image":637,"generate_image_object":639,"model_version":623},{"bucket":255,"key":635,"image_audit_result":178,"image_source":178},"tcli_6440f7102dab48c8bc26ca7882df997b\u002F20250725\u002Feed56123-2058-4c4f-a1b3-a0211ca6f127\u002Finput.png","A highly detailed, futuristic robotic character in a crouched stance, featuring an exoskeleton-like structure, mechanical components, and a sleek, technical design.",[638],"https:\u002F\u002Fvast-plugin-data.rg1.data.tripo3d.com\u002Ftcli_6440f7102dab48c8bc26ca7882df997b\u002F20250725\u002Feed56123-2058-4c4f-a1b3-a0211ca6f127\u002Finput.png?Key-Pair-Id=K2T6H91Q55QW4F&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLnJnMS5kYXRhLnRyaXBvM2QuY29tL3RjbGlfNjQ0MGY3MTAyZGFiNDhjOGJjMjZjYTc4ODJkZjk5N2IvMjAyNTA3MjUvZWVkNTYxMjMtMjA1OC00YzRmLWExYjMtYTAyMTFjYTZmMTI3L2lucHV0LnBuZyIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc3OTE0ODgwMH19fV19&Signature=B2okP5c7vKZlvRRe~DPmGb6HXtf1n0g9vGlG2p5F0EvmHMzpvGco5aY3LAALJROoIqFAOa7Dm~pIvoS9tH1wBd-dpxRF5iPsCBY18WLFH8dKjdaoHuomCbBbiBJzxLwqfZyWNmnjDqyBwH1z8t-MHi~NofdC5OEWWcojxd7KEQumoOKAmw4UIKQOzgQ9l1cFTdUbr-a3SY14uHR2aeotKAl41aKHOLOxW3E6c77aj~A9C0H3QMmbet-5cKP-jxeNxy4G4J462l5MYIzh4cwwikt4zVLKy~EvhCFamRTBoTUZNdx5v30pa69qZqKHmXPM-N~-LjGhLk~GlRyeDF1kiA__",[640],{"bucket":255,"key":635,"url":638},{"max_retries":32,"used_retries":32,"remaining_retries":32,"can_retry":62,"can_show_retry":62},{"id":643,"type":217,"project":644},"59411ca4-836b-4c91-8f06-5de2aeeac925",{"owner_name":611,"owner_avatar":612,"id":643,"project_name":643,"like_count":32,"collect_count":393,"liked":62,"collected":62,"type":101,"visibility":102,"biz_info":645,"custom_tags":646,"category":615,"style":616,"use_case":231,"is_featured":11,"cover_image":647,"is_nsfw":62,"content_risk_level":4,"model_url":649,"point_cloud_model_url":650,"is_owner":62,"operator":651,"retry_info":670},{"description":4,"short_description":4,"display_image":4},[],[648],"https:\u002F\u002Fvast-plugin-data.rg1.data.tripo3d.com\u002Ftripo-studio\u002F20250725\u002F6bf1df55-7447-4b99-9fee-c3ad9e63e6f0\u002Fstudio_part.webp?Key-Pair-Id=K2T6H91Q55QW4F&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLnJnMS5kYXRhLnRyaXBvM2QuY29tL3RyaXBvLXN0dWRpby8yMDI1MDcyNS82YmYxZGY1NS03NDQ3LTRiOTktOWZlZS1jM2FkOWU2M2U2ZjAvc3R1ZGlvX3BhcnQud2VicCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc3OTE0ODgwMH19fV19&Signature=kmDpEuG7twrKgsE9LGW25y1iHLGsGCIjWX7MD4CRO38GwCRDif1R4xWVJNPMkRxXiMy3iiL-r5WzLOfKO5-lz84vW7kXgwMSVgiJLan7cEmRI2WzUjT92VW59iqRghuz~rjr5tKXL3q5kPL~urUVhmj2aFXfb5UWcjscwnLzVgaX1UX14BTpmBy7G4-CJwlvy3-AeSw11PZeJzlLXDAZhk~D79WGk-~dfFJ2GpksA7aLqcQf6qXxeJZVnCIp1XleqS4rZ8J585lAoqbb4sc~86Qj9X9vWPy1yJ0Ut4675W8Z3L1DRCBQHUsnu37M2jdQfamo0dodz~rahmdVE7qSvA__","https:\u002F\u002Fvast-plugin-data.rg1.data.tripo3d.com\u002Ftripo-studio\u002F20250730\u002F0c652252-9d07-43d8-b9a3-a6172c6cf7c4\u002Ftripo_convert_0c652252-9d07-43d8-b9a3-a6172c6cf7c4.fbx?Key-Pair-Id=K2T6H91Q55QW4F&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLnJnMS5kYXRhLnRyaXBvM2QuY29tL3RyaXBvLXN0dWRpby8yMDI1MDczMC8wYzY1MjI1Mi05ZDA3LTQzZDgtYjlhMy1hNjE3MmM2Y2Y3YzQvdHJpcG9fY29udmVydF8wYzY1MjI1Mi05ZDA3LTQzZDgtYjlhMy1hNjE3MmM2Y2Y3YzQuZmJ4IiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzc5MTQ4ODAwfX19XX0_&Signature=Bnm7v4ramoOq4QZM0Kq5KBCXrOy6Uu2NJQXiPIKMEAVZdv2H6mQY6jh0LuLd0Q0ecI6jO1fRK91cE9a3~q4hktCgq7Ctn4H9l~nqDyLIEBgnd6StJ41RzA-DwfDY-q0xlYHyl11BOdKn7GsoFLEPxD13Z51NUAMM1XhMr-geMazS5ynLzvMYl3py9HI6kB4pqmnuiIRXhaHxVcrgHb1v-9ZvJoQU~PeYPqoNbJaqFxfiMAMvm7JUOZamGzBEDoYASxT~D2o3ELeABLj80YokjDPp5K8ykoEggQKwfIbx8mQ6xm0977U9GT5vukZIcTsvJIuM5XSLTKcHc44CoaPl2w__","https:\u002F\u002Fvast-plugin-data.rg1.data.tripo3d.com\u002Ftripo-studio\u002F20250725\u002F6bf1df55-7447-4b99-9fee-c3ad9e63e6f0\u002Fstructure_point_cloud.glb?Key-Pair-Id=K2T6H91Q55QW4F&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLnJnMS5kYXRhLnRyaXBvM2QuY29tL3RyaXBvLXN0dWRpby8yMDI1MDcyNS82YmYxZGY1NS03NDQ3LTRiOTktOWZlZS1jM2FkOWU2M2U2ZjAvc3RydWN0dXJlX3BvaW50X2Nsb3VkLmdsYiIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc3OTE0ODgwMH19fV19&Signature=lsDxOCZEqHRz1FIAW0yPqWkUC29v2L0-kGt934-pwXGDhd-GzXbBckGKn43LZXBF~b6ANsO4-StfC4jKhcR3VdPxYTaGQZnGk51oD5~LnNGmhsanCudcnuHu-MEXtnTp--RZTVh2a-wVpYHFn~W8vHaJNbKj7eniAtvXxpA4uMDSfNpN5RtCxnXkCccGjTu0K51ZpB~dQqH0mqjScwBw5CwXOGxXl5ayaDYhi~~7~mr7Ddh-tY1vd1ASQbddyIxTFRqtv7cIyvMSgNug4fKCNbAKh56muOkJA-pOEsl6i~s~frtBAXaPccfvRnTx~NqcTwzk-ncHobia2A9Pmxt7EQ__",{"operator_id":652,"model_version":623,"model_url":649,"metadata":653,"status":245,"cover_image":659,"is_owner":62,"created_at":660,"updated_at":661,"type":357,"point_cloud_model_url":650,"is_segmented":11,"is_textured":62,"is_rigged":62,"is_rigged_by_tripo":62,"is_stylized":62,"is_pbr":62,"is_hd_textured":62,"is_ultra_textured":62,"is_nexus_mesh":62,"is_nsfw":62,"content_risk_level":4,"image_to_model":662,"is_latest_operator":11},"0c652252-9d07-43d8-b9a3-a6172c6cf7c4",{"transform_matrix":654,"children_transform_matrix":655,"children_deleted":656,"children_rename":657,"material_factor":658},[],{},[],{},{"metallic":32,"roughness":99},[178,648],1753861807,1753862140,{"image":663,"style":178,"style_image":178,"prompt":665,"negative_prompt":4,"quad":62,"smart_poly":11,"face_limit":32,"texture":62,"pbr":178,"texture_quality":178,"texture_alignment":178,"generate_parts":11,"texture_seed":178,"geometry_quality":178,"visibility":4,"export_uv":178,"enable_image_autofix":178,"generate_image":666,"generate_image_object":668,"model_version":623},{"bucket":255,"key":664,"image_audit_result":178,"image_source":178},"tcli_6440f7102dab48c8bc26ca7882df997b\u002F20250725\u002Fb5980d63-2a3c-471e-8b38-cdca61875348\u002Finput.png","一位富有智慧的巨人形象，身披古铜色战甲，温和的眼神中闪烁着星辰，手持象征和平的橄榄枝",[667],"https:\u002F\u002Fvast-plugin-data.rg1.data.tripo3d.com\u002Ftcli_6440f7102dab48c8bc26ca7882df997b\u002F20250725\u002Fb5980d63-2a3c-471e-8b38-cdca61875348\u002Finput.png?Key-Pair-Id=K2T6H91Q55QW4F&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLnJnMS5kYXRhLnRyaXBvM2QuY29tL3RjbGlfNjQ0MGY3MTAyZGFiNDhjOGJjMjZjYTc4ODJkZjk5N2IvMjAyNTA3MjUvYjU5ODBkNjMtMmEzYy00NzFlLThiMzgtY2RjYTYxODc1MzQ4L2lucHV0LnBuZyIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc3OTE0ODgwMH19fV19&Signature=lH7y87EegzoJjbYLR2e8NKjNDBP0xTPC2aA3FoJtV8NzwwZHdYgWTWAPy0J56yMbmLsQZUgQwwi7vOJe8sqgtEvaC799HeaJu0-xypP0fgZQpiGKHKUjcCBXnliwXC2Dwmae-rHdfFrsCijegi4eDLUUNKIWd-j8rEdayI1gdLSLZNeF-yVOlY3wN6naroNzPMj47-KBkBqHHIUVQcQb4pUOgrh0~fdWZ7vqCB7kuvlz0uD-5uFLnmA-zvSAoBqZf~gyCArn8YPRDUb~3h0UOqWMaOn2wAJqljOSEIqYR6GU1GmNAAe0Arbn0UpUydEv9FzHP9qyIi~aGHgZx3mykg__",[669],{"bucket":255,"key":664,"url":667},{"max_retries":32,"used_retries":32,"remaining_retries":32,"can_retry":62,"can_show_retry":62},{"id":672,"type":217,"project":673},"c097bb47-e9ec-44be-872e-4a540e39ec68",{"owner_name":425,"owner_avatar":426,"id":672,"project_name":672,"like_count":222,"collect_count":222,"liked":62,"collected":62,"type":101,"visibility":102,"biz_info":674,"custom_tags":675,"category":4,"style":4,"use_case":4,"is_featured":11,"cover_image":676,"is_nsfw":62,"content_risk_level":4,"model_url":679,"is_owner":62,"operator":680,"retry_info":699},{"description":4,"short_description":4,"display_image":4},[],[677,678],"https:\u002F\u002Fvast-plugin-data.rg1.data.tripo3d.com\u002Ftripo-studio\u002F20250522\u002F7470a3bd-4c95-4c95-9352-c259305f3c1e\u002Fstudio_mesh.webp?Key-Pair-Id=K2T6H91Q55QW4F&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLnJnMS5kYXRhLnRyaXBvM2QuY29tL3RyaXBvLXN0dWRpby8yMDI1MDUyMi83NDcwYTNiZC00Yzk1LTRjOTUtOTM1Mi1jMjU5MzA1ZjNjMWUvc3R1ZGlvX21lc2gud2VicCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc3OTE0ODgwMH19fV19&Signature=eHW09Y1UfUJxD0gqd-evEwCDqdzzWFrzRq~4Bc~a01yJnx6VTXxyc~npQDjRi34ps6LDR6tk4NtenDo222OhjpX~q4H6bv7gJt7Phi9Yn~jS5jnsHik3wN50MLUixP3SyqJ4WODOH-j7xtNiutcif0O8H9fXCMaWfL~k-CwuVMd~Ojr9LOFif0q0zKR8zX6Czubl~7R5uBUh77SKelP1OoAzX3a4mCKD9wQij~X3GIuWuMMSSdKIVL8OTCh3CPVgtfcxilQQxBvHM9EkN~V-3gccjTpLFKNx1akuT68f9vx9AzaJmUAYr9b-MQpUUMNYuyY~bJk64Afzb4QJ7R7kZQ__","https:\u002F\u002Fvast-plugin-data.rg1.data.tripo3d.com\u002Ftripo-studio\u002F20250522\u002F5e6eb658-606e-48eb-8f20-fd11d1b38a89\u002Fstudio_part.webp?Key-Pair-Id=K2T6H91Q55QW4F&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLnJnMS5kYXRhLnRyaXBvM2QuY29tL3RyaXBvLXN0dWRpby8yMDI1MDUyMi81ZTZlYjY1OC02MDZlLTQ4ZWItOGYyMC1mZDExZDFiMzhhODkvc3R1ZGlvX3BhcnQud2VicCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc3OTE0ODgwMH19fV19&Signature=sghJssFyxl8o2~MGiWkRX0D~PH7dZXFxlKzt0XYd-N~bm0qwWWsRuYaTGQakZxB1ymzwKaj40s850sjWSlRRZD2fGVxWJSxcO0rrhe3mGMN3pEy61ovL1eqpubK1xdosQ5t-jFNkmYf1Up6GZ66KJ8QXbGLvNY9l4yuErx4RuA9VJnWX5FWKNryGpT74zxlWFiUVA~UlVWYdG~SPi7ceRvdXlrQR6Y1prZUSpO-re49hmda6cykeht2Zx7UyPLjdFUxT~3CaAD-vNPFHK3DloYQbZ~Mqa7I9qi0pYNJx1S-M9rYRro6IMGbJvTJ-LZ3Jv4J0sMdRMey2pvGdTOTdWw__","https:\u002F\u002Fvast-plugin-data.rg1.data.tripo3d.com\u002Ftripo-studio\u002F20250522\u002F5e6eb658-606e-48eb-8f20-fd11d1b38a89\u002Ftripo_input_5e6eb658-606e-48eb-8f20-fd11d1b38a89.glb?Key-Pair-Id=K2T6H91Q55QW4F&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLnJnMS5kYXRhLnRyaXBvM2QuY29tL3RyaXBvLXN0dWRpby8yMDI1MDUyMi81ZTZlYjY1OC02MDZlLTQ4ZWItOGYyMC1mZDExZDFiMzhhODkvdHJpcG9faW5wdXRfNWU2ZWI2NTgtNjA2ZS00OGViLThmMjAtZmQxMWQxYjM4YTg5LmdsYiIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc3OTE0ODgwMH19fV19&Signature=TndRTIc7qs3zlmkPwqplwoVu6UrfxDbPgrzUQJer9DWG83j5sCLXjIiU3PPvtXQc7Cbz6mR~QpoG3TR-ehKeNAfv3vx~sZ9mmtqezpPSNkOlM6rl2ROenoxyyeYJLg28yOcGSfg~pfA2bVyk3zjcHgWfBvc7izQueiWDrAf-~rfyXyONMHxAZAWbDU6rGvQElD~AHci~cC6SpPHI4u6tAayaeJP6lSdKmdJnGJR-AGW0bnD0OUCK12sqi-Zts86Lh6HvwUzk2VQXv~xkHBp8hf6MOJlXEsHne9b7~yNFK~SH-JXu0SEVUtzC8fgfn2M4TwKjS0udaWNs6Aj~oJ-sCg__",{"operator_id":681,"model_version":376,"model_url":679,"metadata":682,"status":245,"cover_image":688,"is_owner":62,"created_at":689,"updated_at":690,"type":445,"is_segmented":11,"is_textured":11,"is_rigged":62,"is_rigged_by_tripo":62,"is_stylized":62,"is_pbr":11,"is_hd_textured":62,"is_ultra_textured":62,"is_nexus_mesh":62,"is_nsfw":62,"content_risk_level":4,"image_to_model":691,"is_latest_operator":11},"5e6eb658-606e-48eb-8f20-fd11d1b38a89",{"transform_matrix":683,"children_transform_matrix":684,"children_deleted":685,"children_rename":686,"material_factor":687},[],{},[],{},{"metallic":393,"roughness":393},[677,678],1747907584,1747907615,{"image":692,"style":4,"style_image":178,"prompt":694,"negative_prompt":178,"quad":62,"smart_poly":62,"face_limit":32,"texture":11,"pbr":11,"texture_quality":257,"texture_alignment":260,"generate_parts":178,"texture_seed":178,"geometry_quality":178,"visibility":4,"export_uv":178,"enable_image_autofix":178,"generate_image":695,"generate_image_object":697,"model_version":376},{"bucket":255,"key":693,"image_audit_result":178,"image_source":178},"tcli_6440f7102dab48c8bc26ca7882df997b\u002F20250522\u002Fa4e7bc92-fd8d-4316-b78a-6442d854980d\u002Finput.png","A white and red robot character from \"Big Hero 6\" holding a bundle of red and white balloons",[696],"https:\u002F\u002Fvast-plugin-data.rg1.data.tripo3d.com\u002Ftcli_6440f7102dab48c8bc26ca7882df997b\u002F20250522\u002Fa4e7bc92-fd8d-4316-b78a-6442d854980d\u002Finput.png?Key-Pair-Id=K2T6H91Q55QW4F&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLnJnMS5kYXRhLnRyaXBvM2QuY29tL3RjbGlfNjQ0MGY3MTAyZGFiNDhjOGJjMjZjYTc4ODJkZjk5N2IvMjAyNTA1MjIvYTRlN2JjOTItZmQ4ZC00MzE2LWI3OGEtNjQ0MmQ4NTQ5ODBkL2lucHV0LnBuZyIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc3OTE0ODgwMH19fV19&Signature=uIuiemlayKUwV1E3tYo3QjrTzv8lo-4Y4ZYujctP6Gon2KlehE3~biVqPGfSHqlUmlRr4PO4GAeCRHOU-eIK-AP5ywTgX9Fg4qMnFK6uLtzwUrP3Nly5EQInUr3SkbE~pk5iAVEUGwP0S0OMiGrUl29EtfRf~bl1N7GltcmERu9i3XGGMRvZyzNKJYiOfSXjbm4RMAd5Cq8EBNIUcsj79TM~OlYQEtfK5OfHIgTSfyAgyB2QfGhqYY~ICisWvqZFQLzu8EsJE9yi0sk4F~2zIh50x4sivSGsMeIefz9Oz9Dh07YHFyVEzNsSCp0vWUY1YISCsMMQonChhL8Z7MU9eg__",[698],{"bucket":255,"key":693,"url":696},{"max_retries":32,"used_retries":32,"remaining_retries":32,"can_retry":62,"can_show_retry":62},{"id":701,"type":217,"project":702},"8361e2ac-6935-4462-beb0-69e87e80b979",{"owner_name":425,"owner_avatar":426,"id":701,"project_name":701,"like_count":32,"collect_count":427,"liked":62,"collected":62,"type":101,"visibility":102,"biz_info":703,"custom_tags":704,"category":4,"style":4,"use_case":4,"is_featured":11,"cover_image":705,"is_nsfw":62,"content_risk_level":4,"model_url":708,"is_owner":62,"operator":709,"retry_info":728},{"description":4,"short_description":4,"display_image":4},[],[706,707],"https:\u002F\u002Fvast-plugin-data.rg1.data.tripo3d.com\u002Ftripo-studio\u002F20250522\u002Febe16460-cda1-4ee4-b756-603cc55db87e\u002Fstudio_mesh.webp?Key-Pair-Id=K2T6H91Q55QW4F&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLnJnMS5kYXRhLnRyaXBvM2QuY29tL3RyaXBvLXN0dWRpby8yMDI1MDUyMi9lYmUxNjQ2MC1jZGExLTRlZTQtYjc1Ni02MDNjYzU1ZGI4N2Uvc3R1ZGlvX21lc2gud2VicCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc3OTE0ODgwMH19fV19&Signature=G6zhY4FA4tntlk3Ect85VTCSyh9QL-07-h5F6jPvFJd-V--Noj5YiHlRVSLsVuJKj8~6LmFfWgx0R0OavEWsPBiz6JolJB0say~yxjp5UA3j6Zb6W0g3nRThfox0Iy~GZIldx~dVcBEmAStWpOZygVQbggOyU9uc9nPABYaugSwyCxsVxh2pOzxuEoUoYgPAGPPiOvPaPmEczKN5kgsFJkgtwEjZmdVHNfmykZ4yilKxkYux6RFjoY4L8nYkYBWspz6w-dF7dhw~s774nm1GRTMJE~swm1XbrFCaC6Vohucv3UxcRWfVsvnAzVScBBeWwN2sbprYSznXpBhYDXFqmg__","https:\u002F\u002Fvast-plugin-data.rg1.data.tripo3d.com\u002Ftripo-studio\u002F20250522\u002F4e6cc562-1165-4f0b-b288-32bc6e0ff993\u002Fstudio_part.webp?Key-Pair-Id=K2T6H91Q55QW4F&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLnJnMS5kYXRhLnRyaXBvM2QuY29tL3RyaXBvLXN0dWRpby8yMDI1MDUyMi80ZTZjYzU2Mi0xMTY1LTRmMGItYjI4OC0zMmJjNmUwZmY5OTMvc3R1ZGlvX3BhcnQud2VicCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc3OTE0ODgwMH19fV19&Signature=ag5dVoiKS25IDpjjy0-DmUQsxfRtreYHeyPygrzfrjyZSoLf5LfGDAdWupJuJGS1XN7DzluI6iz6IfvDTDMDIqAnjJ6wnEtzSqhH9pz1LK2wHTCz7NMzHflFXQyzxP4kj8yd0XeXICxVomC5EKyT8mbllgDtyvFTjOGYfkjECYfHI~AC~I7Q5kaTJt1sRDxSg8e8a9ZvTvu6HUxGG0lBW6uW~lagX39TySumfNTaC8zSsbORcRon89gXTcdmDP~~UVwXJNXflKsTCWekPt0lB7Btlc6Vi94K53~eixDwvMeSRy0Yuo~MR6b9TEZUXHc0~f5cttj-DvxZbicVdIfLvA__","https:\u002F\u002Fvast-plugin-data.rg1.data.tripo3d.com\u002Ftripo-studio\u002F20250522\u002F4e6cc562-1165-4f0b-b288-32bc6e0ff993\u002Ftripo_mesh_seg_4e6cc562-1165-4f0b-b288-32bc6e0ff993.glb?Key-Pair-Id=K2T6H91Q55QW4F&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLnJnMS5kYXRhLnRyaXBvM2QuY29tL3RyaXBvLXN0dWRpby8yMDI1MDUyMi80ZTZjYzU2Mi0xMTY1LTRmMGItYjI4OC0zMmJjNmUwZmY5OTMvdHJpcG9fbWVzaF9zZWdfNGU2Y2M1NjItMTE2NS00ZjBiLWIyODgtMzJiYzZlMGZmOTkzLmdsYiIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc3OTE0ODgwMH19fV19&Signature=MnRq~WKE7ocNQQTjoxhB9J~3m8oRU0n4tyyaXGV0grmkEqwb7577335eIoW~tXKMlUHg3nXTx1SvT3dwtE2nALWh9H3a6KaiDNVKU8XEUVVTIU4ri7MhqpvUo-xSajqVulyomVI1KW20jtzvs5sMlPYaUsOShnNyzCbmgiGHhjtoJ-dWMhA778w2hlPOq5YBx5o9gDvcDJbVmD9Kxaz3dRfXeRvb1zEdkyk1MRkQZQJqCORcvdNclEnFSYWGRsTaM1eolE1P-s0T7l9~CiM5Ca4kBtXXRuJc0jdb6Vq1fi9tqJL0z5IzqcGzYamCyinPp2hRx21auiH6N-OJYaZTSQ__",{"operator_id":710,"model_version":376,"model_url":708,"metadata":711,"status":245,"cover_image":717,"is_owner":62,"created_at":718,"updated_at":719,"type":307,"is_segmented":11,"is_textured":11,"is_rigged":62,"is_rigged_by_tripo":62,"is_stylized":62,"is_pbr":11,"is_hd_textured":62,"is_ultra_textured":62,"is_nexus_mesh":62,"is_nsfw":62,"content_risk_level":4,"image_to_model":720,"is_latest_operator":11},"4e6cc562-1165-4f0b-b288-32bc6e0ff993",{"transform_matrix":712,"children_transform_matrix":713,"children_deleted":714,"children_rename":715,"material_factor":716},[],{},[],{},{"metallic":393,"roughness":393},[706,707],1747907125,1747907467,{"image":721,"style":4,"style_image":178,"prompt":723,"negative_prompt":178,"quad":62,"smart_poly":62,"face_limit":32,"texture":11,"pbr":11,"texture_quality":257,"texture_alignment":260,"generate_parts":178,"texture_seed":178,"geometry_quality":178,"visibility":4,"export_uv":178,"enable_image_autofix":178,"generate_image":724,"generate_image_object":726,"model_version":376},{"bucket":255,"key":722,"image_audit_result":178,"image_source":178},"tcli_6440f7102dab48c8bc26ca7882df997b\u002F20250522\u002Ff9932c00-0bf2-46dd-a7e5-398a8867c2da\u002Finput.png","A colorful and playful robotic character with a spherical body, reflective black dome-like head, glowing blue eyes, and an orange body with surface decorations and robotic appendages.",[725],"https:\u002F\u002Fvast-plugin-data.rg1.data.tripo3d.com\u002Ftcli_6440f7102dab48c8bc26ca7882df997b\u002F20250522\u002Ff9932c00-0bf2-46dd-a7e5-398a8867c2da\u002Finput.png?Key-Pair-Id=K2T6H91Q55QW4F&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLnJnMS5kYXRhLnRyaXBvM2QuY29tL3RjbGlfNjQ0MGY3MTAyZGFiNDhjOGJjMjZjYTc4ODJkZjk5N2IvMjAyNTA1MjIvZjk5MzJjMDAtMGJmMi00NmRkLWE3ZTUtMzk4YTg4NjdjMmRhL2lucHV0LnBuZyIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc3OTE0ODgwMH19fV19&Signature=HK6bp0s4~Eu1rNhuceJworhkLyUD-bwAD-JfkC79Bklcnl8KIT0jo6rORsdozX6QuK9TVe-EQaRKDKFUi3PLVlauEP-vKRKiakwyOJGs6u--nGvTAMe2niCTv6hDCCIhwzvJJzYMSjH6KmGLJlqSSr-aEt6GYhJOTAdOZZuHRqUf02nuRjcxFRl4l7qYd9nHLnu5qbFUhXjXA0-SXhHCZkNud5JF2tVLlG3rgHPO0nu-FutR2ZwMM6awMpX4CGLEgxXySrVM8mKh5JP3cqq9hn~U1VN9pRDjslA7tVuT-jVATw4ufxE36wk8kr3PLSJveODm9nTTA~XCNiXT0xSH7w__",[727],{"bucket":255,"key":722,"url":725},{"max_retries":32,"used_retries":32,"remaining_retries":32,"can_retry":62,"can_show_retry":62},{"id":730,"type":217,"project":731},"f764500b-4fa8-4613-b7cf-053dd863f61b",{"owner_name":425,"owner_avatar":426,"id":730,"project_name":730,"like_count":32,"collect_count":393,"liked":62,"collected":62,"type":101,"visibility":102,"biz_info":732,"custom_tags":733,"category":4,"style":4,"use_case":4,"is_featured":11,"cover_image":734,"is_nsfw":62,"content_risk_level":4,"model_url":737,"is_owner":62,"operator":738,"retry_info":765},{"description":4,"short_description":4,"display_image":4},[],[735,736],"https:\u002F\u002Fvast-plugin-data.rg1.data.tripo3d.com\u002Ftripo-studio\u002F20250522\u002F6e195280-ffc5-467e-ba33-728e1045dace\u002Fstudio_mesh.webp?Key-Pair-Id=K2T6H91Q55QW4F&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLnJnMS5kYXRhLnRyaXBvM2QuY29tL3RyaXBvLXN0dWRpby8yMDI1MDUyMi82ZTE5NTI4MC1mZmM1LTQ2N2UtYmEzMy03MjhlMTA0NWRhY2Uvc3R1ZGlvX21lc2gud2VicCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc3OTE0ODgwMH19fV19&Signature=omsC4ZgEQ~wPEOJlKy-OMUU3EC~3IGDaa3IsBz47pLvceChxToHpMY630S9sNs3u~m2rFnH966Nh4FNDQ-mWxAOuBRQu2dFYxHcI12j~sloy7AHSvMu24kog-szQe7MXrUhB8bo3ZPsNea4RtxdnEjy8-o-Vh6xSuppt5bMtkc67tIARnvSw1hnQdwdeOrJ1mL-qirC2uaVtqCzZAC970YgZ2TxonrVMBlTUOjKy2cIIN6kYAeEb2BKKh5-JexzJG15mc6P6X8KxpTmBUlwr~RhQRLQATwmDtTE8NGGyD76gcsAgDTiRRhjYIy3UFLMYqyvyybiVK8Lx1OPUlDzHhg__","https:\u002F\u002Fvast-plugin-data.rg1.data.tripo3d.com\u002Ftripo-studio\u002F20250522\u002F1550b325-8385-478d-9048-37f4fe6873cc\u002Fstudio_mesh.webp?Key-Pair-Id=K2T6H91Q55QW4F&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLnJnMS5kYXRhLnRyaXBvM2QuY29tL3RyaXBvLXN0dWRpby8yMDI1MDUyMi8xNTUwYjMyNS04Mzg1LTQ3OGQtOTA0OC0zN2Y0ZmU2ODczY2Mvc3R1ZGlvX21lc2gud2VicCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc3OTE0ODgwMH19fV19&Signature=Y2yNdF1J0JAhTzQpNRsxLAAjBSG6bdT3Fxpn9aXHp1xzxFwUxZC4zw75zUDOvWlWKDHeh3T7Z4eVcc-IrCW2XGDNamd6Nmd3RUI~G-17aBX4j9jemfCnb20mfqS7-q0fin9rTafeF5syaX9tqVOz-5LCDtHkFunyOl9Kp6Qp0Rsg~BcyrKotAeNw21Pe4-c8IRo1hY~ftI0KAxhVYN-3bHQwQ~bPiwsyH2H7d5E9P7f1ZP0vnMDtwHiXl24MhwFslslaO-L1cYxqdXlZ8llyH5LCw4RMhaaWjvRB5DeHwgCL2B8ptXx738CV6anE6yC984htf1ezH0qVdMLKGD1qBA__","https:\u002F\u002Fvast-plugin-data.rg1.data.tripo3d.com\u002Ftripo-studio\u002F20250522\u002F1550b325-8385-478d-9048-37f4fe6873cc\u002Ftripo_rigging_1550b325-8385-478d-9048-37f4fe6873cc.glb?Key-Pair-Id=K2T6H91Q55QW4F&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLnJnMS5kYXRhLnRyaXBvM2QuY29tL3RyaXBvLXN0dWRpby8yMDI1MDUyMi8xNTUwYjMyNS04Mzg1LTQ3OGQtOTA0OC0zN2Y0ZmU2ODczY2MvdHJpcG9fcmlnZ2luZ18xNTUwYjMyNS04Mzg1LTQ3OGQtOTA0OC0zN2Y0ZmU2ODczY2MuZ2xiIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzc5MTQ4ODAwfX19XX0_&Signature=Mj4eO5z1RoV5CrdgqNbA0VEkOSLDbue1LrnALuLYdrWN-~S20b6wDfCjRGh4fmSgL9N0-T8GhJNcXs7CrOqf5Bc3zBGDGdrYDqJoBB-mcJxTm2qai2qW1tzJaCh1UMY6Mb8eISES1OottSWeBTLN6rcYVaBhVssgrj~jcF59MNWE24ZyVKONvxtz1YsLAvY1wonu5M2bY6o1zlvPhXxlxcrF68SFybvMJhkXCjCA~bDUnMWZXBZ8fv7hkG4eaw97yMU3rIfywXVQiLJ6T7Vx6LJfzXvEMgFxIBOlgUhKScMYa92zK88q~zHsvYZKk~3Kts-lrCokDmByQnqfFy84dw__",{"operator_id":739,"model_version":376,"model_url":737,"metadata":740,"status":245,"cover_image":746,"is_owner":62,"created_at":747,"updated_at":748,"type":749,"rigging":750,"retarget":752,"is_segmented":62,"is_textured":11,"is_rigged":11,"is_rigged_by_tripo":11,"is_stylized":62,"is_pbr":11,"is_hd_textured":62,"is_ultra_textured":62,"is_nexus_mesh":62,"is_nsfw":62,"content_risk_level":4,"image_to_model":757,"is_latest_operator":11},"1550b325-8385-478d-9048-37f4fe6873cc",{"transform_matrix":741,"children_transform_matrix":742,"children_deleted":743,"children_rename":744,"material_factor":745},[],{},[],{},{"metallic":393,"roughness":393},[735,736],1747905816,1747905875,"rigging",{"operator_id":739,"id":739,"status":245,"type":477,"model_url":751},"https:\u002F\u002Fvast-plugin-data.rg1.data.tripo3d.com\u002Ftripo-studio\u002F20250522\u002F1550b325-8385-478d-9048-37f4fe6873cc\u002Ftripo_rigging_1550b325-8385-478d-9048-37f4fe6873cc.glb?Key-Pair-Id=K2T6H91Q55QW4F&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLnJnMS5kYXRhLnRyaXBvM2QuY29tL3RyaXBvLXN0dWRpby8yMDI1MDUyMi8xNTUwYjMyNS04Mzg1LTQ3OGQtOTA0OC0zN2Y0ZmU2ODczY2MvdHJpcG9fcmlnZ2luZ18xNTUwYjMyNS04Mzg1LTQ3OGQtOTA0OC0zN2Y0ZmU2ODczY2MuZ2xiIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzc5MTAwNTM3fX19XX0_&Signature=vvLsSqLgxJN5PwlXFkfb5StBDukVX30T8oKCt6mhGD4DSFPwErlB9A5dBuXgX2Fw7MFhBL4qbtcc~gxUNPe~0Nto6rLM1IBurf-sVM-HLs~HLAwIGDUvVMmQawdfRRUdKDvtnSmUQlVGoAoJlgxMCdvvUJgSInRhlr9zmSq1i5FPi3lf9KVvbVsdKcGuOhNImUxE6i3qmCzzhrNXfIATwZ9f-4eodGLccaqu8pZK8XIk4tDJ0MUs3cfH8O2SPrJbR3f~9uDhKKYL2qaixz6EpLFPWvE31Zj9PzdvBbF3Az6xJLw4HvCxF8ablOArCT840hDwV1W~iR5dla~GTqwpyg__",[753],{"operator_id":754,"id":754,"status":245,"name":755,"model_url":756},"0f6becf7-6a97-4b51-ac51-e8b30e6dce6b","preset:biped:walk","https:\u002F\u002Fvast-plugin-data.rg1.data.tripo3d.com\u002Ftripo-studio\u002F20250522\u002Faad0e2fd-0fe1-4622-9fb4-6e00f3eea1f8\u002Ftripo_retarget_0f6becf7-6a97-4b51-ac51-e8b30e6dce6b.glb?Key-Pair-Id=K2T6H91Q55QW4F&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLnJnMS5kYXRhLnRyaXBvM2QuY29tL3RyaXBvLXN0dWRpby8yMDI1MDUyMi9hYWQwZTJmZC0wZmUxLTQ2MjItOWZiNC02ZTAwZjNlZWExZjgvdHJpcG9fcmV0YXJnZXRfMGY2YmVjZjctNmE5Ny00YjUxLWFjNTEtZThiMzBlNmRjZTZiLmdsYiIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc3OTEwMDUzN319fV19&Signature=qIVHwOayOFJaIQ8Aiv1ceCtUWMI7eBvpc6aob3CzlaHWM6Eitt1Z4UvSVl371UBD1Ph6c4kgVHSQzVl59bttxFWElIiwM4EM7jzODtP43RTI8xVulTDg4aaKM8gCaIxbexyoeKI8XDk~tDa5cQ2KTk5R-t3EddttJESSWvTNPWmuy7usGglPhNq9Pe0QaCbQ00ICrJdbmN7Ycjp67zQOrffoI5ylGUyc9MZPfg2jldVdx8kW3HYKpZWQeS22rw5feWsGN82Q6aiXOXTRg89IWp18W0Cb3acSL-KxsgWqcsaW3eWB1en-xYKaIwckm0TWrPmgrAePmykXKzzu8Z1IMQ__",{"image":758,"style":4,"style_image":178,"prompt":760,"negative_prompt":178,"quad":62,"smart_poly":62,"face_limit":32,"texture":11,"pbr":11,"texture_quality":257,"texture_alignment":260,"generate_parts":178,"texture_seed":178,"geometry_quality":178,"visibility":4,"export_uv":178,"enable_image_autofix":178,"generate_image":761,"generate_image_object":763,"model_version":376},{"bucket":255,"key":759,"image_audit_result":178,"image_source":178},"tcli_6440f7102dab48c8bc26ca7882df997b\u002F20250522\u002Ffccb7365-5dd0-4470-8e51-9ca4d95ce5f1\u002Finput.png","A highly-detailed, orange and green 3D robotic figure with angular sensors, mechanical joints, and various accents and components.",[762],"https:\u002F\u002Fvast-plugin-data.rg1.data.tripo3d.com\u002Ftcli_6440f7102dab48c8bc26ca7882df997b\u002F20250522\u002Ffccb7365-5dd0-4470-8e51-9ca4d95ce5f1\u002Finput.png?Key-Pair-Id=K2T6H91Q55QW4F&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLnJnMS5kYXRhLnRyaXBvM2QuY29tL3RjbGlfNjQ0MGY3MTAyZGFiNDhjOGJjMjZjYTc4ODJkZjk5N2IvMjAyNTA1MjIvZmNjYjczNjUtNWRkMC00NDcwLThlNTEtOWNhNGQ5NWNlNWYxL2lucHV0LnBuZyIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc3OTE0ODgwMH19fV19&Signature=p5ZPmbxIp3IRkSq-lyQG93ItPpJlyofydDUcEumfPvNh7nCcL9FHzQidUjd6~ujVhYQzKqxFoMEDg77DRuWXCrZbzaZhMpZ-PX~PYc7q1VC4HtOapOZD6pQmxcc3yoFuKtZ09vBlh~HwqzoXtmTEnJ4ad9ZGBiaiyDea8hl0cbb7anZH7bSF0lV~ao87FjB5lYft88a2d0-KGvkiWnrpn6cjI3oSft-j5sishqKRAo1JtcdWhmRknxU4g3tNmxBbP8JnK8zVFlUj0XcWLWsTf3mVoZitjvGZnMmRQ2S-ABSAwSWYY8OlFKfFvNAhR9nXetjVwWBuyK8ei~YGqwSsZQ__",[764],{"bucket":255,"key":759,"url":762},{"max_retries":32,"used_retries":32,"remaining_retries":32,"can_retry":62,"can_show_retry":62},{"id":767,"type":217,"project":768},"0cfc383a-9cd3-4e1c-9458-fe3d14368478",{"owner_name":515,"owner_avatar":516,"id":767,"project_name":767,"like_count":223,"collect_count":393,"liked":62,"collected":62,"type":101,"visibility":319,"biz_info":769,"custom_tags":771,"category":4,"style":4,"use_case":4,"is_featured":11,"cover_image":772,"is_nsfw":62,"content_risk_level":4,"model_url":775,"is_owner":62,"operator":776,"retry_info":813},{"description":4,"short_description":4,"display_image":770},"https:\u002F\u002Ftripo-public-test.tripo3d.ai\u002Fstudio\u002Fproject\u002F0cfc383a-9cd3-4e1c-9458-fe3d14368478\u002Fdisplay.webp",[],[773,774],"https:\u002F\u002Fvast-plugin-data.rg1.data.tripo3d.com\u002Ftripo-studio\u002F20260516\u002F43c81114-e668-4e1b-abfb-cdefa9964f90\u002Fstudio_mesh.webp?Key-Pair-Id=K2T6H91Q55QW4F&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLnJnMS5kYXRhLnRyaXBvM2QuY29tL3RyaXBvLXN0dWRpby8yMDI2MDUxNi80M2M4MTExNC1lNjY4LTRlMWItYWJmYi1jZGVmYTk5NjRmOTAvc3R1ZGlvX21lc2gud2VicCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc3OTE0ODgwMH19fV19&Signature=psVyDVGueMre7M3tkhfXriXl-dqOFyAQxgmCDbFurvciFrog9hSwUqivdS0~FCYcZtNqawbvQcKnZIpi3hE99Q-U~nyTyjtMSYF7GlQryHHIktdI2TpO1GC7mj-n9H90xPQDbKfuaOmanS5P049LVjRKEGnDwI4MCVyff7UklFsZzBigEONKr2hwfUEcexV7TTVXMte4U4zI6ta20yTlhymhoL2KGgYoZo030KljdeC7vTI6VAjZAoOCXj2HgeNbm7bDJQbqRcK7pCAG73DKOFNulFBGfcrLx41r3rbCx7M6cHBbKSoORyvs0ZT43dccf3pnsAvwtHujaqtwyRPWLQ__","https:\u002F\u002Fvast-plugin-data.rg1.data.tripo3d.com\u002Ftripo-studio\u002F20250522\u002F0604f88a-a497-44ec-8e1b-2b62579b058b\u002Fstudio_part.webp?Key-Pair-Id=K2T6H91Q55QW4F&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLnJnMS5kYXRhLnRyaXBvM2QuY29tL3RyaXBvLXN0dWRpby8yMDI1MDUyMi8wNjA0Zjg4YS1hNDk3LTQ0ZWMtOGUxYi0yYjYyNTc5YjA1OGIvc3R1ZGlvX3BhcnQud2VicCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc3OTE0ODgwMH19fV19&Signature=s2Ozxu76wLbQ7PjR-~PF-4u5Gt3aucSQrvVKKbp9rzvjbVMYtNn75mbecD5IXBxXzUl9uTPKcun8MBrzcvuTjqUgHbIU8XHpRLB3zsfQCFPsoHbOTs0VY~ehD6b6jjgWfX9ZkegI8313j1qmUtJBfCwWmyG5Ikt7Wp-lMopn6UBQesUj9XKrtB5AA3B38KNWPrqDBImNkzkR75iKXAlBDTGRmz~J3TnrO1ltYvfNrX-aeGSlRCvcXnOAmY-SpYOZ0z6QkE0gpbHIIRYm5soveQvj5JDYWGChUGeg266FT1xQbeGXoZ4CgjFhfPG~1CwYhcEbUQ7tdJAbPplNMTxw~A__","https:\u002F\u002Fvast-plugin-data.rg1.data.tripo3d.com\u002Ftripo-studio\u002F20260516\u002F43c81114-e668-4e1b-abfb-cdefa9964f90\u002Ftripo_texture_43c81114-e668-4e1b-abfb-cdefa9964f90_meshopt.glb?Key-Pair-Id=K2T6H91Q55QW4F&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLnJnMS5kYXRhLnRyaXBvM2QuY29tL3RyaXBvLXN0dWRpby8yMDI2MDUxNi80M2M4MTExNC1lNjY4LTRlMWItYWJmYi1jZGVmYTk5NjRmOTAvdHJpcG9fdGV4dHVyZV80M2M4MTExNC1lNjY4LTRlMWItYWJmYi1jZGVmYTk5NjRmOTBfbWVzaG9wdC5nbGIiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3NzkxNDg4MDB9fX1dfQ__&Signature=sy8ARks9dKaSdX3UrP5AQbuxUKy6W52pG1Zas5nqufpxddcQceoNmIO8HZJXymaOiaOawnS3AYI52yYCWlQPr1ekdL1T0a-SWW9LYjL9GMnZ80gyvaVeusT9NJanSK6VSwdYF8a76Ccwpg86~RqDfrEBu87aKEPSOXHAD6ik91e-sJ1N~zB3abrHRk8jXd1o20sQ~r0xoR3jdx4O0x1SQMlTdIj8yzTHbjbbGUnE5l-idk8i6kw69G7D2CMOyORh3P24HCgIAWSAgcG-mTY-BLfHGJiTfcXkYxNlS~KrmFJ26HnxUZ9foIq9K49Gb7RJpXxKORz3xgjUHJVD62Z5Yg__",{"operator_id":777,"model_version":238,"model_url":775,"metadata":778,"status":245,"cover_image":784,"is_owner":62,"created_at":785,"updated_at":248,"type":249,"texture":786,"is_segmented":11,"is_textured":11,"is_rigged":62,"is_rigged_by_tripo":62,"is_stylized":62,"is_pbr":62,"is_hd_textured":11,"is_ultra_textured":62,"is_nexus_mesh":62,"is_nsfw":62,"content_risk_level":4,"image_to_model":799,"texture_generation":807,"is_latest_operator":11},"43c81114-e668-4e1b-abfb-cdefa9964f90",{"transform_matrix":779,"children_transform_matrix":780,"children_deleted":781,"children_rename":782,"material_factor":783},[],{},[],{},{"metallic":32,"roughness":99},[773,774],1778936875,{"operator_id":777,"id":777,"status":245,"generate_image":787,"generate_image_object":789,"texture_quality":257,"part_names":792,"texture_alignment":260},[788],"https:\u002F\u002Fvast-plugin-data.rg1.data.tripo3d.com\u002Ftripo-studio\u002F20260516\u002F7e62c66c-1e4d-435a-a87f-c5f6b1f79953\u002Finput.png?Key-Pair-Id=K2T6H91Q55QW4F&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLnJnMS5kYXRhLnRyaXBvM2QuY29tL3RyaXBvLXN0dWRpby8yMDI2MDUxNi83ZTYyYzY2Yy0xZTRkLTQzNWEtYTg3Zi1jNWY2YjFmNzk5NTMvaW5wdXQucG5nIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzc5MTQ4ODAwfX19XX0_&Signature=RPgWpGyGJy1mJ7BQnHGIjg4OFS2O7ZEDDZYoNNbVOAqwYNkywpFH-DvIah~0I4XZEyu5ZbkJw8c9~9yJiV3TgCdYPSD-RrrYYPENtcaLSEpnpbSCcocRX0GYafIRJr6hYYvi8l-Z-W5Qfk8V0fbBNW7i~B6ILHgYYzC1RoFTgz9rNakzwQnqBHDZfoUFYGTDX8Wq6iX0qN~whVeJDOgJENkt-7w0DJbYPcB0zHEtgIyRGebzea3~Zi729rWJQo2wA64uV09kV0yIcDjqxIPHB9XXQlI1gKB~Std7P~r2UtFLFzRDKamkZzjVpyAwJQ6IvI9rbuA~xU4bMmOTxkF~WA__",[790],{"bucket":255,"key":791,"url":788},"tripo-studio\u002F20260516\u002F7e62c66c-1e4d-435a-a87f-c5f6b1f79953\u002Finput.png",[793,794,795,541,542,796,797,548,798],"tripo_part_22","tripo_part_17","tripo_part_16","tripo_part_10","tripo_part_6","tripo_part_1",{"image":800,"style":178,"style_image":178,"prompt":802,"negative_prompt":178,"quad":62,"smart_poly":62,"face_limit":32,"texture":62,"pbr":178,"texture_quality":178,"texture_alignment":178,"generate_parts":11,"texture_seed":178,"geometry_quality":178,"visibility":4,"export_uv":178,"enable_image_autofix":178,"generate_image":803,"generate_image_object":805,"model_version":376},{"bucket":255,"key":801,"image_audit_result":178,"image_source":178},"tcli_6440f7102dab48c8bc26ca7882df997b\u002F20250522\u002F36af475b-5dc6-44ec-b09c-7adca6cafaa1\u002Finput.jpeg","A hooded skeletal figure in a long blue cloak, holding a golden three-pronged weapon.",[804],"https:\u002F\u002Fvast-plugin-data.rg1.data.tripo3d.com\u002Ftcli_6440f7102dab48c8bc26ca7882df997b\u002F20250522\u002F36af475b-5dc6-44ec-b09c-7adca6cafaa1\u002Finput.jpeg?Key-Pair-Id=K2T6H91Q55QW4F&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLnJnMS5kYXRhLnRyaXBvM2QuY29tL3RjbGlfNjQ0MGY3MTAyZGFiNDhjOGJjMjZjYTc4ODJkZjk5N2IvMjAyNTA1MjIvMzZhZjQ3NWItNWRjNi00NGVjLWIwOWMtN2FkY2E2Y2FmYWExL2lucHV0LmpwZWciLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3NzkxNDg4MDB9fX1dfQ__&Signature=jGXa01V4iSWFrBFa6wAaydRUb9jqJoWvAhTm2m0qate6VYhSC6ruwtksxQTs5GntVAtkr7aUkliSoLZzMrokKyCrvl3YfvOEkTGi8cpXiGW9zvchD-77qOiF1H8zvYcKwX6A9xMPu0F5LzuSCSDi7o5cPEImKhd4t99DTUUlEEFf713Oo8MiXc-XcFSvTGartj8nBVCqjo5qh54tEuS5bjLTjshz~sPmCtzxJQwacoBDBEx52TZtVYl9tn6p5QLmbyF1YJFwIxrT9oJpqR18UkvGVqxQeTLWIC9jacCbvIo0D-~MgPwLPeQHVRqoSMiNVj8u1BW4mdsBfDsfl4yozg__",[806],{"bucket":255,"key":801,"url":804},{"project_id":767,"texture_quality":257,"texture_alignment":260,"part_names":808,"texture_seed":178,"image":809,"generate_image":810,"generate_image_object":811,"model_version":238},[793,794,795,541,542,796,797,548,798],{"bucket":255,"key":791,"image_audit_result":264,"image_source":265},[788],[812],{"bucket":255,"key":791,"url":788},{"max_retries":32,"used_retries":32,"remaining_retries":32,"can_retry":62,"can_show_retry":62},{"id":815,"type":217,"project":816},"4aed06d6-5dd3-455a-9fe1-be4b027a6810",{"owner_name":425,"owner_avatar":426,"id":815,"project_name":815,"like_count":223,"collect_count":32,"liked":62,"collected":62,"type":101,"visibility":102,"biz_info":817,"custom_tags":818,"category":4,"style":4,"use_case":4,"is_featured":11,"cover_image":819,"is_nsfw":62,"content_risk_level":4,"model_url":822,"is_owner":62,"operator":823,"retry_info":852},{"description":4,"short_description":4,"display_image":4},[],[820,821],"https:\u002F\u002Fvast-plugin-data.rg1.data.tripo3d.com\u002Ftripo-studio\u002F20250522\u002Fd561fb4d-42b2-41fc-ba14-575ba54669cf\u002Fstudio_mesh.webp?Key-Pair-Id=K2T6H91Q55QW4F&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLnJnMS5kYXRhLnRyaXBvM2QuY29tL3RyaXBvLXN0dWRpby8yMDI1MDUyMi9kNTYxZmI0ZC00MmIyLTQxZmMtYmExNC01NzViYTU0NjY5Y2Yvc3R1ZGlvX21lc2gud2VicCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc3OTE0ODgwMH19fV19&Signature=bhdCJAVs0JfhmKUnB9yJZ6BaBxUNgg-EW1ozrRQK2BnUUozQlhSAeT03r4D~UdAY7dtB~3c0baYeInHB~fh5~4vRdeXPTf505cQAtMDu5aQBibCm9cJtlBesnpX59im5Jr6r-uY8~dD67i-XaTmzc0veANgKbIiWaaliVPvvi~CaNZu0K6Jb5C~63NQ43iyBqD97vsBAJ2bsJJz364GhaCrAFZ~BHCEL0bPqEXMsT6pvmH8xT7tRP2L7lN3fDHDI99SoieIPLi~4BL2ILC9S4HWMicLrujce-H9VF3fOVjFnrRw~7vsySJ69Tbf0nrlg-8McLGqmYjAjL8YKvPMSaw__","https:\u002F\u002Fvast-plugin-data.rg1.data.tripo3d.com\u002Ftripo-studio\u002F20250522\u002F1a494534-c097-45be-aa93-cca479b15e81\u002Fstudio_wireframe.webp?Key-Pair-Id=K2T6H91Q55QW4F&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLnJnMS5kYXRhLnRyaXBvM2QuY29tL3RyaXBvLXN0dWRpby8yMDI1MDUyMi8xYTQ5NDUzNC1jMDk3LTQ1YmUtYWE5My1jY2E0NzliMTVlODEvc3R1ZGlvX3dpcmVmcmFtZS53ZWJwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzc5MTQ4ODAwfX19XX0_&Signature=XT6VeErvvZZbotLiwBOqBwxzVLYDzA~N664AYmDWADb9~ph4jaau0OCJ23deT-rdJ0NcuZBtF77mWjQkekE~rbuBKWwiMpf65ttLbmw3sz8jwkgyvHwa-NYqfu4jnXSuct-eFDWvieh-khVVwc3ps1DTqknKwrzMixywLktn6bWf2jzFsC0rrpkXhNiJbQ94g-bygTkJ9KXLVAGy5kiQKMaJHIuXRkEqqLkyqS1eBffdZ4QbeBJ43T-W34Q00BQlXjygnmztNtfH~BrubwTzeYVIKSDPmT8~RnBF938fzdjGkh9~htEj0cWEUodT5ajKgfSB8u3N2S5Ka2P35ZvHlw__","https:\u002F\u002Fvast-plugin-data.rg1.data.tripo3d.com\u002Ftripo-studio\u002F20250522\u002Fd561fb4d-42b2-41fc-ba14-575ba54669cf\u002Ftripo_texture_d561fb4d-42b2-41fc-ba14-575ba54669cf.fbx?Key-Pair-Id=K2T6H91Q55QW4F&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLnJnMS5kYXRhLnRyaXBvM2QuY29tL3RyaXBvLXN0dWRpby8yMDI1MDUyMi9kNTYxZmI0ZC00MmIyLTQxZmMtYmExNC01NzViYTU0NjY5Y2YvdHJpcG9fdGV4dHVyZV9kNTYxZmI0ZC00MmIyLTQxZmMtYmExNC01NzViYTU0NjY5Y2YuZmJ4IiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzc5MTQ4ODAwfX19XX0_&Signature=FxEB7lZ-p8Fl1O59QPfnV0A0TQpZB9YfaMUcgFug7aO7Q6mpUZtGW2~90kd2f7cB~-~ERn~MuhSc2l6XujFg67KCmow-ghnXkrmhPkFCfermv~mveUzdRYBFny6srUjr0Ijoo2-8j-OGsTLRpRAea44ZeIGGOSSEHnsBKYW5ZPY~oTR7AZ6hBIzry3FcuVy8PyPHgWqZbp3B7mlkwy783LvC3meB-26yDkp7RTkn~4f~f9R~~5CkcCzF3E-SAPGqb~LORIZ4pvqDDqcx4r74Lj4KXBm4jUrS-4VT7~8tQuHrqZBHUes5J7lq1p9e4RFgyw9g0~~LzwQADGrBH4S-KQ__",{"operator_id":824,"model_version":376,"model_url":822,"metadata":825,"status":245,"cover_image":831,"is_owner":62,"created_at":832,"updated_at":832,"type":249,"texture":833,"is_segmented":62,"is_textured":11,"is_rigged":62,"is_rigged_by_tripo":62,"is_stylized":62,"is_pbr":62,"is_hd_textured":62,"is_ultra_textured":62,"is_nexus_mesh":62,"is_nsfw":62,"content_risk_level":4,"image_to_model":840,"texture_generation":846,"is_latest_operator":11},"8485e610-2974-47fd-b5f6-e25fb28aee86",{"transform_matrix":826,"children_transform_matrix":827,"children_deleted":828,"children_rename":829,"material_factor":830},[],{},[],{},{"metallic":32,"roughness":99},[820,821],1750167702,{"operator_id":834,"id":834,"status":245,"generate_image":835,"generate_image_object":837,"texture_quality":257,"part_names":178,"texture_alignment":260},"d561fb4d-42b2-41fc-ba14-575ba54669cf",[836],"https:\u002F\u002Fvast-plugin-data.rg1.data.tripo3d.com\u002Ftcli_6440f7102dab48c8bc26ca7882df997b\u002F20250522\u002F0280c830-e34a-4d60-ae5a-e9a562820ebc\u002Finput.png?Key-Pair-Id=K2T6H91Q55QW4F&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLnJnMS5kYXRhLnRyaXBvM2QuY29tL3RjbGlfNjQ0MGY3MTAyZGFiNDhjOGJjMjZjYTc4ODJkZjk5N2IvMjAyNTA1MjIvMDI4MGM4MzAtZTM0YS00ZDYwLWFlNWEtZTlhNTYyODIwZWJjL2lucHV0LnBuZyIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc3OTE0ODgwMH19fV19&Signature=kDCnthUyN0WDsypRlrjqPAzsFZYZbQuBA5TgTh~GZqWGgC50e1WTcy90IwHbgxpwtld7I33h3MHwulYy-AJFAiS4T28gNS1c2iGRMswGrsiQz3nvmJ7dqKHqAC2Xgm3~EKE4vKoG~vruOCTwDMdPgFowItYpO4AMuuDqW5CAC6TbpI~A3TQ1JVsY70mzEUK9ZEiiNuzVfazzhYov6SxTnQ6rTmiUCMtTrl-BBAMURa8pOZsIvxSFYKWUzphJNin2Bx00zCJsDI-SO6aK0joAwVS78pEV0BZrKw2t2Gt86-UGy80f~uKFwqDRiJS9c3tpHm51D~RJxY4Q0VrRn5qKoA__",[838],{"bucket":255,"key":839,"url":836},"tcli_6440f7102dab48c8bc26ca7882df997b\u002F20250522\u002F0280c830-e34a-4d60-ae5a-e9a562820ebc\u002Finput.png",{"image":841,"style":178,"style_image":178,"prompt":842,"negative_prompt":178,"quad":11,"smart_poly":11,"face_limit":32,"texture":62,"pbr":178,"texture_quality":178,"texture_alignment":178,"generate_parts":62,"texture_seed":178,"geometry_quality":178,"visibility":4,"export_uv":178,"enable_image_autofix":178,"generate_image":843,"generate_image_object":844,"model_version":376},{"bucket":255,"key":839,"image_audit_result":178,"image_source":178},"A highly detailed, metallic-finished figurine of a frog with a vibrant mosaic-like pattern of green, yellow, and gold tones.",[836],[845],{"bucket":255,"key":839,"url":836},{"project_id":815,"texture_quality":257,"texture_alignment":260,"part_names":178,"texture_seed":178,"prompt_text":847,"image":848,"generate_image":849,"generate_image_object":850,"model_version":376},"A highly detailed ornamental ceramic or resin figurine of a frog with intricate green and gold patterned scales and a large, expressive eye.",{"bucket":255,"key":839,"image_audit_result":178,"image_source":178},[836],[851],{"bucket":255,"key":839,"url":836},{"max_retries":32,"used_retries":32,"remaining_retries":32,"can_retry":62,"can_show_retry":62},{"id":854,"type":217,"project":855},"dab3e08f-e391-4315-8845-771e2aea6cba",{"owner_name":856,"owner_avatar":220,"id":854,"project_name":854,"like_count":393,"collect_count":223,"liked":62,"collected":62,"type":101,"visibility":319,"biz_info":857,"custom_tags":858,"category":4,"style":4,"use_case":4,"is_featured":11,"cover_image":859,"is_nsfw":62,"content_risk_level":4,"model_url":862,"is_owner":62,"operator":863,"retry_info":894},"Anonymous1747400941",{"description":4,"short_description":4,"display_image":4},[],[860,861],"https:\u002F\u002Fvast-plugin-data.rg1.data.tripo3d.com\u002Ftripo-studio\u002F20250522\u002F8ba33416-9e76-4f40-861e-53c92d5e7028\u002Fstudio_mesh.webp?Key-Pair-Id=K2T6H91Q55QW4F&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLnJnMS5kYXRhLnRyaXBvM2QuY29tL3RyaXBvLXN0dWRpby8yMDI1MDUyMi84YmEzMzQxNi05ZTc2LTRmNDAtODYxZS01M2M5MmQ1ZTcwMjgvc3R1ZGlvX21lc2gud2VicCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc3OTE0ODgwMH19fV19&Signature=Rsjwl7JlGM70UKP2PmZY~8mR~qbRV61GvLItji91A7K66RUVo38SBN7rOO6ljjk1Cc3bEjLyGKt12qEXjBpREav-w41e-OjKuW50qlj-N0KbpT8igSiSKtu-J9PCRTDBWdwXgyXko4v3TIJRVJA-82Jl2BC-~nV8kyfgbdX3Qa56to~lEuvokb8-wlXxA8lzbSNNW2Mc7yqqazoll7DkVKfgGzxkdyOXvRP0AbqNH~N016nBvng36fqR1BZdE5AA4eePYUhEAqpZIuyd8FPVOI-g7aV2T~yR02-IzUhaC8RKjSqbfUZYtO5j3~2v3J-vUoM6hdkjjUn5ujJxIeQ2eQ__","https:\u002F\u002Fvast-plugin-data.rg1.data.tripo3d.com\u002Ftripo-studio\u002F20250522\u002F34ecd62a-95d8-4a4e-baee-ee362b3de8cd\u002Fstudio_wireframe.webp?Key-Pair-Id=K2T6H91Q55QW4F&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLnJnMS5kYXRhLnRyaXBvM2QuY29tL3RyaXBvLXN0dWRpby8yMDI1MDUyMi8zNGVjZDYyYS05NWQ4LTRhNGUtYmFlZS1lZTM2MmIzZGU4Y2Qvc3R1ZGlvX3dpcmVmcmFtZS53ZWJwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzc5MTQ4ODAwfX19XX0_&Signature=Sd10OfIRUzCseoKl9Ys1EjzdItYoOH0Wd2MV-VvTU9T9zKJpAv-XG-MIfsQ2EgDN96C3AEqFEJo979r7E4QqtrIIVAu4u9WvevoBpgambTjtkBLgxz-OYEDfsBleeGqCy32mlmpAwuuXpScQagVgNnYX~u-Bdpzo7RjDCoVoZoQeoJWEAaR-IAErJnSstfp8CpqmXggF-8x0IC3~qV5Rh7yNs9H5CImCIyN9~58M4qwxCLgIut1YuIbyNFIPwv0LPXUCr7-iiSWE4o5E6gqxComIaUhqmjxLgN-sX9NcucAg6Cl97wC9GJve6kzteYiSrKAlqrQXD0dae3F7xYM0wg__","https:\u002F\u002Fvast-plugin-data.rg1.data.tripo3d.com\u002Ftripo-studio\u002F20250522\u002F8ba33416-9e76-4f40-861e-53c92d5e7028\u002Ftripo_texture_8ba33416-9e76-4f40-861e-53c92d5e7028.fbx?Key-Pair-Id=K2T6H91Q55QW4F&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLnJnMS5kYXRhLnRyaXBvM2QuY29tL3RyaXBvLXN0dWRpby8yMDI1MDUyMi84YmEzMzQxNi05ZTc2LTRmNDAtODYxZS01M2M5MmQ1ZTcwMjgvdHJpcG9fdGV4dHVyZV84YmEzMzQxNi05ZTc2LTRmNDAtODYxZS01M2M5MmQ1ZTcwMjguZmJ4IiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzc5MTQ4ODAwfX19XX0_&Signature=BZlft0UiwuPnjnP2nStiQ7khjdC3EMEHNjGKGdePoTomEB2VQZi6Pq5q22LBUIgQ7F77HUf8mGmlw2DMgfO7L3jESFzNgMBr2PchTv3nwgVtJRqvftMuBloRV5M64EH2YaqwQhYbC8xtNrtLzaC9ItbStLcd5QSrgufugfihU0Gfed3C2HdosuFcBdp2Xs-1RRS~uDyeEiBLGwvLKzR90izoKci3FGsrOwHy7GFJ7YVQpm0n3cfT4k7IzQLhYVAPolvtkFweBfaNQ~rjJbktNKXwi3tAseY5php~xfqfS48UnGBCDzKHcjBfaf9POMkyvlY60RDnqeCAXPZk0nMkCQ__",{"operator_id":864,"model_version":376,"model_url":862,"metadata":865,"status":245,"cover_image":871,"is_owner":62,"created_at":872,"updated_at":873,"type":874,"texture":875,"is_segmented":62,"is_textured":11,"is_rigged":62,"is_rigged_by_tripo":62,"is_stylized":62,"is_pbr":11,"is_hd_textured":62,"is_ultra_textured":62,"is_nexus_mesh":62,"is_nsfw":62,"content_risk_level":4,"image_to_model":882,"texture_generation":888,"is_latest_operator":11},"8ba33416-9e76-4f40-861e-53c92d5e7028",{"transform_matrix":866,"children_transform_matrix":867,"children_deleted":868,"children_rename":869,"material_factor":870},[],{},[],{},{"metallic":393,"roughness":393},[860,861],1747901949,1747902053,"pbr",{"operator_id":876,"id":876,"status":245,"generate_image":877,"generate_image_object":879,"texture_quality":257,"part_names":178,"texture_alignment":260},"c6a4ec8f-6d31-408c-bcfd-a911a0766800",[878],"https:\u002F\u002Fvast-plugin-data.rg1.data.tripo3d.com\u002Ftcli_6440f7102dab48c8bc26ca7882df997b\u002F20250522\u002F828de483-28ea-436a-81a6-b8ee7d915a42\u002Finput.jpg?Key-Pair-Id=K2T6H91Q55QW4F&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92YXN0LXBsdWdpbi1kYXRhLnJnMS5kYXRhLnRyaXBvM2QuY29tL3RjbGlfNjQ0MGY3MTAyZGFiNDhjOGJjMjZjYTc4ODJkZjk5N2IvMjAyNTA1MjIvODI4ZGU0ODMtMjhlYS00MzZhLTgxYTYtYjhlZTdkOTE1YTQyL2lucHV0LmpwZyIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc3OTE0ODgwMH19fV19&Signature=Dmro8SRBb6c5X1lKe82vOLEx67liAbxa0d8SP1AE9XqXqourCU2S-hC0QBJRNPQrOhmdbzMmmklReDbYzJhVtnlDfrCPnu00PlJakVrNzx4i4Ghcsy1nrobvE6KlPrHY7wfnLO6URPTJyduUzw11JjqDIPEz3ghINfjFPbG3M9zQZjRUWRW8BAhirmLF-igo~W4Jd24BHdkxIRP0bqXcpqwFelmGcRQND~wVXaQxJtIiDfJnAzvMN5WDp8PS2CRhBQDKpqRADNxYYMD-~zGJKfDraYWTRk0KGjXRm6fsoeIP2~u5n9VdMDvvN00uXnA9oWxgmbDYB~SMPPWWRZjrDA__",[880],{"bucket":255,"key":881,"url":878},"tcli_6440f7102dab48c8bc26ca7882df997b\u002F20250522\u002F828de483-28ea-436a-81a6-b8ee7d915a42\u002Finput.jpg",{"image":883,"style":178,"style_image":178,"prompt":884,"negative_prompt":178,"quad":11,"smart_poly":11,"face_limit":32,"texture":62,"pbr":178,"texture_quality":178,"texture_alignment":178,"generate_parts":62,"texture_seed":178,"geometry_quality":178,"visibility":4,"export_uv":178,"enable_image_autofix":178,"generate_image":885,"generate_image_object":886,"model_version":376},{"bucket":255,"key":881,"image_audit_result":178,"image_source":178},"A high-tech, transforming motorcycle-like vehicle in a bold red, yellow, and black color scheme, featuring a powerful front light, advanced components, and a rider in a racing suit and helmet.",[878],[887],{"bucket":255,"key":881,"url":878},{"project_id":854,"texture_quality":257,"texture_alignment":260,"part_names":178,"texture_seed":178,"prompt_text":889,"image":890,"generate_image":891,"generate_image_object":892,"model_version":376},"A sleek, futuristic 3D-rendered robotic motorcycle with a prominent headlight, yellow and red color scheme, and mechanical components.",{"bucket":255,"key":881,"image_audit_result":178,"image_source":178},[878],[893],{"bucket":255,"key":881,"url":878},{"max_retries":32,"used_retries":32,"remaining_retries":32,"can_retry":62,"can_show_retry":62},["Ref",80],["Ref",897],"MToxNzg=",["Ref",899],"recommended",["EmptyRef",78],["Ref",80]]</script></body></html>
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

## POST 获取邮箱

POST /idp-ext/auth/check-identifier

> Body 请求参数

```json
{"identifier":"vast-test{{$date.timestamp}}@zabrian.com"}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Content-Type|header|string| 是 |none|
|Pragma|header|string| 是 |none|
|Connection|header|string| 否 |none|
|body|body|object| 是 |none|
|» identifier|body|string| 是 |none|

> 返回示例

> 200 Response

```json
{"success":true,"data":{"flow_type":"registration"}}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» success|boolean|true|none||none|
|» data|object|true|none||none|
|»» flow_type|string|true|none||none|

## GET 获取flow

GET /self-service/registration/api

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Accept|header|string| 是 |none|
|Connection|header|string| 否 |none|

> 返回示例

> 200 Response

```json
{"id":"6f2d565d-cd7e-43eb-9864-0e8dd353e7b0","type":"api","expires_at":"2026-05-17T10:10:39.897446611Z","issued_at":"2026-05-17T10:00:39.897446611Z","request_url":"http://auth-staging.tripo3d.ai/self-service/registration/api","ui":{"action":"https://auth-staging.tripo3d.ai/self-service/registration?flow=6f2d565d-cd7e-43eb-9864-0e8dd353e7b0","method":"POST","nodes":[{"type":"input","group":"oidc","attributes":{"name":"provider","type":"submit","value":"apple","disabled":false,"node_type":"input"},"messages":[],"meta":{"label":{"id":1040002,"text":"Sign up with apple","type":"info","context":{"provider":"apple","provider_id":"apple"}}}},{"type":"input","group":"oidc","attributes":{"name":"provider","type":"submit","value":"discord","disabled":false,"node_type":"input"},"messages":[],"meta":{"label":{"id":1040002,"text":"Sign up with discord","type":"info","context":{"provider":"discord","provider_id":"discord"}}}},{"type":"input","group":"oidc","attributes":{"name":"provider","type":"submit","value":"facebook","disabled":false,"node_type":"input"},"messages":[],"meta":{"label":{"id":1040002,"text":"Sign up with facebook","type":"info","context":{"provider":"facebook","provider_id":"facebook"}}}},{"type":"input","group":"oidc","attributes":{"name":"provider","type":"submit","value":"google","disabled":false,"node_type":"input"},"messages":[],"meta":{"label":{"id":1040002,"text":"Sign up with google","type":"info","context":{"provider":"google","provider_id":"google"}}}},{"type":"input","group":"oidc","attributes":{"name":"provider","type":"submit","value":"lark","disabled":false,"node_type":"input"},"messages":[],"meta":{"label":{"id":1040002,"text":"Sign up with lark","type":"info","context":{"provider":"lark","provider_id":"lark"}}}},{"type":"input","group":"oidc","attributes":{"name":"provider","type":"submit","value":"microsoft","disabled":false,"node_type":"input"},"messages":[],"meta":{"label":{"id":1040002,"text":"Sign up with microsoft","type":"info","context":{"provider":"microsoft","provider_id":"microsoft"}}}},{"type":"input","group":"oidc","attributes":{"name":"provider","type":"submit","value":"plark","disabled":false,"node_type":"input"},"messages":[],"meta":{"label":{"id":1040002,"text":"Sign up with plark","type":"info","context":{"provider":"plark","provider_id":"plark"}}}},{"type":"input","group":"oidc","attributes":{"name":"provider","type":"submit","value":"twitter","disabled":false,"node_type":"input"},"messages":[],"meta":{"label":{"id":1040002,"text":"Sign up with twitter","type":"info","context":{"provider":"twitter","provider_id":"twitter"}}}},{"type":"input","group":"default","attributes":{"name":"traits.email","type":"email","required":true,"autocomplete":"email","disabled":false,"node_type":"input"},"messages":[],"meta":{"label":{"id":1070002,"text":"EMail address","type":"info","context":{"title":"EMail address"}}}},{"type":"input","group":"default","attributes":{"name":"csrf_token","type":"hidden","value":"","required":true,"disabled":false,"node_type":"input"},"messages":[],"meta":{}},{"type":"input","group":"code","attributes":{"name":"method","type":"submit","value":"code","disabled":false,"node_type":"input"},"messages":[],"meta":{"label":{"id":1040006,"text":"Send sign up code","type":"info"}}},{"type":"input","group":"password","attributes":{"name":"password","type":"password","required":true,"autocomplete":"new-password","disabled":false,"node_type":"input"},"messages":[],"meta":{"label":{"id":1070001,"text":"Password","type":"info"}}},{"type":"input","group":"password","attributes":{"name":"method","type":"submit","value":"password","disabled":false,"node_type":"input"},"messages":[],"meta":{"label":{"id":1040001,"text":"Sign up","type":"info"}}}]},"organization_id":null,"state":"choose_method"}

```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» id|string|true|none||none|
|» type|string|true|none||none|
|» expires_at|string|true|none||none|
|» issued_at|string|true|none||none|
|» request_url|string|true|none||none|
|» ui|object|true|none||none|
|»» action|string|true|none||none|
|»» method|string|true|none||none|
|»» nodes|[object]|true|none||none|
|»»» type|string|true|none||none|
|»»» group|string|true|none||none|
|»»» attributes|object|true|none||none|
|»»»» name|string|true|none||none|
|»»»» type|string|true|none||none|
|»»»» value|string|true|none||none|
|»»»» disabled|boolean|true|none||none|
|»»»» node_type|string|true|none||none|
|»»»» required|boolean|false|none||none|
|»»»» autocomplete|string|false|none||none|
|»»» messages|[any]|true|none||none|
|»»» meta|object|true|none||none|
|»»»» label|object|true|none||none|
|»»»»» id|integer|true|none||none|
|»»»»» text|string|true|none||none|
|»»»»» type|string|true|none||none|
|»»»»» context|object|false|none||none|
|»»»»»» provider|string|false|none||none|
|»»»»»» provider_id|string|false|none||none|
|»»»»»» title|string|true|none||none|
|» organization_id|null|true|none||none|
|» state|string|true|none||none|

## POST 注册

POST /self-service/registration

> Body 请求参数

```json
{
    "code": "{{code}}",
    "csrf_token": "{{csrf_token}}",
    "method": "code",
    "traits": {
        "email": "{{email}}"
    },
    "transient_payload": {
        "receiveMarketing": true
    }
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|flow|query|string| 是 |none|
|Content-Type|header|string| 是 |none|
|Pragma|header|string| 是 |none|
|Cookie|header|string| 是 |none|
|Connection|header|string| 否 |none|
|body|body|object| 是 |none|

> 返回示例

> 400 Response

```json
{"id":"4df9c17a-1e5d-4768-a26d-ea353c0d28a4","type":"browser","expires_at":"2026-05-17T09:53:07.079274Z","issued_at":"2026-05-17T09:43:07.079274Z","request_url":"http://auth-staging.tripo3d.ai/self-service/registration/browser","active":"code","ui":{"action":"https://auth-staging.tripo3d.ai/self-service/registration?flow=4df9c17a-1e5d-4768-a26d-ea353c0d28a4","method":"POST","nodes":[{"type":"input","group":"default","attributes":{"name":"traits.email","type":"hidden","value":"vast-test11116@zabrian.com","required":true,"autocomplete":"email","disabled":false,"node_type":"input"},"messages":[],"meta":{"label":{"id":1070002,"text":"EMail address","type":"info","context":{"title":"EMail address"}}}},{"type":"input","group":"default","attributes":{"name":"csrf_token","type":"hidden","value":"hThJBUbmX46SeDKSS/oxFZoe3j8gNnPu8pvtUUHZwBPRtphaNRyCq8WHJCP4/evO+KwtieAe9L+GN/cxFMqBfA==","required":true,"disabled":false,"node_type":"input"},"messages":[],"meta":{}},{"type":"input","group":"code","attributes":{"name":"code","type":"text","required":true,"disabled":false,"node_type":"input"},"messages":[],"meta":{"label":{"id":1070012,"text":"Registration code","type":"info"}}},{"type":"input","group":"code","attributes":{"name":"resend","type":"submit","value":"code","disabled":false,"node_type":"input"},"messages":[],"meta":{"label":{"id":1070008,"text":"Resend code","type":"info"}}},{"type":"input","group":"code","attributes":{"name":"method","type":"hidden","value":"code","disabled":false,"node_type":"input"},"messages":[],"meta":{}},{"type":"input","group":"code","attributes":{"name":"method","type":"submit","value":"code","disabled":false,"node_type":"input"},"messages":[],"meta":{"label":{"id":1070009,"text":"Continue","type":"info"}}}],"messages":[{"id":4000001,"text":"Unable to decode HTTP Request Body because its HTTP Header \"Content-Length\" is zero.","type":"error","context":{"reason":"Unable to decode HTTP Request Body because its HTTP Header \"Content-Length\" is zero."}}]},"organization_id":null,"state":"passed_challenge"}

```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|none|Inline|

### 返回数据结构

状态码 **400**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» id|string|true|none||none|
|» type|string|true|none||none|
|» expires_at|string|true|none||none|
|» issued_at|string|true|none||none|
|» request_url|string|true|none||none|
|» active|string|true|none||none|
|» ui|object|true|none||none|
|»» action|string|true|none||none|
|»» method|string|true|none||none|
|»» nodes|[object]|true|none||none|
|»»» type|string|true|none||none|
|»»» group|string|true|none||none|
|»»» attributes|object|true|none||none|
|»»»» name|string|true|none||none|
|»»»» type|string|true|none||none|
|»»»» value|string|true|none||none|
|»»»» required|boolean|false|none||none|
|»»»» autocomplete|string|false|none||none|
|»»»» disabled|boolean|true|none||none|
|»»»» node_type|string|true|none||none|
|»»» messages|[any]|true|none||none|
|»»» meta|object|true|none||none|
|»»»» label|object|true|none||none|
|»»»»» id|integer|true|none||none|
|»»»»» text|string|true|none||none|
|»»»»» type|string|true|none||none|
|»»»»» context|object|false|none||none|
|»»»»»» title|string|true|none||none|
|»» messages|[object]|true|none||none|
|»»» id|integer|false|none||none|
|»»» text|string|false|none||none|
|»»» type|string|false|none||none|
|»»» context|object|false|none||none|
|»»»» reason|string|true|none||none|
|» organization_id|null|true|none||none|
|» state|string|true|none||none|

## GET 获取邮箱验证码

GET /code

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|email|query|string| 否 |none|
|format|query|string| 否 |none|
|Authorization|header|string| 否 |none|
|Connection|header|string| 否 |none|

> 返回示例

> 200 Response

```json
{"email":"vast-test11116@zabrian.com","code":"851487"}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

# 数据模型

