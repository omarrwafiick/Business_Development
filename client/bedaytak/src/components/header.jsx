import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import SmallButton from '../components/small-button'
import logo from '../assets/images/logo.png';
import { FileStack } from 'lucide-react';


export default function Header() {
    const [activeIndex, setActiveIndex] = useState(null);  
    const [notificationState, setNotificationState] = useState(false);  

    const handleClick = (index) => {
      setActiveIndex(index);  
    }; 
  return (
    <header className='w-full fixed top-0 left-0 z-50 bg-white shadow-md flex justify-center items-center pt-4 pb-4 '>   
        <nav className="flex items-center justify-between w-10/12 bg-white border-gray-200 dark:bg-gray-900">
            <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse cursor-pointer">
                <img src={logo} className="h-13" alt="bedaytak Logo" /> 
            </Link>
                
            <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-user">
                <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border opacity-80 border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                    <li>
                        <Link onClick={() => handleClick(0)} to="/#hero" className={`px-4 py-2 rounded-md font-medium ${activeIndex === 0 ? 'text-secondary' : 'text-black'}`}  aria-current="page">Home</Link>
                    </li>
                    <li>
                        <Link onClick={() => handleClick(1)} to="/#about" className={`px-4 py-2 rounded-md font-medium ${activeIndex === 1 ? 'text-secondary' : 'text-black'}`}>About</Link>
                    </li>
                    <li>
                        <Link onClick={() => handleClick(2)} to="/#services" className={`px-4 py-2 rounded-md font-medium ${activeIndex === 2 ? 'text-secondary' : 'text-black'}`}>Services</Link>
                    </li>
                    <li>
                        <Link onClick={() => handleClick(3)} to="/#pricing" className={`px-4 py-2 rounded-md font-medium ${activeIndex === 3 ? 'text-secondary' : 'text-black'}`}>Pricing</Link>
                    </li>
                    <li> 
                        <Link onClick={() => handleClick(4)} to="/#contact" className={`px-4 py-2 rounded-md font-medium ${activeIndex === 4 ? 'text-secondary' : 'text-black'}`}>Contact</Link>
                    </li>
                </ul>
            </div>    

            <div className="items-center justify-end hidden w-full md:flex md:w-auto md:order-1 relative" id="navbar-user">
                <FileStack onClick={() => setNotificationState(!notificationState)} className='cursor-pointer' size={35} color="#15A0DC" />
                <div className={`h-96 top-12 -right-12 w-72 bg-white absolute rounded-3xl border-2 border-black/30 p-3 scroll-auto overflow-auto
                ${notificationState ? 'visible' : 'hidden'}`}>
                    <h1>application#</h1>
                    <h1>application#</h1>
                    <h1>application#</h1>
                    <h1>application#</h1>
                    <h1>application#</h1>
                    <h1>application#</h1>
                    <h1>application#</h1>
                    <h1>application#</h1>
                    <h1>application#</h1>
                    <h1>application#</h1>
                    <h1>application#</h1>
                    <h1>application#</h1>
                    <h1>application#</h1>
                    <h1>application#</h1>
                    <h1>application#</h1> 
                </div>
                <SmallButton state={true} style={'bg-white text-black!'} to="login" name={"Log In"} />
                <SmallButton state={false} style={'bg-primary text-white!'} to="signup" name={"Sign Up"} />
            </div>  
        </nav>
    </header>
  )
}
