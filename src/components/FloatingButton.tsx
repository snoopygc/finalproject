'use client'

import { useState } from 'react'
import Link from 'next/link'

const FloatingButton = () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="fixed bottom-4 right-4">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center"
            >
                {isOpen ? 'X' : '🐾'}
            </button>
            {isOpen && (
                <div className="absolute bottom-14 right-0 bg-white p-2 rounded shadow">
                    <Link href="/breeds/small" className="block p-2 hover:bg-gray-100">Small Dogs</Link>
                    <Link href="/breeds/medium" className="block p-2 hover:bg-gray-100">Medium Dogs</Link>
                    <Link href="/breeds/large" className="block p-2 hover:bg-gray-100">Large Dogs</Link>
                </div>
            )}
        </div>
    )
}

export default FloatingButton

