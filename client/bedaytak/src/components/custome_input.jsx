import React from 'react'

export default function CustomeInput({name, type, value, onChange}) { 
  return (
    <div className="w-full mb-4 font-inter">
      <label htmlFor={name} className="block mb-2 text-sm font-medium capitalize text-gray-900">{name}</label>
      <input value={value} onChange={onChange} required type={type} id={name} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
             focus:outline-none focus:ring-2 focus:ring-[#15A0DC] focus:border-[#15A0DC]
             block w-full p-2"/>
    </div>
  )
}
