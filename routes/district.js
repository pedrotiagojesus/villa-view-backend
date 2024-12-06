import express from "express";
import {
    listDistrict,
    createDistrict,
    truncate,
    loadData,
} from "../controllers/districtController.js";

const router = express.Router();

router.get("/", listDistrict);
router.post("/", createDistrict);

router.get("/truncate", truncate);
router.get("/load-data", loadData);

export default router;
