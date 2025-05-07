import React, { useState } from 'react' 
import { motion } from 'framer-motion';
import CustomeButton from '../components/custome_button'
import CustomeInput from '../components/custome_input'
import { Link } from 'react-router-dom'; 
import { BanknoteArrowUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toaster from 'react-hot-toast';
import { salesOptimizationService } from '../services/service'; 
import AppStore from '../store/store';

export default function SalesService() {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState(0);
  const [price, setPrice] = useState(0);
  const [sales, setSales] = useState(0);
  const [days, setDays] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const { applicationId, applicantId } = AppStore();
  const [disable, setDisable] = useState(false);

  const serviceSubmit = async (e) => {    
    setDisable(true);
    e.preventDefault(); 
    try { 
      const data = {
        numberOfEmployees: employees, 
        averagePrice: price,
        expectedDailySales: sales, 
        workingDays: days, 
        estimatedRevenue: revenue
      };
      await salesOptimizationService(applicantId, applicationId, data);
      toaster.success("Service request was sent successfully");
      navigate("/payment");
    } catch (error) {
      toaster.error(`Error : ${error}`);
    }
    setDisable(false);
  };
  return (
    <div className='flex justify-center items-center flex-col w-full h-dvh mb-2'>
        <motion.div
            initial={{opacity: 0, y:20}}
            animate={{opacity: 1, y:0}}
            transition={{duration:0.5}} 
            className='flex justify-center items-center flex-col w-4/12'>
  
            <span className='m-4'>
                <BanknoteArrowUp size={55} color="#F66A35" /> 
            </span>
            <h4 className='capitalize mb-2! text-3xl font-bold font-gelasio'>Sales optimization</h4>
            <p className='text-sm mt-2! opacity-80 text-center'>Boost sales and increase revenue with data-driven business insights and smart recommendations.</p>
  
            <form onSubmit={serviceSubmit} className='w-full mt-3'> 
                <CustomeInput value={employees} onChange={(e)=> setEmployees(e.target.value)} name={"Number Of Employees"} type={"number"}/> 
                <CustomeInput value={price} onChange={(e)=> setPrice(e.target.value)} name={"Average Price"} type={"number"}/> 
                <CustomeInput value={sales} onChange={(e)=> setSales(e.target.value)} name={"Expected Daily Sales"} type={"number"}/> 
                <CustomeInput value={days} onChange={(e)=> setDays(e.target.value)} name={"Working Days"} type={"number"}/> 
                <CustomeInput value={revenue} onChange={(e)=> setRevenue(e.target.value)} name={"Estimated Revenue"} type={"number"}/> 
                
                <CustomeButton disabled={disable} name={"submit"} />
            </form>
            <p className='capitalize mt-3!'>back{"  "}<Link className='underline underline-offset-2 font-medium cursor-pointer' to="/">home?</Link></p>
        </motion.div>
    </div>
    )
  }