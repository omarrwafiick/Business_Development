import React from 'react'
import { Home } from 'lucide-react';
import { motion } from 'framer-motion';
import CustomeButton from '../components/custome_button'
import CustomeInput from '../components/custome_input'
import { Link } from 'react-router-dom';
import PasswordInput from '../components/password-input'
import { useNavigate } from 'react-router-dom';
import toaster from 'react-hot-toast';

export default function Login() { 
    const navigate = useNavigate();
    const loginSubmit = async (e) => {   
    e.preventDefault(); 
    try {
    //request
    navigate("");
    toaster.success("Successfully");
    //in success get gategories and services data to store
    } catch (error) {
    toaster.error(`Error : ${error}`);
    }
    };
    return (
      <div className='flex justify-center items-center flex-col w-full h-dvh '>
          <motion.div
              initial={{opacity: 0, y:20}}
              animate={{opacity: 1, y:0}}
              transition={{duration:0.5}} 
              className='flex justify-center items-center flex-col w-4/12'>
  
              <span className='m-2'>
                  <Home size={55} color="#15A0DC" /> 
              </span>
              <h4 className='capitalize mb-2! text-3xl font-bold font-gelasio'>welcome back!</h4>
              <p className='opacity-80'>We are so happy to have you back</p>

              <form onSubmit={loginSubmit} className='w-full mt-3'> 
                  <CustomeInput name={"email"} type={"email"}/> 
                  <PasswordInput name={"password"} />
                  <div className='w-full flex justify-between mb-2'>
                    <div class="flex items-center">
                        <input id="checked-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                        <label for="checked-checkbox" class="ms-2 text-sm font-medium capitalize text-gray-900 dark:text-gray-300">remeber me?</label>
                    </div>
                    <Link className='capitalize cursor-pointer' to="/forget-password">forget password</Link>
                  </div>
                  <CustomeButton name={"login"} />
              </form>
              <p className='capitalize mt-3!'>don't have an account? <Link className='underline underline-offset-2 font-medium cursor-pointer' to="/signup">signup</Link></p>
          </motion.div>
      </div> 
    )
  }
  
