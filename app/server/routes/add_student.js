import express from "express";
const router = express.Router();
import { addStudent } from "../controllers/add_student_controller.js";
////////////////////////////////////////////////////////

// ADD STUDENT

router.post("/", addStudent);

export { router };
