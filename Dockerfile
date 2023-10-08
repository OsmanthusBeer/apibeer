ARG NODE_VERSION=18
ARG ALPINE_VERSION=3.17

# Stage: base
FROM node:${NODE_VERSION}-alpine${ALPINE_VERSION} AS base
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
RUN apk update
RUN corepack enable

# Stage: build
FROM base as build
WORKDIR /app
ADD package.json pnpm-lock.yaml .npmrc ./
RUN pnpm install
# COPY --from=deps /app/node_modules /app/node_modules
ADD . .
RUN npx prisma generate
RUN npm run build

# Stage: finally
FROM base
ENV NODE_ENV="production"
ENV PORT="3000"
WORKDIR /app
COPY --from=build /app/.output /app/.output
COPY --from=build /app/prisma /app/prisma
COPY --from=build /app/package.json /app/package.json
COPY --from=build /app/pnpm-lock.yaml /app/pnpm-lock.yaml
COPY --from=build /app/.npmrc /app/.npmrc
COPY --from=build /app/start.sh /app/start.sh
ENTRYPOINT [ "./start.sh" ]
