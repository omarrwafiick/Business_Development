const mongoose = require('mongoose'); 
const User = require('../models/user.model');
const Role = require('../models/role.model');
const Service = require('../models/service.model');
const Category = require('../models/category.model');
const Qualification = require('../models/qualification.model');
const Consultant = require('../models/consultant.model');
   
//Seed roles
const seedRoles = async () => {
  const roles = ['Admin', 'Entrepreneur', 'Consultant'];
  const roleDocs = await Promise.all(roles.map(name =>  Role.create({ name })));
  console.log('Roles Seeded:', roleDocs.map(r => r.name)); 
};

// Seed services
const seedServices = async () => {
  const services = [
    { name: 'Market Analysis', description: 'In-depth market research and analysis.' },
    { name: 'Financial Planning', description: 'Budgeting and financial strategy.' },
    { name: 'Location Optimization', description: 'Best location suggestions for businesses.' },
    { name: 'Marketing Strategy', description: 'Comprehensive marketing consultation.' }
  ];
  const serviceDocs = await Service.insertMany(services);
  console.log('Services Seeded:', serviceDocs.map(s => s.name)); 
};

// Seed categories
const seedCategories = async () => {
  const categories = ['Retail', 'Food & Beverage', 'Healthcare', 'Technology'];
  const categoryDocs = await Promise.all(categories.map(name => Category.create({ name })));
  console.log('Categories Seeded:', categoryDocs.map(c => c.name)); 
};

// Seed qualifications
const seedQualifications = async () => {
  const qualifications = [
    { title: 'MBA', description: 'Master of Business Administration' },
    { title: 'Certified Financial Analyst', description: 'Financial certification' },
    { title: 'Marketing Expert', description: 'Expertise in marketing strategies' }
  ];
  const qualDocs = await Qualification.insertMany(qualifications);
  console.log('Qualifications Seeded:', qualDocs.map(q => q.title)); 
};

// Seed consultant with user account
const seedConsultants = async (roles, services, qualifications) => {
  const consultantRole = roles.find(role => role.name === 'Consultant');
 
  const consultants = ['Salma Ahmed', 'Ahmed Mahmoud', 'Ibrahim Alaa'];
  for (let i= 0; i < consultants.length; i++) { 
    const consultantUser = await User.create({
        fullName: consultants[i],
        email: 'salma.consultant@example.com',
        password: 'securePass123',
        role: consultantRole._id
    }); 
    await Consultant.create({
        salary: 210.0,
        bonus: 20.0,
        user: consultantUser._id,
        services: [services[0]._id, services[1]._id],
        qualifications: [qualifications[1]._id],
        experienceYears: 5
      });
  };

  console.log('Consultant Seeded:', consultantUser.fullName);
};

// Main function to seed all data
const seedDatabase = async () => {  
  const roles = await seedRoles();
  const services = await seedServices();
  const qualifications = await seedQualifications();
  await seedConsultants(roles, services, qualifications);
  await seedCategories();

  mongoose.connection.close();
  console.log('Seeding Completed!');
};

module.exports = { seedDatabase, User, Role, Service, Category, Qualification, Consultant } ;
