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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findTerm = findTerm;
exports.createTerm = createTerm;
exports.deleteTerm = deleteTerm;
exports.updateTerm = updateTerm;
exports.findAllTerm = findAllTerm;
exports.findOneTerm = findOneTerm;
const terms_conditions_repository_1 = require("./../libs/typeorm/terms_conditions.repository");
const standard_error_1 = __importDefault(require("src/common/standard-error"));
const error_type_1 = require("src/common/error-type");
function createTerm(termsAndConditions) {
    return __awaiter(this, void 0, void 0, function* () {
        const createOne = yield (0, terms_conditions_repository_1.insertOne)(termsAndConditions);
        if (!createOne) {
            throw new standard_error_1.default(error_type_1.ErrorCodes.API_VALIDATION_ERROR, "Terms and conditions create Error.");
        }
        return createOne;
    });
}
function findTerm() {
    return __awaiter(this, void 0, void 0, function* () {
        const [count, list] = yield Promise.all([(0, terms_conditions_repository_1.getCount)(), (0, terms_conditions_repository_1.findAll)()]);
        return { count, list };
    });
}
function findAllTerm(query) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield (0, terms_conditions_repository_1.findAllData)(query);
        if (!res) {
            throw new standard_error_1.default(error_type_1.ErrorCodes.API_VALIDATION_ERROR, "Terms and conditions list Found Error.");
        }
        return res;
    });
}
function findOneTerm(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const term = yield (0, terms_conditions_repository_1.getOneById)(id);
        if (!term[0]) {
            throw new standard_error_1.default(error_type_1.ErrorCodes.NOT_FOUND, "Terms and conditions is not found.");
        }
        return term;
    });
}
function deleteTerm(id) {
    return __awaiter(this, void 0, void 0, function* () {
        let getterms = yield (0, terms_conditions_repository_1.getOneById)(id);
        if (!getterms[0]) {
            throw new standard_error_1.default(error_type_1.ErrorCodes.NOT_FOUND, "Terms and conditions is not found.");
        }
        const deletedata = yield (0, terms_conditions_repository_1.deleteOne)(id);
        return deletedata;
    });
}
function updateTerm(id, termsAndConditions) {
    return __awaiter(this, void 0, void 0, function* () {
        let getterms = yield (0, terms_conditions_repository_1.getOneById)(id);
        if (!getterms[0]) {
            throw new standard_error_1.default(error_type_1.ErrorCodes.NOT_FOUND, "Terms and conditions is not found.");
        }
        let updateTC = yield (0, terms_conditions_repository_1.updateOne)(id, termsAndConditions);
        return updateTC;
    });
}
//# sourceMappingURL=terms_conditions.service.js.map