#!/bin/sh

set -ex
npx prisma generate
npx prisma migrate deploy
node .output/server/index.mjs
