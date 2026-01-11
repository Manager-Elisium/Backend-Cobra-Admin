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
exports.Shop = void 0;
const typeorm_1 = require("typeorm");
var TypeShop;
(function (TypeShop) {
    TypeShop["Coins"] = "Coins";
    TypeShop["Diamond"] = "Diamond";
    TypeShop["Items"] = "Items";
})(TypeShop || (TypeShop = {}));
var ItemType;
(function (ItemType) {
    ItemType["Coins"] = "Coins";
    ItemType["Diamond"] = "Diamond";
    ItemType["EMOJI"] = "Emoji";
    ItemType["AVATAR"] = "Avatar";
    ItemType["FRAME"] = "Frame";
    ItemType["TABLE"] = "Table";
    ItemType["CARD"] = "Card";
})(ItemType || (ItemType = {}));
let Shop = class Shop extends typeorm_1.BaseEntity {
};
exports.Shop = Shop;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid", { name: "ID" }),
    __metadata("design:type", String)
], Shop.prototype, "ID", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: TypeShop }),
    __metadata("design:type", String)
], Shop.prototype, "TYPE", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: ItemType, default: null }),
    __metadata("design:type", String)
], Shop.prototype, "SUB_TYPE", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Shop.prototype, "NAME", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Shop.prototype, "VALUE", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Shop.prototype, "PRICE", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Shop.prototype, "GOOGLE_STORE_ID", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Shop.prototype, "APPLE_STORE_ID", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Shop.prototype, "BUCKET_NAME", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Shop.prototype, "KEY", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Shop.prototype, "EXCLUSIVE_OFFER", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', default: [] }),
    __metadata("design:type", Object)
], Shop.prototype, "ITEM_IMAGES", void 0);
__decorate([
    (0, typeorm_1.Column)('timestamp with time zone', { nullable: true }),
    __metadata("design:type", Date)
], Shop.prototype, "UPDATED_DATE", void 0);
__decorate([
    (0, typeorm_1.Column)('timestamp with time zone', { nullable: false, default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Shop.prototype, "CREATED_DATE", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Shop.prototype, "IS_DELETED", void 0);
exports.Shop = Shop = __decorate([
    (0, typeorm_1.Entity)({ name: "SHOP" })
], Shop);
//# sourceMappingURL=shop.entity.js.map