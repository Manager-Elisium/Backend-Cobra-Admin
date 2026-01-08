import express from "express";
import { multerFile } from "src/connection/reward.gridfs";
import { insert, list, allDataList, update, Delete, Get } from "src/controller/mission.controller";
import { verifyAccessToken } from "src/middleware/auth.token";
import { validate } from "src/services/validation.services";
import { MissionValidation } from "src/validator/mission.validator";

let router = express.Router();
// Admin
router.post("/create", multerFile.single('FILE'), verifyAccessToken, insert);
router.get("/paginate/list", verifyAccessToken, allDataList);
router.put("/update/:id", verifyAccessToken, update);
router.delete("/delete/:id", verifyAccessToken, Delete);
router.get("/get-mission/:id", verifyAccessToken, Get);
// Unity
router.get("/list", list);

export { router as MissionRouter };