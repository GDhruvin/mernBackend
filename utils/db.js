// mongodb://127.0.0.1:27017/

const mongoose = require("mongoose");

//mOnN1Mr32r3kAbH8
// const URL = "mongodb://127.0.0.1:27017/mern_admin";
const URL = process.env.MONGO_URL;

const connectDB = async () => {
    try{
        await mongoose.connect(URL);
        console.log("database connection successfully");
    }
    catch(error){
        console.error("database connection fail");
        process.exit(0);
    }
}

module.exports = connectDB;

// {
//     "email":"dhruvin5@gamil.com",
//     "password":"qwerty123"
// }