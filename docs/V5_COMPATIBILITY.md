# V5 → V1 Compatibility Map

V5.0 是完整产品蓝图；V1.0 是可上线核心闭环。核心业务模型保持兼容：`messages → responses → chats`。

| V5能力 | V1状态 |
|---|---|
| 免注册 | 开启 |
| 48h生命周期 | 开启 |
| 多独立响应 | 开启 |
| 一对一聊天 | 开启 |
| Owner/Responder secret | 开启 |
| Turnstile | 可开启，生产建议开启 |
| 服务端限流 | 开启 |
| 举报+风险评分 | 开启 |
| 学科热度 | 开启 |
| SEO | 开启 |
| 邮件通知 | 禁用，后续开启 |
| 捐赠 | UI可扩展，默认不绑定具体支付 |
| AI Intent | 禁用 |
| RAG | 禁用 |
| Self-learning | 禁用 |
| 上传 | 禁用 |
| 注册体系 | 禁用 |
| WebSocket | 禁用，轮询 |
| 复杂 Worker | 禁用 |

这样未来增加 V5 功能时，不需要推翻核心数据模型。
