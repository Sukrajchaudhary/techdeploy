const express=require("express");
const router=express.Router();
const {verifyJWT}=require("../Middlewares/Auth.middleware");
const {getOwnInfo,getAllEmployee,}=require("../Controllers/Employee.controller")
router.get("/own",verifyJWT,getOwnInfo)
.get("/allemployee",verifyJWT,getAllEmployee);

exports.router=router;