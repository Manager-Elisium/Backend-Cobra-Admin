"use strict";
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const games_entity_1 = require("../../domain/games.entity");
const setting_entity_1 = require("src/domain/setting.entity");
// import { TermsAndConditions } from "src/domain/tearms_conditions.entity";
const reward_entity_1 = require("src/domain/reward.entity");
const lobby_entity_1 = require("src/domain/lobby.entity");
const mission_entity_1 = require("src/domain/mission.entity");
const vip_card_entity_1 = require("src/domain/vip-card.entity");
const shop_entity_1 = require("src/domain/shop.entity");
const vip_card_benefits_entity_1 = require("src/domain/vip-card-benefits.entity");
const notification_entity_1 = require("src/domain/notification.entity");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: (_a = process.env.PGHOST) !== null && _a !== void 0 ? _a : "localhost",
    port: (_b = Number(process.env.PGPORT)) !== null && _b !== void 0 ? _b : 5432,
    username: (_c = process.env.PGUSER) !== null && _c !== void 0 ? _c : "postgres",
    password: (_d = process.env.PGPASSWORD) !== null && _d !== void 0 ? _d : "12345678",
    database: (_e = process.env.PGDATABASE) !== null && _e !== void 0 ? _e : "cobra_admin_local",
    synchronize: true,
    logging: false,
    entities: [games_entity_1.MultiGames, setting_entity_1.Setting, reward_entity_1.Reward, lobby_entity_1.Lobby, mission_entity_1.Mission, vip_card_entity_1.VipCard, vip_card_benefits_entity_1.VipCardBenefits, shop_entity_1.Shop, notification_entity_1.Notification],
    migrations: [],
    subscribers: [],
});
//# sourceMappingURL=ormconfig.js.map