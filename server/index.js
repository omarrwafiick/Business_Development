//Packages
const express = require('express');
const cors = require('../node_modules/cors');
const cookieParser = require('cookie-parser');

//Imports
require('../node_modules/dotenv').config();
const DbConnection = require('../server/config/dbConnection');
const indexRoutes = require('../server/routes/index.routes');  
const Seeding = require('../server/utilities/seeding.data');

const app = express();
//Middle ware
app.use(cors({origin:process.env.LOCAL_HOST, Credential: true}));
app.use(cookieParser());
app.use(express.json());

app.use(`${process.env.BASE_URL}`, indexRoutes); 
  
app.listen(process.env.PORT_NUM, async () => {
     DbConnection(process.env.DATABASE_URL);
     console.log(`App is running on port ${process.env.PORT_NUM}`);
     if(!(
               await Seeding.User.countDocuments() > 0 && 
               await Seeding.Role.countDocuments() > 0 &&   
               await Seeding.Service.countDocuments() > 0 &&   
               await Seeding.Category.countDocuments() > 0 &&   
               await Seeding.Qualification.countDocuments() > 0 &&   
               await Seeding.Consultant.countDocuments() > 0 
          ) 
     ){ 
        await Seeding.seedDatabase();
     }
});