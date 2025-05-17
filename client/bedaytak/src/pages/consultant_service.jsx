import React, { useState } from 'react' 
import { motion } from 'framer-motion';
import CustomeButton from '../components/custome_button'
import CustomeInput from '../components/custome_input'
import CustomeSelect from '../components/custome-select'
import CustomeTextarea from '../components/custome_textarea' 
import { Link } from 'react-router-dom'; 
import { HeartHandshake } from 'lucide-react'; 
import { useNavigate } from 'react-router-dom';
import toaster from 'react-hot-toast';
import { seedConsultantService } from '../services/service'; 
import AppStore from '../store/store';

export default function ConsultantService() {
  const { consultandId, applicationId, applicantId } = AppStore();
  const [budget, SetBudget] = useState(0);
  const [stage, SetStage] = useState('');
  const [target, SetTarget] = useState('');
  const [idea, SetIdea] = useState('');
  const [goal, SetGoal] = useState('');
  const navigate = useNavigate();
  const [disable, setDisable] = useState(false);

  const serviceSubmit = async (e) => { 
    setDisable(true);  
    e.preventDefault(); 
    try {
      const data = {
        consultandId,
        businessIdea: idea,
        stageOfBusiness: stage, 
        targetMarket: target,
        monthlyBudget: budget,
        mainGoal: goal
      }; 
      const response = await seedConsultantService(applicantId, applicationId, data);
      if(!response.ok()){
          throw new Error(`Request failed with status ${response.status}`);
      }
      navigate("/");
      toaster.success("Consultation data was sent successfully, wait for consultant response via your email address");
    } catch (error) {
    toaster.error(`Error : ${error}`);
    }
    setDisable(false);
  }; 
  
  const Stage1 = "Just an idea";
  const Stage2 = "Started but early";
  const Stage3 = "Running for a while";
  const target1 = "Local customers";
  const target2 = "Online shoppers";
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
                <CustomeInput value={budget} onChange={(e) => SetBudget(e.target.value)} name={"Monthly Budget"} type={"number"}/> 
                <CustomeSelect value={stage} onChange={(e) => SetStage(e.target.value)} name={"Stage Of Business"} data={[[Stage1,Stage1], [Stage2,Stage2], [Stage3,Stage3]]}/> 
                <CustomeSelect value={target} onChange={(e) => SetTarget(e.target.value)} name={"Target Market"} data={[[target1,target1], [target2,target2], [target3,target3], [target4,target4], [target5,target5]]}/>  
                <CustomeTextarea value={idea} onChange={(e) => SetIdea(e.target.value)} name={"Business Idea"} rowNum={3}/> 
                <CustomeTextarea value={goal} onChange={(e) => SetGoal(e.target.value)} name={"Main Goal"} rowNum={6}/> 

                <CustomeButton disabled={disable} name={"submit"} />
            </form>
            <p className='capitalize mt-3!'>back{"  "}<Link className='underline underline-offset-2 font-medium cursor-pointer' to="/">home?</Link></p>
        </motion.div>
    </div>
    )
  }