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
      <div className="bg-white rounded-xl shadow-md p-6 max-w-md mx-auto mt-6 cursor-pointer group transition-all duration-300 hover:shadow-lg">
 
        <div className="w-full h-2 rounded-full mb-4 bg-gradient-to-r from-primary/80 to-primary" />
 
        <div className="space-y-4 text-sm text-gray-700">
          <div>
            <span className="font-semibold text-lg">Business Idea:</span>
            <p className="mt-2!">{data.businessIdea}</p>
          </div>

          <div>
            <span className="font-semibold text-lg">Stage of Business:</span>
            <p className="mt-2!">{data.stageOfBusiness}</p>
          </div>
        </div>
 
        <form onSubmit={submit} className="mt-4">
          <CustomeButton
            onClick={() => onClick(data)}
            disabled={disable}
            name="Respond"
            styles="bg-primary text-white w-full rounded-lg py-2!"
          />
        </form>
      </div>

  )
}
