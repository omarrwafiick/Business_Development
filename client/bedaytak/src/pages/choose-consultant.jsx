import React, { useEffect } from 'react'
import ConsultantCard from '../components/consultant-card'
import { BoxSelect } from 'lucide-react'
import { getAllConsultants } from '../services/consultant'; 

export default function ChooseConsultant() { 
  var consultants = [
    {userId:{fullName:"omar"}, experienceYears:3, qualificationsIds:[{title:'cs'}, {title:'js'}]},
    {userId:{fullName:"omar"}, experienceYears:1, qualificationsIds:[{title:'cs'}, {title:'js'}]},
    {userId:{fullName:"omar"}, experienceYears:5, qualificationsIds:[{title:'cs'}, {title:'js'}]}
  ];

  const req = async()=>{
    return (await getAllConsultants()).data;
  } 
  useEffect(()=>{
    try {
        consultants.push(req()); 
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
        <div className='flex justify-start items-center w-10/12 mb-4'>
          <span className='h-4 w-4 bg-red-400 rounded-sm me-1'></span> <a className='capitalize me-2'>beginner</a> 
          <span className='h-4 w-4 bg-yellow-400 rounded-sm me-1'></span> <a className='capitalize me-2'>junior</a> 
          <span className='h-4 w-4 bg-green-400 rounded-sm me-1'></span> <a className='capitalize me-2'>senior</a> 
        </div>
        <div className='w-10/12 grid grid-cols-3 gap-8'>
            {
              consultants?.map((consultant, index)=>(
                <ConsultantCard id={consultant._id} name={consultant.userId.fullName} experienceYears={consultant.experienceYears} qualifications={consultant.qualificationsIds} /> 
              ))
            }
            
        </div>
    </div>
  )
} 
 