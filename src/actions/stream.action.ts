"use server";

import { currentUser } from "@clerk/nextjs/server";
import { StreamClient } from "@stream-io/node-sdk";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const apiSecret = process.env.STREAM_SECRET_KEY;

export const tokenProvider = async () => {
    let user = await currentUser();
    const defaultUser = await fetch('https://api.clerk.com/v1/actor_tokens',
        {
            headers: { Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}` },
            method: 'POST',
            body: JSON.stringify({
                user_id: 'user_2ij98eEEMSJQ9PbwqGUhmpdnitg',
                actor: {
                    sub: "user_2iMgwLnLNoXpktm8KKMVQ7ukqkP"
                },
            })
        }
    ).then(res => res.json())

    // if (!user) throw new Error('User is not logged in!');
    if (!apiKey) throw new Error('Missing Stream API key!');
    if (!apiSecret) throw new Error('Missing API Secret!');

    const client = new StreamClient(apiKey, apiSecret);
    //example of token generation expired in 1 hour
    const exp = Math.round(new Date().getTime() / 1000) + 60 * 60;
    const issued = Math.floor(Date.now() / 1000) - 60;
    const token = client.createToken(user?.id == undefined ? defaultUser?.id : user.id, exp, issued);
    return token;
}