import { Facebook, Heart, Linkedin, Twitter } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const FooterLanding = () => {
    return (
        <footer className="bg-blue-2 text-primary-foreground py-6 px-4 md:px-6">
            <div className="container flex flex-col md:flex-row items-center justify-between gap-4 text-white">
                <div className="text-sm flex flex-col md:flex-row gap-2 align-middle items-center">
                    <p>&copy; 2024 @Kumpul. This is a demo made with</p>
                    <Heart fill='red' />
                    <p className='font-bold'>
                        by Dwi Gunardi M.
                    </p>
                </div>
                <nav className="flex items-center gap-4">
                <Link href="https://www.linkedin.com/in/dwi-gunardi-meinaki-3353ba175/?originalSubdomain=id" target="_blank" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
                        <Linkedin />
                    </Link>
                    <Link href="https://www.facebook.com/gunz25/" target="_blank" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
                        <Facebook />
                    </Link>
                    <Link href="https://x.com/dwi_gunardi?lang=id" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
                        <Twitter />
                    </Link>
                    <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
                        <Heart />
                    </Link>
                </nav>
            </div>
        </footer>
    )
}

export default FooterLanding