'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function PetsHeavenPage() {
    const [pets, setPets] = useState([])
    const [selectedPet, setSelectedPet] = useState(null)

    useEffect(() => {
        // Fetch pets from MongoDB
        // For now, we'll use mock data
        setPets([
            { id: 1, name: 'Max', photos: ['/placeholder.png', '/placeholder.png', '/placeholder.png'] },
            { id: 2, name: 'Bella', photos: ['/placeholder.png', '/placeholder.png'] },
        ])
    }, [])

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Pet&apos;s Heaven</h1>
            <div className="flex flex-wrap">
                {pets.map(pet => (
                    <div
                        key={pet.id}
                        className="m-2 relative"
                        onMouseEnter={() => setSelectedPet(pet)}
                        onMouseLeave={() => setSelectedPet(null)}
                    >
                        <Image src={pet.photos[0]} alt={pet.name} width={200} height={200} />
                        {selectedPet === pet && (
                            <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
                                <span className="text-white text-xl">{pet.name}</span>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            {selectedPet && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center">
                    <div className="relative w-3/4 h-3/4">
                        {selectedPet.photos.map((photo, index) => (
                            <Image
                                key={index}
                                src={photo}
                                alt={`${selectedPet.name}'s photo`}
                                layout="fill"
                                objectFit="contain"
                                className={`absolute transition-opacity duration-1000 ${index === 0 ? 'opacity-100' : 'opacity-0'}`}
                                style={{ animationDelay: `${index * 3}s` }}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

