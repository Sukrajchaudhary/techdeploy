const { Employee } = require("../Models/Employee.models");
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
exports.getAllEmployee=async(_,res)=>{
  try {
    const employee= await Employee.find().select("-password -accessToken");
    if(!employee){
      return res.status(400).json({message:"No any Employee Yet"});
    }
    return res.status(200).json({employee,status:true})
  } catch (error) {
    return res.status(400).json(error.message)
  }
}
