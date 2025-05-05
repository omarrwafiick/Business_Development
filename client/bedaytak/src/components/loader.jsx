import React from 'react'

export default function Loader() {
  return (
    <div className='fixed inset-0 bg-black/50 bg-opacity-50 flex justify-center items-center z-50'>
        <div class="loader relative h-9/12 overflow-auto scroll-auto bg-white p-6 rounded-lg shadow-lg w-6/12"></div> 
    </div>
  )
}
