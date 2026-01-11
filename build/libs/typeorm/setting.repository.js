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
exports.countType = countType;
exports.updateAndReturnById = updateAndReturnById;
exports.findAllData = findAllData;
exports.updateOne = updateOne;
exports.getOneById = getOneById;
exports.deleteAndReturnById = deleteAndReturnById;
const setting_entity_1 = require("src/domain/setting.entity");
function insertOne(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield setting_entity_1.Setting.save(data);
    });
}
function countType(query) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield setting_entity_1.Setting.count(query);
    });
}
function deleteAndReturnById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield setting_entity_1.Setting.createQueryBuilder()
            .delete()
            .from(setting_entity_1.Setting)
            .where("ID = :ID", { ID: id })
            .returning('*')
            .execute();
    });
}
function updateOne(id, faq) {
    return __awaiter(this, void 0, void 0, function* () {
        return setting_entity_1.Setting.update(id, faq);
    });
}
function updateAndReturnById(id, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield setting_entity_1.Setting
            .createQueryBuilder()
            .update(setting_entity_1.Setting)
            .set(Object.assign({}, data))
            .where("ID = :id", { id })
            .returning('*')
            .execute();
    });
}
function getOneById(query) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield setting_entity_1.Setting.findOne(query);
    });
}
function findAllData(query) {
    return __awaiter(this, void 0, void 0, function* () {
        const [result, total] = yield setting_entity_1.Setting.findAndCount({
            order: { CREATED_DATE: 'DESC' },
            take: query.take,
            skip: (query.page - 1) * query.take
        });
        return { count: total, data: result };
    });
}
//# sourceMappingURL=setting.repository.js.map