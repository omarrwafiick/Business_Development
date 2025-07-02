import React, { useEffect, useState } from 'react' 
import toaster from 'react-hot-toast';
import { ListCollapseIcon } from 'lucide-react';
import SeededApplication from '../components/seeded-application';
import { getConsultantApplications } from '../services/application'; 
import AppStore from '../store/store';

export default function ConsultantApplications() {
  const [applications, setApplications] = useState([{ 
      businessIdea: "An eco-friendly food delivery service using reusable containers.",
      stageOfBusiness: "Just an idea",
      targetMarket: "Urban millennials focused on sustainability.",
      monthlyBudget: 2000,
      mainGoal: "Validate the market and acquire first 100 customers.",
      businessOverview: "We aim to reduce plastic waste by delivering meals in reusable containers, targeting eco-conscious consumers.",
  }]);

  const { consultandId, setconsultationData } = AppStore();  

  const req = async () => {
    return (await getConsultantApplications(consultandId)).data;
  };  

  useEffect(()=>{ 
    try {
          //applications.push(req());  
        } catch (error) {
        toaster.error(`Error : ${error}`);
        }
  },[]);

  const respond = (businessData)=>{
    setconsultationData(businessData);
  }
  
  return (
    <div className='w-full min-h-dvh flex flex-col justify-start items-center mt-8'>  
      <div className="relative flex flex-col justify-center items-center ">
          <span className='m-4'>
            <ListCollapseIcon size={55} color="#F66A35" /> 
          </span>
          <h4 className='capitalize mb-2! text-3xl font-bold font-gelasio'>consultant applications</h4>
          <p className='text-md leading-7 mt-3! mb-12! w-8/12 opacity-80 text-center'>As a consultant, you can view and respond to any submitted application at your convenience. Each application comes pre-filled with detailed information provided by the user, allowing you to review, analyze, and offer tailored insights or services based on the user's input.</p>
          <div className='w-10/12 grid grid-cols-3 gap-8'>
            {
                applications?.map((app, index)=>(<SeededApplication onClick={respond} key={index} data ={app}/> ))
            } 
          </div>
      </div>
    </div>
  )
}
