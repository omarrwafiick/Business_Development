
const userRoutes = require('../routes/user.routes'); 
const businessRoutes = require('../routes/business.routes');
const locationRoutes = require('../routes/location.routes');
const serviceRoutes = require('../routes/service.routes');
const consultantRoutes = require('../routes/consultant.routes');

app.use(`${process.env.BASE_URL}/users`, userRoutes); 
app.use(`${process.env.BASE_URL}/businesses`, businessRoutes);
app.use(`${process.env.BASE_URL}/locations`, locationRoutes);
app.use(`${process.env.BASE_URL}/service`, serviceRoutes);
app.use(`${process.env.BASE_URL}/consultants`, consultantRoutes);