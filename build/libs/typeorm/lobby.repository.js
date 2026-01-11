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
const lobby_entity_1 = require("src/domain/lobby.entity");
const typeorm_1 = require("typeorm");
function insertOne(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield lobby_entity_1.Lobby.save(data);
    });
}
function getCount() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield lobby_entity_1.Lobby.count();
    });
}
function findAll() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield lobby_entity_1.Lobby.find();
    });
}
function updateOne(id, reward) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield lobby_entity_1.Lobby.update(id, reward);
    });
}
function getOneById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield lobby_entity_1.Lobby.find({
            where: {
                ID: id
            }
        });
    });
}
function findAllData(query) {
    return __awaiter(this, void 0, void 0, function* () {
        const [result, total] = yield lobby_entity_1.Lobby.findAndCount({
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
        return yield lobby_entity_1.Lobby.delete(id);
    });
}
//# sourceMappingURL=lobby.repository.js.map