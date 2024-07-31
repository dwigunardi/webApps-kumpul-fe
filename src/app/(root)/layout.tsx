import StreamVideoProvider from '@/StreamClientProvider'
import { Metadata } from 'next';
import { ReactNode } from 'react'

export const metadata: Metadata = {
    title: "Kumpul",
    description: "Wellcome to Kumpul a Video Conference Platform",
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