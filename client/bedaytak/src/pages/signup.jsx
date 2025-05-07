import React, { useRef, useState } from 'react'
import { PackagePlus } from 'lucide-react';
import { motion } from 'framer-motion';
import CustomeButton from '../components/custome_button'
import CustomeInput from '../components/custome_input'
import PasswordInput from '../components/password-input'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import toaster from 'react-hot-toast'
import { register } from '../services/auth-service';
import AppStore from '../store/store';
import { passwordRegex } from '../utils/main';

export default function Signup() {   
  const form = useRef();  
  const [email, SetEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState(''); 
  const [fullname, setFullname] = useState('');
  const [role, setRole] = useState(''); 
  const setUser = AppStore.getState().setUser;
  const navigate = useNavigate();
  const [disable, setDisable] = useState(false);

  const signupSubmit = async (e) => {
    setDisable(true);
    e.preventDefault();  
    try {
      if(password!==confirmPassword || !passwordRegex.test(password)){
        toaster.error("Passwords doesn't match or not strong");
        return;
      }
      const response = await register({
        fullName: fullname, 
        email, 
        password, 
        phoneNumber: phone, 
        role});
      setUser(response.user);
      toaster.success("Signed up successfully");
      if(role === 'BusinessOwner'){  
        navigate("/business");
      }
      navigate("/login");
    } catch (error) {
      toaster.error(`Error : ${error}`);
      form.current.reset();
    }
    setDisable(false);
  };
  return (
    <div className='flex justify-center items-center flex-col w-full h-dvh font-gelasio mt-12 mb-12'>
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

            <form ref={form} onSubmit={signupSubmit} className='w-full mt-3'>
                <CustomeInput value={fullname} onChange={(e)=> setFullname(e.target.value)} name={"fullname"} type={"text"}/>
                <CustomeInput value={email} onChange={(e)=> SetEmail(e.target.value)} name={"email"} type={"email"}/>
                <CustomeInput value={phone} onChange={(e)=> setPhone(e.target.value)} name={"phone"} type={"text"}/> 
                <PasswordInput value={password} onChange={(e)=> setPassword(e.target.value)} name={"password"} />
                <PasswordInput value={confirmPassword} onChange={(e)=> setConfirmPassword(e.target.value)} name={"confirm password"} />
                <div className='w-full flex pt-2 pb-3'> 
                  <div class="flex items-center me-6">
                      <input 
                      id="default-radio-1" 
                      type="radio" 
                      name="default-radio1" 
                      value="Entrepreneur" 
                      checked={role === 'Entrepreneur'}
                      onChange={(e) => setRole(e.target.value)}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                      <label htmlFor="default-radio-1" className="ms-2 text-md font-medium text-gray-900 dark:text-gray-300 capitalize">entrepreneur</label>
                  </div>
                  <div class="flex items-center">
                      <input 
                      id="default-radio-2" 
                      type="radio" 
                      value="BusinessOwner"
                      name="default-radio2"
                      checked={role === 'BusinessOwner'}
                      onChange={(e) => setRole(e.target.value)} 
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                      <label htmlFor="default-radio-2" className="ms-2 text-md font-medium text-gray-900 dark:text-gray-300 capitalize">business owner</label>
                  </div>  
                </div>
                <CustomeButton disabled={disable} name={"signup"} />
            </form>
            <p className='opacity-80 text-center text-sm w-6/12 leading-6 mt-3!'>By clicking continue, you agree to our Terms of Service and Privacy Policy.</p>
        </motion.div>
    </div>
    
  )
}
