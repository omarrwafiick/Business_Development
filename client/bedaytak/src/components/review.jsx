import { ListCheckIcon } from 'lucide-react'
import React from 'react' 
import { Link } from 'react-router-dom' 

export default function Review({data, isPart=false}) {
  return (
    <div className='w-full flex flex-col justify-start items-center'>  
      <div className="relative flex flex-col justify-center items-center shadow-md sm:rounded-lg">
            { isPart ? <></> :
                <>
                <span className='mb-4 mt-2'>
                    <ListCheckIcon size={55} color="#F66A35" /> 
                </span>
                <h4 className='capitalize mb-2! text-3xl font-bold font-gelasio'>service result</h4>
                <p className='text-md leading-7 mt-3! mb-12! w-8/12 opacity-80 text-center'>This is the result of the service you applied for. It reflects the insights and solutions tailored to your request, based on the information provided.</p>
                </>
            }  
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
              <thead className="text-xl text-gray-700 uppercase bg-gray-50 ">
                  <tr>
                      <th scope="col" className="px-6 py-3">
                          Key
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Value
                      </th> 
                  </tr>
              </thead>
              <tbody className='text-lg font-inter'> 
                      {
                        data?.map((item, index)=>(
                            <tr key={index} className="odd:bg-white even:bg-gray-50 border-b  border-gray-200">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                    {item[0]}
                                </th>
                                <td className="px-6 py-4">
                                    {item[1]}
                                </td>  
                            </tr> 
                        ))
                      }
              </tbody>
          </table>
      </div>
     { isPart ? <></> :
     <p className='capitalize mt-3!'>back{"  "}<Link className='underline underline-offset-2 font-medium cursor-pointer' to="/">home?</Link></p>} 
    </div> 
  )
}
