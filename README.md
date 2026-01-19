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

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Database Changes

1. Edit the `schema.prisma` file
2. Create a new migration with `prisma migrate dev --name <name>`
3. Re-generate your local prisma with `prisma generate`
4. Switch the URL of the database in `.env` to point to production
5. Run `prisma migrate deploy`

## Cleaning Up

Quit out of the `npm run` session and then run the following command:

```bash
docker compose down -v
```
