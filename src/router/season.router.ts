import express from "express";
import { allSeasonReward, deleteSeasonReward, deleteSeasonRewardItemFile, getSeasonReward, insertSeasonReward, updateSeasonReward, updateSeasonRewardItemFile } from "src/controller/season-reward.controller";
import { allSeason, deleteSeason, getSeason, getSeasonWithReward, insert, update } from "src/controller/season.controller";
import { verifyAccessToken } from "src/middleware/auth.token";

let router = express.Router();

// Admin
router.post("/create", verifyAccessToken, insert);
router.get("/paginate/list", verifyAccessToken, allSeason);
router.put("/update/:id", verifyAccessToken, update);
router.get("/getSeason/:id", verifyAccessToken, getSeason);
router.delete("/delete/:id", verifyAccessToken, deleteSeason);

// Admin
router.get("/reward/paginate/list", verifyAccessToken, allSeasonReward);
router.post("/reward/create", insertSeasonReward);
router.get("/reward/get-season-reward/:id", verifyAccessToken, getSeasonReward);
router.put("/reward/update/:id", verifyAccessToken, updateSeasonReward);
router.put("/reward/delete-items-file/:id", verifyAccessToken, deleteSeasonRewardItemFile);
router.put("/reward/update-items-file/:id", verifyAccessToken, updateSeasonRewardItemFile);
router.delete("/reward/delete/:id", verifyAccessToken, deleteSeasonReward);


router.get("/get-season-reward", getSeasonWithReward);

export { router as SeasonRouter };