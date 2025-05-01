import React from 'react'
import cover from '../assets/images/cover.jpg';
import LI from '../assets/images/left-image.jpg';
import RI from '../assets/images/right-image.jpg';
import contact from '../assets/images/contact.jpg'; 
import SmallButton from '../components/small-button'
import Card from '../components/card';
import Card2 from '../components/card2';
import { BriefcaseBusiness, User, Clock, MessageSquare, Users, Heart } from 'lucide-react';
import Team from '../components/team';
import CustomeInput from '../components/custome_input';
import CustomeButton from '../components/custome_button';
import CustomeTextarea from '../components/custome_textarea';

export default function Home() {
  const messageSubmit = () =>{

  };
  return (
    <div className='w-full flex flex-col justify-center items-center '>
        <div className='w-10/12 flex justify-center items-center pt-16 pb-16'>
            <div className='w-6/12 flex flex-col justify-center items-center'>
              <div className='flex flex-col justify-center items-start'>
                <h1 className='capitalize font-bold text-6xl'>smooth business</h1>
                <h1 className='capitalize leading-18 font-bold text-6xl'>starts with good</h1>
                <a className="flex  capitalize font-bold text-6xl text-secondary">
                  <span className='me-3'>consultation</span> 
                  <svg className='h-12 svg-secondary' stroke="black" strokeWidth="1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M184 48l144 0c4.4 0 8 3.6 8 8l0 40L176 96l0-40c0-4.4 3.6-8 8-8zm-56 8l0 40L64 96C28.7 96 0 124.7 0 160l0 96 192 0 160 0 8.2 0c32.3-39.1 81.1-64 135.8-64c5.4 0 10.7 .2 16 .7l0-32.7c0-35.3-28.7-64-64-64l-64 0 0-40c0-30.9-25.1-56-56-56L184 0c-30.9 0-56 25.1-56 56zM320 352l-96 0c-17.7 0-32-14.3-32-32l0-32L0 288 0 416c0 35.3 28.7 64 64 64l296.2 0C335.1 449.6 320 410.5 320 368c0-5.4 .2-10.7 .7-16l-.7 0zm320 16a144 144 0 1 0 -288 0 144 144 0 1 0 288 0zM496 288c8.8 0 16 7.2 16 16l0 48 32 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-48 0c-8.8 0-16-7.2-16-16l0-64c0-8.8 7.2-16 16-16z"/></svg>
                </a>
                <p className='opacity-50 text-sm w-9/12 text-center mt-4! leading-6 capitalize'>
                  with planning we are prepared to guarante your business advancement and increment business deals today.
                </p> 
                <div className='flex justify-start items-center w-full mt-6 '>
                  <input placeholder='Your email address' type="text" className="bg-gray-50 border p-2 border-gray-300 text-gray-900 text-sm rounded-lg 
                    focus:outline-none focus:ring-2 focus:ring-[#15A0DC] focus:border-[#15A0DC]
                    h-10 w-8/12 me-2" />
                    <SmallButton name="Get Started" style={'bg-primary text-white!'} to="signup"/>
                </div>
              </div> 
            </div>
            <div className='w-6/12 flex justify-end items-center'>
                <img src={cover} className="h-full rounded-2xl" alt="bedaytak cover" />
            </div>
        </div>
         
        <div className='w-full bg-dark flex justify-evenly items-center pt-16 pb-16'>
          <div className='w-10/12 grid grid-cols-3 gap-8'>
             <Card   
                  icon={ <BriefcaseBusiness size={55} color="#FFFFFF" /> }
                  color={"bg-orange-400"}
                  title="business ideas"
                  content="Lorem ipsum dolor sit amet consectetur adipisicing elit. In, similique veniam quo temporibus nam iste vitae voluptate? Autem iste vero deleniti impedit quaerat. Praesentium distinctio ad impedit amet ducimus quam."/> 
              <Card 
                  icon={ <User size={55} color="#FFFFFF" /> } 
                  color={"bg-blue-400"}
                  title="customer strategy"
                  content="Lorem ipsum dolor sit amet consectetur adipisicing elit. In, similique veniam quo temporibus nam iste vitae voluptate? Autem iste vero deleniti impedit quaerat. Praesentium distinctio ad impedit amet ducimus quam."/> 
              <Card 
                  icon={ <Clock size={55} color="#FFFFFF " /> }
                  color={"bg-green-400"}
                  title="get success"
                  content="Lorem ipsum dolor sit amet consectetur adipisicing elit. In, similique veniam quo temporibus nam iste vitae voluptate? Autem iste vero deleniti impedit quaerat. Praesentium distinctio ad impedit amet ducimus quam."/> 
          </div> 
        </div>

        <div className='w-10/12 flex justify-center items-center pt-16 pb-16'>
          <div className='w-6/12 flex justify-between items-center'>
            <div className='w-6/12 h-full'>
              <img src={LI} className="h-full rounded-tl-2xl rounded-bl-2xl" alt="image" />
            </div>
            <div className='w-6/12 h-full'>
              <img src={RI} className="h-full rounded-tr-2xl rounded-br-2xl" alt="image" />
            </div>
          </div>
          <div className='w-6/12 flex flex-col justify-center items-center'>
            <h1 className='capitalize font-bold text-4xl'>we are trusted consulting</h1>
            <h1 className='capitalize font-bold text-4xl leading-16'>company, with <a className='text-secondary'>+20 years</a></h1>
            <h1 className='capitalize font-bold text-4xl'>of experience.</h1>
            <p className='opacity-50 text-sm w-10/12 text-center mt-8! leading-7 capitalize mb-6!'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde itaque voluptatum officia. Voluptates corrupti nemo, blanditiis amet reprehenderit veritatis iure? Minima quibusdam sit doloribus ex voluptas beatae esse fuga exercitationem.</p>
            <SmallButton name="More About Us" style={'bg-primary text-white!'} to="aboutus"/>
          </div>
        </div>

        <div className='w-full flex justify-evenly items-center pt-16 pb-16'>
          <div className='w-10/12 grid grid-cols-3 gap-8'>
             <Card2 
                  mode={true} 
                  icon={ <Users size={45} color="#FFFFFF" /> }
                  color={"bg-orange-400"}
                  title="professional staff"
                  content="Lorem ipsum dolor sit amet consectetur adipisicing elit. In, similique veniam quo temporibus nam iste vitae voluptate? Autem iste vero deleniti impedit quaerat. Praesentium distinctio ad impedit amet ducimus quam."/> 
              <Card2
                  mode={true} 
                  icon={ <Heart size={45} color="#FFFFFF" /> } 
                  color={"bg-blue-400"}
                  title="100% statisfactions"
                  content="Lorem ipsum dolor sit amet consectetur adipisicing elit. In, similique veniam quo temporibus nam iste vitae voluptate? Autem iste vero deleniti impedit quaerat. Praesentium distinctio ad impedit amet ducimus quam."/> 
              <Card2 
                  mode={true}
                  icon={ <MessageSquare size={45} color="#FFFFFF " /> }
                  color={"bg-green-400"}
                  title="expert advise"
                  content="Lorem ipsum dolor sit amet consectetur adipisicing elit. In, similique veniam quo temporibus nam iste vitae voluptate? Autem iste vero deleniti impedit quaerat. Praesentium distinctio ad impedit amet ducimus quam."/> 
          </div> 
        </div>

        <div className='w-full flex flex-col justify-evenly items-center pt-16 pb-16'>
          <h1 className='capitalize font-bold text-5xl'>meet our perfect advisors</h1>
          <p className='opacity-50 text-sm w-6/12 text-center mt-8! leading-6 capitalize mb-10!'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae voluptatibus vel expedita culpa voluptate voluptatum nostrum esse sequi et veniam qui, dignissimos animi, ea, ducimus deserunt repellendus vitae aliquid ut!</p>
          <div className='w-10/12 grid grid-cols-3 gap-8'> 
              <Team  
                  imageUrl="../assets/images/person1.jpg"
                  name="cameron william"
                  role="creative director"/> 
              <Team 
                  imageUrl="../assets/images/person1.jpg"
                  name="ahmed sameh"
                  role="senior client partner"/> 
              <Team  
                  imageUrl="../assets/images/person1.jpg"
                  name="brooklyn simmons"
                  role="account manager"/> 
          </div> 
        </div>

        <div className='w-full bg-dark flex flex-col justify-evenly items-center pt-32 pb-32'>
          <h1 className='text-white capitalize font-bold text-5xl'>what we do to serve your best</h1>
          <p className='text-white opacity-70 text-sm w-6/12 text-center mt-8! leading-6 capitalize mb-10!'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae voluptatibus vel expedita culpa voluptate voluptatum nostrum esse sequi et veniam qui, dignissimos animi, ea, ducimus deserunt repellendus vitae aliquid ut!</p>
          
          <div className='w-10/12 grid grid-cols-3 gap-8 mt-6'>
             <Card2 
                  style='text-white'
                  mode={false} 
                  icon={ <Users size={45} color="#FFFFFF" /> }
                  color={"bg-orange-400"}
                  title="audit & assurance"
                  content="Lorem ipsum dolor sit amet consectetur adipisicing elit. In, similique veniam quo temporibus nam iste vitae voluptate? Autem iste vero deleniti impedit quaerat. Praesentium distinctio ad impedit amet ducimus quam."/> 
              <Card2
                  style='text-white'
                  mode={false} 
                  icon={ <Heart size={45} color="#FFFFFF" /> } 
                  color={"bg-blue-400"}
                  title="finance analytics"
                  content="Lorem ipsum dolor sit amet consectetur adipisicing elit. In, similique veniam quo temporibus nam iste vitae voluptate? Autem iste vero deleniti impedit quaerat. Praesentium distinctio ad impedit amet ducimus quam."/> 
              <Card2 
                  style='text-white'
                  mode={false}
                  icon={ <MessageSquare size={45} color="#FFFFFF " /> }
                  color={"bg-green-400"}
                  title="business growth"
                  content="Lorem ipsum dolor sit amet consectetur adipisicing elit. In, similique veniam quo temporibus nam iste vitae voluptate? Autem iste vero deleniti impedit quaerat. Praesentium distinctio ad impedit amet ducimus quam."/>
              <Card2 
                  style='text-white'
                  mode={false} 
                  icon={ <Users size={45} color="#FFFFFF" /> }
                  color={"bg-orange-400"}
                  title="tax advisory"
                  content="Lorem ipsum dolor sit amet consectetur adipisicing elit. In, similique veniam quo temporibus nam iste vitae voluptate? Autem iste vero deleniti impedit quaerat. Praesentium distinctio ad impedit amet ducimus quam."/> 
              <Card2
                  style='text-white'
                  mode={false} 
                  icon={ <Heart size={45} color="#FFFFFF" /> } 
                  color={"bg-blue-400"}
                  title="project management"
                  content="Lorem ipsum dolor sit amet consectetur adipisicing elit. In, similique veniam quo temporibus nam iste vitae voluptate? Autem iste vero deleniti impedit quaerat. Praesentium distinctio ad impedit amet ducimus quam."/> 
              <Card2 
                  style='text-white'
                  mode={false}
                  icon={ <MessageSquare size={45} color="#FFFFFF " /> }
                  color={"bg-green-400"}
                  title="card processing"
                  content="Lorem ipsum dolor sit amet consectetur adipisicing elit. In, similique veniam quo temporibus nam iste vitae voluptate? Autem iste vero deleniti impedit quaerat. Praesentium distinctio ad impedit amet ducimus quam."/>  
          </div> 
        </div> 

        <div className='w-full flex flex-col justify-center items-center pt-16 pb-16'>
          <h1 className='capitalize font-bold text-6xl'>contact us!</h1>
          <p className='opacity-70 text-sm w-6/12 text-center mt-8! leading-6 capitalize mb-10!'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae voluptatibus vel expedita culpa voluptate voluptatum nostrum esse sequi et veniam qui, dignissimos animi, ea, ducimus deserunt repellendus vitae aliquid ut!</p>
          <div className='flex justify-evenly items-center w-10/12'>
            <form onSubmit={messageSubmit} className='w-6/12 mt-3 pe-6'> 
                <CustomeInput name={"message"} type={"text"}/> 
                <CustomeTextarea name={"subject"} rowNum="5" type={"text"}/>   
                <CustomeButton name={"contact"} /> 
            </form>
            <div className='w-6/12'>
              <img className='rounded-2xl' src={contact} alt="contact image" />
            </div>
          </div>
        </div>
    </div>
  ) 
}
