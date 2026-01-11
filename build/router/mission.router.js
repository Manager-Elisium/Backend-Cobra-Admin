"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MissionRouter = void 0;
const express_1 = __importDefault(require("express"));
const reward_gridfs_1 = require("src/connection/reward.gridfs");
const mission_controller_1 = require("src/controller/mission.controller");
const auth_token_1 = require("src/middleware/auth.token");
let router = express_1.default.Router();
exports.MissionRouter = router;
// Admin
router.post("/create", reward_gridfs_1.multerFile.single('FILE'), auth_token_1.verifyAccessToken, mission_controller_1.insert);
router.get("/paginate/list", auth_token_1.verifyAccessToken, mission_controller_1.allDataList);
router.put("/update/:id", auth_token_1.verifyAccessToken, mission_controller_1.update);
router.delete("/delete/:id", auth_token_1.verifyAccessToken, mission_controller_1.Delete);
router.get("/get-mission/:id", auth_token_1.verifyAccessToken, mission_controller_1.Get);
// Unity
router.get("/list", mission_controller_1.list);
//# sourceMappingURL=mission.router.js.map