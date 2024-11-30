'use client'

import { useState } from 'react'
import { Search, Hospital, Stethoscope, Store, Scissors, GraduationCap, Building, Home } from 'lucide-react'

const services = [
    { name: 'Hospitals', icon: Hospital, description: 'Emergency and specialized pet care' },
    { name: 'Clinics', icon: Stethoscope, description: 'Routine check-ups and vaccinations' },
    { name: 'Pet Shops', icon: Store, description: 'Food, toys, and accessories for your pets' },
    { name: 'Grooming Salons', icon: Scissors, description: 'Professional pet grooming services' },
    { name: 'Training Centers', icon: GraduationCap, description: 'Behavior training and obedience classes' },
    { name: 'Pet-Friendly Hotels', icon: Building, description: 'Accommodations that welcome your furry friends' },
    { name: 'Pet Boarding Services', icon: Home, description: 'Safe and comfortable pet lodging' },
]

export default function ServicesPage() {
    const [searchTerm, setSearchTerm] = useState('')

    const filteredServices = services.filter(service =>
        service.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-center">Our Services</h1>
            <div className="mb-6 relative">
                <input
                    type="text"
                    placeholder="Search services..."
                    className="w-full p-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredServices.map((service, index) => (
                    <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                        <div className="flex items-center mb-4">
                            <service.icon className="text-blue-500 mr-3" size={24} />
                            <h2 className="text-xl font-semibold">{service.name}</h2>
                        </div>
                        <p className="text-gray-600">{service.description}</p>
                    </div>
                ))}
            </div>
            {filteredServices.length === 0 && (
                <p className="text-center text-gray-500 mt-8">No services found. Please try a different search term.</p>
            )}
        </div>
    )
}

