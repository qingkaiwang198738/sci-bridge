# TESTING / V1.0

## Unit
`npm run test`

## Typecheck
`npm run typecheck`

## Build
`npm run build`

## 必测 E2E 场景
1. 发布需求并保存 Owner Secret。
2. 未过期公开浏览。
3. 提交多个独立 Response。
4. Owner 只能看到自己的需求对应的 responses。
5. 每个 responder 只能进入自己的 response chat。
6. chat secret 交换后 URL 不再携带 secret。
7. 过期需求不可浏览、响应或聊天。
8. 24h 后 republish 得到新 ID、新 Owner Secret，旧 responses 清空。
9. 举报重复提交被去重。
10. Rate Limit 达到阈值返回 429。
11. Turnstile 开启后无 token 的写请求被拒绝。
12. admin API 无密钥返回 403。
