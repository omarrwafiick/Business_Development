import React, { useRef, useState } from 'react'
import { Key } from 'lucide-react';
import { motion } from 'framer-motion';
import CustomeButton from '../components/custome_button';
import PasswordInput from '../components/password-input';
import { useNavigate, useParams } from 'react-router-dom';
import toaster from 'react-hot-toast';
import { resetPassword } from '../services/auth-service';
import {passwordRegex} from '../utils/main';

export default function ResetPassword() {
  const form = useRef(); 
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [disable, setDisable] = useState(false);
  const resetPasswordSubmit = async (e) => {
    setDisable(true);
    e.preventDefault();  
    try {
      if(password!==confirmPassword || !passwordRegex.test(password)){
        toaster.error("Passwords doesn't match or not strong");
        return;
      }
      await resetPassword({password, token});
      toaster.success("Password was reseted successfully");
      navigate("/login");
    } catch (error) {
      toaster.error(`Error : ${error}`);
      form.current.reset();
    }
    setDisable(false);
  };
  return (
    <div className='flex justify-center items-center flex-col w-full h-dvh font-gelasio'>
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

            <form ref={form} onSubmit={resetPasswordSubmit} className='w-full mt-3'>
                <PasswordInput value={password} onClick={(e)=> setPassword(e.target.value)} name={"password"} />
                <PasswordInput value={confirmPassword} onClick={(e)=> setConfirmPassword(e.target.value)} name={"confirm password"} />
                <CustomeButton disabled={disable} name={"submit"} />
            </form>
        </motion.div>
    </div>
    
  )
}
