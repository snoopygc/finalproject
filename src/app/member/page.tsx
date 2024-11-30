'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function MemberPage() {
    const [isSignUp, setIsSignUp] = useState(true)
    const [hasPet, setHasPet] = useState(false)
    const [petType, setPetType] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setIsLoading(true)

        try {
            const response = await fetch('/api/auth', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email,
                    password,
                    isSignUp,
                    petData: hasPet ? { type: petType } : null
                }),
            })

            const data = await response.json()

            if (response.ok) {
                if (isSignUp) {
                    alert('User registered successfully!')
                } else {
                    alert('Logged in successfully!')
                }
                router.push('/diary')
            } else {
                setError(data.message || 'An error occurred')
            }
        } catch (error) {
            setError('Unable to connect to the server. Please check your internet connection and try again.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="p-4 max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-4">{isSignUp ? 'Sign Up' : 'Sign In'}</h1>
            {error && <p className="text-red-500 mb-4 p-2 bg-red-100 rounded">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="email"
                    placeholder="Email"
                    required
                    className="border p-2 w-full rounded"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    required
                    className="border p-2 w-full rounded"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {isSignUp && (
                    <>
                        <div>
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={hasPet}
                                    onChange={(e) => setHasPet(e.target.checked)}
                                    className="mr-2"
                                />
                                Do you have a pet?
                            </label>
                        </div>
                        {hasPet && (
                            <div className="space-y-2">
                                <input
                                    type="text"
                                    placeholder="Pet Type"
                                    value={petType}
                                    onChange={(e) => setPetType(e.target.value)}
                                    className="border p-2 w-full rounded"
                                />
                            </div>
                        )}
                    </>
                )}
                <button
                    type="submit"
                    className={`bg-blue-500 text-white p-2 rounded w-full ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
                    disabled={isLoading}
                >
                    {isLoading ? 'Processing...' : (isSignUp ? 'Sign Up' : 'Sign In')}
                </button>
            </form>
            <p className="mt-4 text-center">
                {isSignUp ? 'Already have an account? ' : 'Don\'t have an account? '}
                <button onClick={() => setIsSignUp(!isSignUp)} className="text-blue-500 hover:underline">
                    {isSignUp ? 'Sign In' : 'Sign Up'}
                </button>
            </p>
        </div>
    )
}

