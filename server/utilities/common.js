const User = require('../models/user.model'); 
const Application = require('../models/application.model'); 
const Service = require('../models/service.model'); 
const Consultant = require("../models/consultant.model");  
const bcrypt = require('bcryptjs');
const Role = require('../models/role.model'); 
 
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
        rolesId: role.id
    });
 
    if (!newUser || !newUser._id) throw new Error("User couldn't be created");

    await newUser.save();

    return newUser;
};

const createConsultant = async ({ userId, qualificationsIds, experienceYears }) => {
    const userExist = await User.findById(userId);
    console.log(userExist)
    if (!userExist) throw new Error("User was not found");

    const consultantExist = await Consultant.findOne({ userId });
    if (consultantExist) throw new Error("Consultant already exists");

    const newConsultant = await Consultant.create({ 
        userId,
        qualificationsIds,
        experienceYears
    });

    if (!newConsultant || !newConsultant._id) throw new Error('Failed to create new consultant');

    await newConsultant.save();

    return newConsultant;
}; 
 
const VerifyApplication = async (applicantId, applicationId) => await Application.findOne({_id: applicationId, applicantId: applicantId});
 
const VerifyService = async (serviceName, serviceId) => { 
    const service = await Service.findOne({_id: serviceId}); 
    
    return service.name.toLowerCase() === serviceName.toLowerCase();
}
module.exports = {createUser, createConsultant, VerifyApplication, VerifyService}
