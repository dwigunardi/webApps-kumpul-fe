import FooterLanding from '@/components/FooterLanding';
import NavLanding from '@/components/NavLanding';
import { Metadata } from 'next';
import { ReactNode } from 'react'

export const metadata: Metadata = {
    title: "Kumpul",
    description: "Landing Page for Kumpul",
    icons: {
        icon: '/icons/logo.svg'
    }
};

const RootLayout = ({ children }: { children: ReactNode }) => {
    return (
        <main>
            <NavLanding />
            {children}
            <FooterLanding />
        </main>
    )
}

export default RootLayout