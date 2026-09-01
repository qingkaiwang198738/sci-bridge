# 科研网站项目 / Sci-Bridge V1.0 Production 新对话启动摘要

这是当前最终上线版工程基线。不要回退到早期 Auth/Organization/WebSocket 架构，也不要重新设计产品。

## 产品定位
科研物资、实验需求与合作机会的临时供需对接平台；无需注册，默认不公开身份，公益、非商业化起步。

## 核心闭环
发布需求/供给 → Owner Secret → 多个独立 Response → 每个 Response 独立一对一 Chat → 48h 生命周期 → 已解决/重新发布。

## V5 兼容原则
V5.0 是完整产品蓝图，V1.0 是其可上线核心实现。核心数据模型保持 `messages → responses → chats`。AI Intent、RAG、Self-learning、邮件、上传、注册、WebSocket、复杂 Worker 均通过配置/架构扩展位保留，但默认关闭。

## 已完成
- 发布/浏览/详情/响应
- Owner/Responder 高熵 Secret + bcrypt
- Secret → 短期 HttpOnly Cookie 会话
- 多 Response + 独立 Chat
- 15 秒轮询
- 48h 查询层过期 + cleanup
- 24h 后重新发布：新 ID、新 Secret、旧 responses 清空
- Turnstile 服务端/前端可开关
- 发布/响应/会话交换/举报限流
- IP hash
- 举报去重 + 规则风险评分 + admin API
- 学科级匿名 metrics/热度
- SEO metadata / robots / sitemap
- privacy / terms / health
- 数据库 migration、备份、测试、部署、运维、安全文档

## 生产前唯一硬门槛
本工程源代码已经按 Production 结构整理，但真实生产上线仍必须在目标 Supabase/Vercel 环境执行 `npm install && npm run typecheck && npm run test && npm run build`，再执行 `docs/RELEASE_CHECKLIST.md` 的 smoke test。当前工作环境因依赖下载超时，未能在本地完成完整 build 验证，因此不得把“源代码已打包”理解为第三方云环境已验证。

## 重要环境变量
`NEXT_PUBLIC_APP_URL`、`NEXT_PUBLIC_SUPABASE_URL`、`NEXT_PUBLIC_SUPABASE_ANON_KEY`、`SUPABASE_SERVICE_ROLE_KEY`、`CRON_SECRET`、`ADMIN_SECRET`、`IP_HASH_SALT`、`SESSION_SECRET`。
Turnstile 生产建议开启并配置对应四个变量。

## 定时任务
每小时调用 cleanup 与 metrics 两个 maintenance endpoint，Bearer 使用 CRON_SECRET。

## 下一对话工作原则
如果需要继续开发，只在现有项目树上增量修改；先阅读 `docs/V5_COMPATIBILITY.md`、`docs/ARCHITECTURE.md`、`docs/SECURITY.md`、`docs/RELEASE_CHECKLIST.md`。
