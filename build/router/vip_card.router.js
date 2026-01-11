"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VipCardRouter = void 0;
const express_1 = __importDefault(require("express"));
const vip_card_controller_1 = require("src/controller/vip_card.controller");
const auth_token_1 = require("src/middleware/auth.token");
let router = express_1.default.Router();
exports.VipCardRouter = router;
// Admin
// router.post("/create", multerFile.single('FILE'), VipCardValidation(), validate, insert);
router.post("/create", auth_token_1.verifyAccessToken, vip_card_controller_1.insert);
router.put("/update/:id", auth_token_1.verifyAccessToken, vip_card_controller_1.update);
// router.put("/update/:id", multerFile.single('FILE'), VipCardValidation(), validate, update);
router.get("/paginate/list", auth_token_1.verifyAccessToken, vip_card_controller_1.allDataList);
router.delete("/delete/:id", vip_card_controller_1.Delete);
router.get("/get-vip-cards/:id", auth_token_1.verifyAccessToken, vip_card_controller_1.Get);
router.get("/get-vip-card-benefits/:id", auth_token_1.verifyAccessToken, vip_card_controller_1.GetBenefit);
router.put("/create-vip-card-benefits/:id", auth_token_1.verifyAccessToken, vip_card_controller_1.addBenefit);
router.put("/update-vip-card-benefits/:id", auth_token_1.verifyAccessToken, vip_card_controller_1.UpdateBenefit);
router.put("/delete-vip-card-emoji-file/:id", auth_token_1.verifyAccessToken, vip_card_controller_1.deleteEmojiFile);
router.put("/update-vip-card-emoji-file/:id", auth_token_1.verifyAccessToken, vip_card_controller_1.updateEmojiFile);
// Unity
router.get("/list", vip_card_controller_1.list);
// Dashboard
router.get('/get-list', vip_card_controller_1.getListForDashboard);
//# sourceMappingURL=vip_card.router.js.map