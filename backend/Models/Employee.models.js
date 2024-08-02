const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt=require('bcryptjs');
const jwt=require("jsonwebtoken");
const employeeSchema = new Schema({
  username: {
    type: String,
    minlength: [5, "username must be at least 5 characters"],
    maxlength: [26, "username must be less than 26 characters"]
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+\@.+\..+/, "Please fill a valid email address"]
  },
  password: {
    type: String,
    required: true,
    minlength: [6, "password must be at least 6 characters"]
  },
  resetPasswordToken: {
    type: String,
    default:""
  },
  profilePic: {
    type: String,
  },
  role: {
    type: String,
    default: "Employee",
  },
  verifyAccountOTP:{
    type:String,
  },
  accessToken:{
    type:String
  }
}, { timestamps: true });
employeeSchema.pre("save", async function (next) {
    try {
      if (!this.isModified("password")) {
        return next();
      }
      const salt = bcrypt.genSaltSync(10);
      const hashPassword = bcrypt.hashSync(this.password, salt);
      this.password = hashPassword;
      next();
    } catch (error) {
      next(error);
    }
  });
  employeeSchema.methods.comparePassword = async function (Password) {
    try {
      return await bcrypt.compare(Password, this.password);
    } catch (error) {
      throw new Error(error);
    }
  };
  employeeSchema.methods.generatesAccessToken = async function () {
      return jwt.sign({ id: this._id }, process.env.AccessToken, {
      expiresIn: "2h",
    });
  };
  employeeSchema.methods.generatesResetPasswordToken = async function () {
      return jwt.sign({ id: this._id }, process.env.AccessToken, {
      expiresIn: "2h",
    });
  };
 

exports.Employee = mongoose.model("Employee", employeeSchema);
