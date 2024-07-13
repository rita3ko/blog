// src/pages/api/og-image.ts
import type { APIRoute } from 'astro';
import { generateOGImage } from '../../lib/ogImageGenerator';

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const title = url.searchParams.get('title');

  if (!title) {
    return new Response('Missing title parameter', { status: 400 });
  }

  try {
    const imageResponse = await generateOGImage(title);
    return new Response(await imageResponse.arrayBuffer(), {
      headers: imageResponse.headers,
    });
  } catch (error) {
    console.error('Error generating OG image:', error);
    return new Response('Error generating image', { status: 500 });
  }
};