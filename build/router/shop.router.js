"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShopRouter = void 0;
const express_1 = __importDefault(require("express"));
const shop_controller_1 = require("src/controller/shop.controller");
const auth_token_1 = require("src/middleware/auth.token");
let router = express_1.default.Router();
exports.ShopRouter = router;
// Admin
router.post("/create", auth_token_1.verifyAccessToken, shop_controller_1.insert);
router.put("/update/:id", auth_token_1.verifyAccessToken, shop_controller_1.update);
router.get("/paginate/list", auth_token_1.verifyAccessToken, shop_controller_1.allDataList);
router.delete("/delete/:id", auth_token_1.verifyAccessToken, shop_controller_1.Delete);
router.get("/get-shop/:id", auth_token_1.verifyAccessToken, shop_controller_1.Get);
router.put("/delete-items-file/:id", auth_token_1.verifyAccessToken, shop_controller_1.deleteItemFile);
router.put("/update-items-file/:id", auth_token_1.verifyAccessToken, shop_controller_1.updateItemFile);
// Unity
router.get("/list/:id", shop_controller_1.list);
router.get("/get-shop-for-user/:id", shop_controller_1.GetById);
//# sourceMappingURL=shop.router.js.map