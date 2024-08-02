require("dotenv").config();
const { ConnectToDb } = require("./DB/Connection");
ConnectToDb();
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors')
const cookieParser = require('cookie-parser')
// 
const employeeAuthRouter=require("./Router/Auth.router");
const employeeInfoRouter=require("./Router/Employee.router")
// Middlewares
app.use(bodyParser.json());
app.use(cookieParser())
app.use(cors({
  origin: true,
  credentials: true 
}));
// 
app.use('/api/v1/',employeeAuthRouter.router);
app.use('/api/v1/',employeeInfoRouter.router);
app.listen(process.env.PORT, () => {
  console.log(`App is running on port: http://localhost:${process.env.PORT}`);
});
