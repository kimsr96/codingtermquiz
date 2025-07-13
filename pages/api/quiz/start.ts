export const runtime = 'edge';

export default async function handler(req: Request) {
  if (req.method === 'POST') {
    const session = { id: Date.now() };
    return new Response(JSON.stringify(session), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  return new Response('Method Not Allowed', { status: 405 });
} 