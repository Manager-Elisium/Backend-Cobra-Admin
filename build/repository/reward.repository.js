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
exports.getOneById = getOneById;
exports.updateOne = updateOne;
const reward_entity_1 = require("src/domain/reward.entity");
function insertOne(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield reward_entity_1.Reward.save(data);
    });
}
function getCount() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield reward_entity_1.Reward.count({
            where: {
                IS_DELETED: false
            }
        });
    });
}
function findAll() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield reward_entity_1.Reward.find({
            where: {
                IS_DELETED: false
            },
            order: {
                DAY: 'ASC'
            }
        });
    });
}
function updateOne(id, reward) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield reward_entity_1.Reward.update(id, reward);
    });
}
function getOneById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield reward_entity_1.Reward.find({
            where: {
                ID: id
            }
        });
    });
}
function findAllData(query) {
    return __awaiter(this, void 0, void 0, function* () {
        const [result, total] = yield reward_entity_1.Reward.findAndCount({
            where: {
                IS_DELETED: false
            },
            order: { CREATED_DATE: 'DESC' },
            take: query.take,
            skip: (query.page - 1) * query.take,
        });
        return { count: total, data: result };
    });
}
//# sourceMappingURL=reward.repository.js.map