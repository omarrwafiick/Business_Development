import React from 'react';
import CustomeButton from '../components/custome_button'
import { useNavigate } from 'react-router-dom';
import toaster from 'react-hot-toast';

export default function SeededApplication({businessIdea, stage }) {
  const navigate = useNavigate();
  const submit = async (e) => {   
        e.preventDefault(); 
        try {
        //request
        navigate(""); 
        } catch (error) {
        toaster.error(`Error : ${error}`);
        }
      };
  return (
    <div className='flex justify-center flex-col items-center border-2 border-black/10 rounded-xl overflow-hidden transition-colors delay-50 cursor-pointer'>
       <div className='w-full h-20 bg-gradient-to-r from-[#F66A35] via-[#FF8C4D] to-[#fca374]'></div>
        <div className='flex flex-col justify-center items-start w-9/12 pt-6 pb-6 ps-4 pe-4'> 
            <h1 className='text-xl mt-3! capitalize'><a className='font-bold'>business idea :</a>{businessIdea}</h1> 
            <h1 className='text-xl opacity-90 mt-3!'><a className='font-bold'>business stage :</a>{stage}</h1>         
            <form onSubmit={submit} className='w-full mt-3'>   
                <CustomeButton name={"apply"} styles={'bg-secondary'} />
            </form>
        </div>     
    </div>
  )
}
