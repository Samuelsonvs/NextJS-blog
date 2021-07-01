# Table of Contents

- [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Technologies](#technologies)
  - [Getting Started](#getting-started)
  - [Learn More](#learn-more)
  - [Deploy on Vercel](#deploy-on-vercel)

## Introduction

This is a repo for anyone create own blog post site, built with React and Next.js, with the content coming in from local files [mdxData](https://mdxjs.com), and comments coming in from cloud db [Mongodb](https://www.mongodb.com) additionally if you want to use local db for all comments and files you can use [Prisma](https://www.prisma.io).

## Technologies

- React and Next.js for UI, utilising getStaticProps (static generation, fetch data at build time) and getServerSideProps (server-side rendering, fetch data at request time). _next/image_ was used for image optimisation.
- [NextAuth](https://next-auth.js.org) was used for login or register authentication.
- [Mongodb](https://www.mongodb.com) _mongoose_ library and [mdxjs](https://mdxjs.com) was used to for data storage.
- [Prisma](https://www.prisma.io) optional database.
- [TailwindCss](https://tailwindcss.com) was used for styling.
- _date-fns_ library for formatting dates and times.
- [Mailchimp](https://mailchimp.com) was used for automation using email to reach out to their target.
- _next-themes_ was used dark mode.
- _sweetalert2_ was used for alert popup boxes

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
