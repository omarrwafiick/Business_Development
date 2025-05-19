import React, { useState } from 'react';
import CustomeButton from '../components/custome_button'
import { useNavigate } from 'react-router-dom';
import toaster from 'react-hot-toast';
import AppStore from '../store/store';

export default function SeededApplication({ data, onClick }) {
  const navigate = useNavigate(); 
  const { setConsultationData } = AppStore();
  const [disable, setDisable] = useState(false);
  
  const submit = async (e) => {  
        e.preventDefault();   
        setDisable(true);
        try { 
          setConsultationData(data);
          navigate("/consultant"); 
        } catch (error) {
        toaster.error(`Error : ${error}`);
        }
        setDisable(false);
  };

  return (
  <div className="group flex flex-col items-center border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition duration-300 cursor-pointer max-w-md mx-auto">
       
      <div className="w-full h-20 bg-primary transition-all duration-300 group-hover:brightness-105" />
 
      <div className="flex flex-col items-start w-full p-6 space-y-4">
        <div className="text-lg text-gray-800 flex flex-col">
          <span className="font-semibold">Business Idea:</span>
          <a>{data.businessIdea}</a>
        </div>

        <div className="text-lg text-gray-700 flex flex-col ">
          <span className="font-bold">Business Stage:</span> 
          <a>{data.stageOfBusiness}</a>
        </div>

        <form onSubmit={submit} className="w-full">
          <CustomeButton onClick={()=> onClick(data)} disabled={disable} name="Respond" styles="bg-primary w-full rounded-lg" />
        </form>
      </div>
    </div>
  )
}
