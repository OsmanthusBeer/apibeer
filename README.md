# Api Beer

> Cheers to 🍺

[![Node.js Badge](https://img.shields.io/badge/Node.js-v18-black)](https://nodejs.org/)
[![PNPM Badge](https://img.shields.io/badge/package_manager-pnpm-black)](https://pnpm.io/)
[![Code Style](https://antfu.me/badge-code-style.svg)](https://github.com/antfu/eslint-config)

## Tech Stack

- [nuxt3](https://nuxt.com/)
- [prisma](https://prisma.io/)
- [NuxtUI](https://ui.nuxt.com/)
- [trpc](https://trpc.io/)

## Development Setup

```bash
nvm use # Load `.nvmrc` file, use same node version
corepack enable # Use `package.json#packageManager` for same package manager, refs: https://nodejs.org/api/corepack.html
pnpm i
cp .env.example .env # config `.env`
pnpm dev
```

### Datebase

- We use MySQL, you can use docker to start a mysql server

```bash
docker run --name mysql -e MYSQL_ROOT_PASSWORD=root -p 3306:3306 -d mysql:8
```

## Related

- [apifox](https://apifox.com/)
- [apipost](https://www.apipost.cn/)
- [yapi](https://github.com/YMFE/yapi)
