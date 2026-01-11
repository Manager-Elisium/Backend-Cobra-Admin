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
exports.findAllData = findAllData;
exports.deleteAndReturnById = deleteAndReturnById;
exports.getOneById = getOneById;
exports.updateAndReturnById = updateAndReturnById;
const badge_entity_1 = require("src/domain/badge.entity");
function insertOne(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield badge_entity_1.Badge.save(data);
    });
}
function countType(query) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield badge_entity_1.Badge.count(query);
    });
}
function findAllData(query) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield badge_entity_1.Badge.findAndCount(query);
    });
}
function deleteAndReturnById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const entity = yield badge_entity_1.Badge.findOne({ where: { ID: id } });
        return yield badge_entity_1.Badge.softRemove(entity);
        // return await Badge.createQueryBuilder()
        //     .delete()
        //     .from(Badge)
        //     .where("ID = :ID", { ID: id })
        //     .returning('*')
        //     .execute();
    });
}
function getOneById(query) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield badge_entity_1.Badge.findOne(query);
    });
}
function updateAndReturnById(id, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield badge_entity_1.Badge
            .createQueryBuilder()
            .update(badge_entity_1.Badge)
            .set(Object.assign({}, data))
            .where("ID = :id", { id })
            .returning('*')
            .execute();
    });
}
//# sourceMappingURL=badge.repository.js.map