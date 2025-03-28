const mongoose = require('mongoose'); 
const User = require('../models/user.model');
const Role = require('../models/role.model');
const Service = require('../models/service.model');
const Category = require('../models/category.model');
const Qualification = require('../models/qualification.model');
const Consultant = require('../models/consultant.model');
   
//Seed roles
const seedRoles = async () => {
  const roles = [process.env.ADMIN, process.env.ENTREPRENEUR, process.env.CONSULTANT]; 
  const RoleDocs=  await Promise.all(roles.map(name =>  Role.create({ name })));
  RoleDocs ? console.log('Roles Seeded:') : console.error('Roles Seeding Error:'); 
};

// Seed services
const seedServices = async () => {
  const services = [
    { name: process.env.MARKET_ANALYSIS, description: process.env.MARKET_ANALYSIS_DESCRIPTION },
    { name: process.env.FINANCIAL_PLANNING, description: process.env.FINANCIAL_PLANNING_DESCRIPTION },
    { name: process.env.LOCATION_OPTIMIZATION, description: process.env.LOCATION_OPTIMIZATION_DESCRIPTION },
    { name: process.env.MARKETING_STRATEGY, description: process.env.MARKETING_STRATEGY_DESCRIPTION }
  ];
  const serviceDocs = await Service.insertMany(services);
  serviceDocs ? console.log('Services Seeded:') : console.error('Services Seeding Error:'); 
  return serviceDocs;
};

// Seed categories
const seedCategories = async () => {
  const categories = [ process.env.RETAIL,  process.env.FOOD_BEVERAGE,  process.env.HEALTHCARE,  process.env.TECHNOLOGY];
  const categoryDocs = await Promise.all(categories.map(name => Category.create({ name })));
  categoryDocs ? console.log('Categories Seeded:') : console.error('Categories Seeding Error:'); 
};

// Seed admin
const seedAdmin = async () => {
  const adminRole = await Role.findOne({name: process.env.ADMIN}); 
  const adminDoc = await User.create({ rolesId: adminRole._id, fullName: 'bedaytak Admin', email:"bedaytakAdmin2@bedaytak.com", password:"Bedaytak+18005550199", phoneNumber:"+18005550199"});
  adminDoc ? console.log('Admin Seeded:') : console.error('Admin Seeding Error:'); 
};

// Seed qualifications
const seedQualifications = async () => {
  const qualifications = [
    { title: process.env.MBA, description: process.env.MBA_DESCRIPTION},
    { title: process.env.CERTIFIED_FINANCIAL_ANALYST, description: process.env.CERTIFIED_FINANCIAL_ANALYST_DESCRIPTION },
    { title: process.env.MARKETING_EXPERT, description: process.env.MARKETING_EXPERT_DESCRIPTION }
  ];
  const qualDocs = await Qualification.insertMany(qualifications);
  qualDocs ? console.log('Qualifications Seeded:') : console.error('Qualifications Seeding Error:'); 
  return qualDocs;
};

// Seed consultant with user account
const seedConsultants = async (services, qualifications) => {
  const consultantRole = await Role.find({name: process.env.CONSULTANT});
 
  const consultants = ['Salma Ahmed', 'Ahmed Mahmoud', 'Ibrahim Alaa'];
  for (let i= 0; i < consultants.length; i++) { 
    const consultantUser = await User.create({
        fullName: consultants[i],
        email: `${consultants[i]}.consultant@bedaytak.com`,
        password: 'securePass123',
        role: consultantRole._id
    }); 
    const ConsultantDocs = await Consultant.create({
        salary: 210.0,
        bonus: 20.0,
        user: consultantUser._id,
        services: [services[0]._id, services[1]._id],
        qualifications: [qualifications[1]._id],
        experienceYears: 5
      }); 
    ConsultantDocs ? console.log(`Consultant Seeded Named : ${consultantUser.fullName}`) : console.error(`Consultants Seeding Error: Named : ${consultantUser.fullName}`); 
  };
};

// Main function to seed all data
const seedDatabase = async () => {  
  await seedRoles();
  await seedAdmin();
  const services = await seedServices();
  const qualifications = await seedQualifications();
  await seedConsultants(services, qualifications);
  await seedCategories();  
  console.log('Seeding Completed!');
};

module.exports = { seedDatabase, User, Role, Service, Category, Qualification, Consultant } ;
