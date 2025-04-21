const bcrypt = require('bcryptjs');
const mongoose = require("mongoose"); 
const User = require('../models/user.model');
const Role = require('../models/role.model');
const Service = require('../models/service.model');
const Category = require('../models/category.model');
const Qualification = require('../models/qualification.model');
const Consultant = require('../models/consultant.model'); 
//Seed roles
const seedRoles = async () => {
  const roles = [
    { name: process.env.ADMIN },
    { name: process.env.ENTREPRENEUR },
    { name: process.env.CONSULTANT }
  ];

  const RoleDocs = await Role.insertMany(roles);

  if (!RoleDocs || RoleDocs.length === 0) {
    throw new Error("Roles seeding failed");
  }

  console.log("Roles Seeded:", RoleDocs);
  return RoleDocs; 
};

// Seed services
const seedServices = async () => { 
  const services = [
      { 
          name: process.env.FINANCIAL_PLANNING, 
          description: process.env.FINANCIAL_PLANNING_DESCRIPTION, 
          amount: mongoose.Types.Decimal128.fromString(process.env.FINANCIAL_PLANNING_AMOUNT || 0.00)
      },
      {  
          name: process.env.LOCATION_MARKET_ANALYSIS, 
          description: process.env.LOCATION_MARKET_ANALYSIS_DESCRIPTION , 
          amount: mongoose.Types.Decimal128.fromString(process.env.LOCATION_MARKET_ANALYSIS_AMOUNT || 0.00)
      },
      { 
          name: process.env.SALES_REVENUE_OPTIMIZATION, 
          description: process.env.SALES_REVENUE_OPTIMIZATION_DESCRIPTION, 
          amount: mongoose.Types.Decimal128.fromString(process.env.SALES_REVENUE_OPTIMIZATION_AMOUNT || 0.00)
      },
      { 
          name: process.env.CONSULTANCY, 
          description: process.env.CONSULTANCY_DESCRIPTION, 
          amount: mongoose.Types.Decimal128.fromString(process.env.CONSULTANCY_AMOUNT || 0.00)
      }
  ];
  
  const serviceDocs = await Service.insertMany(services);
  serviceDocs ? console.log('Services Seeded:') : console.error('Services Seeding Error:'); 
  return serviceDocs;
};

// Seed categories
const seedCategories = async () => {
  const categories = [ {name: process.env.RETAIL}, {name: process.env.FOOD_BEVERAGE} , {name: process.env.HEALTHCARE} ];
  const categoryDocs = await Category.insertMany(categories);
  categoryDocs ? console.log('Categories Seeded:') : console.error('Categories Seeding Error:'); 
};

// Seed admin
const seedAdmin = async () => { 
  console.log("ENV ADMIN VALUE:", process.env.ADMIN);
  const adminRole = await Role.findOne({ name: process.env.ADMIN })

  if (!adminRole) {
    throw new Error("Admin role not found!");
  }

  const hashedPassword = await bcrypt.hash(process.env.DEFAULT_PASSWORD, Number(process.env.CRYPTO_KEY));

  const adminDoc = await User.create(
      { rolesId: adminRole._id,
        fullName: process.env.ADMIN_USERNAME, 
        email: process.env.ADMIN_EMAIL, 
        password: hashedPassword , 
        phoneNumber: process.env.DEFAULT_PHONE_NUMBER
      }
    );

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
  const consultantRole = await Role.findOne({name: process.env.CONSULTANT});
 
  const consultants = [process.env.CONSULTANT_1, process.env.CONSULTANT_2, process.env.CONSULTANT_3];
  for ( let i = 0; i < consultants.length; i++ ){ 

    const hashedPassword = await bcrypt.hash(process.env.DEFAULT_PASSWORD, Number(process.env.CRYPTO_KEY));

    const consultantUser = await User.create(
      {
          fullName: consultants[i],
          email: `${consultants[i].replace(" ", "")}.consultant@bedaytak.com`, 
          password: hashedPassword,
          phoneNumber: process.env.DEFAULT_PHONE_NUMBER,
          rolesId: consultantRole._id
        }
      ); 
  
    const ConsultantDocs = await Consultant.create(
        {
          salary: mongoose.Types.Decimal128.fromString(process.env.DEFAULT_SALARY || 0.00) ,
          bonus:  mongoose.Types.Decimal128.fromString(process.env.DEFAULT_BONUS || 0.00),
          userId: consultantUser._id, 
          servicesIds: [services[0]._id, services[1]._id], 
          qualificationsIds: [qualifications[1]._id], 
          experienceYears: 5
        }
      ); 

    ConsultantDocs ? console.log(`Consultant Seeded Named : ${consultantUser.fullName}`) : console.error(`Consultants Seeding Error: Named : ${consultantUser.fullName}`); 
  };
};
 
// Main function to seed all data
const seedDatabase = async () => { 
  try {
      await seedRoles(); 
      const services = await seedServices();
      const qualifications = await seedQualifications();
      await seedCategories();
      await seedConsultants(services, qualifications);
      await seedAdmin();
 
      console.log("Seeding Completed!");
  } catch (error) { 
      console.error("Seeding Failed!", error);
  } 
};

module.exports = { seedDatabase, User, Role, Service, Category, Qualification, Consultant } ;
