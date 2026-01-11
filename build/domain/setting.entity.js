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
exports.Setting = exports.SettingKey = void 0;
const typeorm_1 = require("typeorm");
var SettingKey;
(function (SettingKey) {
    SettingKey["CAREER_HISTORY"] = "Career History";
    SettingKey["FAIR_GAME_PLAY"] = "Fair Game Play";
    SettingKey["TERMS_CONDITIONS"] = "Terms & Conditions";
    SettingKey["PRIVACY_POLICY"] = "Privacy Policy";
    SettingKey["GAME_RULES"] = "Game Rules";
    SettingKey["CONTACT_US"] = "Contact Us";
    SettingKey["INSTANT_PLAY"] = "Instant Play";
    SettingKey["CLUB_INFO"] = "Club Info";
    SettingKey["OTHER"] = "Other";
})(SettingKey || (exports.SettingKey = SettingKey = {}));
let Setting = class Setting extends typeorm_1.BaseEntity {
};
exports.Setting = Setting;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid", { name: "ID" }),
    __metadata("design:type", String)
], Setting.prototype, "ID", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: SettingKey }),
    __metadata("design:type", String)
], Setting.prototype, "TYPE", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Setting.prototype, "TITLE", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Setting.prototype, "SUB_TITLE", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb' }),
    __metadata("design:type", Object)
], Setting.prototype, "DATA", void 0);
__decorate([
    (0, typeorm_1.Column)('timestamp with time zone', { nullable: true }),
    __metadata("design:type", Date)
], Setting.prototype, "UPDATED_DATE", void 0);
__decorate([
    (0, typeorm_1.Column)('timestamp with time zone', { nullable: false, default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Setting.prototype, "CREATED_DATE", void 0);
exports.Setting = Setting = __decorate([
    (0, typeorm_1.Entity)({ name: "SETTING" })
], Setting);
//# sourceMappingURL=setting.entity.js.map