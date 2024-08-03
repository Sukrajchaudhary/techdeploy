const { Employee } = require("../Models/Employee.models");
// getOwninformation
exports.getOwnInfo = async (req, res) => {
  try {
    const { id } = req.user;
    if (!id) return null;
    const userInfo = await Employee.findOne({ _id: id }).select(
      "-password -accessToken"
    );
    if (!userInfo) return;
    return res.status(200).json(userInfo);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// delte
exports.deleteEmployee = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) return null;
    const deleteEmployee = await Employee.findByIdAndDelete(
      { _id: id },
      { new: true }
    );
    if (!deleteEmployee) {
      return res.status(400).json({ message: "User Not Found !" });
    }
    return res
      .status(200)
      .json({
        message: "Employee Delted SuccessFully !",
        status: true,
        deleteEmployee,
      });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//getAll employee
exports.getAllEmployee = async (req, res) => {
  try {
  
    const {id} = req.user || [];
    const employee = await Employee.find({ _id: { $nin: id } }).select("-password -accessToken");
    const totalEmployees = await Employee.countDocuments({ _id: { $nin: id } });
    if (!employee || employee.length === 0) {
      return res.status(400).json({ message: "No employees found" });
    }
    return res.status(200).json({ employee, status: true, total: totalEmployees });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

