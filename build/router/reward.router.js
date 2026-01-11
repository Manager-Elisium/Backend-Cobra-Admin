"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RewardRouter = void 0;
const express_1 = __importDefault(require("express"));
const reward_controller_1 = require("src/controller/reward.controller");
const auth_token_1 = require("src/middleware/auth.token");
let router = express_1.default.Router();
exports.RewardRouter = router;
// Admin
router.get("/get-list-days", auth_token_1.verifyAccessToken, reward_controller_1.days);
router.post("/create", auth_token_1.verifyAccessToken, reward_controller_1.insert);
router.post("/create-items", auth_token_1.verifyAccessToken, reward_controller_1.insertItem);
router.get("/paginate/list", auth_token_1.verifyAccessToken, reward_controller_1.allDataList);
router.put("/update/:id", auth_token_1.verifyAccessToken, reward_controller_1.update);
router.put("/delete-items-file/:id", auth_token_1.verifyAccessToken, reward_controller_1.deleteItemFile);
router.put("/update-items-file/:id", auth_token_1.verifyAccessToken, reward_controller_1.updateItemFile);
router.delete("/delete/:id", auth_token_1.verifyAccessToken, reward_controller_1.Delete);
router.get("/get-reward/:id", reward_controller_1.Get);
// Unity
router.get("/list", reward_controller_1.list);
//# sourceMappingURL=reward.router.js.map