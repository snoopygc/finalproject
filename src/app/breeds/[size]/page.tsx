'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'

const breeds = {
    small: ['basenji', 'Chihuahua', 'Pomeranian', 'Yorkshire Terrier'],
    medium: ['Beagle', 'Cocker Spaniel', 'Border Collie'],
    large: ['Labrador Retriever', 'German Shepherd', 'Golden Retriever']
}

export default function BreedsPage() {
    const params = useParams()
    const size = params.size as string

    if (!['small', 'medium', 'large'].includes(size)) {
        return <div>Invalid size</div>
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6 text-center">{size.charAt(0).toUpperCase() + size.slice(1)} Dog Breeds</h1>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {breeds[size].map(breed => (
                    <li key={breed} className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-300">
                        <Link href={`/breeds/${size}/${breed.toLowerCase().replace(' ', '-')}`} className="text-blue-600 hover:text-blue-800 text-lg font-semibold">
                            {breed}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

