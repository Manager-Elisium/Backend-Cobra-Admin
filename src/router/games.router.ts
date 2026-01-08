import express from "express";
import { insert, list, allDataList, update, Delete } from "src/controller/games.controller";
import { verifyAccessToken } from "src/middleware/auth.token";
import { validate } from "src/services/validation.services";
import { GamesValidation } from "src/validator/games.validation";

let router = express.Router();
// Admin
router.post("/create", GamesValidation(), validate, insert);
router.get("/paginate/list", verifyAccessToken, allDataList);
router.put("/update/:id", GamesValidation(), validate, verifyAccessToken, update);
router.delete("/delete/:id", verifyAccessToken, Delete);

// Unity
router.get("/list", list);

export { router as GamesRouter };