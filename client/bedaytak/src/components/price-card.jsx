import React from 'react'

export default function PriceCard({type, price, style, details}) {
  return (
    <div className={`flex justify-center flex-col bg-white items-center border-2 border-black/10 pt-6 pb-6 ps-4 pe-4 rounded-xl cursor-pointer duration-300 hover:border-0 hover:bg-blue-100 hover:scale-105 ${style}`}>
        <div className='flex flex-col justify-start items-start w-9/12 border-b-2 border-black/10'>
            <h4 className='text-2xl font-semibold'>{type}</h4>
           <span className='flex items-end p-6 ps-0! justify-start'><h1 className='text-6xl'>{price}</h1><p className='text-2xl opacity-70'>£/service</p></span> 
        </div>
        <div className='flex flex-col justify-center items-start mt-4 w-9/12'>  
            <p className='capitalize text-xs opacity-55 leading-5 text-start'>{details}</p>
        </div>
    </div>
  )
}
