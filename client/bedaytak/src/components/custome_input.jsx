import React from 'react'

export default function CustomeInput({name, type}) { 
  return (
    <div class="mb-4">
      <label for={name} class="block mb-2 text-sm font-medium capitalize text-gray-900 dark:text-white">{name}</label>
      <input type={type} id={name} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
    </div>
  )
}
