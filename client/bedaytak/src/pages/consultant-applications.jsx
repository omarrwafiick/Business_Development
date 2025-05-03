import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import toaster from 'react-hot-toast';
import { ListCollapseIcon } from 'lucide-react';
import SeededApplication from '../components/seeded-application';

export default function ConsultantApplications() {
  const navigate = useNavigate(); 
  useEffect(()=>{
    try {
        //request
        navigate("");
        toaster.success("Successfully");
        } catch (error) {
        toaster.error(`Error : ${error}`);
        }
  },[]);
  return (
    <div className='w-full h-dvh flex flex-col justify-start items-center mt-8'>  
      <div className="relative flex flex-col justify-center items-center ">
          <span className='m-4'>
            <ListCollapseIcon size={55} color="#F66A35" /> 
          </span>
          <h4 className='capitalize mb-2! text-3xl font-bold font-gelasio'>consultant applications</h4>
          <p className='text-md leading-7 mt-3! mb-12! w-8/12 opacity-80 text-center'>As a consultant, you can view and respond to any submitted application at your convenience. Each application comes pre-filled with detailed information provided by the user, allowing you to review, analyze, and offer tailored insights or services based on the user's input.</p>
          <div className='w-10/12 grid grid-cols-3 gap-8'>
            <SeededApplication businessIdea={"bla bla bla"} stage={'bla 1'} /> 
          </div>
      </div>
    </div>
  )
}
