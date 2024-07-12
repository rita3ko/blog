---
external: false
title: "Building an IMDB Clone with AI"
description: "I recently built an IMDB-like application using Claude, an AI assistant. From crafting a Cloudflare Workers API to setting up a Nuxt.js frontend, Claude guided me through each step, showcasing the power of AI-assisted development. Discover how this approach accelerated my process and helped me write cleaner, more efficient code. "
date: 2024-07-24
draft: false
---
I recently met with someone who was telling me about how they were using AI to build applications in new languages they'd never used before. I was intrigued, impressed, and even a little embarrassed that I wasn't flexing my AI muscles to the same extend. Meanwhile, as a manager, it's always hard to find time to build stuff, and when I do find a bit of time to spare, if it goes toward getting stuck, writing tedious boilerplate, or debugging minor issues, I rarely get to the gratifying part of shipping. 

Long story short, I've been pretty impressed with Anthropic's Claude lately and wanted to put it to the test by using it to build a full-stack application — obviously on the Cloudflare platform! I've never used Nuxt before, so I used that for the frontend (challenge of using new technology, accepted!). 

I'll be honest, I was pretty impressed by how smooth this was. Sharing some of the details below. 

BTW, can check out the final result here:
- **Live Application:** [imdb.ritakozlov.com](https://imdb.ritakozlov.com)
- **Source Code:** [github.com/rita3ko/imdb](https://github.com/rita3ko/imdb)

Okay, so let me take you through my journey, complete with the actual prompts used and Claude's responses.

## Getting Started

My journey began with a simple prompt:

> Write me an API using Cloudflare Workers, Hono, TypeScript, and Cloudflare's D1 database for storing movies, the actors in them, and the synopsis of the movie.

Claude's response was impressively comprehensive. Here's a snippet of the code it generated:

```typescript
import { Hono } from 'hono'
import { z } from 'zod'

type Bindings = {
  DB: D1Database
}

const app = new Hono<{ Bindings: Bindings }>()

// Schema for movie input
const movieSchema = z.object({
  title: z.string(),
  synopsis: z.string(),
  actors: z.array(z.string()),
})

// GET all movies
app.get('/movies', async (c) => {
  const { results } = await c.env.DB.prepare(
    'SELECT * FROM movies'
  ).all()
  return c.json(results)
})

// More CRUD operations...

export default app
```

But there was a lot more — the response included not just the code, but also instructions on how to set up the project, create the D1 database, and deploy the Worker.

## The API: A Nearly Perfect First Try
One of the most impressive aspects was how well the generated API worked right out of the gate. No hallucinations or anything. 

When I encountered a small issue with running the Worker locally, I prompted Claude directly with the error I was receiving:

```
When I run wrangler deploy I get this error: "✘ [ERROR] Missing entry-point: The entry-point should be specified via the command line (e.g. `wrangler deploy path/to/script`) or the `main` config field."
```

Claude quickly provided a solution:


This error occurs because Wrangler can't find the entry point for your Worker. There are two ways to resolve this:


> 1. Specify the entry point in the command line:
   
  >  Run the deploy command with the path to your main script, like this:

   `wrangler deploy src/index.ts `

   > Replace `src/index.ts` with the actual path to your main TypeScript file.

> 2. Specify the entry point in your `wrangler.toml` file:

   > Open your `wrangler.toml` file and add a `main` field that points to your entry file:

```
   toml
   name = "your-worker-name"
   main = "src/index.ts"
   compatibility_date = "2023-01-01"

   [[d1_databases]]
   binding = "DB"
   database_name = "your_database_name"
   database_id = "your_database_id"
```

   > Again, replace `src/index.ts` with the actual path to your main TypeScript file.

   This worked perfectly, like using Google + StackOverflow but you get to the answer faster.

## Generating the UI

For the UI, I gave Claude the following prompt: 
> can you add a ui that uses nuxt and shadcn?

Not very verbose! 

It came back with instructions on instantiating a Nuxt project, content to add to my CSS file, adding new pages such as `Pages/index.vue` for the meat of the application...

At times it got a little lazy, for example, it generated the `Button` component for me but left me to my own devices for some of the others: 
> Create similar files for Card, CardHeader, CardTitle, and CardContent components in the `components/ui` directory.

So I asked it to generate those for me in a follow up prompt. 

## Challenges and Iterations

While the API was nearly perfect, the frontend required more iteration. For instance, when setting up the Nuxt.js frontend, I encountered a CORS error (classic!). I prompted:

> Ah now I'm running into a CORS error

Claude handled CORS better than most human developers I know:

> To resolve this, you need to configure your Cloudflare Worker (your API) to allow requests from your frontend application. Here's how you can modify your API to handle CORS:

> 1. Update your API code (likely in your `src/index.ts` or similar file in your `packages/api` directory):

```typescript
import { Hono } from 'hono'
import { cors } from 'hono/cors'

const app = new Hono()

// Add CORS middleware
app.use('/*', cors({
  origin: ['http://localhost:3000', 'https://your-production-frontend-url.com'],
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
  exposeHeaders: ['Content-Length', 'X-Kuma-Revision'],
  maxAge: 600,
  credentials: true,
}))

// Your existing routes go here

export default app
```

There were a couple snags I ran into with local dev but all in all manageable. I expected more hallucinations, but was impressed that for the most part there were none, or just minor ones (like when I ran into some wrangler error it suggested running it with a `--verbose` flag which does not really exist). 

## Breezing through refactoring into a monorepo

Since we built the API first, it was managed in an entirely separate directory but I wanted it to be part of a single cohesive project. Claude handled this too pretty well. I asked it to give me step by step instructions so I didn't have to meddle with manually moving around files and folders.

Prompt: 
> can you give me the commands to move the api directory structure i've already created to the new monorepo folder?

Output: 
```
mkdir imdb-monorepo
cd imdb-monorepo
npm init -y
mkdir -p packages/api packages/frontend
mv your-current-api-directory imdb-monorepo/packages/api
cd packages/frontend
npx nuxi init .
cd ../..
```

## Time to new feature: 5 minutes
After we built the original app, I started going down the list of features and minor fixes I wanted to add. For example, I wanted my app to have a rating system as well. I asked Claude to first propose a few different architectures and their pros and cons. Here's an example of what it gave me (the other ones involved DO and KV for higher volume voting which... is valid!!): 

```
1. D1 Database with Worker:

This approach extends your current architecture.

- Add a new table in your D1 database for ratings.
- Use your existing Cloudflare Worker to handle rating operations.

Architecture:
[Client] <-> [Cloudflare Worker] <-> [D1 Database]

Pros:
- Simple extension of your current setup.
- Consistent with your existing data model.
- Good for moderate scale.

Cons:
- May not be ideal for extremely high-volume rating systems.

Implementation:
- Create a `ratings` table in D1 with columns: `id`, `movie_id`, `user_id`, `rating`, `timestamp`.
- Add new API endpoints in your Worker for creating/updating ratings and fetching average ratings.
```

Then I asked Claude to give me details step by step instructions on following through — also checked out. 

## Final notes
My favorite part was that when I was done, I asked it to generate me a Markdown file and it honestly delivered a better Markdown file than I've ever written (this is usually the part I get super lazy about). 

_Nit: there is a bug in Claude the actually makes it a bit of a pain to copy + paste markdown since it auto-escapes itself but I'm sure they'll fix that soon enough._

There are no excuses not to document your code anymore! It actually made me wonder if a good thing to add to code comments are the prompts you ran to get code generated — assuming another human will be reading the code, that's the best way to communicate what you were trying to do when someone is trying to interpret it later. 

All in all, this is so awesome!! This app took me about 1.5 hours end to end (between meetings!) and I used tools I had never used before like Nuxt whereas normally I would have stuck to something I was more familiar with. This makes me super optimistic about the future. 