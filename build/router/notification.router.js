"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationRouter = void 0;
const express_1 = __importDefault(require("express"));
const notification_controller_1 = require("src/controller/notification.controller");
const auth_token_1 = require("src/middleware/auth.token");
let router = express_1.default.Router();
exports.NotificationRouter = router;
// Admin
router.post("/create", auth_token_1.verifyAccessToken, notification_controller_1.insertNotification);
router.get("/paginate/list", auth_token_1.verifyAccessToken, notification_controller_1.listNotification);
router.get("/:id", auth_token_1.verifyAccessToken, notification_controller_1.getNotification);
router.delete("/delete/:id", auth_token_1.verifyAccessToken, notification_controller_1.deleteNotification);
//# sourceMappingURL=notification.router.js.map