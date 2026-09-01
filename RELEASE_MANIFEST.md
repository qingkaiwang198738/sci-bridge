# Sci-Bridge V1.0 Production Release Manifest

Release: V1.0 Production
Architecture baseline: V5.0-compatible core, MVP feature flags default-off
Core: messages → responses → chats
Status: source-complete release candidate; cloud deployment/build verification must be run in target environment.

## Non-core disabled by default
AI, RAG, LLM Intent, Self-learning, registration, uploads, email notifications, WebSocket, complex workers.

## Production hard gates
Run: npm install && npm run typecheck && npm run test && npm run build
Then execute docs/RELEASE_CHECKLIST.md.
