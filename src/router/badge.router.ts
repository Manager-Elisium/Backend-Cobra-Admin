import express from "express";
import { allDataList, deleteBadge, getBadge, insert, listForUnity, update } from "src/controller/badge.controller";
import { verifyAccessToken } from "src/middleware/auth.token";

let router = express.Router();

// Admin
router.post("/create", verifyAccessToken, insert);
router.get("/paginate/list", verifyAccessToken, allDataList);
router.put("/update/:id", verifyAccessToken, update);
router.get("/getBadge/:id", verifyAccessToken, getBadge);
router.delete("/delete/:id", verifyAccessToken, deleteBadge);

// Unity
router.get("/list", listForUnity);

export { router as BadgeRouter };