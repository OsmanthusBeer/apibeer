#!/bin/sh

set -ex
npx prisma migrate deploy
pnpm start
