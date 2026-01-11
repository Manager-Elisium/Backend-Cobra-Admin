"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingRouter = void 0;
const express_1 = __importDefault(require("express"));
const setting_controller_1 = require("src/controller/setting.controller");
const auth_token_1 = require("src/middleware/auth.token");
let router = express_1.default.Router();
exports.SettingRouter = router;
// Admin
router.post("/create", auth_token_1.verifyAccessToken, setting_controller_1.insert);
router.get("/paginate/list", auth_token_1.verifyAccessToken, setting_controller_1.allDataList);
router.put("/update/:id", auth_token_1.verifyAccessToken, setting_controller_1.update);
router.get("/getSetting/:id", auth_token_1.verifyAccessToken, setting_controller_1.getSetting);
router.delete("/delete/:id", auth_token_1.verifyAccessToken, setting_controller_1.deleteSetting);
// Unity
router.get("/game", setting_controller_1.getDataByGame);
//# sourceMappingURL=setting.router.js.map