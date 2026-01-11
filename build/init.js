"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainRouter = void 0;
const express_1 = __importDefault(require("express"));
let router = express_1.default.Router();
exports.mainRouter = router;
const games_router_1 = require("./router/games.router");
router.use("/game", games_router_1.GamesRouter);
const setting_router_1 = require("./router/setting.router");
router.use("/setting", setting_router_1.SettingRouter);
const reward_router_1 = require("./router/reward.router");
router.use("/reward", reward_router_1.RewardRouter);
const lobby_router_1 = require("./router/lobby.router");
router.use("/lobby", lobby_router_1.LobbyRouter);
const mission_router_1 = require("./router/mission.router");
router.use("/mission", mission_router_1.MissionRouter);
const vip_card_router_1 = require("./router/vip_card.router");
router.use("/vip_card", vip_card_router_1.VipCardRouter);
const shop_router_1 = require("./router/shop.router");
router.use("/shop", shop_router_1.ShopRouter);
const notification_router_1 = require("./router/notification.router");
router.use("/notification", notification_router_1.NotificationRouter);
const achievement_router_1 = require("./router/achievement.router");
router.use("/achievement", achievement_router_1.AchievementRouter);
const badge_router_1 = require("./router/badge.router");
router.use("/badge", badge_router_1.BadgeRouter);
const season_router_1 = require("./router/season.router");
router.use("/season", season_router_1.SeasonRouter);
router.use((req, res, next) => {
    next(res.status(404).json({ status: false, message: "Not Found." }));
});
//# sourceMappingURL=init.js.map