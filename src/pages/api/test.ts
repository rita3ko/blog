import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  return new Response(JSON.stringify({ message: "Hello from API" }), {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    }
  });
};

export const prerender = false;