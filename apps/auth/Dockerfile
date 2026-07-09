# apps/auth/Dockerfile
# context: raiz do monorepo

FROM node:22-alpine AS base

RUN apk add --no-cache bash curl libc6-compat openssl
RUN corepack enable && corepack prepare pnpm@11.1.2 --activate

WORKDIR /repo

FROM base AS deps

COPY pnpm-workspace.yaml package.json pnpm-lock.yaml ./
COPY apps/auth/package.json ./apps/auth/
COPY apps/backend/package.json ./apps/backend/
COPY apps/frontend/package.json ./apps/frontend/
COPY apps/mobile/package.json ./apps/mobile/
COPY packages/cache/package.json ./packages/cache/
COPY packages/common/package.json ./packages/common/
COPY packages/database/package.json ./packages/database/
COPY packages/env-config/package.json ./packages/env-config/
COPY packages/eslint-config/package.json ./packages/eslint-config/
COPY packages/jest-config/package.json ./packages/jest-config/
COPY packages/logger/package.json ./packages/logger/
COPY packages/typescript-config/package.json ./packages/typescript-config/

RUN pnpm install --frozen-lockfile

FROM deps AS development

ENV NODE_ENV=development

COPY . .

EXPOSE 3000

CMD ["pnpm", "--filter", "@repo/auth", "dev"]

FROM deps AS test

ENV NODE_ENV=test

COPY . .

CMD ["pnpm", "--filter", "@repo/auth", "test"]

FROM deps AS builder

ENV NODE_ENV=production
ENV NODE_OPTIONS=--max-old-space-size=4096
ENV CORS_ORIGINS=https://surb.com.br
ENV DATABASE_URL=postgresql://build_user:build_password@postgres:5432/build_db
ENV JWT_ACCESS_TOKEN_SECRET=build_access_jwt_secret
ENV JWT_REFRESH_TOKEN_SECRET=build_refresh_jwt_secret
ENV JWT_REFRESH_SECRET=build_refresh_jwt_secret
ENV ACCESS_TOKEN_SECRET=build_access_token_secret
ENV REFRESH_TOKEN_SECRET=build_refresh_token_secret
ENV COOKIE_SECRET=build_cookie_secret

COPY . .

RUN pnpm --filter @repo/common build
RUN pnpm --filter @repo/env-config build
RUN pnpm --filter @repo/logger build
RUN pnpm --filter @repo/database prisma:generate
RUN pnpm --filter @repo/database build
RUN pnpm --filter @repo/cache build
RUN pnpm --filter @repo/auth build

FROM base AS production

ENV NODE_ENV=production
ENV PORT=3000
ENV HOST=0.0.0.0

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

COPY --from=builder --chown=appuser:appgroup /repo /repo

USER appuser

EXPOSE 3000

CMD ["pnpm", "--filter", "@repo/auth", "start"]
