
import express from "express";
import { NextFunction } from "express";
import { Response, Request } from "express";
let router = express.Router();

import { GamesRouter } from "./router/games.router";
router.use("/game", GamesRouter);

import { SettingRouter } from "./router/setting.router";
router.use("/setting", SettingRouter);

import { RewardRouter } from "./router/reward.router";
router.use("/reward", RewardRouter);

import { LobbyRouter } from "./router/lobby.router";
router.use("/lobby", LobbyRouter);

import { MissionRouter } from "./router/mission.router";
router.use("/mission", MissionRouter);

import { VipCardRouter } from "./router/vip_card.router";
router.use("/vip_card", VipCardRouter);

import { ShopRouter } from "./router/shop.router";
router.use("/shop", ShopRouter);

import { NotificationRouter } from "./router/notification.router";
router.use("/notification", NotificationRouter);

import { AchievementRouter } from "./router/achievement.router";
router.use("/achievement", AchievementRouter);

import { BadgeRouter } from "./router/badge.router";
router.use("/badge", BadgeRouter);

import { SeasonRouter } from "./router/season.router";
router.use("/season", SeasonRouter);

router.use((req: Request, res: Response, next: NextFunction) => {
    next(res.status(404).json({ status: false, message: "Not Found." }));
});

export { router as mainRouter };