## Description

Collectify app is an innovative platform designed for card collectors, allowing them to efficiently manage and organize their collections. By using image recognition technology, the app can automatically identify collectible cards through photos taken by the user and mark the cards they already own. Additionally, it enables users to create, share, and explore card sets within the community, fostering interaction and the exchange of knowledge among collectors.

## Pre

Installing Git

- `https://git-scm.com/downloads`
- Press next at everything

Installing postman

- `https://www.postman.com/downloads/`
- For testing the API

Installing Node

- v22.13.1
- `https://nodejs.org/es/download`
- TODO: add nvm file

Installing vercel

- `pnpm setup`
- Restart terminal
- `pnpm i -g vercel`
- Check version: `vercel --version`

## Github

PRs:

1. We should avoid working directly on main

2. We should create a new branch for each new feature

   - `git checkout -b <branch-name>`

3. We should push the branch to the remote repository

   - `git push origin <branch-name>`
   - `git commit -m"commit message"` Work with many commits as possible before pushing, naming the commits with a short description of the changes

4. We should create a PR

   - `https://github.com/collectify-app/collectify-app/pulls`

5. We should merge the PR

   - Wait for approval
   - Merge the PR
   - Delete the branch

6. We should update the main branch

   - `git checkout main`
   - `git pull origin main`

7. Repeat from step 2

# Architecture

/App -> root project
/App/Api -> Backend
/App/components -> Todos los componentes reutilizables

## Getting Started

First, run the development server:

```bash
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

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
