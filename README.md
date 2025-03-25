This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, install dependencies:
```bash
pnpm install
```

First, run the development server:

```bash
pnpm dev
```


Build using Docker
```bash
docker build -t all-known-news .

docker run -p 3000:3000 all-known-news
```