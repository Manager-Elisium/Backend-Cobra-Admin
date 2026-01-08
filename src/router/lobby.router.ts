import express from "express";
import { multerFile } from "src/connection/reward.gridfs";
import { insert, list, allDataList, update, Delete, lobbyNameList, getListForDashboard } from "src/controller/lobby.controller";
import { verifyAccessToken } from "src/middleware/auth.token";
import { validate } from "src/services/validation.services";
import { LobbyValidation } from "src/validator/lobby.validation";

let router = express.Router()
// Admin
router.post("/create", multerFile.single('FILE'), LobbyValidation(), validate, insert);
router.get("/paginate/list", verifyAccessToken, allDataList);
router.put("/update/:id", verifyAccessToken, update);
router.delete("/delete/:id", verifyAccessToken, Delete);
router.get("/lobby-name-list", verifyAccessToken, lobbyNameList);
// Unity
router.get("/list", list);
// Dashboard
router.get('/get-list', getListForDashboard)


export { router as LobbyRouter };