import React, { useEffect } from 'react' 
import { LucideBriefcaseBusiness } from 'lucide-react';
import { motion } from 'framer-motion';
import CustomeButton from '../components/custome_button'
import CustomeInput from '../components/custome_input'
import CustomeTextarea from '../components/custome_textarea'
import CustomeSelectAuth from '../components/custome-select-auth'
import { useNavigate } from 'react-router-dom';
import toaster from 'react-hot-toast';
import { addBusiness, getAllCategories } from '../services/business';
import { getAllLocations } from '../services/location'; 
import { all } from 'axios';

export default function AddBusiness() {   
    const { user } = AppStore();
    const allLocations = [];
    const allCategories = [];

    useEffect(async ()=>{
        allCategories.push(await getAllCategories());
        allLocations.push(await getAllLocations());
    },[]);

    const form = useRef(); 
    const [name, SetName] = useState('');
    const [description, SetDescription] = useState('');
    const [category, SetCategory] = useState('');
    const [location, SetLocation] = useState('');
    const navigate = useNavigate();
    const businessSubmit = async (e) => {   
        e.preventDefault();  
        try {
        const locationName = all.map(x=>x._id === location).name;
        const categoryId = allCategories.map(x=>x._id === category)._id;
        const ownerId = user._id;
        await addBusiness({name, description, ownerId, categoryId, locationName });
        toaster.success("Business added successfully");
        navigate("/login");
        } catch (error) {
        toaster.error(`Error : ${error}`);
        form.current.reset();
        }
      }; 
    return (
      <div  className='flex justify-center items-center flex-col w-full h-dvh font-gelasio'>
          <motion.div
              initial={{opacity: 0, y:20}}
              animate={{opacity: 1, y:0}}
              transition={{duration:0.5}} 
              className='flex justify-center items-center flex-col w-4/12'>
  
              <span className='m-2'>
                  <LucideBriefcaseBusiness size={55} color="#15A0DC" />  
              </span>
              <h4 className='capitalize mb-2! text-2xl font-bold'>add your business.</h4>
              <p className='opacity-80'>Getting to know your value better</p>
  
              <form ref={form} onSubmit={businessSubmit} className='w-full mt-3'>
                  <CustomeInput value={name} onClick={(e)=> SetName(e.target.value)}  name={"name"} type={"text"}/>
                  <CustomeTextarea value={description} onClick={(e)=> SetDescription(e.target.value)}  rowNum={3} name={"description"} placeHolder={"What is your business about..."}/>
                  <CustomeSelectAuth value={category} onClick={(e)=> SetCategory(e.target.value)} name={"category"} data={allCategories}/>
                  <CustomeSelectAuth value={location} onClick={(e)=> SetLocation(e.target.value)} name={"location"} data={allLocations}/>
                  <CustomeButton name={"submit"} />
              </form>
          </motion.div>
      </div>
      
    )
  }