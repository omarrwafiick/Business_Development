import React, { useState } from 'react' 
import { motion } from 'framer-motion';
import CustomeButton from '../components/custome_button'
import CustomeInput from '../components/custome_input'
import { Link } from 'react-router-dom'; 
import { CircleDollarSign } from 'lucide-react'; 
import { useNavigate } from 'react-router-dom';
import toaster from 'react-hot-toast';
import { financialPlanningService } from '../services/service'; 
import AppStore from '../store/store';

export default function FeasibilityService() {
  const [revenue, setRevenue] = useState(0);
  const [mCost, setMCost] = useState(0);
  const [sCost, setSCost] = useState(0);
  const navigate = useNavigate();
  const { applicationId, applicantId } = AppStore();
  const serviceSubmit = async (e) => {   
    e.preventDefault(); 
    try { 
      const data = {
        monthlyRevenue: revenue, 
        monthlyCosts: mCost, 
        startupCost: sCost
      };
      await financialPlanningService(applicantId, applicationId, data);
      toaster.success("Service request was sent successfully");
      navigate("/payment"); 
    } catch (error) {
    toaster.error(`Error : ${error}`);
    }
  };
  return (
    <div className='flex justify-center items-center flex-col w-full h-dvh mb-2'>
        <motion.div
            initial={{opacity: 0, y:20}}
            animate={{opacity: 1, y:0}}
            transition={{duration:0.5}} 
            className='flex justify-center items-center flex-col w-4/12'>
  
            <span className='m-4'>
                <CircleDollarSign size={55} color="#F66A35" /> 
            </span>
            <h4 className='capitalize mb-2! text-3xl font-bold font-gelasio'>Financial Planning</h4>
            <p className='text-sm mt-2! opacity-80 text-center'>Plan smarter with budgeting tools and financial strategies tailored to your business goals.</p>
  
            <form onSubmit={serviceSubmit} className='w-full mt-3'> 
                <CustomeInput value={revenue} onChange={(e)=> { setRevenue(e.target.value)}} name={"Monthly Revenue"} type={"number"}/> 
                <CustomeInput value={mCost} onChange={(e)=> { setMCost(e.target.value)}} name={"Monthly Costs"} type={"number"}/> 
                <CustomeInput value={sCost} onChange={(e)=> { setSCost(e.target.value)}} name={"Startup Cost"} type={"number"}/>  
                <CustomeButton name={"submit"} />
            </form>
            <p className='capitalize mt-3!'>back{"  "}<Link className='underline underline-offset-2 font-medium cursor-pointer' to="/">home?</Link></p>
        </motion.div>
    </div>
    )
  }