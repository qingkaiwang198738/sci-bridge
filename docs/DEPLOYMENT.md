# DEPLOYMENT / V1.0 Production

## 推荐拓扑
Vercel（Next.js） + Supabase PostgreSQL。无需独立 Render 后端。

## 必填环境变量
- NEXT_PUBLIC_APP_URL
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- SUPABASE_SERVICE_ROLE_KEY
- CRON_SECRET
- ADMIN_SECRET
- IP_HASH_SALT
- SESSION_SECRET

## Turnstile
生产公开写接口建议启用：
- TURNSTILE_ENABLED=true
- NEXT_PUBLIC_TURNSTILE_ENABLED=true
- TURNSTILE_SECRET_KEY
- NEXT_PUBLIC_TURNSTILE_SITE_KEY

## 数据库
按 `supabase/migrations` 文件名顺序执行全部 migration。执行后验证 RLS、索引、RPC。

## 定时任务
每小时调用：
`POST /api/v1/maintenance/cleanup`
`POST /api/v1/maintenance/metrics`
均使用 `Authorization: Bearer $CRON_SECRET`。

## Vercel
连接 Git 仓库 → 配置 Production Environment Variables → Deploy → Smoke Test `/api/health`、首页、发布、响应、聊天。

## 生产注意
免费层不等于生产 SLA。上线前建立站外备份、错误监控和恢复演练。
