import express from "express";
import { getStats } from "../controller/stats.js";

const router = express.Router();

router.get('/pieStats/:userId',getStats);

export default router;