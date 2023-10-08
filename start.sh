#!/bin/sh

set -ex
pnpm dlx prisma migrate deploy
pnpm start
