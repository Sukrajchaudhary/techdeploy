const { Employee} = require("../Models/Employee.models");
const jwt = require("jsonwebtoken");
exports.verifyJWT = async (req, res, next) => {
  try {
    const token =
      req.cookies.accessToken ||
      req.header("Authorization").replace("Bearer ", "");
          if (!token) {
      throw new Error("Token Not Found");
    }
    const decodedToken = jwt.verify(token, process.env.AccessToken);
    const user = await Employee.findById(decodedToken?.id).select('-password -accessToken');
    if (!user) {
      return res.status(401).json({
        message: "Invalid Access Token",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json(error.message);
  }
};