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
exports.deleteOne = deleteOne;
const mission_entity_1 = require("src/domain/mission.entity");
const typeorm_1 = require("typeorm");
function insertOne(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const mission = yield mission_entity_1.Mission.save(data);
        return mission;
    });
}
function getCount() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield mission_entity_1.Mission.count();
    });
}
function findAll() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield mission_entity_1.Mission.find({
            take: 3
        });
    });
}
function updateOne(id, mission) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield mission_entity_1.Mission.update(id, mission);
    });
}
function getOneById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield mission_entity_1.Mission.find({
            where: {
                ID: id
            }
        });
    });
}
function findAllData(query) {
    return __awaiter(this, void 0, void 0, function* () {
        const [result, total] = yield mission_entity_1.Mission.findAndCount({
            where: { TITLE: (0, typeorm_1.Like)('%' + query.keyword + '%') },
            order: { CREATED_DATE: 'DESC' },
            take: query.take,
            skip: (query.page - 1) * query.take,
        });
        return { count: total, data: result };
    });
}
function deleteOne(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield mission_entity_1.Mission.delete(id);
    });
}
//# sourceMappingURL=mission.repository.js.map