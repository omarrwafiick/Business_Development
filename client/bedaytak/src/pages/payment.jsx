import React, { useEffect, useState } from 'react' 
import { motion } from 'framer-motion';
import CustomeButton from '../components/custome_button'  
import { Link } from 'react-router-dom'; 
import { DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toaster from 'react-hot-toast'
import AppStore from '../store/store';
import { getFinancialPlanningServiceFree, getSalesOptimizationServiceFree, getLocationMarkrtAnalysisServiceFree,
         getFinancialPlanningServicePremium, getLocationMarkrtAnalysisServicePremium, getSalesOptimizationServicePremium,
         updatePaymentStatusService        
} from '../services/service';  
import PaypalPayment from '../components/paypal';

export default function Payment() {
    const { setReviewData, applicationId, applicantId, serviceName, services } = AppStore();
    useEffect(()=>{
        let service = services.filter(x => x.name.toLowerCase().include(serviceName.substring(0,4)));
        setServiceprice(service.amount);
    }, []);
    const [disable, setDisable] = useState(false);
    const [serviceprice, setServiceprice] = useState(0);
    const [paypalPaymentStatus, setPaypalPaymentStatus] = useState(false);
    const navigate = useNavigate();
    const serviceSubmit = async (e, paymentState) => {   
      setDisable(true);
      e.preventDefault(); 
      try { 
        let response = '';
        if(paymentState){ 
          //payment gateway  
          if(paypalPaymentStatus){ 
            //update payment status
            await updatePaymentStatusService(applicationId, true);
            if(serviceName.toLowerCase().includes('financial')){
              response = await getFinancialPlanningServicePremium(applicantId, applicationId);
            } 
            else if(serviceName.toLowerCase().includes('sales')){
              response = await getSalesOptimizationServicePremium(applicantId, applicationId)
            }
            else{
              response = await getLocationMarkrtAnalysisServicePremium(applicantId, applicationId)
            }
          } 
        }
        else{
          if(serviceName.toLowerCase().includes('financial')){
            response = await getFinancialPlanningServiceFree(applicantId, applicationId);
          } 
          else if(serviceName.toLowerCase().includes('sales')){
            response = await getSalesOptimizationServiceFree(applicantId, applicationId)
          }
          else{
            response = await getLocationMarkrtAnalysisServiceFree(applicantId, applicationId)
          } 
        };

        setReviewData(response);
        toaster.success("Request was sent successfully");
        navigate("/service-result");
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
                <DollarSign size={65} color="#F66A35" /> 
            </span>
            <h4 className='capitalize mb-2! text-4xl font-bold font-gelasio'>payment</h4>
            <p className='text-md mt-4! mb-4! leading-7 opacity-80 text-center'>By pressing "Pay," you’ll unlock the full version of the service with complete, personalized recommendations. If you prefer not to pay, you can still access a limited version of the service free of charge.</p>
  
            <form className='w-full mt-3'>  
                <CustomeButton disabled={disable} onClick={(e) => serviceSubmit(e, false)} name={"free trial"} styles={'bg-primary'}/> 
                <PaypalPayment
                  onClick={() => serviceSubmit(true)}
                  price={serviceprice}
                  onSuccess={()=>setPaypalPaymentStatus(true)}
                  onCancel={()=>setPaypalPaymentStatus(false)}
                  onError={()=>setPaypalPaymentStatus(false)}
                />
            </form>
            <p className='capitalize mt-3!'>back{"  "}<Link className='underline underline-offset-2 font-medium cursor-pointer' to="/">home?</Link></p>
        </motion.div>
    </div>
    )
  }