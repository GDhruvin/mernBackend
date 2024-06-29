const Contact = require('../models/contact-model');
const User = require('../models/user-model');

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, { password: 0 });
        if (!users || users.length === 0) {
            return res.status(404).json({ message: "No User Found !" })
        }
        return res.status(200).json(users);
    }
    catch (error) {
        res.status(500).send({ error: 'Internal Server Error' });
    }
}

const getAllContact = async (req, res) => {
    try {
        const contacts = await Contact.find();
        if (!contacts || contacts.length === 0) {
            return res.status(404).json({ message: "No Contacts Found !" })
        }
        return res.status(200).json(contacts);
    }
    catch (error) {
        res.status(500).send({ error: 'Internal Server Error' });
    }
}

const deleteUserByID = async (req, res) => {
    try {
        const userId = req.params.id
        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
            return res.status(404).send({ message: 'User not found' });
        }
        return res.status(200).json({ message: "User successfully delete" });
    }
    catch (error) {
        res.status(500).send({ error: 'Internal Server Error' });
    }
}

const updateUserByID = async (req, res) => {
    try {
        const userId = req.params.id
        const UpdateData = req.body;
        const updateUser = await User.updateOne({_id: userId},{
            $set: UpdateData,
        });
        if (!updateUser) {
            return res.status(404).send({ message: 'User not found' });
        }
        return res.status(200).json({ message: "User successfully update" });
    }
    catch (error) {
        res.status(500).send({ error: 'Internal Server Error' });
    }
}

module.exports = { getAllUsers, getAllContact, deleteUserByID, updateUserByID};
