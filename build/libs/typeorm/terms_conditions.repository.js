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
exports.getCount = getCount;
exports.findAll = findAll;
exports.insertOne = insertOne;
exports.deleteOne = deleteOne;
exports.updateOne = updateOne;
exports.getOneById = getOneById;
exports.findAllData = findAllData;
const tearms_conditions_entity_1 = require("src/domain/tearms_conditions.entity");
const typeorm_1 = require("typeorm");
function getCount() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield tearms_conditions_entity_1.TermsAndConditions.count();
    });
}
function findAll(page, skip) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield tearms_conditions_entity_1.TermsAndConditions.find();
    });
}
function insertOne(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield tearms_conditions_entity_1.TermsAndConditions.save(data);
    });
}
function deleteOne(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield tearms_conditions_entity_1.TermsAndConditions.delete(id);
    });
}
function updateOne(id, termsAndConditions) {
    return __awaiter(this, void 0, void 0, function* () {
        return tearms_conditions_entity_1.TermsAndConditions.update(id, termsAndConditions);
    });
}
function getOneById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield tearms_conditions_entity_1.TermsAndConditions.find({
            where: {
                ID: id
            }
        });
    });
}
function findAllData(query) {
    return __awaiter(this, void 0, void 0, function* () {
        const [result, total] = yield tearms_conditions_entity_1.TermsAndConditions.findAndCount({
            where: { TITLE: (0, typeorm_1.Like)('%' + query.keyword + '%') },
            order: { CREATED_DATE: "DESC" },
            take: query.take,
            skip: (query.page - 1) * query.take
        });
        return { count: total, data: result };
    });
}
//# sourceMappingURL=terms_conditions.repository.js.map