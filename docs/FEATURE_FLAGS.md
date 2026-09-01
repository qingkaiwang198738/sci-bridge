# FEATURE FLAGS

当前默认：
- `AI_ENABLED=false`
- `RAG_ENABLED=false`
- `UPLOAD_ENABLED=false`
- `REGISTRATION_ENABLED=false`
- `MESSAGING_ENABLED=true`

未来启用 AI/RAG/上传/账号时，必须增加独立的数据安全、成本控制、权限与审计设计；不能仅修改一个 flag 就直接上线复杂能力。
