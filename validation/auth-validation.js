const { z } = require("zod");

const loginSchema  = z.object
({
    email: z
    .string({required_error: "Email is required"})
    .trim()
    .email(3, {message: "Invalid email address"})
    .min(3, {message: "Email must be at least of 3 chars."})
    .max(255, {message: "Email must not must be more than 255."}),
    password: z
    .string({required_error: "password is required"})
    .trim()
    .min(3, {message: "password must be at least of 3 chars."})
    .max(255, {message: "password must not must be more than 255."})
})

const signupSchema = z.object({
    username: z
    .string({required_error: "Name is required"})
    .trim()
    .min(3, {message: "Name must be at least of 3 chars."})
    .max(255, {message: "Name must not must be more than 255."}),
    email: z
    .string({required_error: "Email is required"})
    .trim()
    .email(3, {message: "Invalid email address"})
    .min(3, {message: "Email must be at least of 3 chars."})
    .max(255, {message: "Email must not must be more than 255."}),
    phone: z
    .string({required_error: "phone is required"})
    .trim()
    .min(3, {message: "phone must be at least of 3 chars."})
    .max(255, {message: "phone must not must be more than 255."}),
    password: z
    .string({required_error: "password is required"})
    .trim()
    .min(3, {message: "password must be at least of 3 chars."})
    .max(255, {message: "password must not must be more than 255."})
})

module.exports = {signupSchema, loginSchema};