import React from 'react'
import { PackagePlus } from 'lucide-react';
import { motion } from 'framer-motion';
import CustomeButton from '../components/custome_button'
import CustomeInput from '../components/custome_input'
import PasswordInput from '../components/password-input'
import { Link } from 'react-router-dom';

export default function Signup() {
  const signupSubmit = () => {

  };
  return (
    <div  className='flex justify-center items-center flex-col w-full h-dvh font-gelasio'>
        <motion.div
            initial={{opacity: 0, y:20}}
            animate={{opacity: 1, y:0}}
            transition={{duration:0.5}} 
            className='flex justify-center items-center flex-col w-4/12'>

            <span className='m-2'>
                <PackagePlus size={55} color="#15A0DC" /> 
            </span>
            <h4 className='capitalize mb-2! text-2xl font-bold'>welcome to bedaytak inc.</h4>
            <p className='opacity-80'>Already have an account?{" "}<Link className='underline underline-offset-2 font-medium cursor-pointer' to="/">login</Link></p>

            <form onSubmit={signupSubmit} className='w-full mt-3'>
                <CustomeInput name={"fullname"} type={"text"}/>
                <CustomeInput name={"email"} type={"email"}/>
                <CustomeInput name={"phone"} type={"text"}/> 
                <PasswordInput name={"password"} />
                <PasswordInput name={"confirm password"} /> 
                <CustomeButton name={"signup"} />
            </form>
            <p className='opacity-80 text-center text-sm w-6/12 leading-6 mt-3!'>By clicking continue, you agree to our Terms of Service and Privacy Policy.</p>
        </motion.div>
    </div>
    
  )
}
