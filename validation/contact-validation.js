const { z } = require("zod");

const contactValidation = z.object({
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
    message: z
    .string({required_error: "message is required"})
    .trim()
    .min(3, {message: "message must be at least of 3 chars."})
    .max(255, {message: "message must not must be more than 255."}),
})

module.exports = contactValidation;