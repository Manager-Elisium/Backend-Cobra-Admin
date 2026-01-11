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
exports.VipCard = void 0;
const typeorm_1 = require("typeorm");
const vip_card_benefits_entity_1 = require("./vip-card-benefits.entity");
let VipCard = class VipCard extends typeorm_1.BaseEntity {
};
exports.VipCard = VipCard;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid", { name: "ID" }),
    __metadata("design:type", String)
], VipCard.prototype, "ID", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], VipCard.prototype, "FILE", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], VipCard.prototype, "TITLE", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], VipCard.prototype, "DESCRIPTION", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: false }),
    __metadata("design:type", Object)
], VipCard.prototype, "DAYS_PRICE", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], VipCard.prototype, "BUCKET_NAME", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], VipCard.prototype, "KEY", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => vip_card_benefits_entity_1.VipCardBenefits, (vipCardBenefits) => vipCardBenefits.BENEFITS),
    __metadata("design:type", Array)
], VipCard.prototype, "BENEFITS", void 0);
__decorate([
    (0, typeorm_1.Column)('timestamp with time zone', { nullable: true }),
    __metadata("design:type", Date)
], VipCard.prototype, "UPDATED_DATE", void 0);
__decorate([
    (0, typeorm_1.Column)('timestamp with time zone', { nullable: false, default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], VipCard.prototype, "CREATED_DATE", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], VipCard.prototype, "IS_DELETED", void 0);
exports.VipCard = VipCard = __decorate([
    (0, typeorm_1.Entity)({ name: "VIP_CARD" })
], VipCard);
//# sourceMappingURL=vip-card.entity.js.map