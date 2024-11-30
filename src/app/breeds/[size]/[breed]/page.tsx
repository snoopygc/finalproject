'use client'

import { useParams } from 'next/navigation'
import BreedInfo from '@/components/BreedInfo'

export default function BreedPage() {
    const params = useParams()
    const breed = params.breed as string
    const formattedBreed = breed.replace(/-/g, ' ')

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4 text-center">{formattedBreed.charAt(0).toUpperCase() + formattedBreed.slice(1)}</h1>
            <BreedInfo breedId={breed} />
        </div>
    )
}

