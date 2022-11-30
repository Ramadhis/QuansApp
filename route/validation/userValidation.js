import { body, validationResult } from "express-validator";
import { validateRequest } from "./../../middleware/validateRequest.js";

const loginValidation = [body("email").notEmpty().isEmail().withMessage("email tidak valid"), body("password").notEmpty().isLength({ min: 3 }).withMessage("password tidak valid"), validateRequest];
const registerValidation = [
  body("name").notEmpty().trim().withMessage("nama tidak valid"),
  body("job").notEmpty().trim().withMessage("job tidak valid"),
  body("email").notEmpty().bail().isEmail().bail().withMessage("email tidak valid"),
  body("password").notEmpty().isLength({ min: 3 }).withMessage("password tidak valid"),
  validateRequest,
];
const updateProfileValidation = [
  body("name").notEmpty().trim().withMessage("nama tidak valid"),
  body("job").notEmpty().trim().withMessage("job tidak valid"),
  body("email").notEmpty().bail().isEmail().bail().withMessage("email tidak valid"),
  validateRequest,
];

export { loginValidation, registerValidation, updateProfileValidation };
