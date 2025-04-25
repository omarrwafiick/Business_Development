import React from 'react'

export default function CustomeSelect({name, data }) {
  return (
    <div className='mb-4'>
       <label for="custome-select" class="block mb-2 text-sm capitalize font-medium text-gray-900 dark:text-white">{name}</label>
        <select id="custome-select" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            {data?.map((item, index) => (
                <option key={index} value={item.value}>
                    <p>{item}</p>
                </option>
            ))}
        </select>
    </div>
  )
}
