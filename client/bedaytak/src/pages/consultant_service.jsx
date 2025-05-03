import React from 'react' 
import { motion } from 'framer-motion';
import CustomeButton from '../components/custome_button'
import CustomeInput from '../components/custome_input'
import CustomeSelect from '../components/custome-select'
import CustomeTextarea from '../components/custome_textarea' 
import { Link } from 'react-router-dom'; 
import { HeartHandshake } from 'lucide-react'; 
import { useNavigate } from 'react-router-dom';
import toaster from 'react-hot-toast';

export default function ConsultantService() {
  const navigate = useNavigate();
  const serviceSubmit = async (e) => {   
    e.preventDefault(); 
    try {
    //request
    navigate("");
    toaster.success("Successfully");
    } catch (error) {
    toaster.error(`Error : ${error}`);
    }
  };
  const Stage1 = "Just an idea";
  const Stage2 = "Started but early";
  const Stage3 = "Running for a while";
  const target1 = "Local customers";
  const target2 =  "Online shoppers";
  const target3 = "Niche audience";
  const target4 = "General public";
  const target5 = "B2B clients";
  return (
    <div className='flex justify-center items-center flex-col w-full h-dvh mt-12 mb-12'>
        <motion.div
            initial={{opacity: 0, y:20}}
            animate={{opacity: 1, y:0}}
            transition={{duration:0.5}} 
            className='flex justify-center items-center flex-col w-4/12'>
  
            <span className='m-4'>
                <HeartHandshake size={55} color="#F66A35" /> 
            </span>
            <h4 className='capitalize mb-2! text-3xl font-bold font-gelasio'>Consultation</h4>
            <p className='text-sm mt-2! opacity-80 text-center'>Consulting with business experts offers valuable insights to improve decision-making, optimize strategies, and address challenges for business growth.</p>
  
            <form onSubmit={serviceSubmit} className='w-full mt-3'>  
                <CustomeInput name={"Monthly Budget"} type={"number"}/> 
                <CustomeSelect name={"Stage Of Business"} data={[[Stage1,Stage1], [Stage2,Stage2], [Stage3,Stage3]]}/> 
                <CustomeSelect name={"Target Market"} data={[[target1,target1], [target2,target2], [target3,target3], [target4,target4], [target5,target5]]}/>  
                <CustomeTextarea name={"Business Idea"} rowNum={3}/> 
                <CustomeTextarea name={"Main Goal"} type={6}/> 

                <CustomeButton name={"submit"} />
            </form>
            <p className='capitalize mt-3!'>back{"  "}<Link className='underline underline-offset-2 font-medium cursor-pointer' to="/">home?</Link></p>
        </motion.div>
    </div>
    )
  }