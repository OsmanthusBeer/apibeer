ARG NODE_VERSION=18
ARG ALPINE_VERSION=3.17

# Stage: installer
FROM node:${NODE_VERSION}-alpine${ALPINE_VERSION} AS installer
RUN apk add --no-cache libc6-compat
RUN apk update
RUN corepack enable
WORKDIR /app
# First install the dependencies (as they change less often)
COPY .gitignore .gitignore
COPY ./pnpm-lock.yaml /app/pnpm-lock.yaml
RUN --mount=type=cache,id=pnpm-store,target=/root/.pnpm-store \
    pnpm install --frozen-lockfile

# Stage: builder
FROM node:${NODE_VERSION}-alpine${ALPINE_VERSION} AS builder
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
RUN apk update
RUN corepack enable
# Set working directory
WORKDIR /app
COPY --from=installer /app .
# Build the project
RUN pnpm build
RUN pnpm prune --prod

# Stage: runner
FROM node:${NODE_VERSION}-alpine${ALPINE_VERSION} AS runner
WORKDIR /app
COPY --from=builder /app .

EXPOSE 40000
CMD pnpm preview
