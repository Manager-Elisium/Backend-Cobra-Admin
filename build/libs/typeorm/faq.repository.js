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
exports.findAll = findAll;
exports.getCount = getCount;
exports.findAllData = findAllData;
exports.updateOne = updateOne;
exports.getOneById = getOneById;
exports.deleteOne = deleteOne;
const faq_entity_1 = require("src/domain/faq.entity");
const typeorm_1 = require("typeorm");
function insertOne(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield faq_entity_1.Faq.save(data);
    });
}
function getCount() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield faq_entity_1.Faq.count();
    });
}
function findAll() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield faq_entity_1.Faq.find();
    });
}
function deleteOne(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield faq_entity_1.Faq.delete(id);
    });
}
function updateOne(id, faq) {
    return __awaiter(this, void 0, void 0, function* () {
        return faq_entity_1.Faq.update(id, faq);
    });
}
function getOneById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield faq_entity_1.Faq.find({
            where: {
                ID: id
            }
        });
    });
}
function findAllData(query) {
    return __awaiter(this, void 0, void 0, function* () {
        const [result, total] = yield faq_entity_1.Faq.findAndCount({
            where: { QUESTION: (0, typeorm_1.Like)('%' + query.keyword + '%') },
            order: { CREATED_DATE: 'DESC' },
            take: query.take,
            skip: (query.page - 1) * query.take
        });
        return { count: total, data: result };
    });
}
//# sourceMappingURL=faq.repository.js.map