import React, { useState } from 'react' 
import { motion } from 'framer-motion';
import CustomeButton from '../components/custome_button' 
import CustomeTextarea from '../components/custome_textarea' 
import { Link } from 'react-router-dom'; 
import { HeartHandshake } from 'lucide-react'; 
import { useNavigate } from 'react-router-dom';
import toaster from 'react-hot-toast';
import Review from '../components/review' 
import { consultancyService } from '../services/service'; 
import AppStore from '../store/store';

export default function Consultant() {
  const { user, consultationData } = AppStore();
  const navigate = useNavigate();
  const [overview, setOverview] = useState('');
  const [industry, setIndustry] = useState('');
  const [competitor, setCompetitor] = useState('');
  const [location, setLocation] = useState('');
  const [target, setTarget] = useState('');
  const [marketing, setMarketing] = useState('');
  const [advice, setAdvice] = useState('');
  const [legal, setLegal] = useState('');
  const [growth, setGrowth] = useState('');
  const [cpf, setCpf] = useState('');
  const [summary, setSummary] = useState('');
  const [disable, setDisable] = useState(false);

  const serviceSubmit = async (e) => {   
    setDisable(true);
    e.preventDefault(); 
    try {
      const data = {
        businessOverview: overview,  
        industryAnalysis: industry, 
        competitorInsights: competitor,
        locationRecommendation: location, 
        targetAudienceDefinition: target,
        marketingSuggestions: marketing,
        operationsAdvice: advice,
        legalConsiderations: legal,
        growthStrategy: growth,
        commonPitfalls: cpf,
        summaryRecommendation: summary
      };
      
      await consultancyService({
        applicantid: consultationData.applicantId,
        applicationid: consultationData.applicationId,
        consultencyid: user._id,
        data
      });
      toaster.success("Consultation sent successfully");
      navigate("/");
    } catch (error) { 
    toaster.error(`Error : ${error}`);
    }
    setDisable(false);
  };
  return (
    <div className='flex justify-center items-center flex-col w-full'>
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
            <Review isPart={true} data={[['idea', 'bla bla'], ['stage', 'bla 1']]} />
            <form onSubmit={serviceSubmit} className='w-full flex mt-3'>   
              <div className='w-6/12 flex flex-col justify-start items-center p-6'>   
                <CustomeTextarea value={overview} onChange={(e)=> setOverview(e.target.value)} name={"Business Overview"} type={2}/> 
                <CustomeTextarea value={industry} onChange={(e)=> setIndustry(e.target.value)} name={"Industry Analysis"} type={2}/> 
                <CustomeTextarea value={competitor} onChange={(e)=> setCompetitor(e.target.value)} name={"Competitor Insights"} type={2}/> 
                <CustomeTextarea value={location} onChange={(e)=> setLocation(e.target.value)} name={"Location Recommendation"} type={2}/> 
                <CustomeTextarea value={target} onChange={(e)=> setTarget(e.target.value)} name={"Target Audience Definition"} type={2}/> 
                <CustomeTextarea value={marketing} onChange={(e)=> setMarketing(e.target.value)} name={"Marketing Suggestions"} type={2}/> 
              </div>
              <div className='w-6/12 flex flex-col justify-start items-center p-6'> 
                <CustomeTextarea value={advice} onChange={(e)=> setAdvice(e.target.value)} name={"Operations Advice"} type={2}/> 
                <CustomeTextarea value={legal} onChange={(e)=> setLegal(e.target.value)} name={"Legal Considerations"} type={2}/> 
                <CustomeTextarea value={growth} onChange={(e)=> setGrowth(e.target.value)} name={"Growth Strategy"} type={2}/> 
                <CustomeTextarea value={cpf} onChange={(e)=> setCpf(e.target.value)} name={"Common Pit falls"} type={2}/> 
                <CustomeTextarea value={summary} onChange={(e)=> setSummary(e.target.value)} name={"Summary Recommendation"} type={2}/> 
                <CustomeButton disabled={disable} styles={'mt-10'} name={"submit"} />
              </div>
            </form>
            <p className='capitalize mt-3!'>back{"  "}<Link className='underline underline-offset-2 font-medium cursor-pointer' to="/">home?</Link></p>
        </motion.div>
    </div>
    )
  }