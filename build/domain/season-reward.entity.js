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
exports.SeasonReward = void 0;
const typeorm_1 = require("typeorm");
const season_entity_1 = require("./season.entity");
var ELevel;
(function (ELevel) {
    ELevel["LEVEL_1"] = "Level 1";
    ELevel["LEVEL_2"] = "Level 2";
    ELevel["LEVEL_3"] = "Level 3";
    ELevel["LEVEL_4"] = "Level 4";
    ELevel["LEVEL_5"] = "Level 5";
    ELevel["LEVEL_6"] = "Level 6";
    ELevel["LEVEL_7"] = "Level 7";
    ELevel["LEVEL_8"] = "Level 8";
    ELevel["LEVEL_9"] = "Level 9";
    ELevel["LEVEL_10"] = "Level 10";
    ELevel["LEVEL_11"] = "Level 11";
    ELevel["LEVEL_12"] = "Level 12";
    ELevel["LEVEL_13"] = "Level 13";
    ELevel["LEVEL_14"] = "Level 14";
    ELevel["LEVEL_15"] = "Level 15";
    ELevel["LEVEL_16"] = "Level 16";
    ELevel["LEVEL_17"] = "Level 17";
    ELevel["LEVEL_18"] = "Level 18";
    ELevel["LEVEL_19"] = "Level 19";
    ELevel["LEVEL_20"] = "Level 20";
    ELevel["LEVEL_21"] = "Level 21";
    ELevel["LEVEL_22"] = "Level 22";
    ELevel["LEVEL_23"] = "Level 23";
    ELevel["LEVEL_24"] = "Level 24";
    ELevel["LEVEL_25"] = "Level 25";
    ELevel["LEVEL_26"] = "Level 26";
    ELevel["LEVEL_27"] = "Level 27";
    ELevel["LEVEL_28"] = "Level 28";
    ELevel["LEVEL_29"] = "Level 29";
    ELevel["LEVEL_30"] = "Level 30";
})(ELevel || (ELevel = {}));
var EType;
(function (EType) {
    EType["COIN"] = "Coin";
    EType["DIAMOND"] = "Diamond";
    EType["ITEMS"] = "Items";
})(EType || (EType = {}));
var ItemType;
(function (ItemType) {
    ItemType["EMOJI"] = "Emoji";
    ItemType["AVATAR"] = "Avatar";
    ItemType["FRAME"] = "Frame";
    ItemType["TABLE"] = "Table";
    ItemType["CARD"] = "Card";
})(ItemType || (ItemType = {}));
let SeasonReward = class SeasonReward extends typeorm_1.BaseEntity {
};
exports.SeasonReward = SeasonReward;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid", { name: "ID" }),
    __metadata("design:type", String)
], SeasonReward.prototype, "ID", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: ELevel }),
    __metadata("design:type", String)
], SeasonReward.prototype, "LEVEL", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: EType, default: EType.COIN }),
    __metadata("design:type", String)
], SeasonReward.prototype, "TYPE", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: ItemType, default: null }),
    __metadata("design:type", String)
], SeasonReward.prototype, "ITEM_NAME", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], SeasonReward.prototype, "NAME", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], SeasonReward.prototype, "VALUE", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => season_entity_1.Season, (season) => season.REWARDS, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'REWARDS' }),
    __metadata("design:type", season_entity_1.Season)
], SeasonReward.prototype, "REWARDS", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], SeasonReward.prototype, "IS_PAID", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], SeasonReward.prototype, "BUCKET_NAME", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], SeasonReward.prototype, "KEY", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', default: [] }),
    __metadata("design:type", Object)
], SeasonReward.prototype, "EMOJI_IMAGES", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamptz', default: () => 'NOW()' }),
    __metadata("design:type", Date)
], SeasonReward.prototype, "CREATED_DATE", void 0);
__decorate([
    (0, typeorm_1.Column)('timestamp with time zone', { nullable: true }),
    __metadata("design:type", Date)
], SeasonReward.prototype, "UPDATED_DATE", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], SeasonReward.prototype, "IS_DELETED", void 0);
exports.SeasonReward = SeasonReward = __decorate([
    (0, typeorm_1.Entity)({ name: "SEASON_REWARD" })
], SeasonReward);
//# sourceMappingURL=season-reward.entity.js.map