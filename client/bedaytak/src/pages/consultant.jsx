import React from 'react' 
import { motion } from 'framer-motion';
import CustomeButton from '../components/custome_button' 
import CustomeTextarea from '../components/custome_textarea' 
import { Link } from 'react-router-dom'; 
import { HeartHandshake } from 'lucide-react'; 

export default function Consultant() {
  const serviceSubmit = () => { 
  }; 
  return (
    <div className='flex justify-center items-center flex-col w-full h-dvh mt-24'>
        <motion.div
            initial={{opacity: 0, y:20}}
            animate={{opacity: 1, y:0}}
            transition={{duration:0.5}} 
            className='flex justify-center items-center flex-col w-10/12'>
  
            <span className='m-4'>
                <HeartHandshake size={55} color="#F66A35" /> 
            </span>
            <h4 className='capitalize mb-2! text-3xl font-bold font-gelasio'>Consultation</h4>
            <p className='text-sm mt-2! opacity-80 text-center'>Consulting with business experts offers valuable insights to improve decision-making, optimize strategies, and address challenges for business growth.</p>
  
            <form onSubmit={serviceSubmit} className='w-full flex mt-3'>   
              <div className='w-6/12 flex flex-col justify-start items-center p-6'>   
                <CustomeTextarea name={"Business Overview"} type={2}/> 
                <CustomeTextarea name={"Industry Analysis"} type={2}/> 
                <CustomeTextarea name={"Competitor Insights"} type={2}/> 
                <CustomeTextarea name={"Location Recommendation"} type={2}/> 
                <CustomeTextarea name={"Target Audience Definition"} type={2}/> 
                <CustomeTextarea name={"Marketing Suggestions"} type={2}/> 
              </div>
              <div className='w-6/12 flex flex-col justify-start items-center p-6'> 
                <CustomeTextarea name={"Operations Advice"} type={2}/> 
                <CustomeTextarea name={"Legal Considerations"} type={2}/> 
                <CustomeTextarea name={"Growth Strategy"} type={2}/> 
                <CustomeTextarea name={"Common Pit falls"} type={2}/> 
                <CustomeTextarea name={"Summary Recommendation"} type={2}/> 
                <CustomeButton styles={'mt-10'} name={"submit"} />
              </div>
            </form>
            <p className='capitalize mt-3!'>back{"  "}<Link className='underline underline-offset-2 font-medium cursor-pointer' to="/">home?</Link></p>
        </motion.div>
    </div>
    )
  }