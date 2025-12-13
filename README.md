## Getting Started

Pre-req: ensure Node v22 is installed.

First, start the DB:

```bash
docker compose up -d
```

Second, if wanting to apply migrations:

```bash
prisma migrate dev
```

Third, run the development server/client:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

If you want to perform the initial migration:
1. Delete contents of `/migrations` (optional)
2. run `prisma migrate dev --name init`

## Cleaning Up

Quit out of the `npm run` session and then run the following command:

```bash
docker compose down -v
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
