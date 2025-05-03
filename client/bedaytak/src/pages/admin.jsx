import { TowerControlIcon } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

export default function Admin() {
  return (
    <div className='w-full h-dvh flex flex-col justify-start items-center mt-12'>  
      <div className="relative flex flex-col justify-center items-center shadow-md sm:rounded-lg">
          <span className='m-4'>
                <TowerControlIcon size={55} color="#F66A35" /> 
          </span>
          <h4 className='capitalize mb-2! text-3xl font-bold font-gelasio'>admin panel</h4>
          <p className='text-md leading-7 mt-3! mb-12! w-8/12 opacity-80 text-center'>As an admin, you have the authority to manage users in the system. You can add new users, update their information, delete users when necessary, and assign or add new admins to ensure smooth platform management.</p>
  
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">     
              <thead className="text-xl text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                      <th scope="col" className="px-6 py-3 capitalize">
                          user name
                      </th>
                      <th scope="col" className="px-6 py-3 capitalize">
                          phone number
                      </th>
                      <th scope="col" className="px-6 py-3 capitalize">
                          email
                      </th>
                      <th scope="col" className="px-6 py-3 capitalize">
                          createdAt
                      </th>
                      <th scope="col" className="px-6 py-3 capitalize">
                          <span>actions</span>
                      </th>
                  </tr>
              </thead>
              <tbody className='text-lg'> 
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          omar
                      </th>
                      <td className="px-6 py-4">
                          012913913133
                      </td>
                      <td className="px-6 py-4">
                          omar@gmail.com
                      </td>
                      <td className="px-6 py-4">
                          14-01-2002
                      </td>
                      <td className="px-6 py-4 flex text-right">
                          <Link to="/" className="font-medium text-blue-600 dark:text-blue-500 hover:underline me-3">delete</Link>
                          <Link to="/" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</Link>
                      </td>
                  </tr> 
              </tbody>
          </table>
      </div> 
    </div>
  )
}
