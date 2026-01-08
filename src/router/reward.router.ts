import express from "express";
import { multerFile } from "src/connection/reward.gridfs";
import { insert, list, allDataList, update, Delete, days, insertItem, deleteItemFile, updateItemFile, Get } from "src/controller/reward.controller";
import { verifyAccessToken } from "src/middleware/auth.token";
import { validate } from "src/services/validation.services";
import { RewardValidation } from "src/validator/reward.validation";

let router = express.Router();
// Admin
router.get("/get-list-days",  verifyAccessToken, days);
router.post("/create", verifyAccessToken, insert);
router.post("/create-items", verifyAccessToken, insertItem);
router.get("/paginate/list", verifyAccessToken, allDataList);
router.put("/update/:id", verifyAccessToken, update);
router.put("/delete-items-file/:id", verifyAccessToken, deleteItemFile);
router.put("/update-items-file/:id", verifyAccessToken, updateItemFile);
router.delete("/delete/:id", verifyAccessToken, Delete);

router.get("/get-reward/:id", Get);
// Unity
router.get("/list", list);

export { router as RewardRouter };