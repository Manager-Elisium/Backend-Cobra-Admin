import express from "express";
import { insert, list, allDataList, update, Delete, Get, GetBenefit, UpdateBenefit, deleteEmojiFile, updateEmojiFile, addBenefit, getListForDashboard } from "src/controller/vip_card.controller";
import { verifyAccessToken } from "src/middleware/auth.token";

let router = express.Router();
// Admin
// router.post("/create", multerFile.single('FILE'), VipCardValidation(), validate, insert);
router.post("/create", verifyAccessToken, insert);
router.put("/update/:id", verifyAccessToken, update);
// router.put("/update/:id", multerFile.single('FILE'), VipCardValidation(), validate, update);
router.get("/paginate/list", verifyAccessToken, allDataList);
router.delete("/delete/:id", Delete);
router.get("/get-vip-cards/:id", verifyAccessToken, Get);

router.get("/get-vip-card-benefits/:id", verifyAccessToken, GetBenefit);
router.put("/create-vip-card-benefits/:id", verifyAccessToken, addBenefit);
router.put("/update-vip-card-benefits/:id", verifyAccessToken, UpdateBenefit);
router.put("/delete-vip-card-emoji-file/:id", verifyAccessToken, deleteEmojiFile);
router.put("/update-vip-card-emoji-file/:id", verifyAccessToken, updateEmojiFile);

// Unity
router.get("/list", list);

// Dashboard
router.get('/get-list', getListForDashboard)

export { router as VipCardRouter };