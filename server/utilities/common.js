const User = require('../models/user.model'); 
const Consultant = require("../models/consultant.model");  
const bcrypt = require('bcryptjs');
const Role = require('../models/role.model'); 
const mongoose = require('mongoose'); 

const createUser = async ({ fullName, email, password, phoneNumber, roleName }) => {
    const existingUser = await User.findOne({ email });
    if (existingUser) throw new Error("User already exists. Try to sign in!");

    const hashedPassword = await bcrypt.hash(password, Number(process.env.CRYPTO_KEY));
    const role = await Role.findOne({ name: roleName });

    const newUser = new User({
        email,
        password: hashedPassword,
        fullName,
        phoneNumber,
        rolesId: new mongoose.Types.ObjectId(role.id)
    });

    const result = await newUser.save();
    if (!result || !result._id) throw new Error("User couldn't be created");

    return result;
};

const createConsultant = async ({ salary, bonus, userId, qualificationsIds, experienceYears }) => {
    const userExist = await User.findById(userId);
    console.log(userExist)
    if (!userExist) throw new Error("User was not found");

    const consultantExist = await Consultant.findOne({ userId });
    if (consultantExist) throw new Error("Consultant already exists");

    const newConsultant = await Consultant.create({
        salary,
        bonus,
        userId,
        qualificationsIds,
        experienceYears
    });

    const result = await newConsultant.save();
    if (!result || !result._id) throw new Error('Failed to create new consultant');

    return result;
}; 

module.exports = {createUser, createConsultant}
