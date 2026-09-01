# SECURITY / V1.0

- 不要求注册；默认不公开真实身份，但不宣称“绝对匿名”。
- Owner / Responder secret 使用高熵随机值，数据库只保存 bcrypt hash。
- Secret 通过一次性/短期交换建立 HttpOnly、Secure、SameSite=Lax 会话；聊天业务 API 不再接受 URL secret。
- Service Role Key 只存在服务器端。
- IP 不保存明文，限流使用带 salt 的 hash。
- 写接口分别限流：发布、响应、凭证交换、举报。
- Turnstile 可配置启用；生产公开写接口建议启用。
- 所有用户内容均视为不可信文本，React 默认转义；未来若支持 Markdown/HTML，必须使用严格 sanitizer。
- 举报采用去重 + 限频 + 风险评分 + 人工审核，不使用简单“三次举报自动隐藏”。
- CSP 使用最小可用策略；生产上线后应结合实际第三方资源进一步收紧。
- 生产环境必须使用独立随机 `SESSION_SECRET`、`IP_HASH_SALT`、`CRON_SECRET`、`ADMIN_SECRET`。
