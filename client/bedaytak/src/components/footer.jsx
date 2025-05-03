import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/images/logo2.png';

export default function Footer() {
  return (  
    <footer className='w-full flex justify-center items-center pt-4 pb-4 bg-dark'>
        <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
            <div className="sm:flex sm:items-center sm:justify-between">
                <Link to="/" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse  cursor-pointer">
                    <img src={logo} className="h-16" alt="bedaytak Logo" />  
                </Link>
                <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-white sm:mb-0">
                    <li>
                        <Link to="/" className="hover:underline me-4 md:me-6 text-white">About</Link>
                    </li>
                    <li>
                        <Link to="/" className="hover:underline me-4 md:me-6 text-white">Privacy Policy</Link>
                    </li>
                    <li>
                        <Link to="/" className="hover:underline me-4 md:me-6 text-white">Licensing</Link>
                    </li>
                    <li>
                        <Link to="/" className="hover:underline text-white">Contact</Link>
                    </li>
                </ul>
            </div>
            <hr className="my-6 border-gray-200 sm:mx-auto text-white lg:my-8" />
            <span className="block text-sm text-white sm:text-center dark:text-gray-400">© 2025 <Link to="/" className="hover:underline">bedaytak™</Link>. All Rights Reserved.</span>
        </div>
    </footer>  
  )
}
