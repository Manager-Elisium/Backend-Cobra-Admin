"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mission = void 0;
const typeorm_1 = require("typeorm");
const lobby_entity_1 = require("./lobby.entity");
var MissionType;
(function (MissionType) {
    MissionType["EASY"] = "Easy";
    MissionType["MEDIUM"] = "Medium";
    MissionType["HARD"] = "Hard";
})(MissionType || (MissionType = {}));
var TaskKey;
(function (TaskKey) {
    TaskKey["SEND_GIFT_FRIEND"] = "Send Gift Friend";
    TaskKey["COLLECT_GIFT_FRIEND"] = "Collect Gift Friend";
    TaskKey["ADD_NEW_FRIEND"] = "Add New Friend";
    TaskKey["PLAY_INSTANT_GAME"] = "Play Instant Game";
    TaskKey["PLAY_LOBBY_GAME"] = "Play Lobby Game";
    TaskKey["SEND_RECEIVE_CHIP_CLUB"] = "Send | Receive Chip Club";
    TaskKey["BUY_SHOP"] = "Buy Shop";
    TaskKey["FIRST_WIN_PER_DAY"] = "First Win Day";
    TaskKey["WIN_INSTANT_GAME"] = "Win Instant Game";
    TaskKey["DISCARD_CARD"] = "Discard Card";
    TaskKey["WIN_LOBBY_GAME"] = "Win Lobby Game";
    TaskKey["EVADE_PENALTY_GAME"] = "Evade Penalty";
    TaskKey["WIN_LOBBY_GAME_IN_ROW"] = "Win Row Lobby Game";
    TaskKey["JOINT_CLUB"] = "Joint Club";
})(TaskKey || (TaskKey = {}));
let Mission = class Mission extends typeorm_1.BaseEntity {
};
exports.Mission = Mission;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid", { name: "ID" }),
    __metadata("design:type", String)
], Mission.prototype, "ID", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Mission.prototype, "FILE", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Mission.prototype, "BUCKET_NAME", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: MissionType }),
    __metadata("design:type", String)
], Mission.prototype, "TYPE", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Mission.prototype, "KEY", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Mission.prototype, "TITLE", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Mission.prototype, "TEXT", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: TaskKey }),
    __metadata("design:type", String)
], Mission.prototype, "TASK_KEY", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => lobby_entity_1.Lobby, lobby => lobby.ID, { nullable: true }),
    __metadata("design:type", lobby_entity_1.Lobby)
], Mission.prototype, "TASK_LOBBY_ID", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Mission.prototype, "TASK_VALUE", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', default: [] }),
    __metadata("design:type", Object)
], Mission.prototype, "MISSIONS", void 0);
__decorate([
    (0, typeorm_1.Column)('timestamp with time zone', { nullable: true }),
    __metadata("design:type", Date)
], Mission.prototype, "UPDATED_DATE", void 0);
__decorate([
    (0, typeorm_1.Column)('timestamp with time zone', { nullable: false, default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Mission.prototype, "CREATED_DATE", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Mission.prototype, "IS_DELETED", void 0);
exports.Mission = Mission = __decorate([
    (0, typeorm_1.Entity)({ name: "MISSION" })
], Mission);
//# sourceMappingURL=mission.entity.js.map