#!/bin/sh

set -ex
npx prisma migrate deploy
node .output/server/index.mjs
