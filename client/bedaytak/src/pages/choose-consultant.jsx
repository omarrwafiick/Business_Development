import React, { useEffect } from 'react'
import ConsultantCard from '../components/consultant-card'
import { BoxSelect } from 'lucide-react'
import { useNavigate } from 'react-router-dom';

export default function ChooseConsultant() { 
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
    <div className='w-full flex flex-col justify-center items-center mb-4'>
        <span className='m-4'>
          <BoxSelect size={65} color="#F66A35" /> 
        </span>
        <h4 className='capitalize mb-2! text-4xl font-bold font-gelasio'>consultants</h4>
        <p className='text-md w-8/12 mt-6! mb-8! leading-7 opacity-80 text-center'>Choose a consultant based on their qualifications and experience. A proven track record ensures valuable insights and effective solutions for your business.</p>
  
      <div className='w-10/12 grid grid-cols-3 gap-8'>
          <ConsultantCard name={'omar wafick'} experienceYears={12} qualifications={['title1','title2']} /> 
      </div>
    </div>
  )
} 
 