"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeasonRouter = void 0;
const express_1 = __importDefault(require("express"));
const season_reward_controller_1 = require("src/controller/season-reward.controller");
const season_controller_1 = require("src/controller/season.controller");
const auth_token_1 = require("src/middleware/auth.token");
let router = express_1.default.Router();
exports.SeasonRouter = router;
// Admin
router.post("/create", auth_token_1.verifyAccessToken, season_controller_1.insert);
router.get("/paginate/list", auth_token_1.verifyAccessToken, season_controller_1.allSeason);
router.put("/update/:id", auth_token_1.verifyAccessToken, season_controller_1.update);
router.get("/getSeason/:id", auth_token_1.verifyAccessToken, season_controller_1.getSeason);
router.delete("/delete/:id", auth_token_1.verifyAccessToken, season_controller_1.deleteSeason);
// Admin
router.get("/reward/paginate/list", auth_token_1.verifyAccessToken, season_reward_controller_1.allSeasonReward);
router.post("/reward/create", season_reward_controller_1.insertSeasonReward);
router.get("/reward/get-season-reward/:id", auth_token_1.verifyAccessToken, season_reward_controller_1.getSeasonReward);
router.put("/reward/update/:id", auth_token_1.verifyAccessToken, season_reward_controller_1.updateSeasonReward);
router.put("/reward/delete-items-file/:id", auth_token_1.verifyAccessToken, season_reward_controller_1.deleteSeasonRewardItemFile);
router.put("/reward/update-items-file/:id", auth_token_1.verifyAccessToken, season_reward_controller_1.updateSeasonRewardItemFile);
router.delete("/reward/delete/:id", auth_token_1.verifyAccessToken, season_reward_controller_1.deleteSeasonReward);
router.get("/get-season-reward", season_controller_1.getSeasonWithReward);
//# sourceMappingURL=season.router.js.map