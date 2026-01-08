import express from "express";
import { multerFile } from "src/connection/reward.gridfs";
import { insert,list,allDataList,update,Delete, Get, GetById, deleteItemFile, updateItemFile } from "src/controller/shop.controller";
import { verifyAccessToken } from "src/middleware/auth.token";
import { validate } from "src/services/validation.services";
import { ShopValidation } from "src/validator/shop.validation";

let router = express.Router();
// Admin
router.post("/create", verifyAccessToken, insert);
router.put("/update/:id", verifyAccessToken, update);
router.get("/paginate/list", verifyAccessToken, allDataList);
router.delete("/delete/:id", verifyAccessToken, Delete);
router.get("/get-shop/:id", verifyAccessToken, Get);
router.put("/delete-items-file/:id", verifyAccessToken, deleteItemFile);
router.put("/update-items-file/:id", verifyAccessToken, updateItemFile);
// Unity
router.get("/list/:id", list);
router.get("/get-shop-for-user/:id", GetById);

export { router as ShopRouter };