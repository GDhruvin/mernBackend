const Contact = require('../models/contact-model');
const Service = require('../models/service-model');
const User = require('../models/user-model')
const bcrypt = require('bcryptjs');

const home = async (req, res) => {
    try {
        res.status(200).send("welcome to world best mern using route");
    }
    catch (error) {
        console.log(error);
    }
}

// const register = async (req, res) => {
//     try {
//         res.status(200).send("welcome to register page using route");
//     }
//     catch (error) {
//         console.log(error);
//     }
// }

const register = async (req, res) => {
    try {
        // console.log(req.body);
        const { username, email, phone, password } = req.body;
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({ message: "email is already exist" });
        }

        // const saltround = 10;
        // const hash_password = await bcrypt.hash(password, saltround);
        // const userCreated = await User.create({username, email, phone, password: hash_password});

        const userCreated = await User.create({ username, email, phone, password });

        res.status(200).json({
            message: "User successfully register",
            token: await userCreated.generateTocken(),
            userId: userCreated._id.toString(),
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const login = async (req, res) => {
    try {
        // console.log(req.body);
        const { email, password } = req.body;
        const userExist = await User.findOne({ email });
        if (!userExist) {
            return res.status(400).json({ message: "User is not found" });
        }
        const user = await userExist.camparePssword(password);

        if (user) {
            res.status(200).json({
                message: "User success login",
                token: await userExist.generateTocken(),
                userId: userExist._id.toString(),
            });
        }
        else {
            res.status(401).json({
                message: "Enter  right email or password",
            });
        }

    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const contact = async (req, res) => {
    try {
        const { username, email, message } = req.body;
        await Contact.create({ username, email, message });
        res.status(200).json({ message: "message send successfully" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "message not delivered" });
    }
}

const user = async (req, res) => {
    try {
      const userData = req.user;
      return res.status(200).json({ msg: userData });
    } catch (error) {
      console.log(` error from user route ${error}`);
    }
  };

const service = async (req, res) => {
    try {
        const response = await Service.find();
        if (!response) {
            res.status(400).json({msg : "Service not found"});
            return;
        }

        res.status(200).json({msg: response})
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = { home, register, login, contact, user, service };


