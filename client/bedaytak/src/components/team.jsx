import React from 'react' 
import Image from '../assets/images/person1.jpg';

export default function Team({name, role, imageUrl, style}) {
  return (
    <div className={`flex justify-center flex-col items-center border-2 border-black/10 bg-white pt-4 pb-4 ps-4 pe-4 rounded-xl cursor-pointer duration-300 hover:border-0 hover:bg-blue-100 hover:scale-105 ${style}`}>
        <div className='flex justify-start items-start w-full'>
           <img className='rounded-2xl' src={Image} alt="person image" />
        </div>
        <div className='flex flex-col justify-center items-center mt-4 w-9/12'> 
            <h1 className='text-2xl capitalize font-bold mb-2!'>{name}</h1>
            <h3 className='capitalize text-md opacity-55 leading-5 text-start'>{role}</h3>
        </div>
    </div>
  )
}
