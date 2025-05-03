import React from 'react' 
import { motion } from 'framer-motion';
import CustomeButton from '../components/custome_button'
import CustomeInput from '../components/custome_input'
import { Link } from 'react-router-dom'; 
import { BanknoteArrowUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toaster from 'react-hot-toast';

export default function SalesService() {
  const navigate = useNavigate();
  const serviceSubmit = async (e) => {   
    e.preventDefault(); 
    try {
    //request
    navigate("");
    toaster.success("Successfully");
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
                <BanknoteArrowUp size={55} color="#F66A35" /> 
            </span>
            <h4 className='capitalize mb-2! text-3xl font-bold font-gelasio'>Sales optimization</h4>
            <p className='text-sm mt-2! opacity-80 text-center'>Boost sales and increase revenue with data-driven business insights and smart recommendations.</p>
  
            <form onSubmit={serviceSubmit} className='w-full mt-3'> 
                <CustomeInput name={"Number Of Employees"} type={"number"}/> 
                <CustomeInput name={"Average Price"} type={"number"}/> 
                <CustomeInput name={"Expected Daily Sales"} type={"number"}/> 
                <CustomeInput name={"Working Days"} type={"number"}/> 
                <CustomeInput name={"Estimated Revenue"} type={"number"}/> 
                <CustomeButton name={"submit"} />
            </form>
            <p className='capitalize mt-3!'>back{"  "}<Link className='underline underline-offset-2 font-medium cursor-pointer' to="/">home?</Link></p>
        </motion.div>
    </div>
    )
  }