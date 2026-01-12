export const config = {
  runtime: 'edge',
};

export default async function handler(request: Request) {
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
  }

  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return new Response(JSON.stringify({ error: 'Valid email required' }), { status: 400 });
    }
    
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxHaS1ET5V6kVk8mfv-QjbVI7VO6XsytnTs0y9onvSsgzNT4GlA0aHafslh3wferbTHTQ/exec';

    await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      body: JSON.stringify({ email }),
      headers: { 'Content-Type': 'application/json' }
    });

    console.log('NEW SIGNUP:', email);

    return new Response(JSON.stringify({ success: true, message: 'Email collected' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Invalid request body' }), { status: 400 });
  }
}
