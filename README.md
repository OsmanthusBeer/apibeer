<p align="center">
  <a href="http://8.140.31.132:40000/">
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
    <img alt="" src="https://img.shields.io/badge/package_manager-pnpm-black">
  </a>
  <a aria-label="Code Style" href="https://github.com/antfu/eslint-config">
    <img alt="" src="https://antfu.me/badge-code-style.svg">
  </a>
</p>

## Demo online

> <http://8.140.31.132:40000/>

## Tech Stack

- [Nuxt](https://nuxt.com/)
- [NuxtUI](https://ui.nuxt.com/)
- [VueUse](https://vueuse.org/)
- [trpc](https://trpc.io/), [trpc-nuxt](https://trpc-nuxt.vercel.app/)
- [prisma](https://prisma.io/)
- [zod](https://zod.dev/)

Ref to [sidebase](https://github.com/sidebase/sidebase)

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
- 