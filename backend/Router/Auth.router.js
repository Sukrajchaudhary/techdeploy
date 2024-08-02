const express = require("express");
const router = express.Router();
const {
  CreateEmployee,
  LoginEmployee,
  CheckUniqueEmail,
  chagePassword,logoutEmployee,
  sendResetPasswordLink,
  resetPassword
} = require("../Controllers/Auth.controllers");
const { verifyJWT } = require("../Middlewares/Auth.middleware");

router
  .post("/create-employee", CreateEmployee)
  .post("/login", LoginEmployee)
  .post("/check-email",CheckUniqueEmail)
  .post("/update-password",verifyJWT,chagePassword)
  .post("/logout",verifyJWT,logoutEmployee)
  .post("/reset-link",sendResetPasswordLink)
  .post("/setpassword",resetPassword)

exports.router = router;
