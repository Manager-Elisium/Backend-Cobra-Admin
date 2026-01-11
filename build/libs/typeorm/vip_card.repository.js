"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertOne = insertOne;
exports.getCount = getCount;
exports.findAll = findAll;
exports.findAllData = findAllData;
exports.updateOne = updateOne;
exports.getOneById = getOneById;
exports.deleteOne = deleteOne;
exports.insertOneVipBenefit = insertOneVipBenefit;
exports.getOneBenefitById = getOneBenefitById;
exports.updateOneBenefit = updateOneBenefit;
const vip_card_benefits_entity_1 = require("src/domain/vip-card-benefits.entity");
const vip_card_entity_1 = require("src/domain/vip-card.entity");
const typeorm_1 = require("typeorm");
function insertOne(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield vip_card_entity_1.VipCard.save(data);
    });
}
function getCount() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield vip_card_entity_1.VipCard.count();
    });
}
function findAll() {
    return __awaiter(this, void 0, void 0, function* () {
        return vip_card_entity_1.VipCard.find({
            relations: ['BENEFITS']
        });
    });
}
function updateOne(id, vip_card) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield vip_card_entity_1.VipCard.update(id, vip_card);
    });
}
function getOneById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return vip_card_entity_1.VipCard.findOne({
            where: {
                ID: id
            },
            relations: ['BENEFITS']
        });
    });
}
function getOneBenefitById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return vip_card_benefits_entity_1.VipCardBenefits.findOne({
            where: {
                ID: id
            }
        });
    });
}
function updateOneBenefit(id, vip_card) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield vip_card_benefits_entity_1.VipCardBenefits.update(id, vip_card);
    });
}
function findAllData(query) {
    return __awaiter(this, void 0, void 0, function* () {
        const [result, total] = yield vip_card_entity_1.VipCard.findAndCount({
            where: { TITLE: (0, typeorm_1.Like)('%' + query.keyword + '%') },
            order: { CREATED_DATE: 'DESC' },
            take: query.take,
            skip: (query.page - 1) * query.take,
            relations: ['BENEFITS'],
        });
        return { count: total, data: result };
    });
}
function deleteOne(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield vip_card_entity_1.VipCard.delete(id);
    });
}
function insertOneVipBenefit(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield vip_card_benefits_entity_1.VipCardBenefits.save(data);
    });
}
//# sourceMappingURL=vip_card.repository.js.map