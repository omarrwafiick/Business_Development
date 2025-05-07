import { TowerControlIcon, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import toaster from 'react-hot-toast';
import { getUsers, deleteUser, addAdmin, addConsultant } from '../services/admin';
import { getQualifications } from '../services/consultant'; 
import CustomeInput from '../components/custome_input';
import CustomeButton from '../components/custome_button';
import PasswordInput from '../components/password-input';
import CustomeMultipleSelect from '../components/custome-select-multiple';
import {passwordRegex} from '../utils/main';

export default function Admin() {
  const [showAdminPopup, setShowAdminPopup] = useState(false);
  const [showConsultantPopup, setShowConsultantPopup] = useState(false);
  var qualifications = [];
  var allUsers = [];
  //consultant inputs
  const [salary, setSalary] = useState('');   
  const [bonus, setBonus] = useState(''); 
  const [experience, setExperience] = useState(0); 
  const [qualificationsC, setQualificationsC] = useState('');
  const [disable, setDisable] = useState(false);
  //user
  const [email, SetEmail] = useState('');
  const [password, setPassword] = useState(''); 
  const [phone, setPhone] = useState(''); 
  const [fullname, setFullname] = useState('');

  const popStyle = "relative h-9/12 overflow-auto scroll-auto bg-white p-6 rounded-lg shadow-lg";
  const popWrapperStyle = "fixed inset-0 bg-black/50 bg-opacity-50 flex justify-center items-center z-50";
  useEffect( ()=>{
    try {
        const fetchData = async()=>{ 
            //qualifications.push(await getQualifications());
            //allUsers.push(await getUsers()); 
        }
        fetchData(); 
        } catch (error) {
            //toaster.error(`Error : ${error}`);
        }
  },[]);

  const deleteUserByAdmin = async (id)=>{
    try {
         await deleteUser(id);
         toaster.success("User is deleted successfully");
         allUsers = allUsers.filter(x => x._id !== id)
        } catch (error) {
        toaster.error(`Error : ${error}`);
        }
  }; 

  const submit = async (e, type) => {   
          setDisable(true);
          e.preventDefault();  
          let response = ''; 
          try { 
            if(type === "consultant"){
                const qualificationsIds = qualifications
                    .filter(q => qualificationsC.includes(q._id))
                    .map(q => q._id);
                response = await addConsultant({
                    salary, 
                    bonus, 
                    qualificationsIds, 
                    experienceYears: experience, 
                    fullName: fullname, 
                    email, 
                    password, 
                    phoneNumber: phone });
            }
            else{
                if(!passwordRegex.test(password)){
                    return toaster.error("Password is not strong");
                }
                response = await addAdmin({
                    fullName: fullname, 
                    email, 
                    password, 
                    phoneNumber: phone
                });
            }
            await toaster.success("Successfull operation");
        } 
          catch (error) {
              toaster.error(`Error : ${error.message}`);
              form.current.reset();
          }
          setDisable(false);
  };

  return (
    <div className='w-full h-dvh flex flex-col justify-start items-center mt-12'>  
      <div className="relative w-10/12 flex flex-col justify-center items-center">
          <span className='m-4'>
                <TowerControlIcon size={55} color="#F66A35" /> 
          </span>
          <h4 className='capitalize mb-2! text-3xl font-bold font-gelasio'>admin panel</h4>
          <p className='text-md leading-7 mt-3! mb-12! w-8/12 opacity-80 text-center'>As an admin, you have the authority to manage users in the system. You can add new users, update their information, delete users when necessary, and assign or add new admins to ensure smooth platform management.</p>
          <div className='flex w-full justify-end items-center mb-4!'>
            <button onClick={() => setShowAdminPopup(true)} className='capitalize hover:bg-gradient-to-br cursor-pointer font-medium rounded-lg text-md px-5 py-2 text-center bg-primary text-white! me-3!'>add admin</button>
            <button onClick={() => setShowConsultantPopup(true)} className='capitalize hover:bg-gradient-to-br cursor-pointer font-medium rounded-lg text-md px-5 py-2 text-center bg-secondary text-white!'>add consultant</button>
          </div>

          <table className="text-sm w-full text-left rtl:text-right text-gray-500 dark:text-gray-400  shadow-md sm:rounded-lg">     
              <thead className="text-xl text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                      <th scope="col" className="px-6 py-3 capitalize">
                          user name
                      </th>
                      <th scope="col" className="px-6 py-3 capitalize">
                          phone number
                      </th>
                      <th scope="col" className="px-6 py-3 capitalize">
                          email
                      </th>
                      <th scope="col" className="px-6 py-3 capitalize">
                          createdAt
                      </th>
                      <th scope="col" className="px-6 py-3 capitalize">
                          <span>actions</span>
                      </th>
                  </tr>
              </thead>
              <tbody className='text-lg font-inter'> 
                {
                    allUsers?.map((user,index)=>( 
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {user.fullName}
                        </th>
                        <td className="px-6 py-4">
                            {user.phoneNumber}
                        </td>
                        <td className="px-6 py-4">
                            {user.email}
                        </td>
                        <td className="px-6 py-4">
                            {user.createdAt}
                        </td>
                        <td className="px-6 py-4 flex text-right">
                            <Link to="/" onClick={ async ()=> await deleteUserByAdmin(user._id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline me-3">delete</Link>
                        </td>
                    </tr> 
                    ))
                }
              </tbody>
          </table>
          {/* add admin popup */}
          {showAdminPopup && !showConsultantPopup && (
            <div onClick={() => setShowAdminPopup(false)} className={popWrapperStyle}>
                <form onSubmit={(e) => submit(e, "admin")} onClick={(e) => e.stopPropagation()} className={popStyle+'flex flex-col justify-center items-evenly  w-6/12'}>
                    <X size={55} color="#FF0000" onClick={() => setShowAdminPopup(false)} className="cursor-pointer absolute top-0 right-0 px-4 py-2 rounded"></X>
                    <h2 className="text-2xl font-bold mb-4! capitalize">add new admin</h2> 
                    <CustomeInput value={fullname} onChange={(e)=> setFullname(e.target.value)} name={"fullname"} type={"text"}/>
                    <CustomeInput value={email} onChange={(e)=> SetEmail(e.target.value)} name={"email"} type={"email"}/>
                    <CustomeInput value={phone} onChange={(e)=> setPhone(e.target.value)} name={"phone"} type={"text"}/> 
                    <PasswordInput value={password} onChange={(e)=> setPassword(e.target.value)} name={"password"} />
                    <CustomeButton disabled={disable} name={"submit"} />
                </form>
            </div>
           )}
           {/* add consultant popup */}
           {!showAdminPopup && showConsultantPopup && (
            <div onClick={() => setShowConsultantPopup(false)} className={popWrapperStyle}>
                <form onSubmit={(e) => submit(e, "consultant")} onClick={(e) => e.stopPropagation()} className={popStyle+'flex w-6/12'}>
                    <X size={55} color="#FF0000" onClick={() => setShowConsultantPopup(false)} className="cursor-pointer absolute top-0 right-0 px-4 py-2 rounded"></X>
                    <h2 className="text-2xl font-bold mb-4! capitalize">add new consultant</h2>
                    <CustomeInput value={fullname} onChange={(e)=> setFullname(e.target.value)} name={"fullname"} type={"text"}/>
                    <CustomeInput value={email} onChange={(e)=> SetEmail(e.target.value)} name={"email"} type={"email"}/>
                    <CustomeInput value={phone} onChange={(e)=> setPhone(e.target.value)} name={"phone"} type={"text"}/> 
                    <PasswordInput value={password} onChange={(e)=> setPassword(e.target.value)} name={"password"} />
                    <CustomeInput value={salary} onChange={ (e) => setSalary(e.target.value) } name={"salary"} type={"text"}/> 
                    <CustomeInput value={bonus} onChange={ (e) => setBonus(e.target.value) } name={"bonus"} type={"text"}/> 
                    <CustomeInput value={experience} onChange={ (e) => setExperience(e.target.value) } name={"experience years"} type={"number"}/> 
                    <CustomeMultipleSelect value={qualificationsC} onChange={ (e) => setQualificationsC(e.target.value) } name={"Qualifications"} data={[]}/>  
                    <CustomeButton disabled={disable} name={"submit"} />
                </form>
            </div>
           )}
      </div> 
    </div>
  )
}
