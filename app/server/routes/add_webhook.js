import express from "express";
const router = express.Router();
import { addWebhook } from "../controllers/add_webhook_controller.js";
////////////////////////////////////////////////////////

// ADD WEBHOOK EVENT

router.post("/", addWebhook);

export { router };
