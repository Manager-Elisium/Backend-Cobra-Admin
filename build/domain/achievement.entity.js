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
exports.Achievement = void 0;
const typeorm_1 = require("typeorm");
const lobby_entity_1 = require("./lobby.entity");
var AchievementKey;
(function (AchievementKey) {
    AchievementKey["LUCKY_STREAK"] = "Lucky Streak";
    AchievementKey["COBRA_CHARMER"] = "Cobra Charmer";
    AchievementKey["GLOBE_TROTTER"] = "Globe Trotter";
    AchievementKey["HIGH_ROLLER"] = "High Roller";
    AchievementKey["SLICK_N_QUICK"] = "Slick n Quick";
})(AchievementKey || (AchievementKey = {}));
var TaskKey;
(function (TaskKey) {
    TaskKey["WIN_ROW_GAME"] = "Win Game in Row";
    TaskKey["EVADE_PENALTY"] = "Evade Penalty";
    TaskKey["PLAY_ALL_LOBBY"] = "Play All Lobby";
    TaskKey["WIN_SELECT_LOBBY"] = "Win Selected Lobby Match";
    TaskKey["LEVEL_UP_PER_DAY"] = "Level Up Per Day";
})(TaskKey || (TaskKey = {}));
let Achievement = class Achievement extends typeorm_1.BaseEntity {
};
exports.Achievement = Achievement;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid", { name: "ID" }),
    __metadata("design:type", String)
], Achievement.prototype, "ID", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: AchievementKey }),
    __metadata("design:type", String)
], Achievement.prototype, "TYPE", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Achievement.prototype, "BUCKET_NAME", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Achievement.prototype, "KEY", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Achievement.prototype, "TEXT", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: TaskKey }),
    __metadata("design:type", String)
], Achievement.prototype, "TASK_KEY", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => lobby_entity_1.Lobby, lobby => lobby.ID, { nullable: true }),
    __metadata("design:type", lobby_entity_1.Lobby)
], Achievement.prototype, "TASK_LOBBY_ID", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Achievement.prototype, "TASK_VALUE", void 0);
__decorate([
    (0, typeorm_1.Column)('timestamp with time zone', { nullable: true }),
    __metadata("design:type", Date)
], Achievement.prototype, "UPDATED_DATE", void 0);
__decorate([
    (0, typeorm_1.Column)('timestamp with time zone', { nullable: false, default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Achievement.prototype, "CREATED_DATE", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ nullable: true }),
    __metadata("design:type", Date)
], Achievement.prototype, "DELETED_DATE", void 0);
exports.Achievement = Achievement = __decorate([
    (0, typeorm_1.Entity)({ name: "ACHIEVEMENT" })
], Achievement);
//# sourceMappingURL=achievement.entity.js.map