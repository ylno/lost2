## Getting Started

Gettings started

``` sh
npm install
```

Run the development server:

```sh
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

### Use firebase emulator for local development

Add this entries to your .env.local file

```
NEXT_PUBLIC_FIREBASE_EMULATOR_HOST=localhost
NEXT_PUBLIC_EMULATOR=true
NEXT_PUBLIC_FIRESTORE_EMULATOR_PORT=8080
NEXT_PUBLIC_FIREBASE_AUTH_EMULATOR_PORT=9099
NEXT_PUBLIC_FIREBASE_STORAGE_EMULATOR_PORT=9199
```

Start the emulator suite:
`npm run emulator` and, in another terminal window `npm run dev`


## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

### Setting the env right

The application needs some env variables to run. These need to be set in the vercel project:

| Name    | Type   | Example |
|---------|--------|---------|
| FIREBASE_SERVICE_ACCOUNT | json   | -       | 
| START_CODE | string | 'start' |
