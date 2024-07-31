import Link from 'next/link'
import React from 'react'

function Unauthorized() {
    return (
        <div>
            <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-800">
                <div className="max-w-md p-6 bg-white rounded-lg shadow-md dark:bg-gray-900">
                    <div className="flex flex-col items-center">
                        <h1 className="text-4xl font-bold text-red-500 dark:text-red-400">403</h1>
                        <h2 className="mt-4 text-2xl font-bold text-gray-800 dark:text-gray-200">Forbidden</h2>
                        <p className="mt-4 text-gray-600 dark:text-gray-400">You do not have permission to access this resource.</p>
                    </div>
                    <div className="mt-6 flex justify-center space-x-4">
                        <Link
                            href="/"
                            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:bg-gray-600 dark:hover:bg-gray-500 dark:focus:ring-gray-400"
                            prefetch={false}
                        >
                            Go to Homepage
                        </Link>
                        <Link
                            href="#"
                            className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-800 bg-white rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:text-gray-200 dark:bg-gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-600"
                            prefetch={false}
                        >
                            Contact Support
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Unauthorized