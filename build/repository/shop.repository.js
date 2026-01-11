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
exports.getOneById = getOneById;
exports.findAllData = findAllData;
exports.updateOne = updateOne;
exports.groupAll = groupAll;
const shop_entity_1 = require("src/domain/shop.entity");
function insertOne(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield shop_entity_1.Shop.save(data);
    });
}
function getCount() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield shop_entity_1.Shop.count({
            where: {
                IS_DELETED: false
            }
        });
    });
}
function findAll(query) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield shop_entity_1.Shop.find(query);
    });
}
function groupAll() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield shop_entity_1.Shop.find({
            where: {
                IS_DELETED: false
            }
        });
    });
}
function updateOne(id, shop) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield shop_entity_1.Shop.update(id, shop);
    });
}
function getOneById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield shop_entity_1.Shop.findOne({
            where: {
                ID: id
            }
        });
    });
}
function findAllData(query) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(query.keyword);
        let whereCondition = {};
        if (query === null || query === void 0 ? void 0 : query.keyword) {
            whereCondition = { TYPE: query.keyword, IS_DELETED: false };
        }
        else {
            whereCondition = { IS_DELETED: false };
        }
        const [result, total] = yield shop_entity_1.Shop.findAndCount({
            where: whereCondition,
            order: { CREATED_DATE: 'DESC' },
            take: query.take,
            skip: (query.page - 1) * query.take,
        });
        return { count: total, data: result };
    });
}
//# sourceMappingURL=shop.repository.js.map