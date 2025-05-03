import React from 'react'
import { Key } from 'lucide-react';
import { motion } from 'framer-motion';
import CustomeButton from '../components/custome_button';
import PasswordInput from '../components/password-input';
import { useNavigate } from 'react-router-dom';
import toaster from 'react-hot-toast';


export default function ResetPassword() {
  const navigate = useNavigate();
  const resetPasswordSubmit = async (e) => {
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
    <div  className='flex justify-center items-center flex-col w-full h-dvh font-gelasio'>
        <motion.div
            initial={{opacity: 0, y:20}}
            animate={{opacity: 1, y:0}}
            transition={{duration:0.5}} 
            className='flex justify-center items-center flex-col w-4/12'>

            <span className='m-2'>
                <Key size={55} color="#15A0DC" /> 
            </span>
            <h4 className='capitalize mb-2! text-2xl font-bold'>reset password</h4>
            <p className='opacity-80'>Please enter your new password</p>

            <form onSubmit={resetPasswordSubmit} className='w-full mt-3'>
                <PasswordInput name={"password"} />
                <PasswordInput name={"confirm password"} />
                <CustomeButton name={"submit"} />
            </form>
        </motion.div>
    </div>
    
  )
}
