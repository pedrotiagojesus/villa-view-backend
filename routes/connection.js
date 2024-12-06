import express from "express";
import { connection } from "../controllers/connectionController.js";

const router = express.Router();

router.get("/", connection);

export default router;
