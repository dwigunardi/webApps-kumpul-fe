import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from "@/components/ui/toaster"
import "@stream-io/video-react-sdk/dist/css/styles.css";
import "react-datepicker/dist/react-datepicker.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { dark } from "@clerk/themes";
import { getCurrentTheme } from "@/lib/theme";
import SetThemeCookie from "@/hooks/setThemeCookie";
import { getThemeParam } from "@/hooks/getThemeParam";
import { cookies } from "next/headers";
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
  searchParams
}: Readonly<{
  children: React.ReactNode;
  searchParams: URLSearchParams
}>) {
  const cookieStore = cookies()
  const theme = cookieStore.get('theme')

  return (
    <html lang="en" suppressHydrationWarning>
      <ClerkProvider appearance={{
        layout: {
          logoImageUrl: '/icons/kumpul1.png',
          socialButtonsVariant: 'iconButton',
        },
        baseTheme: theme?.value == "dark" ? dark : undefined,
        // variables: {
        //   colorText: '#fff',
        //   colorPrimary: '#0E78f9',
        //   colorBackground: '#1c1f2e',
        //   colorInputBackground: '#252a41',
        //   colorInputText: '#fff',
        // }
      }}>
        <body className={`${inter.className}`}>
          <main>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
              themes={["light", "dark"]}
              enableColorScheme
            >
              <SetThemeCookie />
              {children}
              <Toaster />
            </ThemeProvider>
          </main>
        </body>
      </ClerkProvider>
    </html>
  );
}
