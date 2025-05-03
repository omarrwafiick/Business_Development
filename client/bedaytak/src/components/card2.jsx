import React from 'react'

export default function Card2({title, content, icon, color, style, mode}) {
  const modeStyles = mode ? 'border-black/10 bg-white hover:bg-zinc-700 hover:text-white' : 'border-white/10 bg-zinc-700 hover:bg-white hover:text-black';
  return (
    <div className={`flex justify-center flex-col items-center border-2 pt-6 pb-6 ps-4 pe-4 rounded-xl transition-colors delay-50 cursor-pointer ${style} ${modeStyles}`}>
        <div className='flex justify-start items-start w-9/12'>
           <span className={`rounded-full p-2 me-2 ${color}`}>{icon}</span>
        </div>
        <div className='flex flex-col justify-center items-start mt-4 w-9/12'> 
            <h1 className='text-2xl capitalize font-bold mb-2!'>{title}</h1>
            <p className='capitalize text-xs opacity-55 leading-5 text-start'>{content}</p>
        </div>
    </div>
  )
}
