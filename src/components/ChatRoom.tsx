'use client'
import { useState, useEffect, use } from 'react';
import Pusher from 'pusher-js';
import { useUser } from '@clerk/nextjs';
import { XCircleIcon } from 'lucide-react';
import { Button } from './ui/button';

// TypeScript types
interface Message {
    username: string;
    message: string;
    waktu: string;
}

export default function ChatRoom({ onClose, isShow, messageData}: { onClose: () => void, isShow: boolean, messageData?: () => Message[] }) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const userData = useUser();

    useEffect(() => {
        Pusher.logToConsole = true; // Mengaktifkan log Pusher

        // Initialize Pusher on the client
        const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY as string, {
            cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER as string,
            forceTLS: true,
            // Ensure secure connection
        });

        const channel = pusher.subscribe('chat-channel');

        channel.bind('pusher:subscription_succeeded', () => {
            console.log('Successfully subscribed to channel');
        });
        // Listen for events from Pusher
        channel.bind('chat-event', (data: Message) => {
            // console.log(data, 'dari client');
            setMessages((prevMessages) => [...prevMessages, data]);
        });

        return () => {
            channel.unbind('chat-event');
            pusher.disconnect();
        };
    }, []);

    useEffect(() => {
        const messageContainer = document.getElementById('message-container');
        if (messageContainer) {
            messageContainer.scrollTop = messageContainer.scrollHeight;
        }
        const badgeIndicator = document.getElementById('indicator-badge');
  
        if(messages.length > 0) {
            if (badgeIndicator) {
                badgeIndicator.classList.remove('hidden');
                badgeIndicator.classList.add('absolute');
                // badgeIndicator.innerHTML = messages.length.toString();
                const audio = new Audio('/sound/chat-notif.mp3')
                audio.play();
            }
        } else {
            if (badgeIndicator) {
                badgeIndicator.classList.remove('absolute');
                badgeIndicator.classList.add('hidden');
            }
        }
    }, [messages]);

    const sendMessage = async () => {
        if (newMessage.trim() === '') return;
        await setIsLoading(true);
        // Mengirim pesan ke API Next.js
        await fetch('/api/pusher', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: newMessage, username: userData.user?.firstName as string, waktu: new Date().getHours() + "." + new Date().getMinutes() }),
        });
        // Mengirim pesan ke Pusher

        await setNewMessage('');
        await setIsLoading(false);
    };

    return (
        <div id="message-container" className={`w-full h-full`}>
            <div className='w-full h-fit p-4 text-white bg-blue-2 dark:bg-dark-1 flex justify-between'>
                <h1 className='text-center font-bold'>Chat Room</h1>
                <XCircleIcon className='w-6 h-6 cursor-pointer transition-colors duration-300 ease-in-out hover:text-red-600' onClick={onClose} />
            </div>
            <div className="h-[calc(100vh-150px)] w-full rounded-[20px] flex flex-col">
                <div className="bg-light-4 dark:bg-[#1c1f2e] flex-1 overflow-y-auto">
                    <div className="px-4 py-2">
                        {messages.length === 0 ? (
                            <div className="text-gray-500 text-center text-sm flex-1 items-center">No messages yet.</div>
                        ) : (
                            <div className="mb-2 max-w-sm">
                                {messages.map((msg, idx) => {
                                    if (msg.username == userData.user?.firstName) {
                                        return <div key={idx} className="flex flex-col items-end justify-end bg-blue-1 rounded-s-xl rounded-tl-xl rounded-br-xl p-2 shadow my-2">
                                            <div className="font-medium text-light-5 dark:text-light-4"><span className='text-xs text-light-5'>(you)</span> {msg.username}</div>
                                            <div className="">{msg.message}</div>
                                            <span className="text-xs text-light-4 self-start">{msg.waktu}</span>
                                        </div>
                                    }

                                    return <div key={idx} className="flex flex-col items-start bg-blue-2 rounded-e-xl rounded-es-xl p-2 shadow my-2">
                                        <div className="font-medium text-light-5 dark:text-light-4">{msg.username}</div>
                                        <div className="">{msg.message}</div>
                                        <span className="text-xs text-light-4 self-end">{msg.waktu}</span>
                                    </div>
                                }
                                )}
                            </div>
                        )}
                    </div>
                </div>
                <div className="bg-gray-100 dark:bg-dark-1 px-4 py-2">
                    <div className="flex items-center">
                        <input
                            className="w-full border rounded-full py-2 px-4 mr-2"
                            type="text"
                            placeholder="Type your message..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                        />
                        <Button disabled={isLoading} className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-full" onClick={sendMessage}>
                            Send
                        </Button>
                    </div>
                </div>
            </div>

        </div>
    );
}
