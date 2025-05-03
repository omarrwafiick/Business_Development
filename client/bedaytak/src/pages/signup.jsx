import React from 'react'
import { PackagePlus } from 'lucide-react';
import { motion } from 'framer-motion';
import CustomeButton from '../components/custome_button'
import CustomeInput from '../components/custome_input'
import PasswordInput from '../components/password-input'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import toaster from 'react-hot-toast'

export default function Signup() {
  const navigate = useNavigate();
  const signupSubmit = async (e) => {
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
    <div  className='flex justify-center items-center flex-col w-full h-dvh font-gelasio mt-12 mb-12'>
        <motion.div
            initial={{opacity: 0, y:20}}
            animate={{opacity: 1, y:0}}
            transition={{duration:0.5}} 
            className='flex justify-center items-center flex-col w-4/12'>

            <span className='m-2'>
                <PackagePlus size={55} color="#15A0DC" /> 
            </span>
            <h4 className='capitalize mb-2! text-2xl font-bold'>welcome to bedaytak inc.</h4>
            <p className='opacity-80'>Already have an account?{" "}<Link className='underline underline-offset-2 font-medium cursor-pointer' to="/login">login</Link></p>

            <form onSubmit={signupSubmit} className='w-full mt-3'>
                <CustomeInput name={"fullname"} type={"text"}/>
                <CustomeInput name={"email"} type={"email"}/>
                <CustomeInput name={"phone"} type={"text"}/> 
                <PasswordInput name={"password"} />
                <PasswordInput name={"confirm password"} />
                <div className='w-full flex pt-2 pb-3'> 
                  <div class="flex items-center me-6">
                      <input id="default-radio-1" type="radio" value="" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                      <label htmlFor="default-radio-1" className="ms-2 text-md font-medium text-gray-900 dark:text-gray-300 capitalize">entrepreneur</label>
                  </div>
                  <div class="flex items-center">
                      <input id="default-radio-2" type="radio" value="" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                      <label htmlFor="default-radio-2" className="ms-2 text-md font-medium text-gray-900 dark:text-gray-300 capitalize">business owner</label>
                  </div>  
                </div>
                <CustomeButton name={"signup"} />
            </form>
            <p className='opacity-80 text-center text-sm w-6/12 leading-6 mt-3!'>By clicking continue, you agree to our Terms of Service and Privacy Policy.</p>
        </motion.div>
    </div>
    
  )
}
