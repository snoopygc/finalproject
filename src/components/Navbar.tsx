'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, ChevronDown } from 'lucide-react'

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    //const [isServicesOpen, setIsServicesOpen] = useState(false) //Removed

    const toggleMenu = () => setIsOpen(!isOpen)
    //const toggleServices = () => setIsServicesOpen(!isServicesOpen) //Removed

    return (
        <nav className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 shadow-lg">
            <div className="container mx-auto">
                <div className="flex justify-between items-center">
                    <Link href="/" className="text-white text-2xl font-bold hover:text-yellow-300 transition duration-300">
                        PetPet Diary
                    </Link>
                    <div className="hidden md:flex space-x-6">
                        <NavLink href="/">Home</NavLink>
                        <NavLink href="/diary">Diary</NavLink>
                        <NavLink href="/food-calculator">Food Calculator</NavLink>
                        <NavLink href="/activity">Activity</NavLink>
                        <NavLink href="/services">Services</NavLink>
                        <NavLink href="/member">Member</NavLink>
                    </div>
                    <div className="md:hidden">
                        <button onClick={toggleMenu} className="text-white hover:text-yellow-300 transition duration-300">
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
                {isOpen && (
                    <div className="mt-4 md:hidden">
                        <div className="flex flex-col space-y-2">
                            <MobileNavLink href="/">Home</MobileNavLink>
                            <MobileNavLink href="/diary">Diary</MobileNavLink>
                            <MobileNavLink href="/food-calculator">Food Calculator</MobileNavLink>
                            <MobileNavLink href="/activity">Activity</MobileNavLink>
                            <MobileNavLink href="/services">Services</MobileNavLink>
                            <MobileNavLink href="/member">Member</MobileNavLink>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    )
}

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <Link href={href} className="text-white hover:text-yellow-300 transition duration-300">
        {children}
    </Link>
)

const MobileNavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <Link href={href} className="text-white hover:text-yellow-300 transition duration-300 block">
        {children}
    </Link>
)

const DropdownItem = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <Link
        href={href}
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
        role="menuitem"
    >
        {children}
    </Link>
)

export default Navbar

