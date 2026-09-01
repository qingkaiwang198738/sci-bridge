# OPERATIONS / V1.0

## 每日
- 检查 Vercel 错误日志。
- 检查 Supabase 数据库容量与错误。
- 检查 cleanup / metrics 定时任务。
- 检查 pending 举报。

## 故障
1. 先确认 Supabase 可用性。
2. 检查环境变量。
3. 检查最近 migration。
4. 如内容无法访问，确认是否只是 48h 生命周期导致。

## 备份
按 `BACKUP_RECOVERY.md` 执行逻辑导出。不要把备份与生产数据库放在同一故障域。
