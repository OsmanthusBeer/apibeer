<p align="center">
  <a href="https://demo.apibeer.com/">
    <picture>
      <img src="./public/logo_180x180.png" height="128">
    </picture>
    <h1 align="center">Api Beer</h1>
  </a>
</p>

<p align="center">
  <a aria-label="Node.js Badge" href="https://nodejs.org">
    <img src="https://img.shields.io/badge/Node.js-v18-black">
  </a>
  <a aria-label="PNPM Badge" href="https://pnpm.io">
    <img src="https://img.shields.io/badge/package_manager-pnpm-black">
  </a>
  <a aria-label="Code Style" href="https://github.com/antfu/eslint-config">
    <img src="https://antfu.me/badge-code-style.svg">
  </a>
</p>

## Demo Online

> <https://demo.apibeer.com/>

## Tech Stack

- [Nuxt](https://nuxt.com/)
- [NuxtUI](https://ui.nuxt.com/)
- [VueUse](https://vueuse.org/)
- [tRPC](https://trpc.io/), [tRPC Nuxt](https://trpc-nuxt.vercel.app/)
- [Prisma](https://prisma.io/)
- [Zod](https://zod.dev/)

## Quick Start

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

## Docker Deploy

```bash
docker build . -t apibeer
docker run -d --name apibeer --env-file .env --network=host -p 3000:3000 -it apibeer
docker exec -it apibeer sh
```

## Related

- [apifox](https://apifox.com/)
- [apipost](https://www.apipost.cn/)
- [yapi](https://github.com/YMFE/yapi)
- [hoppscotch](https://github.com/hoppscotch/hoppscotch)
- [httpie](https://httpie.io/)
