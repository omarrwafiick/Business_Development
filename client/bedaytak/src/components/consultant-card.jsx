import React from 'react'
import CustomeButton from '../components/custome_button'
import { useNavigate } from 'react-router-dom';
import toaster from 'react-hot-toast'; 
import AppStore from '../store/store'; 

export default function ConsultantCard({id, name, experienceYears, qualifications}) {
   const setConsultant = AppStore.getState().setConsultandId;
   const navigate = useNavigate(); 

   const serviceSubmit = () => { 
        e.preventDefault(); 
        try { 
        setConsultant(id);
        navigate("/consultant-applications");  
        } catch (error) { 
        toaster.error(`Error : ${error}`); 
        }
    };

    const experienceColor =
            experienceYears < 2
            ? 'from-red-400 to-red-500'
            : experienceYears < 5
            ? 'from-yellow-400 to-yellow-500'
            : 'from-green-400 to-green-500';

    return (
    <div className="bg-white rounded-xl shadow-md p-6 max-w-md mx-auto mt-6 w-full"> 

      <div className={`w-full h-2 rounded-full mb-4 bg-gradient-to-r ${experienceColor}`} />
 
      <div className="space-y-4 text-sm text-gray-700">
        <div>
          <span className="font-semibold">Name:</span>
          <p className="mt-1">{name}</p>
        </div>

        <div>
          <span className="font-semibold">Experience:</span>
          <p className="mt-1">{experienceYears} years</p>
        </div>

        <div>
          <span className="font-semibold">Qualifications:</span>
          <ul className="flex flex-wrap gap-2 mt-2">
            {qualifications?.map((q, index) => (
              <li
                key={index}
                className="capitalize text-xs bg-secondary text-white px-3 py-1 rounded-full shadow-sm"
              >
                {q.title}
              </li>
            ))}
          </ul>
        </div>
      </div>
 
      <form onSubmit={serviceSubmit} className="mt-4 text-right">
        <CustomeButton name="Apply" styles="bg-primary text-white py-2!" />
      </form>
    </div>
  );
}