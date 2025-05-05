import React, { useEffect } from 'react'
import { getIntegratedReport } from '../services/service'; 
import AppStore from '../store/store';
import { BadgeDollarSignIcon, HelpCircleIcon, LocationEditIcon, Users } from 'lucide-react';
import ReportSection from '../components/report-section';

export default function IntegratedReport() {
  const { applicantId } = AppStore();
  const reports = async () => {
      return await getIntegratedReport(applicantId);
  };
  useEffect(()=>{
    reports();
  },[])
  return (
    <div className='w-full flex flex-col justify-center items-center mt-10 mb-10'>
        <ReportSection 
          icon={<Users size={55} color="#F66A35" />}
          style={'border-b-2 border-b-black/15 pb-12 mb-10'}
          type={'sales and revenue optimization'}
          data={[['sales', 'bla bla'], ['stage', 'bla 1']]} /> 

        <ReportSection 
          icon={<HelpCircleIcon size={55} color="#F66A35" />}
          style={'border-b-2 border-b-black/15 pb-12 mb-10'}
          type={'consultency report'}
          data={[['consultency', 'bla bla'], ['stage', 'bla 1']]} /> 

        <ReportSection 
          icon={<BadgeDollarSignIcon size={55} color="#F66A35" />}
          style={'border-b-2 border-b-black/15 pb-12 mb-10'}
          type={'financial planning report'}
          data={[['financial', 'bla bla'], ['stage', 'bla 1']]} /> 

        <ReportSection 
          icon={<LocationEditIcon size={55} color="#F66A35" />}
          type={'location and market analysis report'}
          data={[['location', 'bla bla'], ['stage', 'bla 1']]} />  
    </div>
  )
}
