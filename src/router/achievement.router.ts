import express from "express";
import { allDataList, deleteAchievement, getAchievement, insert, listForUnity, update } from "src/controller/achievement.controller";
import { verifyAccessToken } from "src/middleware/auth.token";
import { validate } from "src/services/validation.services";

let router = express.Router();

// Admin
router.post("/create", verifyAccessToken, insert);
router.get("/paginate/list", verifyAccessToken, allDataList);
router.put("/update/:id", verifyAccessToken, update);
router.get("/getAchievement/:id", verifyAccessToken, getAchievement);
router.delete("/delete/:id", verifyAccessToken, deleteAchievement);
// Unity
router.get("/list", listForUnity);

export { router as AchievementRouter };