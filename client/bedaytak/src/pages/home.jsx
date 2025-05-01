import React, { useEffect, useRef } from 'react'
import cover from '../assets/images/cover.jpg'; 
import contact from '../assets/images/contact.jpg'; 
import SmallButton from '../components/small-button'
import Card from '../components/card';
import Card2 from '../components/card2';
import { BriefcaseBusiness, User, Clock, MessageSquare, Users, Heart, Atom, CircleDollarSign, NotebookIcon, BanknoteArrowUp, HeartHandshake, SquareChartGantt, IdCard } from 'lucide-react';
import Team from '../components/team';
import CustomeInput from '../components/custome_input';
import CustomeButton from '../components/custome_button';
import CustomeTextarea from '../components/custome_textarea';
import { useLocation } from 'react-router-dom';
import Business1 from '../assets/images/b1.png'; 
import Business2 from '../assets/images/b2.png'; 
import Business3 from '../assets/images/b3.png'; 
import Person1 from '../assets/images/person1.png'; 
import Person2 from '../assets/images/person2.png'; 
import Person3 from '../assets/images/person3.png'; 
import PriceCard from '../components/price-card';

export default function Home() {
  const messageSubmit = () =>{

  }; 
  const contactRef = useRef(null); 
  const serviceRef = useRef(null); 
  const pricingRef = useRef(null); 
  const aboutRef = useRef(null); 

  const location = useLocation();
  useEffect(() => {
    if (location.hash === '#contact') {
      contactRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
    else if(location.hash === '#services'){
      serviceRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
    else if(location.hash === '#about'){
      aboutRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
    else if(location.hash === '#pricing'){
      pricingRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location])

  return (
    <div className='w-full flex flex-col justify-center items-center '>
        <div className='w-10/12 flex justify-center items-center pt-16 pb-16'>
            <div className='w-6/12 flex flex-col justify-center items-center'>
              <div className='flex flex-col justify-center items-start'>
                <h1 className='capitalize font-bold text-6xl'>smooth business</h1>
                <h1 className='capitalize leading-18 font-bold text-6xl'>starts with good</h1>
                <a className="flex  capitalize font-bold text-6xl text-secondary">
                  <span className='me-3'>consultation</span> 
                  <BriefcaseBusiness size={55} color="#F66A35" />
                </a>
                <p className='opacity-50 text-sm w-9/12 text-center mt-4! leading-6 capitalize'>
                  with planning we are prepared to guarante your business advancement and increment business deals today.
                </p> 
                <div className='flex justify-start items-center w-full mt-8'> 
                    <SmallButton name="Get Started" style={'bg-primary text-white!'} to="signup"/>
                    <SmallButton name="Apply Now" style={'bg-secondary text-white! ms-3!'} to="#pricing"/>
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

        <div className='w-10/12 flex justify-center items-center pt-32 pb-16'>
          <div className='w-6/12 flex justify-between items-center relative'> 
            <img src={Business1} className="h-80 absolute rounded-tl-2xl rounded-2xl" alt="image" />
            <img src={Business2} className="h-80 absolute ml-8 -mt-8 rounded-tl-2xl rounded-2xl" alt="image" />
            <img src={Business3} className="h-80 absolute ml-16 -mt-16 rounded-tl-2xl rounded-2xl" alt="image" />
          </div>
          <div className='w-6/12 flex flex-col justify-center items-center'>
            <h1 className='capitalize font-bold text-4xl'>we are trusted consulting</h1>
            <h1 className='capitalize font-bold text-4xl leading-16'>company, with <a className='text-secondary'>+20 years</a></h1>
            <h1 className='capitalize font-bold text-4xl'>of experience.</h1>
            <p className='opacity-50 text-sm w-10/12 text-center mt-8! leading-7 capitalize mb-6!'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde itaque voluptatum officia. Voluptates corrupti nemo, blanditiis amet reprehenderit veritatis iure? Minima quibusdam sit doloribus ex voluptas beatae esse fuga exercitationem.</p>
            <SmallButton name="More About Us" style={'bg-primary text-white!'} to="#about"/>
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

        <div ref={aboutRef} id="about" className='w-full flex flex-col justify-evenly items-center pt-16 pb-16'>
          <h1 className='capitalize font-bold text-5xl'>meet our perfect advisors</h1>
          <p className='opacity-50 text-sm w-6/12 text-center mt-8! leading-6 capitalize mb-10!'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae voluptatibus vel expedita culpa voluptate voluptatum nostrum esse sequi et veniam qui, dignissimos animi, ea, ducimus deserunt repellendus vitae aliquid ut!</p>
          <div className='w-10/12 grid grid-cols-3 gap-8'> 
              <Team  
                  imageUrl={Person1}
                  name="cameron william"
                  role="creative director"/> 
              <Team 
                  imageUrl={Person2}
                  name="ahmed sameh"
                  role="senior client partner"/> 
              <Team  
                  imageUrl={Person3}
                  name="brooklyn simmons"
                  role="account manager"/> 
          </div> 
        </div>

        <div ref={serviceRef} id="services" className='w-full bg-dark flex flex-col justify-evenly items-center pt-32 pb-32'>
          <h1 className='text-white capitalize font-bold text-5xl'>what we do to serve your best</h1>
          <p className='text-white opacity-70 text-sm w-6/12 text-center mt-8! leading-6 capitalize mb-10!'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae voluptatibus vel expedita culpa voluptate voluptatum nostrum esse sequi et veniam qui, dignissimos animi, ea, ducimus deserunt repellendus vitae aliquid ut!</p>
          
          <div className='w-10/12 grid grid-cols-3 gap-8 mt-6'>
             <Card2 
                  style='text-white'
                  mode={false} 
                  icon={ <NotebookIcon size={45} color="#FFFFFF" /> }
                  color={"bg-orange-400"}
                  title="audit & assurance"
                  content="Lorem ipsum dolor sit amet consectetur adipisicing elit. In, similique veniam quo temporibus nam iste vitae voluptate? Autem iste vero deleniti impedit quaerat. Praesentium distinctio ad impedit amet ducimus quam."/> 
              <Card2
                  style='text-white'
                  mode={false} 
                  icon={ <CircleDollarSign size={45} color="#FFFFFF" /> } 
                  color={"bg-blue-400"}
                  title="finance analytics"
                  content="Lorem ipsum dolor sit amet consectetur adipisicing elit. In, similique veniam quo temporibus nam iste vitae voluptate? Autem iste vero deleniti impedit quaerat. Praesentium distinctio ad impedit amet ducimus quam."/> 
              <Card2 
                  style='text-white'
                  mode={false}
                  icon={ <BanknoteArrowUp size={45} color="#FFFFFF " /> }
                  color={"bg-green-400"}
                  title="business growth"
                  content="Lorem ipsum dolor sit amet consectetur adipisicing elit. In, similique veniam quo temporibus nam iste vitae voluptate? Autem iste vero deleniti impedit quaerat. Praesentium distinctio ad impedit amet ducimus quam."/>
              <Card2 
                  style='text-white'
                  mode={false} 
                  icon={ <HeartHandshake size={45} color="#FFFFFF" /> }
                  color={"bg-yellow-400"}
                  title="tax advisory"
                  content="Lorem ipsum dolor sit amet consectetur adipisicing elit. In, similique veniam quo temporibus nam iste vitae voluptate? Autem iste vero deleniti impedit quaerat. Praesentium distinctio ad impedit amet ducimus quam."/> 
              <Card2
                  style='text-white'
                  mode={false} 
                  icon={ <SquareChartGantt size={45} color="#FFFFFF" /> } 
                  color={"bg-red-400"}
                  title="project management"
                  content="Lorem ipsum dolor sit amet consectetur adipisicing elit. In, similique veniam quo temporibus nam iste vitae voluptate? Autem iste vero deleniti impedit quaerat. Praesentium distinctio ad impedit amet ducimus quam."/> 
              <Card2 
                  style='text-white'
                  mode={false}
                  icon={ <IdCard size={45} color="#FFFFFF " /> }
                  color={"bg-pink-400"}
                  title="card processing"
                  content="Lorem ipsum dolor sit amet consectetur adipisicing elit. In, similique veniam quo temporibus nam iste vitae voluptate? Autem iste vero deleniti impedit quaerat. Praesentium distinctio ad impedit amet ducimus quam."/>  
          </div> 
        </div> 

        <div ref={pricingRef} id="pricing" className='w-full bg-secondary flex flex-col justify-evenly items-center pt-16 pb-16'>
          <h1 className='text-white capitalize font-bold text-5xl'>our prices!</h1>
          <p className='text-white opacity-90 text-sm w-6/12 text-center mt-8! leading-6 capitalize mb-10!'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae voluptatibus vel expedita culpa voluptate voluptatum nostrum esse sequi et veniam qui, dignissimos animi, ea, ducimus deserunt repellendus vitae aliquid ut!</p>
          <SmallButton name="Apply Now" style={'bg-primary text-white! ms-3!'} to="/application"/>
          <div className='w-10/12 grid grid-cols-3 gap-8 mt-12'>
              <PriceCard 
                  style=''  
                  price="29,99"
                  type="basic plan"
                  details="Lorem ipsum dolor sit amet consectetur adipisicing elit. In, similique veniam quo temporibus nam iste vitae voluptate? Autem iste vero deleniti impedit quaerat. Praesentium distinctio ad impedit amet ducimus quam."/> 
              <PriceCard
                  style='' 
                  price="49,99"
                  type="basic plan"
                  details="Lorem ipsum dolor sit amet consectetur adipisicing elit. In, similique veniam quo temporibus nam iste vitae voluptate? Autem iste vero deleniti impedit quaerat. Praesentium distinctio ad impedit amet ducimus quam."/> 
              <PriceCard 
                  style='' 
                  price="79,99"
                  type="basic plan"
                  details="Lorem ipsum dolor sit amet consectetur adipisicing elit. In, similique veniam quo temporibus nam iste vitae voluptate? Autem iste vero deleniti impedit quaerat. Praesentium distinctio ad impedit amet ducimus quam."/>
          </div> 
        </div> 

        <div ref={contactRef} id="contact" className='w-full flex flex-col justify-center items-center pt-16 pb-32'>
          <h1 className='capitalize font-bold text-6xl'>contact us!</h1>
          <p className='opacity-70 text-sm w-6/12 text-center mt-8! leading-6 capitalize mb-10!'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae voluptatibus vel expedita culpa voluptate voluptatum nostrum esse sequi et veniam qui, dignissimos animi, ea, ducimus deserunt repellendus vitae aliquid ut!</p>
          <div className='flex justify-evenly items-center  w-10/12'>
            <form onSubmit={messageSubmit} className='w-6/12 flex flex-col justify-between items-evenly mt-3 pe-6'> 
                <span className='w-full flex justify-center'><Atom size={75} color="#15A0DC" /></span>
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
