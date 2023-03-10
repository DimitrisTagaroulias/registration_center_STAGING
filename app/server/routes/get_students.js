import express from "express";
const router = express.Router();
import { getAllStudents } from "../controllers/get_students_controller.js";
////////////////////////////////////////////////////////

// GET ALL STUDENTS
router.get("/", getAllStudents);

export { router };
