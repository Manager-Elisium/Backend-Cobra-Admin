"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GamesRouter = void 0;
const express_1 = __importDefault(require("express"));
const games_controller_1 = require("src/controller/games.controller");
const auth_token_1 = require("src/middleware/auth.token");
const validation_services_1 = require("src/services/validation.services");
const games_validation_1 = require("src/validator/games.validation");
let router = express_1.default.Router();
exports.GamesRouter = router;
// Admin
router.post("/create", (0, games_validation_1.GamesValidation)(), validation_services_1.validate, games_controller_1.insert);
router.get("/paginate/list", auth_token_1.verifyAccessToken, games_controller_1.allDataList);
router.put("/update/:id", (0, games_validation_1.GamesValidation)(), validation_services_1.validate, auth_token_1.verifyAccessToken, games_controller_1.update);
router.delete("/delete/:id", auth_token_1.verifyAccessToken, games_controller_1.Delete);
// Unity
router.get("/list", games_controller_1.list);
//# sourceMappingURL=games.router.js.map