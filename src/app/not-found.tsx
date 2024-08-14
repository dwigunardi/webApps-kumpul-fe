import Image from 'next/image'
import Link from 'next/link'

export default function NotFound() {
    return (
        <div className='relative flex flex-col items-center justify-center h-screen bg-light-4 dark:bg-dark-2'>
            <Image src={'/images/404.jpg'} alt='404' fill className='bg-cover bg-center bg-no-repeat' />
            <div
                className="flex items-center justify-center min-h-screen z-10 "
            >
                <div className="max-w-md mx-auto text-center bg-light-4 glassmorphism dark:glassmorphism2 p-8 rounded-xl shadow-xl">
                    <div className="text-9xl font-bold text-light-6 dark:text-light-4 mb-4">404</div>
                    <h1 className="text-4xl font-bold text-gray-800 dark:text-dark-2 mb-6">
                        Oops! Page Not Found
                    </h1>
                    <p className="text-lg text-light-6 mb-8">
                        The page you're looking for seems to have gone on a little adventure.
                        Don't worry, we'll help you find your way back home.
                    </p>
                    <Link href="/"
                        className="inline-block bg-blue-2 text-white font-semibold px-6 py-3 rounded-md hover:bg-indigo-700 transition-colors duration-300"
                    >
                        Go Back Home
                    </Link>
                </div>
            </div>
        </div>
    )
}