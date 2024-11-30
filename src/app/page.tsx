'use client'

import { motion } from 'framer-motion'
// import { CuteDog } from './components/cute-dog'

interface FeatureCardProps {
    title: string
    description: string
    icon: string
}

function FeatureCard({ title, description, icon }: FeatureCardProps) {
    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white p-6 rounded-lg shadow-md"
        >
            <div className="text-4xl mb-4">{icon}</div>
            <h3 className="text-lg font-medium text-gray-900">{title}</h3>
            <p className="mt-2 text-base text-gray-700">{description}</p>
        </motion.div>
    )
}

export default function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-[#FDE7BB] to-[#DEAA79]">

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center"
                >
                    <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                        Welcome to Pet Diary
                    </h1>
                    <p className="mt-3 max-w-md mx-auto text-base text-gray-700 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                        Keep track of your furry friend&apos;s life, health, and happiness in one place.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="mt-10 flex justify-center"
                >
                    {/* <CuteDog /> */}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="mt-16 grid gap-8 md:grid-cols-3"
                >
                    <FeatureCard
                        title="Daily Diary"
                        description="Record your pet's daily activities, moods, and milestones."
                        icon="📖"
                    />
                    <FeatureCard
                        title="Food Calculator"
                        description="Easily calculate the perfect portion sizes for your pet's meals."
                        icon="🍽️"
                    />
                    <FeatureCard
                        title="Health Tracker"
                        description="Keep track of vet visits, medications, and health issues."
                        icon="💉"
                    />
                </motion.div>
            </div>
        </div>
    )
}

