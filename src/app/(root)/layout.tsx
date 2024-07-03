import StreamVideoProvider from '@/StreamClientProvider'
import { Metadata } from 'next';
import { ReactNode } from 'react'

export const metadata: Metadata = {
    title: "Kumpul",
    description: "Just learning about RTC Concept",
    icons: {
      icon: '/icons/logo.svg'
    }
  };

const RootLayout = ({ children }: { children: ReactNode }) => {
    return (
        <main>
            <StreamVideoProvider>
            {children}
            </StreamVideoProvider>
        </main>
    )
}

export default RootLayout