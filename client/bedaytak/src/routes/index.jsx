import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/home';
import Login from '../pages/login';
import Signup from '../pages/signup';
import AddBusiness from '../pages/add_business';
import ForgetPassword from '../pages/forget_password';
import ResetPassword from '../pages/reset_password';
import NotFound from '../pages/not-found'; 
import Admin from '../pages/admin';
import Application from '../pages/application';
import Consultant from '../pages/consultant';
import ConsultantService from '../pages/consultant_service';
import GuidanceService from '../pages/guidance_service';
import FeasibilityService from '../pages/feasibility_service';
import LocationService from '../pages/location_service';
import Payment from '../pages/payment';
import Review from '../pages/review';
import SalesService from '../pages/sales_service';
import ChooseConsultant from '../pages/choose-consultant'; 
 
const RoutesConfig  = () => ( 
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/business" element={<AddBusiness />} />
    <Route path="/forget-password" element={<ForgetPassword />} />
    <Route path="/reset-password" element={<ResetPassword />} />
    <Route path="/admin" element={<Admin />} />
    <Route path="/application" element={<Application />} />
    <Route path="/consultant" element={<Consultant />} />
    <Route path="/sales-service" element={<SalesService />} />
    <Route path="/consultant-service" element={<ConsultantService />} />
    <Route path="/consultant-select" element={<ChooseConsultant />} />
    <Route path="/guidance-service" element={<GuidanceService />} />
    <Route path="/feasibility-service" element={<FeasibilityService />} />
    <Route path="/location-service" element={<LocationService />} />
    <Route path="/payment" element={<Payment />} />
    <Route path="/sales-service" element={<SalesService />} />
    <Route path="/review" element={<Review />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);
export default RoutesConfig;

