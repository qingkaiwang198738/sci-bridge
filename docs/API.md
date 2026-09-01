# V1 API

## GET /api/v1/messages
返回当前未过期、公开的需求。

## POST /api/v1/messages
创建需求。返回 `message` 与一次性展示的 `ownerSecret`。

## GET /api/v1/messages/:id
查看公开需求详情。

## PATCH /api/v1/messages/:id
需要 JSON `{ "secret": "OWNER_SECRET" }`；当前用于标记已解决。

## GET /api/v1/messages/:id/responses?secret=...
仅 Owner Secret 可查看该需求的响应列表。

## POST /api/v1/responses
JSON：`messageId`、`content`、可选 `turnstileToken`。返回一次性展示的 `responderSecret`。

## GET /api/v1/chats/:responseId?secret=...
Response Secret 或 Owner Secret 均可访问对应会话。

## POST /api/v1/chats/:responseId
JSON：`responseId`、`accessSecret`、`sender`、`content`。

## POST /api/v1/reports
JSON：`messageId`、`reason`、`fingerprint`。fingerprint 不应直接使用原始 IP/邮箱。

## POST /api/v1/maintenance/cleanup
需要 `Authorization: Bearer <CRON_SECRET>`；执行过期内容与旧限流事件清理。
