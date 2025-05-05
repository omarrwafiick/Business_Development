import { PaperclipIcon } from 'lucide-react'
import React from 'react'
import AppStore from '../store/store';
import Review from '../components/review';

export default function ServiceResult() {
  const { reviewData } = AppStore();
  return (
    <div className='w-full h-dvh flex flex-col justify-start items-center mt-12'>  
      <div className="relative w-10/12 flex flex-col justify-center items-center">
          <span className='m-4'>
                <PaperclipIcon size={55} color="#F66A35" /> 
          </span>
          <h4 className='capitalize mb-2! text-3xl font-bold font-gelasio'>service results</h4>
          <Review data={reviewData} /> 
      </div>    
    </div>
  )
}
