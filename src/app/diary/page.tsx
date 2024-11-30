'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'

export default function DiaryPage() {
    const [pet, setPet] = useState(null)
    const audioRef = useRef(null)

    useEffect(() => {
        // Fetch pet data from MongoDB
        // For now, we'll use mock data
        setPet({
            name: 'Buddy',
            type: 'Dog',
            birthdate: '2020-01-01',
            photos: ['/placeholder.png'],
            audio: '/bark.mp3'
        })
    }, [])

    const playAudio = () => {
        if (audioRef.current) {
            audioRef.current.play().catch(error => {
                console.error("Audio playback failed:", error)
                // You could set an error state here and display a message to the user
            })
        }
    }

    if (!pet) return <div>Loading...</div>

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">{pet.name}'s Diary</h1>
            <div className="mb-4">
                <h2 className="text-xl font-semibold">Photo Album</h2>
                <div className="flex flex-wrap">
                    {pet.photos.map((photo, index) => (
                        <Image key={index} src={photo} alt={`${pet.name}'s photo`} width={200} height={200} className="m-2" />
                    ))}
                </div>
                <button className="bg-blue-500 text-white p-2 rounded mt-2">Upload Photo</button>
            </div>
            <div className="mb-4">
                <h2 className="text-xl font-semibold">Audio</h2>
                <audio ref={audioRef} src={pet.audio} />
                <button
                    onClick={playAudio}
                    className="bg-green-500 text-white p-2 rounded mt-2"
                    aria-label={`Play ${pet.name}'s sound`}
                >
                    Play Sound
                </button>
            </div>
            <button className="bg-red-500 text-white p-2 rounded">Heaven Button</button>
        </div>
    )
}

