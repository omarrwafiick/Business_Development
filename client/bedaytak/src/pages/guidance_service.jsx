import React, { useState } from 'react' 
import { motion } from 'framer-motion';
import CustomeButton from '../components/custome_button'
import CustomeSelect from '../components/custome-select'
import { Link } from 'react-router-dom'; 
import { NotebookIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toaster from 'react-hot-toast';
import { businessGuideService } from '../services/service'; 
import AppStore from '../store/store';

export default function GuidanceService() {
  const navigate = useNavigate();
  const [stage, setStage] = useState(1);
  const [profit, setProfit] = useState(1);
  const [count, setCount] = useState(1);
  const [repeat, setRepeat] = useState(1);
  const [challenge, setChallenge] = useState(1);
  const { applicationId, applicantId } = AppStore();
  const serviceSubmit = async (e) => {   
    e.preventDefault();  
    try {
      const data = {
        stageOfBusiness: stage,          
        monthlyProfitStatus: profit,     
        monthlyCustomerCount: count,  
        repeatCustomerLevel: repeat,     
        currentChallenge: challenge        
      };
      await businessGuideService(applicantId, applicationId, data);
      //direct to review = not paid
      toaster.success("Service request was sent successfully");
      navigate("/review");
    } catch (error) {
    toaster.error(`Error : ${error}`);
    }
  };
return (
  <div className='flex justify-center items-center flex-col w-full h-dvh mt-8 mb-8'>
      <motion.div
          initial={{opacity: 0, y:20}}
          animate={{opacity: 1, y:0}}
          transition={{duration:0.5}} 
          className='flex justify-center items-center flex-col w-4/12'>

          <span className='m-4'>
              <NotebookIcon size={55} color="#F66A35" /> 
          </span>
          <h4 className='capitalize mb-2! text-3xl font-bold font-gelasio'>business guidance</h4>
          <p className='text-sm mt-2! opacity-80 text-center'>An Expert System guides businesses by mimicking human expertise, analyzing data, and offering rule-based recommendations for planning, strategy, and operations.</p>

          <form onSubmit={serviceSubmit} className='w-full mt-3'> 
              <CustomeSelect value={stage} onChange={(e)=> setStage(e.target.value)} name={"Stage Of Business"} data={[["Just an idea",0], ["Started but early",1], ["Running for a while",2]]}/> 
              <CustomeSelect value={profit} onChange={(e)=> setProfit(e.target.value)} name={"Monthly Profit Status"} data={[["No profit",0], ["Small/inconsistent",1], ["Steady profit",2]]}/> 
              <CustomeSelect value={count} onChange={(e)=> setCount(e.target.value)} name={"Monthly Customer Count"} data={[["0–10",0], ["10–100",1], ["100+",2]]}/> 
              <CustomeSelect value={repeat} onChange={(e)=> setRepeat(e.target.value)} name={"Repeat Customer Level"} data={[["None",0], ["Some",1], ["Regular",2]]}/> 
              <CustomeSelect value={challenge} onChange={(e)=> setChallenge(e.target.value)} name={"Current Challenge"} data={[["Getting customers",0], ["Managing operations",1], ["Marketing",2], ["Not sure",3]]}/> 
            
              <CustomeButton name={"submit"} />
          </form>
          <p className='capitalize mt-3!'>back{"  "}<Link className='underline underline-offset-2 font-medium cursor-pointer' to="/">home?</Link></p>
      </motion.div>
  </div>
  )
}
