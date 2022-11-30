import { body, validationResult } from "express-validator";
import { validateRequest } from "./../../middleware/validateRequest.js";

const searchQuansValidation = [body("search").trim().notEmpty().withMessage("Search tidak valid"), validateRequest];

const AddQuestionValidation = [body("question").trim().notEmpty().withMessage("Question tidak valid"), body("tag").trim().notEmpty().withMessage("tag tidak valid"), validateRequest];
const answerValidation = [body("answer").trim().notEmpty().withMessage("Answer tidak valid"), validateRequest];

export { searchQuansValidation, AddQuestionValidation, answerValidation };
