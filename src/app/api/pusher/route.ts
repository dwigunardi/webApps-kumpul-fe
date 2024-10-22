import { NextApiRequest, NextApiResponse } from 'next';
import Pusher from 'pusher';

// Inisialize Pusher with credentials from environment variables
const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID as string,
    key: process.env.PUSHER_APP_KEY as string,
    secret: process.env.PUSHER_APP_SECRET as string,
    cluster: process.env.PUSHER_APP_CLUSTER as string,
    useTLS: true,
});

// Function handler to handle POST requests
export async function POST(req: Request, res: NextApiResponse) {

    if (req.method !== 'POST') {
        return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
    }

    const { message, username, waktu } = await req.json();

    // Send message to Pusher
    try {
        // Trigger event to Pusher
        await pusher.trigger('chat-channel', 'chat-event', {
            username,
            message,
            waktu,
        });

        return new Response(JSON.stringify({ message: 'Message sent successfully' }),
            { status: 200, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } });
    } catch (error) {
        console.error('Error triggering Pusher:', error);
        return new Response(JSON.stringify({ error: 'Failed to send message', }), { status: 500 });
    }
}