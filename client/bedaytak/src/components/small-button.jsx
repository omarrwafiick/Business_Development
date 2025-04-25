import React from 'react'
import { Link } from 'react-router-dom'

export default function SmallButton({name, state}) { 
  const Styles = {
    backgroundColor: state ? 'bg-white' : ' bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700' ,
  }  
  return (
    <Link to={"/"+name} style={Styles} type="button" className="text-white hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">{name}</Link>
  )
}
