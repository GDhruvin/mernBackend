const express = require('express');
const adminCantroller = require('../cantroller/admin-cantroller');
const adminMiddleWare = require('../middlevare/adminMiddleWare');
const adminrouter = express.Router();

adminrouter.route("/users").get(adminMiddleWare,adminCantroller.getAllUsers);
adminrouter.route("/contacts").get(adminMiddleWare,adminCantroller.getAllContact);
adminrouter.route("/users/delete/:id").delete(adminMiddleWare,adminCantroller.deleteUserByID);
adminrouter.route("/users/update/:id").patch(adminMiddleWare,adminCantroller.updateUserByID);

module.exports = adminrouter;