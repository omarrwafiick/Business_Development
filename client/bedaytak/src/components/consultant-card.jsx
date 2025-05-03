import { Handshake } from 'lucide-react'
import React from 'react'
import CustomeButton from '../components/custome_button'

export default function ConsultantCard({name, experienceYears, qualifications}) {
    const serviceSubmit = () => { 
    };
    return (
        <div className='flex justify-center flex-col items-center border-2 border-black/10 rounded-xl overflow-hidden transition-colors delay-50 cursor-pointer'>
            <div className='w-full h-20 bg-gradient-to-r from-[#F66A35] via-[#FF8C4D] to-[#fca374]'></div>
            <div className='flex flex-col justify-center items-start w-9/12 pt-6 pb-6 ps-4 pe-4'> 
                <h1 className='text-2xl mt-3!'><a className='font-bold'>Name :</a>{name}</h1> 
                <h1 className='text-xl opacity-90 mt-3!'><a className='font-bold'>Years of experience :</a>{experienceYears}</h1>
                <h1 className='text-xl opacity-90 mt-3! mb-3!'><a className='font-bold'>Qualifications list :</a></h1>
                {
                    qualifications?.map((item, index) => ( 
                        <p className='capitalize text-md opacity-90 leading-7'>{item}</p>
                    ))
                } 
                 <form onSubmit={serviceSubmit} className='w-full mt-3'>   
                    <CustomeButton name={"apply"} styles={'bg-secondary'} />
                 </form>
            </div>
        </div>
      )
}