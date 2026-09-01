# RELEASE CHECKLIST / V1.0

## Code
- [ ] `npm run typecheck`
- [ ] `npm run test`
- [ ] `npm run build`
- [ ] 无 debug endpoint / test secret

## Supabase
- [ ] 所有 migrations 已按顺序执行
- [ ] RLS 已启用
- [ ] service role 未暴露
- [ ] 备份已完成

## Security
- [ ] `SESSION_SECRET` 为随机生产值
- [ ] `IP_HASH_SALT` 为随机生产值
- [ ] `ADMIN_SECRET` 为随机生产值
- [ ] `CRON_SECRET` 为随机生产值
- [ ] Turnstile production key 已配置
- [ ] HTTPS 正常

## Functional
- [ ] 发布
- [ ] 响应
- [ ] 多响应
- [ ] 独立聊天
- [ ] 已解决
- [ ] 重新发布
- [ ] 举报
- [ ] 过期清理
- [ ] 热度统计

## Deployment
- [ ] Vercel production deployment
- [ ] cron/maintenance 每小时运行
- [ ] production smoke test
- [ ] 手机端 smoke test
- [ ] 错误日志可查看

只有全部 P0 项通过后，才标记为 Production。
