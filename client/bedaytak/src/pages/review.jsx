import { ListCheckIcon } from 'lucide-react'
import React from 'react' 
import { Link } from 'react-router-dom'
import { BarChartGraph  } from '../components/graph'

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
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xl text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
                            <tr key={index} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
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
          <BarChartGraph data={ [
                        { name: 'Jan', revenue: 4000 },
                        { name: 'Feb', revenue: 3000 },
                        { name: 'Mar', revenue: 2000 },
                        { name: 'Apr', revenue: 2780 },
                        ]} />
      </div>
     { isPart ? <></> :
     <p className='capitalize mt-3!'>back{"  "}<Link className='underline underline-offset-2 font-medium cursor-pointer' to="/">home?</Link></p>} 
    </div> 
  )
}
