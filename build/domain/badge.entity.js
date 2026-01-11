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
exports.Badge = void 0;
const typeorm_1 = require("typeorm");
var BadgeKey;
(function (BadgeKey) {
    BadgeKey["CARD_SHARK"] = "Card Shark";
    BadgeKey["SEASONED_ELITE"] = "Seasoned Elite";
    BadgeKey["RISING_STAR"] = "Rising Star";
    BadgeKey["GOLD_MINER"] = "Gold Miner";
    BadgeKey["DIAMOND_DRILLER"] = "Diamond Driller";
})(BadgeKey || (BadgeKey = {}));
var TaskKey;
(function (TaskKey) {
    TaskKey["LEADERBOARD_TOPPER"] = "Leaderboard Topper";
    TaskKey["BUY_SEASON_PASS"] = "Buy & Completing Season Pass";
    TaskKey["PLAY_LOBBY"] = "Play Lobby";
    TaskKey["WIN_GOLD_COIN"] = "Win Gold Coin";
    TaskKey["EARN_DIAMOND"] = "Earn Diamond";
})(TaskKey || (TaskKey = {}));
let Badge = class Badge extends typeorm_1.BaseEntity {
};
exports.Badge = Badge;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid", { name: "ID" }),
    __metadata("design:type", String)
], Badge.prototype, "ID", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: BadgeKey }),
    __metadata("design:type", String)
], Badge.prototype, "TYPE", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Badge.prototype, "BUCKET_NAME", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Badge.prototype, "KEY", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Badge.prototype, "TEXT", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: TaskKey }),
    __metadata("design:type", String)
], Badge.prototype, "TASK_KEY", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Badge.prototype, "TASK_VALUE", void 0);
__decorate([
    (0, typeorm_1.Column)('timestamp with time zone', { nullable: true }),
    __metadata("design:type", Date)
], Badge.prototype, "UPDATED_DATE", void 0);
__decorate([
    (0, typeorm_1.Column)('timestamp with time zone', { nullable: false, default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Badge.prototype, "CREATED_DATE", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ nullable: true }),
    __metadata("design:type", Date)
], Badge.prototype, "DELETED_DATE", void 0);
exports.Badge = Badge = __decorate([
    (0, typeorm_1.Entity)({ name: "BADGE" })
], Badge);
//# sourceMappingURL=badge.entity.js.map