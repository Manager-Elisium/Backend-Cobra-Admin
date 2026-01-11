"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AchievementRouter = void 0;
const express_1 = __importDefault(require("express"));
const achievement_controller_1 = require("src/controller/achievement.controller");
const auth_token_1 = require("src/middleware/auth.token");
let router = express_1.default.Router();
exports.AchievementRouter = router;
// Admin
router.post("/create", auth_token_1.verifyAccessToken, achievement_controller_1.insert);
router.get("/paginate/list", auth_token_1.verifyAccessToken, achievement_controller_1.allDataList);
router.put("/update/:id", auth_token_1.verifyAccessToken, achievement_controller_1.update);
router.get("/getAchievement/:id", auth_token_1.verifyAccessToken, achievement_controller_1.getAchievement);
router.delete("/delete/:id", auth_token_1.verifyAccessToken, achievement_controller_1.deleteAchievement);
// Unity
router.get("/list", achievement_controller_1.listForUnity);
//# sourceMappingURL=achievement.router.js.map