'use client';
import { useUser } from '@clerk/nextjs';
import {
    StreamVideo,
    StreamVideoClient,
} from '@stream-io/video-react-sdk';
import { useEffect, useState } from 'react';
import { tokenProvider } from './actions/stream.action';
import Loader from './components/Loader';

const userId = 'user-id';
const token = 'authentication-token';

const StreamVideoProvider = ({ children }: { children: React.ReactNode }) => {
    const [videoClient, setVideoClient] = useState<StreamVideoClient>();
    const {user, isLoaded } = useUser();

    const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY as string || '';

    useEffect(() => {
        if(!user || !isLoaded) return;
        if(!apiKey) throw new Error('Missing Stream API key');

        const client = new StreamVideoClient({
            apiKey,
            user: {
                id: user?.id,
                name: user?.username || user?.id,
                image: user?.imageUrl || 'https://i.pravatar.cc/300',
            },
            tokenProvider,
        });

        setVideoClient(client);

    }, [user, isLoaded, apiKey]);

    if(!videoClient) return <Loader />
    
    return (
        <StreamVideo client={videoClient}>
            {children}
        </StreamVideo>
    );
};

export default StreamVideoProvider