import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import SmallButton from '../components/small-button'
import logo from '../assets/images/logo.png'; 
import  AppStore  from '../store/store';

export default function Header() {
  const [activeIndex, setActiveIndex] = useState(null);  
  const { user, setUser, setToken } = AppStore();
  const [isUser, setIsUser] = useState(false);
  const handleClick = (index) => {
    setActiveIndex(index);  
  }; 
  useEffect(()=>{ 
    if(user){
        setIsUser(true);
    }
    setIsUser(false);
  },[])

  const logoutUser = ()=>{
    setUser(null);
    setToken(null);
  }
  return (
    <header className='w-full fixed top-0 left-0 z-50 flex justify-center items-center pt-4 pb-4 '>   
        <nav className="flex items-center justify-between w-10/12 border-gray-200 dark:bg-gray-900">
            <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse cursor-pointer">
                <img src={logo} className="h-13" alt="bedaytak Logo" /> 
            </Link>
                
            <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-user">
                <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border opacity-80 backdrop-blur-md bg-opacity-50 border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
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
                    <>
                        {isUser? 
                        ( 
                            <SmallButton onClick={()=> logoutUser()} state={true} style={'bg-white text-black! me-3!'} to="login" name={"logout"} />
                        )
                        :
                        (   <>
                                <SmallButton state={true} style={'bg-white text-black! me-3!'} to="login" name={"Log In"} />
                                <SmallButton state={false} style={'bg-primary text-white!'} to="signup" name={"Sign Up"} />
                            </>
                        )} 
                    </>

            </div>  
        </nav>
    </header>
  )
}
