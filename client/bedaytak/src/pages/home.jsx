import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import cover from '../assets/images/cover.png'; 
import contactImg from '../assets/images/contact.jpg'; 
import SmallButton from '../components/small-button'
import Card from '../components/card';
import Card2 from '../components/card2';
import { BriefcaseBusiness, User, Clock, MessageSquare, Users, Heart, CircleDollarSign, 
        NotebookIcon, BanknoteArrowUp, HeartHandshake, IdCard, LocationEdit, CodesandboxIcon,
        Paperclip, 
} from 'lucide-react';
import Team from '../components/team';
import CustomeInput from '../components/custome_input';
import CustomeButton from '../components/custome_button';
import CustomeTextarea from '../components/custome_textarea';
import { Link, useLocation } from 'react-router-dom';
import Business1 from '../assets/images/b1.png'; 
import Business2 from '../assets/images/b2.png'; 
import Business3 from '../assets/images/b3.png'; 
import Person1 from '../assets/images/person1.png'; 
import Person2 from '../assets/images/person2.png'; 
import Person3 from '../assets/images/person3.png'; 
import PriceCard from '../components/price-card';
import { motion, useAnimation } from "framer-motion";  
import { useInView } from "react-intersection-observer"; 
import AppStore from '../store/store';
import { Title, Meta } from 'react-head';
import SocialMediaBar from '../components/socialmedia-bar';
import { contact } from '../services/contact'; 
import toaster from 'react-hot-toast';

export default function Home() {
  const form = useRef(); 
  const { user } = AppStore();
  const [message, setMessage] = useState('');
  const [subject, setSubject] = useState('');
  const [disable, setDisable] = useState(false);

  const messageSubmit = async (e) =>{
    setDisable(true);
    e.preventDefault();
    try { 
      const response = await businessGuideService(user._id, {subject, message}); 
      if(!response.ok()){
          throw new Error(`Request failed with status ${response.status}`);
      }
      toaster.success("Message was sent successfully");
    } catch (error) {
      toaster.error(`Error : ${error}`);
    }
    form.current.reset();
    setDisable(false);
  };  

  const setServiceName = AppStore.getState().setchosenService; 
  const contactRef = useRef(null); 
  const serviceRef = useRef(null); 
  const pricingRef = useRef(null); 
  const aboutRef = useRef(null); 
  const location = useLocation();
  
  useLayoutEffect(() => {
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

  //first section 
  const introControls = useAnimation();
  const [introRef, introInView] = useInView({ threshold: 0.2 });
 
  useEffect(() => {
    if (introInView) {
      introControls.start("visible");
    } else {
      introControls.start("hidden");
    }
  }, [introInView, introControls]);

  //second section
  const featureControls = useAnimation();
  const [featureRef, featureInView] = useInView({ threshold: 0.2 });

  useEffect(() => {
    if (featureInView) {
      featureControls.start("visible");
    } else {
      featureControls.start("hidden");
    }
  }, [featureInView, featureControls]);

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  const pageDescription = `Bedaytak is a business intelligence platform designed to help
                  entrepreneurs in Alexandria, Egypt, make data-driven decisions when
                  starting or expanding their businesses. The platform provides insights
                  on optimal business locations, market competition, financial modeling,
                  networking, and legal procedures, tailored specifically to the Egyptian
                  market.`;

  return ( 
    <div className='w-full flex flex-col justify-center items-center'>
        <Title>Bedaytak - Home</Title>
        <Meta name="description" content={pageDescription} />

        <motion.div
          variants={{
            hidden:{opacity:0, y:75},
            visible:{opacity:1, y:0},
          }}
          initial="hidden"
          animate="visible"
          transition={{duration:0.5, delay:0.25}}
          className='w-10/12 h-screen flex justify-center items-center'>
            <div className='w-6/12 h-full flex flex-col justify-center items-center mt-20'>
              <div className='flex flex-col items-start'>
                <h1 className='capitalize font-bold text-6xl'>smooth business</h1>
                <h1 className='capitalize leading-20 font-bold text-6xl'>starts with good</h1>
                <a className="flex capitalize font-bold text-6xl text-secondary">
                  <span className='me-3'>consultation</span> 
                  <BriefcaseBusiness size={55} color="#F66A35" />
                </a>
                <p className='opacity-70 text-sm w-10/12 z-10! text-start mt-8! leading-7 capitalize font-inter'>
                    {pageDescription}
                </p> 
                <div className='flex justify-start items-center w-full mt-8'> 
                    <SmallButton name="Get Started" style={'bg-primary text-white!'} to="signup"/>
                    <SmallButton name="Apply Now" style={'bg-secondary text-white! ms-3!'} to="application"/>
                </div>
                <div className='flex justify-start items-center w-6/12 mt-10'>
                  <SocialMediaBar style={'fill-black'} />
                </div>
              </div> 
            </div>
            <div className='w-6/12 h-full flex justify-end items-center'>
                <img src={cover} className="rounded-2xl w-full mt-5" alt="bedaytak cover" loading='lazy' />
            </div>
        </motion.div>
         
        <motion.div 
          ref={introRef}
          variants={variants}
          initial="hidden"
          animate={introControls}
          className='w-full bg-dark flex justify-evenly items-center pt-16 pb-16'>
          <div className='w-10/12 grid grid-cols-3 gap-8'>
             <Card   
                  icon={ <BriefcaseBusiness size={55} color="#FFFFFF" /> }
                  color={"bg-orange-400"}
                  title="business ideas"
                  content="Unlock powerful business ideas that spark growth and innovation. Our team analyzes trends and market needs to help you launch ideas with impact—turning your vision into a practical, scalable solution ready for today’s business landscape."/> 
              <Card 
                  icon={ <User size={55} color="#FFFFFF" /> } 
                  color={"bg-blue-400"}
                  title="customer strategy"
                  content="Build a customer strategy that drives loyalty and results. We help you understand your audience, optimize touchpoints, and deliver consistent value—creating meaningful relationships that fuel retention, referrals, and revenue growth."/> 
              <Card 
                  icon={ <Clock size={55} color="#FFFFFF " /> }
                  color={"bg-green-400"}
                  title="get success"
                  content="Achieve success through smart planning, expert support, and actionable goals. We guide you through every step with proven tools and insights, turning challenges into wins and helping your business reach its highest potential with clarity."/> 
          </div> 
        </motion.div>

        <motion.div  
          className='w-10/12  h-screen flex justify-center items-center pt-20 pb-20'>
          <div className='w-6/12 flex justify-between items-center relative'> 
            <img src={Business1} className="h-80 absolute rounded-tl-2xl rounded-2xl opacity-60" alt="image 1" loading='lazy' />
            <img src={Business2} className="h-80 absolute ml-8 -mt-8 rounded-tl-2xl rounded-2xl opacity-80" alt="image 2" loading='lazy' />
            <img src={Business3} className="h-80 absolute ml-16 -mt-16 rounded-tl-2xl rounded-2xl " alt="image 3" loading='lazy' />
          </div>
          <div className='w-6/12 flex flex-col justify-center items-center'>
            <h1 className='capitalize font-bold text-4xl'>we are trusted consulting</h1>
            <h1 className='capitalize font-bold text-4xl leading-16'>company, with <a className='text-secondary'>+20 years</a></h1>
            <h1 className='capitalize font-bold text-4xl'>of experience.</h1>
            <p className='opacity-50 font-inter text-sm w-10/12 text-center mt-8! leading-7 capitalize mb-6!'>With over 20 years of proven experience, we’ve built a reputation as a trusted consulting company that delivers real results. Our long-term clients value our integrity, insight, and commitment to helping their businesses thrive.</p>
            <SmallButton name="More About Us" style={'bg-primary text-white!'} to="#about"/>
          </div>
        </motion.div>

        <motion.div  
          ref={featureRef}
          variants={variants}
          initial="hidden"
          animate={featureControls}
          className='w-full flex justify-evenly items-center pb-32'>
          <div className='w-10/12 grid grid-cols-3 gap-8'>
             <Card2 
                  mode={true} 
                  icon={ <Users size={45} color="#FFFFFF" /> }
                  color={"bg-orange-400"}
                  title="professional staff"
                  content="Our professional staff is committed to delivering excellence in every interaction. With diverse industry backgrounds and a passion for innovation, they provide personalized support and strategies to help your business grow with confidence."/> 
              <Card2
                  mode={true} 
                  icon={ <Heart size={45} color="#FFFFFF" /> } 
                  color={"bg-blue-400"}
                  title="100% statisfactions"
                  content="We stand by our commitment to 100% satisfaction by offering reliable service, open communication, and results-driven solutions. Your success is our top priority, and we continually adapt to exceed expectations at every stage of your journey."/> 
              <Card2 
                  mode={true}
                  icon={ <MessageSquare size={45} color="#FFFFFF " /> }
                  color={"bg-green-400"}
                  title="expert advise"
                  content="Receive expert advice tailored to your unique business challenges and goals. Our consultants use data-driven insights and proven methods to guide your decisions, helping you achieve smarter growth, increased efficiency, and long-term success."/> 
          </div> 
        </motion.div>

        <motion.div 
          ref={aboutRef} id="about" className='w-full  h-screen flex flex-col justify-evenly items-center pt-16 pb-16'>
          <h1 className='capitalize font-bold text-5xl'>meet our perfect advisors</h1>
          <p className='font-inter opacity-50 text-sm w-8/12 text-center mt-8! leading-6 capitalize mb-10!'>Seasoned professionals with deep industry knowledge and a passion for helping businesses succeed. They offer clear, actionable guidance tailored to your goals, ensuring every step you take leads to progress.</p>
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
        </motion.div>

        <motion.div className='w-full bg-dark flex flex-col justify-evenly items-center pt-20 pb-20'>
          <h1 ref={serviceRef} id="services" className='text-white capitalize font-bold text-5xl'>what we do to serve your best</h1>
          <p className='font-inter text-white opacity-70 text-sm w-8/12 text-center mt-8! leading-6 capitalize mb-10!'>We provide tailored solutions designed to match your business needs. From strategic planning to hands-on support, every service we offer is focused on delivering maximum value, helping you operate smarter and achieve lasting success.</p>
          
          <div className='w-10/12 grid grid-cols-3 gap-8 mt-6'>
                <Link to="/guidance-service"><Card2 
                  style='text-white'
                  mode={false} 
                  icon={ <NotebookIcon size={45} color="#FFFFFF" /> }
                  color={"bg-orange-400"}
                  title="Business guide"
                  content="Our Business Guide service helps you map out a clear path to success. From startup essentials to scaling strategies, we offer expert direction and resources that support informed decisions."/> 
                </Link>
                <Link to="/application" onClick={()=>{ setServiceName("Financial Planning") }}><Card2
                  style='text-white'
                  mode={false} 
                  icon={ <CircleDollarSign size={45} color="#FFFFFF" /> } 
                  color={"bg-blue-400"}
                  title="Financial Planning"
                  content="Plan your finances with confidence. We analyze your revenue, costs, and growth goals to create a practical financial roadmap ensuring stability, smart investment, and long-term profitability for your business journey."/> 
                </Link>
                <Link to="/application" onClick={()=>{ setServiceName("Sales and revenue optimization") }}><Card2 
                  style='text-white'
                  mode={false}
                  icon={ <BanknoteArrowUp size={45} color="#FFFFFF " /> }
                  color={"bg-green-400"}
                  title="Sales optimization"
                  content="Boost your revenue with targeted Sales Optimization. We evaluate your sales process, identify gaps, and implement strategies that increase conversion, enhance team performance, and improve customer retention."/>
                </Link>
                <Link to="/application" onClick={()=>{ setServiceName("Consultation") }}><Card2 
                  style='text-white'
                  mode={false} 
                  icon={ <HeartHandshake size={45} color="#FFFFFF" /> }
                  color={"bg-yellow-400"}
                  title="Consultation"
                  content="Our Consultation service gives you access to expert insights tailored to your business challenges. From strategy to execution, we help you solve problems, generate ideas, seize opportunities, and stay ahead in a fast-changing market."/> 
                </Link>
                <Link to="/application" onClick={()=>{ setServiceName("Location and markrt analysis") }}><Card2
                  style='text-white'
                  mode={false} 
                  icon={ <LocationEdit size={45} color="#FFFFFF" /> } 
                  color={"bg-red-400"}
                  title="Location analysis"
                  content="Choose the best place to grow. Our Location Analysis studies customer demographics, market demand, and competition to help you select optimal locations for expansion and ensure maximum business visibility and performance."/> 
                </Link>
                <Link to="/integrated-report" onClick={()=>{ setServiceName("Integrated Report") }}><Card2 
                  style='text-white'
                  mode={false}
                  icon={ <Paperclip size={45} color="#FFFFFF " /> }
                  color={"bg-pink-400"}
                  title="integrated report"
                  content="After geting a try with our services and tools you can get and visualize your data and analysis an integrated report with all necessary data to make your business better and better, you can download a copy to your local device."/>  
                </Link>
          </div> 
        </motion.div> 

        <motion.div ref={pricingRef} id="pricing" className='w-full h-full bg-secondary flex flex-col justify-evenly items-center pt-20 pb-20'>
          <h1 className='text-white capitalize font-bold text-5xl'>our prices!</h1>
          <p className='font-inter text-white opacity-90 text-sm w-8/12 text-center mt-8! leading-6 capitalize mb-10!'>Our pricing is simple, transparent, and designed to fit every stage of your business journey. Whether you're starting out or scaling up, our plans offer real value—packed with expert services to help you grow smarter at every step.</p>
          <SmallButton name="Apply Now" style={'bg-primary text-white! ms-3!'} to="#services"/>
          <div className='w-10/12 grid grid-cols-3 gap-8 mt-12'>
              <PriceCard 
                  style=''  
                  price="29,99"
                  type="basic plan"
                  details="Our Basic Plan at just 29.99 offers powerful tools to kickstart your growth. Get access to essential business guidance, expert tips, and foundational planning support—perfect for startups or small teams ready to build with confidence."/> 
              <PriceCard
                  style='' 
                  price="49,99"
                  type="basic plan"
                  details="Our Basic Plan at just 49.99 offers powerful tools to kickstart your growth. Get access to essential business guidance, expert tips, and foundational planning support—perfect for startups or small teams ready to build with confidence."/> 
              <PriceCard 
                  style='' 
                  price="79,99"
                  type="basic plan"
                  details="Our Basic Plan at just 79.99 offers powerful tools to kickstart your growth. Get access to essential business guidance, expert tips, and foundational planning support—perfect for startups or small teams ready to build with confidence."/>
          </div> 
        </motion.div> 

        <motion.div ref={contactRef} id="contact" className='w-full h-full flex flex-col justify-center items-center pt-20 pb-20'>
          <h1 className='capitalize font-bold text-6xl'>contact us</h1>
          <p className='font-inter opacity-70 text-sm w-8/12 text-center mt-8! leading-6 capitalize mb-10!'>Have questions or need support? Our team is here to help! Reach out to us for personalized assistance, expert advice, or to learn more about our services. We're ready to guide you toward your business goals—contact us today!</p>
          <div className='flex justify-evenly items-center  w-10/12'>
            <form ref={form} onSubmit={messageSubmit} className='w-6/12 flex flex-col justify-between items-evenly mt-3 pe-6'> 
                <span className='w-full flex justify-center'><CodesandboxIcon size={115} color="#F66A35" /></span>
                <CustomeInput value={message} onChange={(e)=> setMessage(e.target.value)} name={"message"} type={"text"}/> 
                <CustomeTextarea value={subject} onChange={(e)=> setSubject(e.target.value)} name={"subject"} rowNum="5" type={"text"}/>   
                <CustomeButton disabled={disable} name={"contact"} /> 
            </form> 
            <div className='w-6/12'>
              <img className='rounded-2xl' src={contactImg} alt="contact image" loading='lazy' />
            </div>
          </div>
        </motion.div>
    </div>
  ) 
}
