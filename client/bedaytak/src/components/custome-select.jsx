import React from 'react'

export default function CustomeSelect({name, data }) {
  return (
    <div className='mb-4'>
       <label for="custome-select" class="block mb-2 text-sm capitalize font-medium text-gray-900 dark:text-white">{name}</label>
        <select id="custome-select" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
             focus:outline-none focus:ring-2 focus:ring-[#15A0DC] focus:border-[#15A0DC]
             block w-full p-2">
            {data?.map((item, index) => (
                <option key={index} value={item.value}>
                    <p>{item}</p>
                </option>
            ))}
        </select>
    </div>
  )
}
