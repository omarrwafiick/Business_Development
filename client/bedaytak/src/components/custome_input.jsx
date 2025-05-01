import React from 'react'

export default function CustomeInput({name, type}) { 
  return (
    <div class="mb-4">
      <label for={name} class="block mb-2 text-sm font-medium capitalize text-gray-900 dark:text-white">{name}</label>
      <input type={type} id={name} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
             focus:outline-none focus:ring-2 focus:ring-[#15A0DC] focus:border-[#15A0DC]
             block w-full p-2"/>
    </div>
  )
}
