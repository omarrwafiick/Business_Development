import { TowerControlIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import toaster from 'react-hot-toast';
import { getUsers, deleteUser, addAdmin, addConsultant } from '../services/admin' ;
import toaster from 'react-hot-toast'
import CustomeInput from '../components/custome_input'
import CustomeButton from '../components/custome_button'
import PasswordInput from '../components/password-input'

export default function Admin() {
  const [showAdminPopup, setShowAdminPopup] = useState(false);
  const [showConsultantPopup, setShowConsultantPopup] = useState(false);

  const allUsers = [];
  useEffect(async ()=>{
    try {
        allUsers.push(await getUsers()); 
        } catch (error) {
        toaster.error(`Error : ${error}`);
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

  return (
    <div className='w-full h-dvh flex flex-col justify-start items-center mt-12'>  
      <div className="relative flex flex-col justify-center items-center shadow-md sm:rounded-lg">
          <span className='m-4'>
                <TowerControlIcon size={55} color="#F66A35" /> 
          </span>
          <h4 className='capitalize mb-2! text-3xl font-bold font-gelasio'>admin panel</h4>
          <p className='text-md leading-7 mt-3! mb-12! w-8/12 opacity-80 text-center'>As an admin, you have the authority to manage users in the system. You can add new users, update their information, delete users when necessary, and assign or add new admins to ensure smooth platform management.</p>
  
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">     
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
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <form className="bg-white p-6 rounded-lg shadow-lg w-96">
                    <h2 className="text-xl font-bold mb-4 capitalize">add new admin</h2> 

                    <button onClick={() => setShowAdminPopup(false)} className="bg-red-500 text-white px-4 py-2 rounded">
                        Close
                    </button>
                </form>
            </div>
           )}
           {/* add consultant popup */}
           {!showAdminPopup && showConsultantPopup && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <form className="bg-white p-6 rounded-lg shadow-lg w-96">
                    <h2 className="text-xl font-bold mb-4 capitalize">add new consultant</h2>
                    
                    <button onClick={() => setShowConsultantPopup(false)} className="bg-red-500 text-white px-4 py-2 rounded">
                        Close
                    </button>
                </form>
            </div>
           )}
      </div> 
    </div>
  )
}
