"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LobbyRouter = void 0;
const express_1 = __importDefault(require("express"));
const reward_gridfs_1 = require("src/connection/reward.gridfs");
const lobby_controller_1 = require("src/controller/lobby.controller");
const auth_token_1 = require("src/middleware/auth.token");
const validation_services_1 = require("src/services/validation.services");
const lobby_validation_1 = require("src/validator/lobby.validation");
let router = express_1.default.Router();
exports.LobbyRouter = router;
// Admin
router.post("/create", reward_gridfs_1.multerFile.single('FILE'), (0, lobby_validation_1.LobbyValidation)(), validation_services_1.validate, lobby_controller_1.insert);
router.get("/paginate/list", auth_token_1.verifyAccessToken, lobby_controller_1.allDataList);
router.put("/update/:id", auth_token_1.verifyAccessToken, lobby_controller_1.update);
router.delete("/delete/:id", auth_token_1.verifyAccessToken, lobby_controller_1.Delete);
router.get("/lobby-name-list", auth_token_1.verifyAccessToken, lobby_controller_1.lobbyNameList);
// Unity
router.get("/list", lobby_controller_1.list);
// Dashboard
router.get('/get-list', lobby_controller_1.getListForDashboard);
//# sourceMappingURL=lobby.router.js.map