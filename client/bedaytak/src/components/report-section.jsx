import React from 'react'  ;
import Review from '../components/review' ;

export default function ReportSection({type, icon, data, style}) {
  return (
    <div className={`w-full flex flex-col jusrify-center items-center ${style}`}>
        <span className='m-4'>
            {icon}
        </span>
        <h4 className='capitalize mb-2! text-3xl font-bold text-center leading-12'>{type} report</h4>
        <p className='text-md leading-7 mb-12! w-8/12 opacity-80 text-center'></p>
        <Review isPart={true} data={data} />
   </div> 
  )
}
