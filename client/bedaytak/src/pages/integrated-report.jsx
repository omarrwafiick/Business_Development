import React, { useEffect } from 'react'
import { getIntegratedReport } from '../services/service'; 
import AppStore from '../store/store';
import { BadgeDollarSignIcon, HelpCircleIcon, LocationEditIcon, Users } from 'lucide-react';
import ReportSection from '../components/report-section';
import { BarChartGraph, LineChartGraph, AreaChartGraph, PieChartGraph } from '../components/graph';

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
        <div className='w-10/12 flex justify-center items-center border-b-2 border-b-black/15 pb-12 mb-10'>
          <div className='flex justify-center items-center w-6/12'> 
            <ReportSection 
              icon={<Users size={55} color="#F66A35" />} 
              type={'sales and revenue optimization'}
              data={[['sales', 'bla bla'], ['stage', 'bla 1'],['sales', 'bla bla'], ['stage', 'bla 1'],['sales', 'bla bla'], ['stage', 'bla 1']]} /> 
          </div>
          <div className='flex justify-center items-center w-6/12'>
            <BarChartGraph dataKey={'value'} xAxisName={'name'} data={[
              { name: "Marketing", value: 300 },
              { name: "Sales", value: 200 },
              { name: "Development", value: 500 }
            ]} />
          </div>
        </div>

        <div className='w-10/12 flex justify-center items-center border-b-2 border-b-black/15 pb-12 mb-10'>
          <div className='flex justify-center items-center w-6/12'>
            <ReportSection 
              icon={<HelpCircleIcon size={55} color="#F66A35" />} 
              type={'consultency report'}
              data={[['consultency', 'bla bla'], ['stage', 'bla 1'],['sales', 'bla bla'], ['stage', 'bla 1'],['sales', 'bla bla'], ['stage', 'bla 1']]} /> 
          </div>
          <div className='flex justify-center items-center w-6/12'>
            <PieChartGraph dataKey={'value'} name={'name'} data={[
              { name: "Marketing", value: 300 },
              { name: "Sales", value: 200 },
              { name: "Development", value: 500 }
            ]}/>
          </div>
        </div>

        <div className='w-10/12 flex justify-center items-center border-b-2 border-b-black/15 pb-12 mb-10'>
          <div className='flex justify-center items-center w-6/12'>
            <ReportSection 
              icon={<BadgeDollarSignIcon size={55} color="#F66A35" />} 
              type={'financial planning report'}
              data={[['financial', 'bla bla'], ['stage', 'bla 1'],['sales', 'bla bla'], ['stage', 'bla 1'],['sales', 'bla bla'], ['stage', 'bla 1']]} /> 
          </div>
          <div className='flex justify-center items-center w-6/12'>
            <LineChartGraph dataKey={'value'} xAxisName={'name'} data={[
              { name: "Marketing", value: 300 },
              { name: "Sales", value: 200 },
              { name: "Development", value: 500 }
            ]}/>
          </div>
        </div>

        <div className='w-10/12 flex justify-center items-center'>
          <div className='flex justify-center items-center w-6/12'>
            <ReportSection 
              icon={<LocationEditIcon size={55} color="#F66A35" />}
              type={'location and market analysis report'}
              data={[['location', 'bla bla'], ['stage', 'bla 1'],['sales', 'bla bla'], ['stage', 'bla 1'],['sales', 'bla bla'], ['stage', 'bla 1']]} />  
          </div>
          <div className='flex justify-center items-center w-6/12'>
            <AreaChartGraph dataKey={'value'} xAxisName={'name'} data={[
              { name: "Marketing", value: 300 },
              { name: "Sales", value: 200 },
              { name: "Development", value: 500 }
            ]}/>
          </div>
        </div> 
    </div>
  )
}
