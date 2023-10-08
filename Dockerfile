ARG NODE_VERSION=18
ARG ALPINE_VERSION=3.17

# Stage: base
FROM node:${NODE_VERSION}-alpine${ALPINE_VERSION} AS base
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
RUN apk update
RUN corepack enable

## Stage: deps
FROM base AS deps
WORKDIR /app
ADD package.json pnpm-lock.yaml .npmrc ./
RUN pnpm install

## Stage: proudction-deps
FROM base AS production-deps
WORKDIR /app
COPY --from=deps /app/node_modules /app/node_modules
ADD package.json pnpm-lock.yaml .npmrc ./
# skip husky
RUN npm pkg delete scripts.prepare
RUN pnpm install --prod

# Stage: build
FROM base as build
WORKDIR /app
COPY --from=deps /app/node_modules /app/node_modules
ADD prisma .
RUN npx prisma generate
ADD . .
RUN npm run build

# Stage: finally
FROM base
ENV NODE_ENV="production"
ENV PORT="3000"
WORKDIR /app
COPY --from=production-deps /app/node_modules /app/node_modules
COPY --from=build /app/.output /app/.output
ENTRYPOINT [ "./start.sh" ]
