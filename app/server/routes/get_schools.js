import express from "express";
const router = express.Router();
import {
  getAllSchools,
  getSchoolById,
} from "../controllers/get_schools_controller.js";
////////////////////////////////////////////////////////

// GET ALL SCHOOLS
router.get("/", getAllSchools);

////////////////////////////////////////////////////////

// GET SCHOOL BY ID
router.get("/:id", getSchoolById);

export { router };
