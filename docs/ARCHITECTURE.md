# Sci-Bridge V1.0 Architecture

核心模型：messages → responses → chats。

V1 不要求注册账号。发布者获得 owner secret；每个响应者获得独立 responder secret。
每个 response 拥有独立的一对一聊天空间。

公开内容有效期 48 小时。所有公开查询必须过滤 expires_at > now()。
后台 cleanup 只是第二层保障。

MVP 聊天采用轮询/手动刷新，不依赖 WebSocket。

AI、RAG、Self-learning、LLM Intent、复杂 Worker、复杂 Cron 默认关闭，不进入 Core Dependency。
