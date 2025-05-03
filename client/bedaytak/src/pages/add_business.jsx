import React, { useEffect } from 'react' 
import { LucideBriefcaseBusiness } from 'lucide-react';
import { motion } from 'framer-motion';
import CustomeButton from '../components/custome_button'
import CustomeInput from '../components/custome_input'
import CustomeTextarea from '../components/custome_textarea'
import CustomeSelect from '../components/custome-select'
import { useNavigate } from 'react-router-dom';
import toaster from 'react-hot-toast';

export default function AddBusiness() { 
    const navigate = useNavigate();
    const businessSubmit = async (e) => {   
        e.preventDefault(); 
        try {
        //request
        navigate("");
        toaster.success("Successfully");
        } catch (error) {
        toaster.error(`Error : ${error}`);
        }
      };
    useEffect(()=>{
        //get categories and locations
    },[]) 
    return (
      <div  className='flex justify-center items-center flex-col w-full h-dvh font-gelasio'>
          <motion.div
              initial={{opacity: 0, y:20}}
              animate={{opacity: 1, y:0}}
              transition={{duration:0.5}} 
              className='flex justify-center items-center flex-col w-4/12'>
  
              <span className='m-2'>
                  <LucideBriefcaseBusiness size={55} color="#15A0DC" />  
              </span>
              <h4 className='capitalize mb-2! text-2xl font-bold'>add your business.</h4>
              <p className='opacity-80'>Getting to know your value better</p>
  
              <form onSubmit={businessSubmit} className='w-full mt-3'>
                  <CustomeInput name={"name"} type={"text"}/>
                  <CustomeTextarea rowNum={3} name={"description"} placeHolder={"What is your business about..."}/>
                  <CustomeSelect name={"category"} data={[["option1",0],["option12",1]]}/>
                  <CustomeSelect name={"location"} data={[["option1",0],["option12",1]]}/>
                  <CustomeButton name={"submit"} />
              </form>
          </motion.div>
      </div>
      
    )
  }