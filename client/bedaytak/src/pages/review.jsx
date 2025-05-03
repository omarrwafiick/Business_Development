import { ListCheckIcon } from 'lucide-react'
import React from 'react' 

export default function Review({data}) {
  return (
    <div className='w-full h-dvh flex flex-col justify-start items-center mt-12'>  
      <div className="relative flex flex-col justify-center items-center shadow-md sm:rounded-lg">
          <span className='m-4'>
                <ListCheckIcon size={55} color="#F66A35" /> 
          </span>
          <h4 className='capitalize mb-2! text-3xl font-bold font-gelasio'>service result</h4>
          <p className='text-md leading-7 mt-3! mb-12! w-8/12 opacity-80 text-center'>This is the result of the service you applied for. It reflects the insights and solutions tailored to your request, based on the information provided.</p>
  
          <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead class="text-xl text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                      <th scope="col" class="px-6 py-3">
                          Key
                      </th>
                      <th scope="col" class="px-6 py-3">
                          Value
                      </th> 
                  </tr>
              </thead>
              <tbody className='text-lg font-inter'>
                  <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                      <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          expected customer
                      </th>
                      <td class="px-6 py-4">
                          121
                      </td> 
                  </tr> 
              </tbody>
          </table>
      </div>
      <p className='capitalize mt-3!'>back{"  "}<Link className='underline underline-offset-2 font-medium cursor-pointer' to="/">home?</Link></p>
    </div> 
  )
}
