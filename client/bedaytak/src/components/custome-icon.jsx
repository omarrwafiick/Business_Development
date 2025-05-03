import React from 'react'

export default function CustomeIcon({icon}) {
  return (
    <span className='me-6 hover:bg-blue-200 rounded-full cursor-pointer hover:scale-110 duration-300'>
        {icon}
    </span>
  )
}
