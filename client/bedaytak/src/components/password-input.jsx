import React, { useState } from 'react'
import { EyeClosed, EyeIcon } from 'lucide-react';

export default function PasswordInput({name}) { 
  const [passState, setPass] = useState(false);
  return (
    <div class="mb-4 relative">
      <label for={name} class="block mb-2 text-sm font-medium capitalize text-gray-900 dark:text-white">{name}</label>
      <input type={passState ? 'text' : 'password'} id={name} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
      <span className='absolute right-3 top-9 cursor-pointer' onClick={()=> setPass(!passState)}>
        {
            passState ? <EyeIcon size={24} color="#15A0DC" /> : <EyeClosed size={24} color="#15A0DC" />  
        }
      </span> 
    </div>
  )
}
