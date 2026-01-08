import express from "express";
import { insert, allDataList, update, deleteSetting, getSetting, getDataByGame } from "src/controller/setting.controller";
import { verifyAccessToken } from "src/middleware/auth.token";

let router = express.Router();
// Admin
router.post("/create", verifyAccessToken, insert);
router.get("/paginate/list", verifyAccessToken, allDataList);
router.put("/update/:id", verifyAccessToken, update);
router.get("/getSetting/:id", verifyAccessToken, getSetting);
router.delete("/delete/:id", verifyAccessToken, deleteSetting);
// Unity
router.get("/game", getDataByGame);

export { router as SettingRouter };