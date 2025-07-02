import React, { useState } from 'react' 
import { motion } from 'framer-motion';
import CustomeButton from '../components/custome_button'  
import { Link } from 'react-router-dom'; 
import { ClipboardList } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toaster from 'react-hot-toast'; 
import AppStore from '../store/store';
import { addApplicationForService } from '../services/application'; 

export default function Application() {
  const { serviceName, services, applicationId } = AppStore();
  const serviceRoutes = [
    ['Financial Planning','/feasibility-service'],
    ['Sales and revenue optimization', '/sales-service'],
    ['Consultation', '/consultant-select'],
    ['Location and markrt analysis', '/location-service'],
    ['Integrated Report', '/report'],
   
  ]
  const navigate = useNavigate();
  const [disable, setDisable] = useState(false);
  const serviceSubmit = async (e) => {   
    setDisable(true);
    e.preventDefault(); 
    try { 
      let serviceId = services.filter(x => x.name.toLocaleLowerCase() === serviceName.toLocaleLowerCase())._id;
      const response = await addApplicationForService(applicationId,
        {
          serviceId,
          status:'Approved',
          paymentStatus: false,
        }
      );
      if(!response.ok()){
          throw new Error(`Request failed with status ${response.status}`);
      }
      let route = serviceRoutes.filter(x => x[0].toLocaleLowerCase() === serviceName.toLocaleLowerCase());
      navigate(route[1]);
      toaster.success("application was sent successfully");
    } catch (error) {
    toaster.error(`Error : ${error}`);
    }
    setDisable(false);
  };
  
  return (
    <div className='flex justify-center items-center flex-col w-full h-dvh'>
        <motion.div
            initial={{opacity: 0, y:20}}
            animate={{opacity: 1, y:0}}
            transition={{duration:0.5}} 
            className='flex justify-center items-center flex-col w-4/12'>
  
            <span className='m-4'>
                <ClipboardList size={65} color="#F66A35" /> 
            </span>
            <h4 className='capitalize mb-2! text-4xl font-bold font-gelasio'>submit application</h4>
            <p className='text-md mt-4! mb-4! leading-7 opacity-80 text-center'>Submit your service application to receive tailored recommendations based on the service you selected. Our system analyzes your input and provides expert insights specific to your business needs, ensuring personalized and actionable results.</p>
  
            <form onSubmit={serviceSubmit} className='w-full mt-3'>  
                <CustomeButton disabled={disable} name={"submit"} />
            </form>
            <p className='capitalize mt-3!'>back{"  "}<Link className='underline underline-offset-2 font-medium cursor-pointer' to="/">home?</Link></p>
        </motion.div>
    </div>
    )
  }