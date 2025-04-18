const User = require('../models/user.model'); 
const Role = require('../models/role.model'); 
const mongoose = require('mongoose'); 
const bcrypt = require('bcryptjs');
const Mailing = require('../services/mailing.service');
const { SetUpTokenToCookies } = require('../utilities/setUpTokenToCookies');
 
const SignUp = async (req, res) => {  
    try {
        const { fullName, email, password, phoneNumber } = req.body;

        if (!fullName || !email || !password || !phoneNumber) {
            return res.status(400).json({ success: false, message: "All fields are required!" });
        }
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ success: false, message: "User already exists. Try to sign in!" });
        }

        const hashedPassword = await bcrypt.hash(password, Number(process.env.CRYPTO_KEY)); 

        const role = await Role.findOne({name: process.env.ENTREPRENEUR});

        const newUser = new User({
            email,
            password: hashedPassword,
            fullName,
            phoneNumber,
            rolesId: new mongoose.Types.ObjectId(role.id)
        });

        const result = await newUser.save(); 

        if (!result || !result._id) {
            throw new Error("User couldn't be created");
        }

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
//test
const ForgetPassword = async (req, res) =>{
    const { email } = req.body; 
    console.log(email);
    try { 
        const user = await User.findOne({email: email});
        if(!user){
            return res.status(404).json({success : false, message : "User was not found"});
        } 
        const resetToken = Crypto.randomBytes(20).toString("hex");
        const resetTokenExpiration = Date.now() + 1 * 24 * 24 * 1000;

        user.resetPasswordToken = resetToken;
        user.resetPasswordExpiresAt = resetTokenExpiration;
        await user.save();

        await Mailing(user.email,`${process.env.LOCAL_HOST}/reset-password/${resetToken}`);

        res.status(200).json({success: true, message: "Please check your email"});
    } catch (error) {
        return res.status(400).json({success : false, message : error.message});
    } 
};
//test
const ResetPassword = async (req, res) =>{ 
    const { token } = req.params; 
    const { password } = req.body; 
    try { 
        const user = await User.findOne({resetToken: token, resetTokenExpiration : {$gt: Date.now()}});
        if(!user){
            return res.status(404).json({success : false, message : "Invalid or expired token"});
        }  
        const hashedPassword = await bcrypt.hash(password, Number(process.env.CRYPTO_KEY)); 
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpiresAt = Date.now();
        await user.save(); 
        const message = "Password was reset successfully";
        await Mailing(user.email, message);

        res.status(200).json({success: true, message});
    } catch (error) {
        return res.status(400).json({success : false, message : error.message});
    } 
};
//test
const LogOut = async (req, res) =>{ 
    res.clearCookie("token");
    res.status(200).json({success: true, message: "Logged out successfully"});
};
//test
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