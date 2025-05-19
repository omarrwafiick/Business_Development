import React, { useRef, useState } from 'react'
import { Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import CustomeButton from '../components/custome_button';
import CustomeInput from '../components/custome_input';
import { useNavigate } from 'react-router-dom';
import toaster from 'react-hot-toast';
import { forgetPassword } from '../services/auth-service';

export default function ForgetPassword() {  
  const form = useRef(); 
  const [email, SetEmail] = useState('');
  const navigate = useNavigate();
  const [disable, setDisable] = useState(false);

  const forgetPasswordSubmit = async (e) => {   
    setDisable(true);
    e.preventDefault(); 
    try { 
    const response = await forgetPassword({email});
    if(!response.ok()){
       throw new Error(`Request failed with status ${response.status}`);
    }
    toaster.success("Request sent successfully");
    navigate("/reset-password"); 
    } catch (error) {
      toaster.error(`Error : ${error}`);
      form.current.reset();
    }
    setDisable(false);
  };
  
  return (
    <div  className='flex justify-center items-center flex-col w-full h-dvh font-gelasio'>
        <motion.div
            initial={{opacity: 0, y:20}}
            animate={{opacity: 1, y:0}}
            transition={{duration:0.5}} 
            className='flex justify-center items-center flex-col w-4/12'> 
            <span className='m-2'>
                <Mail size={55} color="#15A0DC" /> 
            </span>
            <h4 className='capitalize mb-2! text-2xl font-bold'>forget your password</h4>
            <p className='opacity-80'>No worries just put your email right here</p>

            <form ref={form} onSubmit={forgetPasswordSubmit} className='w-full mt-3'>
                <CustomeInput value={email} onClick={(e)=> SetEmail(e.target.value)} name={"email"} type={"email"}/>
                <CustomeButton disabled={disable} name={"submit"} />
            </form>
        </motion.div>
    </div>
    
  )
}
