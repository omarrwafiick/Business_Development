import React from 'react' 
import { motion } from 'framer-motion';
import CustomeButton from '../components/custome_button'  
import { Link } from 'react-router-dom'; 
import { DollarSign } from 'lucide-react';
 
export default function Payment() {
  const serviceSubmit = () => { 
  };
  return (
    <div className='flex justify-center items-center flex-col w-full h-dvh'>
        <motion.div
            initial={{opacity: 0, y:20}}
            animate={{opacity: 1, y:0}}
            transition={{duration:0.5}} 
            className='flex justify-center items-center flex-col w-4/12'>
  
            <span className='m-4'>
                <DollarSign size={65} color="#F66A35" /> 
            </span>
            <h4 className='capitalize mb-2! text-4xl font-bold font-gelasio'>payment</h4>
            <p className='text-md mt-4! mb-4! leading-7 opacity-80 text-center'>By pressing "Pay," you’ll unlock the full version of the service with complete, personalized recommendations. If you prefer not to pay, you can still access a limited version of the service free of charge.</p>
  
            <form onSubmit={serviceSubmit} className='w-full mt-3'>  
                <CustomeButton name={"pay"} styles={'bg-primary'}/>
                <CustomeButton name={"free trial"} styles={'bg-secondary'} />
            </form>
            <p className='capitalize mt-3!'>back{"  "}<Link className='underline underline-offset-2 font-medium cursor-pointer' to="/">home?</Link></p>
        </motion.div>
    </div>
    )
  }