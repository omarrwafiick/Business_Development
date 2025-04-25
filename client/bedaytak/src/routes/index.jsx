import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/home';
import Login from '../pages/login';
import Signup from '../pages/signup';
import AddBusiness from '../pages/add_business';
import ForgetPassword from '../pages/forget_password';
import ResetPassword from '../pages/reset_password';
const RoutesConfig  = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/business" element={<AddBusiness />} />
    <Route path="/forget-password" element={<ForgetPassword />} />
    <Route path="/reset-password" element={<ResetPassword />} />
    <Route path="*" element={<>not found</>} />
  </Routes>
);
export default RoutesConfig;

