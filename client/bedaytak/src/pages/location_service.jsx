import React from 'react' 
import { motion } from 'framer-motion';
import CustomeButton from '../components/custome_button' 
import { Link } from 'react-router-dom'; 
import { LocationEditIcon } from 'lucide-react';

export default function LocationService() {
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
                <LocationEditIcon size={55} color="#F66A35" /> 
            </span>
            <h4 className='capitalize mb-2! text-3xl font-bold font-gelasio'>location analysis</h4>
            <p className='text-sm mt-2! opacity-80 text-center'>Find the best business location with market analysis that evaluates data to recommend high-potential areas.</p>
  
            <form onSubmit={serviceSubmit} className='w-full mt-3'>  
                <CustomeButton name={"submit"} />
            </form>
            <p className='capitalize mt-3!'>back{"  "}<Link className='underline underline-offset-2 font-medium cursor-pointer' to="/">home?</Link></p>
        </motion.div>
    </div>
    )
  }