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
exports.VipCardBenefits = void 0;
const typeorm_1 = require("typeorm");
const vip_card_entity_1 = require("./vip-card.entity");
let VipCardBenefits = class VipCardBenefits extends typeorm_1.BaseEntity {
};
exports.VipCardBenefits = VipCardBenefits;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid", { name: "ID" }),
    __metadata("design:type", String)
], VipCardBenefits.prototype, "ID", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => vip_card_entity_1.VipCard, (vipCard) => vipCard.BENEFITS, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'BENEFITS' }),
    __metadata("design:type", vip_card_entity_1.VipCard)
], VipCardBenefits.prototype, "BENEFITS", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], VipCardBenefits.prototype, "TYPE", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], VipCardBenefits.prototype, "TEXT", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], VipCardBenefits.prototype, "VALUE", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], VipCardBenefits.prototype, "BUCKET_NAME", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], VipCardBenefits.prototype, "KEY", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], VipCardBenefits.prototype, "EMOJI_IMAGES", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamptz', default: () => 'NOW()' }),
    __metadata("design:type", Date)
], VipCardBenefits.prototype, "CREATED_DATE", void 0);
__decorate([
    (0, typeorm_1.Column)('timestamp with time zone', { nullable: true }),
    __metadata("design:type", Date)
], VipCardBenefits.prototype, "UPDATED_DATE", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], VipCardBenefits.prototype, "IS_DELETED", void 0);
exports.VipCardBenefits = VipCardBenefits = __decorate([
    (0, typeorm_1.Entity)({ name: "VIP_CARD_BENEFITS" })
], VipCardBenefits);
//# sourceMappingURL=vip-card-benefits.entity.js.map