# DATABASE / V1.0

## Core tables
`messages`：供需主体；`responses`：独立响应；`chats`：每个 response 的私聊；`reports`：举报；`metrics_daily`：学科级聚合统计。

## Lifecycle
公开业务内容 48h。查询层始终过滤 `expires_at > now()`；maintenance 再执行物理清理。安全/举报/限流事件拥有独立生命周期。

## Security
所有核心业务表启用 RLS。应用使用 server-side service role；service role 永不进入浏览器。任何公开查询不得绕过生命周期过滤。

## Migrations
必须按文件名顺序执行 `001_core.sql` 至最新迁移。生产变更先在 staging 数据库验证，再执行 production。
