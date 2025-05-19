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
    return (
        <div className='flex justify-center flex-col items-center shadow-lg rounded-xl overflow-hidden transition-colors delay-50 cursor-pointer'>
            <div className={`w-full h-20 bg-gradient-to-r ${experienceYears < 2 ? 'bg-red-400': experienceYears < 5 ? 'bg-yellow-400': 'bg-green-400'}`}></div>
            <div className='flex flex-col justify-center items-start w-9/12 pt-6 pb-6 ps-4 pe-4'> 
                <h1 className='text-xl mt-3!'><a className='font-semibold'>Name :</a>{name}</h1> 
                <h1 className='text-xl opacity-90 mt-4!'><a className='font-semibold'>experience :</a>{experienceYears} years</h1>
                <h1 className='text-xl opacity-90 mt-4! mb-4!'><a className='font-semibold'>Qualifications :</a></h1>
                <ul className='flex w-full'> 
                    {
                        qualifications?.map((q, index) => ( 
                            <li className='capitalize text-md opacity-90 leading-7 me-2 bg-secondary text-white px-3 py-1 rounded-xl'>{q.title}</li>
                        ))
                    } 
                </ul>
               
                 <form onSubmit={serviceSubmit} className='w-full mt-3'>   
                    <CustomeButton name={"apply"} styles={'bg-primary'} />
                 </form>
            </div>
        </div>
      )
}