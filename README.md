# Sci-Bridge V1.0 Production

科研供需桥：无需注册、短期有效、默认不公开身份的科研物资与实验需求临时对接平台。

## V1.0 已包含
- 发布 / 浏览 / 响应 / 独立一对一沟通
- Owner / Responder 高熵随机凭证，服务端 bcrypt 哈希
- 凭证交换为短期 HttpOnly Cookie，避免长期把 secret 放在聊天 URL
- 48 小时业务生命周期；查询层过滤 + 后台清理
- 满 24 小时可重新发布：新 ID、新凭证、旧响应清空
- Turnstile 可配置启用
- 服务端写接口限流
- 举报去重、风险评分、管理 API
- 学科级匿名供需热度
- SEO metadata、sitemap、robots
- 隐私说明与使用条款
- AI / RAG / LLM Intent / Self-learning / 上传 / 注册默认关闭，但保留 feature flags 与扩展位

## 启动
1. 复制 `.env.example` 为 `.env.local` 并填写变量。
2. 在 Supabase 按顺序执行 `supabase/migrations/*.sql`。
3. `npm install`
4. `npm run typecheck && npm run test && npm run build`
5. `npm start`

生产环境不要使用示例 secret。`SUPABASE_SERVICE_ROLE_KEY`、`ADMIN_SECRET`、`CRON_SECRET`、`SESSION_SECRET` 只能放服务端环境变量。

## 部署
推荐 Vercel + Supabase。部署后配置每小时一次：
- `POST /api/v1/maintenance/cleanup` + `Authorization: Bearer $CRON_SECRET`
- `POST /api/v1/maintenance/metrics` + `Authorization: Bearer $CRON_SECRET`

## 文档
- `docs/ARCHITECTURE.md`
- `docs/SECURITY.md`
- `docs/DEPLOYMENT.md`
- `docs/DATABASE.md`
- `docs/MODERATION.md`
- `docs/TESTING.md`
- `docs/OPERATIONS.md`
- `docs/SEO.md`
- `docs/FEATURE_FLAGS.md`
- `docs/BACKUP_RECOVERY.md`
- `docs/RELEASE_CHECKLIST.md`
- `docs/NEW_CHAT_HANDOFF.md`
