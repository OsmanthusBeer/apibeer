#!/bin/sh

set -ex
pnpm dlx prisma migrate deploy
node .output/server/index.mjs
