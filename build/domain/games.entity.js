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
exports.MultiGames = void 0;
const typeorm_1 = require("typeorm");
var TypeGame;
(function (TypeGame) {
    TypeGame["CARD_GAME"] = "CARD_GAME";
    TypeGame["PUZZEL"] = "PUZZEL";
    TypeGame["ARCADE"] = "ARCADE";
})(TypeGame || (TypeGame = {}));
let MultiGames = class MultiGames extends typeorm_1.BaseEntity {
};
exports.MultiGames = MultiGames;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid", { name: "ID" }),
    __metadata("design:type", String)
], MultiGames.prototype, "ID", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], MultiGames.prototype, "UNIQUE_NAME", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], MultiGames.prototype, "NAME", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: TypeGame, nullable: true, default: TypeGame.CARD_GAME }),
    __metadata("design:type", String)
], MultiGames.prototype, "TYPE", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], MultiGames.prototype, "IS_SHOW", void 0);
__decorate([
    (0, typeorm_1.Column)('timestamp with time zone', { nullable: true }),
    __metadata("design:type", Date)
], MultiGames.prototype, "UPDATED_DATE", void 0);
__decorate([
    (0, typeorm_1.Column)('timestamp with time zone', { nullable: false, default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], MultiGames.prototype, "CREATED_DATE", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ nullable: true }),
    __metadata("design:type", Date)
], MultiGames.prototype, "deletedAt", void 0);
exports.MultiGames = MultiGames = __decorate([
    (0, typeorm_1.Entity)({ name: "GAMES" })
], MultiGames);
//# sourceMappingURL=games.entity.js.map