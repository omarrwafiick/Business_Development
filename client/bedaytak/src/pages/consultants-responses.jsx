import React, { useEffect, useState } from 'react'
import { getConsultancyServiceResult } from '../services/service';
import AppStore from '../store/store';
import Responses from '../components/responses';
import { CalendarPlus, MessageCircleHeartIcon, X } from 'lucide-react';
import ApplicationOverview from '../components/application-overview';

export default function ConsultantsResponses() {
  const { applicantId } = AppStore();  
  const [showApplication, setShowApplication] = useState(false)
  const [responses, setResponses] = useState([
    {
      consultantId: "663bf68b3f9ae61b8efdd012",
      applicantId: "663bf6ad3f9ae61b8efdd013",
      applicationId: "663bf6d93f9ae61b8efdd014",
      businessIdea: "An eco-friendly food delivery service using reusable containers.",
      stageOfBusiness: "Just an idea",
      targetMarket: "Urban millennials focused on sustainability.",
      monthlyBudget: 2000,
      mainGoal: "Validate the market and acquire first 100 customers.",
      businessOverview: "We aim to reduce plastic waste by delivering meals in reusable containers, targeting eco-conscious consumers.",
      industryAnalysis: "The sustainable food delivery sector is growing, with demand for eco-friendly options outpacing supply.",
      competitorInsights: "Major players lack a sustainable packaging model, which gives us a competitive edge.",
      locationRecommendation: "Downtown San Francisco — dense population and eco-conscious culture.",
      targetAudienceDefinition: "Environmentally conscious professionals aged 25–40 in urban areas.",
      marketingSuggestions: "Use Instagram influencers, green certifications, and referral discounts.",
      operationsAdvice: "Start with 3 part-time delivery agents and rent a shared kitchen space.",
      legalConsiderations: "Register as an LLC, acquire health permits, and ensure food safety compliance.",
      growthStrategy: "Expand to nearby cities through partnerships with local restaurants.",
      commonPitfalls: "Overestimating initial demand and underestimating logistics costs.",
      summaryRecommendation: "Pilot in one area, gather feedback, and secure funding for scale-up.",
      reportPublishedAt: "2025-05-19T10:00:00.000Z"
    } 
  ]);
  const [application, setApplication] = useState(null);

  const req = async () => {
    setResponses(await getConsultancyServiceResult(applicantId)).data;
  };  

  useEffect(()=>{ 
    //req();
  },[]);
  
  return (
    <div className='w-full min-h-dvh flex flex-col justify-start items-center mt-8'>  
      <div className="relative flex flex-col justify-center items-center ">
        <span className='m-4'>
            <CalendarPlus size={55} color="#F66A35" /> 
          </span> 
          <h4 className='capitalize mb-2! text-3xl font-bold font-gelasio'>consultancy responses</h4>
            <div className='w-10/12 grid grid-cols-3 gap-8'>
              {
              responses.map((res,index)=>(<ApplicationOverview seedData={setApplication} key={index} data={res} onClick={() => setShowApplication(true)} />))
              } 
            </div> 
      </div>
      {showApplication && (
            <div onClick={() => setShowApplication(false)} className='fixed inset-0 bg-black/50 bg-opacity-50 flex justify-center items-center z-50'>
                <div onClick={(e) => e.stopPropagation()} className='relative h-10/12 overflow-auto scroll-auto bg-white p-6 rounded-lg shadow-lg flex flex-col justify-start items-evenly w-6/12'>
                    <X size={55} color="#FF0000" onClick={() => setShowApplication(false)} className="cursor-pointer absolute top-0 right-0 px-4 py-2 rounded"></X>   
                    <Responses data={application} />
                </div>
            </div>
           )}
    </div>
  )
}
