"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadgeRouter = void 0;
const express_1 = __importDefault(require("express"));
const badge_controller_1 = require("src/controller/badge.controller");
const auth_token_1 = require("src/middleware/auth.token");
let router = express_1.default.Router();
exports.BadgeRouter = router;
// Admin
router.post("/create", auth_token_1.verifyAccessToken, badge_controller_1.insert);
router.get("/paginate/list", auth_token_1.verifyAccessToken, badge_controller_1.allDataList);
router.put("/update/:id", auth_token_1.verifyAccessToken, badge_controller_1.update);
router.get("/getBadge/:id", auth_token_1.verifyAccessToken, badge_controller_1.getBadge);
router.delete("/delete/:id", auth_token_1.verifyAccessToken, badge_controller_1.deleteBadge);
// Unity
router.get("/list", badge_controller_1.listForUnity);
//# sourceMappingURL=badge.router.js.map