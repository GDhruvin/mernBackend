const express = require('express');
const router = express.Router();
const authControllers = require("../cantroller/auth-cantroller");
const {signupSchema, loginSchema} = require('../validation/auth-validation');
const validate = require('../middlevare/validate');
const contactValidation = require('../validation/contact-validation');
const authMiddleWare = require('../middlevare/authMiddleWare');

router.route("/").get(authControllers.home);
router.route("/register").post(validate(signupSchema),authControllers.register);
router.route("/login").post(validate(loginSchema),authControllers.login);
router.route("/contact").post(validate(contactValidation),authControllers.contact);
router.route("/user").get(authMiddleWare,authControllers.user);
router.route("/service").get(authControllers.service);

module.exports = router;