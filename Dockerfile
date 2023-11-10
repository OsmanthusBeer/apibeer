# syntax = docker/dockerfile:1

ARG NODE_VERSION=18
ARG ALPINE_VERSION=3.17

# Stage: base
FROM node:${NODE_VERSION}-alpine${ALPINE_VERSION} AS base
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat curl
RUN apk update
RUN corepack enable

# Stage: build
FROM base as build
WORKDIR /app
ADD package.json pnpm-lock.yaml .npmrc ./
RUN pnpm install --frozen-lockfile --prefer-frozen-lockfile
ADD . .
RUN npx prisma generate
RUN pnpm run build

# Stage: finally
FROM base
ENV NODE_ENV="production"
WORKDIR /app
COPY --from=build /app/.output /app/.output
COPY --from=build /app/prisma /app/prisma
COPY --from=build /app/start.sh /app/start.sh
ENTRYPOINT [ "./start.sh" ]

EXPOSE 3000