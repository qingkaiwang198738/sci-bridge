# Sci-Bridge V1.0 Production Project Tree

sci-bridge-v1/
├── package.json
├── tsconfig.json
├── next-env.d.ts
├── .env.example
├── .gitignore
├── README.md
├── PROJECT_TREE.md
├── vitest.config.ts
├── docs/
│   ├── ARCHITECTURE.md
│   ├── API.md
│   ├── DATABASE.md
│   ├── DEPLOYMENT.md
│   ├── SECURITY.md
│   ├── MODERATION.md
│   ├── TESTING.md
│   ├── OPERATIONS.md
│   ├── SEO.md
│   ├── FEATURE_FLAGS.md
│   ├── BACKUP_RECOVERY.md
│   ├── RELEASE_CHECKLIST.md
│   ├── V5_COMPATIBILITY.md
│   └── NEW_CHAT_HANDOFF.md
├── src/
│   ├── app/
│   │   ├── api/health/route.ts
│   │   ├── api/v1/messages/route.ts
│   │   ├── api/v1/messages/[id]/route.ts
│   │   ├── api/v1/messages/[id]/responses/route.ts
│   │   ├── api/v1/messages/[id]/republish/route.ts
│   │   ├── api/v1/responses/route.ts
│   │   ├── api/v1/chats/[responseId]/route.ts
│   │   ├── api/v1/chats/session/route.ts
│   │   ├── api/v1/chat-session/route.ts
│   │   ├── api/v1/reports/route.ts
│   │   ├── api/v1/metrics/route.ts
│   │   ├── api/v1/admin/reports/route.ts
│   │   ├── api/v1/maintenance/cleanup/route.ts
│   │   ├── api/v1/maintenance/metrics/route.ts
│   │   ├── admin/reports/page.tsx
│   │   ├── chat/[responseId]/page.tsx
│   │   ├── manage/page.tsx
│   │   ├── messages/[id]/page.tsx
│   │   ├── privacy/page.tsx
│   │   ├── terms/page.tsx
│   │   ├── robots.ts
│   │   ├── sitemap.ts
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── chat/chat-access.tsx
│   │   ├── chat/chat-box.tsx
│   │   ├── manage/owner-console.tsx
│   │   ├── message/create-message-form.tsx
│   │   ├── message/message-card.tsx
│   │   ├── message/message-list.tsx
│   │   ├── message/report-form.tsx
│   │   ├── metrics/heatmap.tsx
│   │   ├── response/create-response-form.tsx
│   │   └── security/turnstile.tsx
│   ├── config/environment.ts
│   ├── config/feature-flags.ts
│   ├── config/limits.ts
│   ├── lib/errors.ts
│   ├── lib/security/ip.ts
│   ├── lib/security/secrets.ts
│   ├── lib/security/session.ts
│   ├── lib/supabase/admin.ts
│   ├── lib/validation/schemas.ts
│   ├── middleware.ts
│   ├── server/policies/message.policy.ts
│   ├── server/repositories/admin.repository.ts
│   ├── server/repositories/chat.repository.ts
│   ├── server/repositories/message.repository.ts
│   ├── server/repositories/metrics.repository.ts
│   ├── server/repositories/rate-limit.repository.ts
│   ├── server/repositories/report.repository.ts
│   ├── server/repositories/response.repository.ts
│   ├── server/services/chat.service.ts
│   ├── server/services/message.service.ts
│   ├── server/services/rate-limit.service.ts
│   ├── server/services/report.service.ts
│   ├── server/services/republish.service.ts
│   ├── server/services/response-access.service.ts
│   ├── server/services/response.service.ts
│   ├── server/services/risk.service.ts
│   └── server/services/turnstile.service.ts
├── supabase/migrations/
│   ├── 001_core.sql
│   ├── 002_expiration.sql
│   ├── 003_republish.sql
│   ├── 004_rate_limits.sql
│   ├── 005_security_indexes.sql
│   ├── 006_metrics.sql
│   ├── 007_risk_and_audit.sql
│   └── 008_republish.sql
└── tests/unit/
    ├── secrets.test.ts
    └── validation.test.ts
