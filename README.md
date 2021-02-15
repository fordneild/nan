Welcome to the NAN Stack: Next.js Apollo and Neo4j.

## Disclaimer
This is still a rough work in progress :)

## Motivation
Next.js Allows us to serve React with SSG and SSR as opposed to CSR. See more here [https://vercel.com/blog/nextjs-server-side-rendering-vs-static-generation]

Apollo, with help from the neo4j-graphql-js module, lets use GraphQL on our neo4j db. Apollo also handles front end problems such as caching, optimitic updates, data fetching and more.

Finally, Neo4j is a kick-ass graph database with an expressive query language called Cyper. We can write real time recomendation engines easily.


## Prereqs
In order to run the code you need docker and docker-compose, which come together in Docker Desktop: [https://www.docker.com/products/docker-desktop]

Additionally, you need npm installed [https://nodejs.org/en/]

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.
