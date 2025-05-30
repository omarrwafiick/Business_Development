import React, { useRef, useState } from 'react'
import { Home } from 'lucide-react';
import { motion } from 'framer-motion';
import CustomeButton from '../components/custome_button'
import CustomeInput from '../components/custome_input'
import { Link } from 'react-router-dom';
import PasswordInput from '../components/password-input'
import { useNavigate } from 'react-router-dom';
import toaster from 'react-hot-toast';
import { login } from '../services/auth-service';
import { getAllCategories } from '../services/business' ;
import { getAllServices } from '../services/service' ;
import AppStore from '../store/store';

export default function Login() { 
    const form = useRef(); 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const setCategories = AppStore.getState().setCategories;
    const setServices = AppStore.getState().setServices;
    const setUser= AppStore.getState().setUser;
    const setToken = AppStore.getState().setToken;
    const [disable, setDisable] = useState(false);
    const navigate = useNavigate();
    const loginSubmit = async (e) => {  
        setDisable(true); 
        e.preventDefault();  
        try { 
            const response = await login({email, password});
            if(!response.ok()){
                throw new Error(`Request failed with status ${response.status}`);
            }
            const categories = await getAllCategories();
            const service = await getAllServices();
            setUser(response.user);
            setToken(response.token);
            setCategories(categories);
            setServices(service);
            navigate("/");
            await toaster.success("Logged in successfully");
            } 
        catch (error) {
            toaster.error(`Error : ${error.message}`);
            form.current.reset();
        }
        setDisable(false);
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

              <form ref={form} onSubmit={loginSubmit} className='w-full mt-3'> 
                  <CustomeInput value={email} onChange={ (e) => setEmail(e.target.value) } name={"email"} type={"email"}/> 
                  <PasswordInput value={password} onChange={ (e) => setPassword(e.target.value) } name={"password"} />
                  <div className='w-full flex justify-between mb-2'> 
                    <Link className='capitalize cursor-pointer' to="/forget-password">forget password</Link>
                  </div>
                  <CustomeButton disabled={disable} name={"login"} />
              </form>
              <p className='capitalize mt-3!'>don't have an account? <Link className='underline underline-offset-2 font-medium cursor-pointer' to="/signup">signup</Link></p>
          </motion.div>
      </div> 
    )
  }
  
