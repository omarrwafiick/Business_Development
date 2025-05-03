import React from 'react' 
import { motion } from 'framer-motion';
import CustomeButton from '../components/custome_button'  
import { Link } from 'react-router-dom'; 
import { ClipboardList } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toaster from 'react-hot-toast';

export default function Application() {
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
    <div className='flex justify-center items-center flex-col w-full h-dvh'>
        <motion.div
            initial={{opacity: 0, y:20}}
            animate={{opacity: 1, y:0}}
            transition={{duration:0.5}} 
            className='flex justify-center items-center flex-col w-4/12'>
  
            <span className='m-4'>
                <ClipboardList size={65} color="#F66A35" /> 
            </span>
            <h4 className='capitalize mb-2! text-4xl font-bold font-gelasio'>submit application</h4>
            <p className='text-md mt-4! mb-4! leading-7 opacity-80 text-center'>Submit your service application to receive tailored recommendations based on the service you selected. Our system analyzes your input and provides expert insights specific to your business needs, ensuring personalized and actionable results.</p>
  
            <form onSubmit={serviceSubmit} className='w-full mt-3'>  
                <CustomeButton name={"submit"} />
            </form>
            <p className='capitalize mt-3!'>back{"  "}<Link className='underline underline-offset-2 font-medium cursor-pointer' to="/">home?</Link></p>
        </motion.div>
    </div>
    )
  }