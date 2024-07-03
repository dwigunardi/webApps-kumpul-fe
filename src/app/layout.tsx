import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from "@/components/ui/toaster"
import "@stream-io/video-react-sdk/dist/css/styles.css";
import "react-datepicker/dist/react-datepicker.css";
// ideally, Stream Video theme should be imported before your own styles
// as this would make it easier for you to override certain video-theme rules
// import './my-styles.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kumpul",
  description: "Just learning about RTC Concept",
  icons: {
    icon: '/icons/logo.svg'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ClerkProvider appearance={{ 
        layout: {
          logoImageUrl: '/icons/kumpul1.png',
          socialButtonsVariant: 'iconButton',
        },
        variables: {
          colorText: '#fff',
          colorPrimary: '#0E78f9',
          colorBackground: '#1c1f2e',
          colorInputBackground: '#252a41',
          colorInputText: '#fff',
        }
      }}>
        <body className={`${inter.className} bg-dark-2`}>
          <main>
            {children}
            <Toaster />
          </main> 
        </body>
      </ClerkProvider>
    </html>
  );
}
