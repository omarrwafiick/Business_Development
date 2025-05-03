import React from 'react'

export default function Card({title, content, icon, color, style}) {
  return (
    <div className={`flex justify-center items-center bg-white pt-6 pb-6 ps-4 pe-4 rounded-xl transition-colors delay-50 hover:bg-zinc-700 hover:text-white cursor-pointer ${style}`}>
        <div className='flex justify-center items-center w-3/12'>
           <span className={`rounded-full p-4 me-2 ${color}`}>{icon}</span>
        </div>
        <div className='flex flex-col justify-center items-start w-9/12'> 
            <h1 className='text-2xl capitalize font-bold mb-2!'>{title}</h1>
            <p className='capitalize text-xs opacity-55 leading-5 text-start'>{content}</p>
        </div>
    </div>
  )
}
