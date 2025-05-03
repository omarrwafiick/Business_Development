import React, { useState } from 'react'
import { EyeClosed, EyeIcon } from 'lucide-react';

export default function PasswordInput({name}) { 
  const [passState, setPass] = useState(false);
  return (
    <div class="mb-4 relative">
      <label for={name} class="block mb-2 text-sm font-medium capitalize text-gray-900 dark:text-white">{name}</label>
      <input required type={passState ? 'text' : 'password'} id={name} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
             focus:outline-none focus:ring-2 focus:ring-[#15A0DC] focus:border-[#15A0DC]
             block w-full p-2" />
      <span className='absolute right-3 top-9 cursor-pointer' onClick={()=> setPass(!passState)}>
        {
            passState ? <EyeIcon size={24} color="#15A0DC" /> : <EyeClosed size={24} color="#15A0DC" />  
        }
      </span> 
    </div>
  )
}
