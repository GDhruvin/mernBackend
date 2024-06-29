const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    phone: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    }
})

userSchema.pre("save", async function (next) {
    const user = this;

    if (!user.isModified("password")) {
        next();
    }

    try {
        const saltround = await bcrypt.genSalt(10);
        const hash_password = await bcrypt.hash(user.password, saltround);
        user.password = hash_password;
    }
    catch (error) {
        next(error);
    }
})

userSchema.methods.generateTocken = async function () {
    try {
        return jwt.sign({
            userId: this._id.toString(),
            email: this.email,
            isAdmin: this.isAdmin
        },
            process.env.JWT_SECRET_kEY,
            {
                expiresIn: "30d",
            }
        )
    } catch (error) {
        console.log(error);
    }
}

userSchema.methods.camparePssword = async function (password) {
    return bcrypt.compare(password, this.password);
}

const User = new mongoose.model("User", userSchema); // mongo ma User nu users thai gyu hase
module.exports = User;