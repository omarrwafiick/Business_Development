import React from 'react'

export default function CustomeButton({name, styles, onClick, disabled}) {
  return (
    <div className='w-full'>
      <button
          type="button"
          disabled={disabled}
          onClick={onClick}
          className={`text-white font-inter mt-3 cursor-pointer bg-primary capitalize w-full shadow-lg hover:shadow-xl hover:bg-[#15A0DC] focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-md px-5 py-2.5 me-2 mb-2 dark:bg-primary dark:hover:bg-[#15A0DC] focus:outline-none dark:focus:bg-primary ${styles}`}
        >
      {name}
      </button>
    </div>
  )
}
