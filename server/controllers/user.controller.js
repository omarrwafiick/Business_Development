const User = require('../models/user.model');
const Role = require('../models/role.model');
const bcrypt = require('bcryptjs');
const { SetUpTokenToCookies } = require('../utilities/setUpTokenToCookies');

const Test = async (req, res) =>{
    res.send("Test route works");
}

const SignUp = async (req, res) =>{ 
    const {fullName, email, password, phoneNumber} = res.body;
    if(!fullName || !email || !password || !phoneNumber){
        throw new Error("All fields are required!");
    }

    try {
        const user = User.findOne({email});
        if(user){
            throw new Error("User is already created try to sign in!");
        }
        const hashedPassword = bcrypt.hash(password, Number(process.env.CRYPTO_KEY)); 
        const newUser = new User({
            email,
            password : hashedPassword,
            fullName,
            phoneNumber
        });

        await newUser.save();

        const roleName = "Entrepreneur";

        const role = Role.findOne({name: roleName});

        SetUpTokenToCookies(res, newUser._id, role.name);

        res.status(201).json({success: true, message: "User is created successfully", user: {...user._doc, password: undefined}});

    } catch (error) {
        return res.status(400).json({success : false, message : error.message});
    }
}

const Login = async (req, res) =>{ 
    const { email, password } = res.body;

    if(!email || !password){
        throw new Error("All fields are required!");
    }

    try {
        const user = User.findOne({email});
        if(!user){
            return res.status(404).json({success : false, message : `User was not found using this email : ${email}`}); 
        }
        const passwordCompare = bcrypt.compare(password, user.password);

        if(!passwordCompare){
            return res.status(404).json({success : false, message : "User password is incorrect"}); 
        }

        SetUpTokenToCookies(res, newUser._id, role.name);

        res.status(200).json({success: true, message: "User is logged in successfully", user: {...user._doc, password: undefined}});

    } catch (error) {
        return res.status(400).json({success : false, message : error.message});
    }
}
 
//use verify token middleware
module.exports = { Test, SignUp, Login };