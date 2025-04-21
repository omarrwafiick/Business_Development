const User = require('../models/user.model'); 
const Role = require('../models/role.model'); 
const bcrypt = require('bcryptjs');
const crypto = require('crypto'); 
const Mailing = require('../services/mailing.service');
const { SetUpTokenToCookies } = require('../utilities/setUpTokenToCookies');
const { createUser } = require('../utilities/common');
  
const SignUp = async (req, res) => {  
    try {
        const { fullName, email, password, phoneNumber } = req.body;

        if (!fullName || !email || !password || !phoneNumber) {
            return res.status(400).json({ success: false, message: "All fields are required!" });
        }
        const result = await createUser({fullName, email, password, phoneNumber, roleName: String(process.env.ENTREPRENEUR)});

        SetUpTokenToCookies(res, result._id);  

        res.status(201).json({
            success: true,
            message: "User is created successfully",
            user: { ...result._doc, password: undefined }
        });

    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
}; 

const Login = async (req, res) =>{  
    try {
        const { email, password } = req.body;
    
        if(!email || !password){
            throw new Error("All fields are required!");
        }

        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({success : false, message : `User was not found using this email : ${email}`}); 
        }
        const passwordCompare = await bcrypt.compare(password, user.password);

        if(!passwordCompare){
            return res.status(404).json({success : false, message : "User password is incorrect"}); 
        }
        const role = await Role.findById(user.rolesId);

        SetUpTokenToCookies(res, user._id, role);

        res.status(200).json({success: true, message: "User is logged in successfully", user: {...user._doc, password: undefined}});

    } catch (error) {
        return res.status(400).json({success : false, message : error.message});
    }
}

const ForgetPassword = async (req, res) => {
    const { email } = req.body;
    try {
      const user = await User.findOne({ email: email });
      if (!user) {
        return res.status(404).json({ success: false, message: "User was not found" });
      }
  
      const resetToken = crypto.randomBytes(20).toString("hex");
      const resetTokenExpiration = Date.now() + 1 * 24 * 60 * 60 * 1000;  
  
      user.resetToken = resetToken;
      user.resetTokenExpiration = resetTokenExpiration;
  
      await Mailing(
        user.email,
        'Password Reset Request',
        `
          <p>Please click the button below to reset your password:</p>
          <a href="${process.env.LOCAL_HOST}/reset-password/${resetToken}" 
             style="display:inline-block; padding:10px 20px; background-color:#007bff; color:#fff; text-decoration:none; border-radius:5px;">
             Reset Password
          </a>
          <p>If the button doesn't work, copy and paste this link into your browser:</p>
          <p>${process.env.LOCAL_HOST}/reset-password/${resetToken}</p>
        `
      );
  
      await user.save();
  
      res.status(200).json({ success: true, message: "Please check your email" });
    } catch (error) {
      return res.status(400).json({ success: false, message: error.message });
    }
};
 
const ResetPassword = async (req, res) =>{ 
    const { token } = req.params; 
    const { password } = req.body; 
    try { 
        const user = await User.findOne({
            resetToken: token,
            resetTokenExpiration: { $gt: Date.now() } 
        });

        if(!user){
            return res.status(404).json({success : false, message : "Invalid or expired token"});
        }  
        const hashedPassword = await bcrypt.hash(password, Number(process.env.CRYPTO_KEY)); 
        user.password = hashedPassword;
        user.resetToken = "";
        user.resetTokenExpiration = Date.now();
        
        await user.save(); 

        const message = "Password was reset successfully";

        await Mailing(user.email, message);

        res.status(200).json({success: true, message});
    } catch (error) {
        return res.status(400).json({success : false, message : error.message});
    } 
};

 const LogOut = async (req, res) =>{ 
    res.clearCookie("token");
    res.status(200).json({success: true, message: "Logged out successfully"});
};

 const CheckAuth = async (req, res) =>{    
    try {
        const user = await User.findById(req.userId);
        if(!user){
            return res.status(404).json({success : false, message : "User was not found"});
        }
        res.status(200).json({success: true,  user: {...user._doc, password: undefined}});
    } catch (error) {
        return res.status(400).json({success : false, message : error.message});
    }
};

module.exports = { SignUp, Login, ForgetPassword, ResetPassword, LogOut, CheckAuth };