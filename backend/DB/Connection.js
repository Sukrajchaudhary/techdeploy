const mongoose= require('mongoose');
exports.ConnectToDb=async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Database Connected SuccessFully!!");
    } catch (error) {
        console.log(`Connection error`+error.message)
    }
}