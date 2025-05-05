import React from 'react'  ;
import Review from '../pages/review' ;

export default function ReportSection({type, icon, data, style}) {
  return (
    <div className={`w-10/12 flex flex-col jusrify-center items-center ${style}`}>
        <span className='m-4'>
            {icon}
        </span>
        <h4 className='capitalize mb-2! text-3xl font-bold'>{type} report</h4>
        <p className='text-md leading-7 mt-3! mb-12! w-8/12 opacity-80 text-center'></p>
        <Review isPart={true} data={data} />
   </div> 
  )
}
