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
exports.Reward = void 0;
const typeorm_1 = require("typeorm");
var TypeReward;
(function (TypeReward) {
    TypeReward["COIN"] = "COIN";
    TypeReward["DIAMOND"] = "DIAMOND";
    TypeReward["ITEMS"] = "ITEMS";
})(TypeReward || (TypeReward = {}));
var ItemType;
(function (ItemType) {
    ItemType["EMOJI"] = "Emoji";
    ItemType["AVATAR"] = "Avatar";
    ItemType["FRAME"] = "Frame";
    ItemType["TABLE"] = "Table";
    ItemType["CARD"] = "Card";
})(ItemType || (ItemType = {}));
var ListDay;
(function (ListDay) {
    ListDay["DAY_1"] = "Day 1";
    ListDay["DAY_2"] = "Day 2";
    ListDay["DAY_3"] = "Day 3";
    ListDay["DAY_4"] = "Day 4";
    ListDay["DAY_5"] = "Day 5";
    ListDay["DAY_6"] = "Day 6";
    ListDay["DAY_7"] = "Day 7";
    ListDay["DAY_8"] = "Day 8";
    ListDay["DAY_9"] = "Day 9";
    ListDay["DAY_10"] = "Day 10";
    ListDay["DAY_11"] = "Day 11";
    ListDay["DAY_12"] = "Day 12";
    ListDay["DAY_13"] = "Day 13";
    ListDay["DAY_14"] = "Day 14";
    ListDay["DAY_15"] = "Day 15";
    ListDay["DAY_16"] = "Day 16";
    ListDay["DAY_17"] = "Day 17";
    ListDay["DAY_18"] = "Day 18";
    ListDay["DAY_19"] = "Day 19";
    ListDay["DAY_20"] = "Day 20";
    ListDay["DAY_21"] = "Day 21";
    ListDay["DAY_22"] = "Day 22";
    ListDay["DAY_23"] = "Day 23";
    ListDay["DAY_24"] = "Day 24";
    ListDay["DAY_25"] = "Day 25";
    ListDay["DAY_26"] = "Day 26";
    ListDay["DAY_27"] = "Day 27";
    ListDay["DAY_28"] = "Day 28";
    ListDay["DAY_29"] = "Day 29";
    ListDay["DAY_30"] = "Day 30";
})(ListDay || (ListDay = {}));
let Reward = class Reward extends typeorm_1.BaseEntity {
};
exports.Reward = Reward;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid", { name: "ID" }),
    __metadata("design:type", String)
], Reward.prototype, "ID", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: ListDay }),
    __metadata("design:type", String)
], Reward.prototype, "DAY", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: TypeReward, default: TypeReward.COIN }),
    __metadata("design:type", String)
], Reward.prototype, "TYPE", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: ItemType, default: null }),
    __metadata("design:type", String)
], Reward.prototype, "ITEM_NAME", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Reward.prototype, "VALUE", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Reward.prototype, "FILE", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Reward.prototype, "BUCKET_NAME", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Reward.prototype, "KEY", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', default: [] }),
    __metadata("design:type", Object)
], Reward.prototype, "ITEM_IMAGES", void 0);
__decorate([
    (0, typeorm_1.Column)('timestamp with time zone', { nullable: true }),
    __metadata("design:type", Date)
], Reward.prototype, "UPDATED_DATE", void 0);
__decorate([
    (0, typeorm_1.Column)('timestamp with time zone', { nullable: false, default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Reward.prototype, "CREATED_DATE", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ nullable: true }),
    __metadata("design:type", Date)
], Reward.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Reward.prototype, "IS_DELETED", void 0);
exports.Reward = Reward = __decorate([
    (0, typeorm_1.Entity)({ name: "REWARD" })
], Reward);
//# sourceMappingURL=reward.entity.js.map