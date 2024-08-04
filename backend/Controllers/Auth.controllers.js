const { Employee } = require("../Models/Employee.models");
const { SendMail } = require("../utils/Nodemailer");
// Creating Employee
exports.CreateEmployee = async (req, res) => {
  try {
    const { username, email, password } = req.body;
       if ([username, email, password].some((field) => !field)) {
      return res.status(400).json({ message: "All fields is required !!" });
    }
    // cheching existing users
    const isExistingEmail = await Employee.findOne({ email });
    if (isExistingEmail) {
      return res
        .status(400)
        .json({ message: "Sorry these email is Already Exist !" });
    }
    // hashed password
    const newEmployee = new Employee({
      username: username,
      password: password,
      email: email,
    });

    await newEmployee.save();
    return res.status(201).json({
      status: true,
      message: "Employee created successfully",
      employee: newEmployee,
    });
  } catch (error) {
    console.error(error);

    // Check for Mongoose validation errors
    if (error.name === "ValidationError") {
      const errors = Object.keys(error.errors).map((key) => ({
        field: key,
        message: error.errors[key].message,
      }));
      return res.status(400).json({ message: "Validation errors", errors });
    }

    return res.status(500).json({ message: "Internal server error" });
  }
};
// Login Employee
exports.LoginEmployee = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Corrected validation logic
    if ([email, password].some((field) => !field)) {
      return res.status(400).json({ message: "All Fields are Required!" });
    }

    const isExistEmployee = await Employee.findOne({ email });
    if (!isExistEmployee) {
      return res
        .status(400)
        .json({ message: "Sorry, account with this email doesn't exist!" });
    }

    // Check password
    const verifyPassword = await isExistEmployee.comparePassword(password);
    if (!verifyPassword) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    const accessToken = await isExistEmployee.generatesAccessToken();
    isExistEmployee.accessToken = accessToken;
    await isExistEmployee.save();
    return res
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({
        message: "Login Successfully",
        accessToken,
        status: true,
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};
// checkUnique Email
exports.CheckUniqueEmail = async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) return;
    const isUnique = await Employee.findOne({ email });
    if (isUnique) {
      return res
        .status(400)
        .json({ message: "Email already exists!", status: false });
    }
    return res.status(200).json({ message: "Email is unique", status: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

exports.chagePassword = async (req, res) => {
  try {
    const { id } = req.user;

    const { oldPassword, newPassword } = req.body;
    const employee = await Employee.findById({ _id: id });
    if (!employee) return null;

    const isPasswordCorrect = await employee.comparePassword(oldPassword);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Old password is not correct" });
    }
    employee.password = newPassword;
    await employee.save();
    return res
      .status(200)
      .json({ message: "Password update SuccessFully", success: true });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

exports.logoutEmployee = async (req, res) => {
  try {
    const { id } = req.user;
    await Employee.findByIdAndUpdate(
      { _id: id },
      { $set: { accessToken: undefined } },
      { new: true }
    );
    const options = {
      httpOnly: true,
      secure: true,
    };
    res.clearCookie("accessToken", options).json({
      message: "user logout SuccessFully",
      status: true,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
//
exports.sendResetPasswordLink = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await Employee.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "This email does not exist!" });
    }

    const resetPasswordToken = await user.generatesResetPasswordToken();
    user.resetPasswordToken = resetPasswordToken;
    await user.save();

    const subject = "Reset Password Link";
    const link = `https://techjar.onrender.com/Reset-Password?email=${email}&resetPasswordToken=${resetPasswordToken}`;
    const html = `<p>Click here to reset your password: <a href="${link}">Reset Password</a></p>`;

    await SendMail({ email, subject, html });

    return res.status(200).json({
      message: `Reset link successfully sent to ${email}`,
      status: true,
    });
  } catch (error) {
    console.error("Error sending reset password link:", error);
    return res.status(500).json({ message: error.message });
  }
};

//
exports.resetPassword = async (req, res) => {
  try {
    const { email, resetPasswordToken, newPassword } = req.body;
    console.log(req.body);
    const user = await Employee.findOne({
      resetPasswordToken: resetPasswordToken,
      email: email,
    });
    if (!user) {
      return res.status(401).json({ message: "Invalid information" });
    }
    user.password = newPassword;
    await user.save();
    const subject = "Password Reset Successfully";
    const html = `<p>Password Reset Successfully</p>`;
    await SendMail({ email, subject, html });
    return res
      .status(200)
      .json({ message: "Password Reset Successfully", status: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};
