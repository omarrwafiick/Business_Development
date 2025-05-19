import React, { useEffect } from 'react'
import { getIntegratedReport } from '../services/service'; 
import AppStore from '../store/store';
import { BadgeDollarSignIcon, ClipboardList, HelpCircleIcon, LocationEditIcon, Users } from 'lucide-react';
import ReportSection from '../components/report-section';
import { BarChartGraph, LineChartGraph, AreaChartGraph, PieChartGraph } from '../components/graph';
import SmallButton from '../components/small-button'; 
import { exportPDF } from '../services/exportPdf'; 
import { exportExcel } from '../services/exportExcel'; 

export default function IntegratedReport() {
  const { applicantId } = AppStore();

  const reports = async () => {
      return (await getIntegratedReport(applicantId)).data;
  };
  
  useEffect(()=>{
    //reports(); 
  },[])

  const commonStyle = "w-10/12 flex justify-center items-center shadow-md p-6 rounded-lg mb-10";
 
  return (
    <div className='w-full flex flex-col justify-center items-center mt-10 mb-10'>
        <div className='w-10/12 flex flex-col justify-center items-center pb-6'>
          <div className='flex flex-col justify-center items-center'>
            <span className='m-4'>
                <ClipboardList size={65} color="#F66A35" /> 
            </span>
            <h4 className='capitalize mb-2! text-4xl font-bold font-gelasio'>bedaytak integrated report report</h4>
            <p className='text-md mt-4! mb-4! leading-7 opacity-80 text-center'>Choose your own format to get data as you wish.</p>
            <div className=''> 
                <SmallButton onClick={(e) => {
                      e.preventDefault();
                      exportPDF([ 
                        { name: "Ali", age: 25, status: "active" },
                        { name: "Sara", age: 30, status: "inactive" },
                      ]);
                    }}
                    name="Pdf" style={'bg-secondary text-white! ms-3!'}/>

                <SmallButton onClick={(e)=> {
                      e.preventDefault();
                      exportExcel( 
                      [
                        { name: "Ali", age: 25, status: "active" },
                        { name: "Sara", age: 30, status: "inactive" },
                      ]);
                    }}
                  name="Excel" style={'bg-secondary text-white! ms-3!'}/> 
            </div>
          </div>
        </div>

        <div className={commonStyle}>  
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

        <div className={commonStyle}>
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

        <div className={commonStyle}>
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

        <div className={commonStyle}>
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
