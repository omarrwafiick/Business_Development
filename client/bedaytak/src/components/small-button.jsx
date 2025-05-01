import React from 'react'
import { Link } from 'react-router-dom'

export default function SmallButton({name, style, to}) { 
  
  return (
    <Link to={"/"+to} type="button" className={` hover:bg-gradient-to-br font-medium rounded-lg text-md px-5 py-2 text-center  ${style}`}>{name}</Link>
  )
}
 