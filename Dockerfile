  # syntax = docker/dockerfile:1

ARG NODE_VERSION=20
ARG ALPINE_VERSION=3.17

# Stage: base
FROM node:${NODE_VERSION}-alpine${ALPINE_VERSION} AS base
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat curl && \
  corepack enable

WORKDIR /app

# Stage: build
FROM base as build
RUN apk update
COPY package.json pnpm-lock.yaml .npmrc ./
RUN --mount=type=cache,id=pnpm-store,target=/root/.pnpm-store \ 
  pnpm install --frozen-lockfile
COPY . .
RUN npx prisma generate && \
  pnpm run build

# Stage: finally
FROM base
ENV NODE_ENV="production"
COPY --from=build /app/.output /app/.output
COPY --from=build /app/prisma /app/prisma
COPY --from=build /app/start.sh /app/start.sh
ENTRYPOINT [ "./start.sh" ]

EXPOSE 3000