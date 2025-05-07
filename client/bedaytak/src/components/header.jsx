import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import SmallButton from '../components/small-button'
import logo from '../assets/images/logo.png'; 
import  AppStore  from '../store/store'; 
import { AlignJustifyIcon, X } from 'lucide-react';

export default function Header() {
  const [activeIndex, setActiveIndex] = useState(null);    
  const [navBarState, setNavBarState] = useState(false);  
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

  const handleToggle = ()=>{
    setNavBarState(false);

  }
  return (
    <div>
        <header className='w-full absolute top-0 left-0 z-50 flex justify-center items-center pt-4 pb-4'>   
                <nav className="flex items-center justify-between w-10/12 border-gray-200 dark:bg-gray-900">
                    <Link to="/" className={`flex w-3/12 items-center space-x-3 cursor-pointer ${navBarState? 'hidden' : 'visible'}`}>
                        <img src={logo} className="h-13" alt="bedaytak Logo" /> 
                    </Link> 
                        
                    <div className="hidden md:flex w-6/12 items-center justify-between" id="navbar-user">
                        <ul className="flex font-medium p-4 mt-4 rounded-lg">
                            <li>
                                <Link onClick={() => handleClick(0)} to="/#hero" className={`px-8 py-2 rounded-md font-medium ${activeIndex === 0 ? 'text-secondary' : 'text-black'}`}>Home</Link>
                            </li>
                            <li>
                                <Link onClick={() => handleClick(1)} to="/#about" className={`px-8 py-2 rounded-md font-medium ${activeIndex === 1 ? 'text-secondary' : 'text-black'}`}>About</Link>
                            </li>
                            <li>
                                <Link onClick={() => handleClick(2)} to="/#services" className={`px-8 py-2 rounded-md font-medium ${activeIndex === 2 ? 'text-secondary' : 'text-black'}`}>Services</Link>
                            </li>
                            <li>
                                <Link onClick={() => handleClick(3)} to="/#pricing" className={`px-8 py-2 rounded-md font-medium ${activeIndex === 3 ? 'text-secondary' : 'text-black'}`}>Pricing</Link>
                            </li>
                            <li>
                                <Link onClick={() => handleClick(4)} to="/#contact" className={`px-8 py-2 rounded-md font-medium ${activeIndex === 4 ? 'text-secondary' : 'text-black'}`}>Contact</Link>
                            </li>
                        </ul>
                    </div>
  
                    <div className="w-3/12 items-center justify-end relative hidden md:flex " id="navbar-user">
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
                <AlignJustifyIcon className={`sm:flex md:hidden ${navBarState? 'hidden' : 'flex'}`} size={55} color='#F66A35' onClick={()=> setNavBarState(true)} />
            </header>
            {navBarState && (
                    <div className="fixed inset-0 bg-white h-screen w-screen z-[100] flex flex-col items-start px-6 py-4">
                        <button className="self-end mb-6" onClick={()=>setNavBarState(false)}>
                            <X size={35} color='#F66A35' />
                        </button>
                        <nav className="flex flex-col gap-6 text-2xl font-medium">
                            <NavLinks onClick={handleToggle} />
                        </nav>
                    </div>
            )}
    </div>
    
  )
}
function NavLinks({ onClick }) {
    return (
      <>
        <Link to="/" className={`flex w-full items-center cursor-pointer mb-4`}>
            <img src={logo} className="h-20" alt="bedaytak Logo" /> 
        </Link> 
        <Link to="/#hero" onClick={onClick}>Home</Link>
        <Link to="/#about" onClick={onClick}>About</Link>
        <Link to="/#services" onClick={onClick}>Services</Link>
        <Link to="/#pricing" onClick={onClick}>Pricing</Link>
        <Link to="/#contact" onClick={onClick}>Contact</Link>
        <Link to="/login" onClick={onClick}>Login</Link>
        <Link to="/signup" onClick={onClick}>Signup</Link>
      </>
    );
  }