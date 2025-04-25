import React from 'react'

export default function CustomeTextarea({name, placeHolder, rowNum}) {
  return (
    <div> 
        <label for="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white capitalize">{name}</label>
        <textarea id="message" rows={rowNum} class="mb-5 mt-3! block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:bg-primary focus:bg-primary dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:bg-primary dark:focus:bg-primary" placeholder={placeHolder}></textarea>
    </div>
  )
}
