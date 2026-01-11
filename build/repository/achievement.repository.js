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
const achievement_entity_1 = require("src/domain/achievement.entity");
function insertOne(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield achievement_entity_1.Achievement.save(data);
    });
}
function countType(query) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield achievement_entity_1.Achievement.count(query);
    });
}
function findAllData(query) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield achievement_entity_1.Achievement.findAndCount(query);
    });
}
function deleteAndReturnById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const entity = yield achievement_entity_1.Achievement.findOne({ where: { ID: id } });
        return yield achievement_entity_1.Achievement.softRemove(entity);
        // return await Achievement.createQueryBuilder()
        //     .softDelete()
        //     .from(Achievement)
        //     .where("ID = :ID", { ID: id })
        //     .returning('*')
        //     .execute();
    });
}
function getOneById(query) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield achievement_entity_1.Achievement.findOne(query);
    });
}
function updateAndReturnById(id, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield achievement_entity_1.Achievement
            .createQueryBuilder()
            .update(achievement_entity_1.Achievement)
            .set(Object.assign({}, data))
            .where("ID = :id", { id })
            .returning('*')
            .execute();
    });
}
//# sourceMappingURL=achievement.repository.js.map