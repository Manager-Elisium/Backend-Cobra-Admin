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
exports.createFaq = createFaq;
exports.findFaq = findFaq;
exports.findAllFaq = findAllFaq;
exports.updateFaq = updateFaq;
exports.findOneFaq = findOneFaq;
exports.deleteFaq = deleteFaq;
const standard_error_1 = __importDefault(require("src/common/standard-error"));
const error_type_1 = require("src/common/error-type");
const faq_repository_1 = require("src/libs/typeorm/faq.repository");
function createFaq(faq) {
    return __awaiter(this, void 0, void 0, function* () {
        const createOne = yield (0, faq_repository_1.insertOne)(faq);
        if (!createOne) {
            throw new standard_error_1.default(error_type_1.ErrorCodes.API_VALIDATION_ERROR, "Faq create Error.");
        }
        return createOne;
    });
}
function findFaq() {
    return __awaiter(this, void 0, void 0, function* () {
        const [count, list] = yield Promise.all([(0, faq_repository_1.getCount)(), (0, faq_repository_1.findAll)()]);
        return { count, list };
    });
}
function findAllFaq(query) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield (0, faq_repository_1.findAllData)(query);
        if (!data) {
            throw new standard_error_1.default(error_type_1.ErrorCodes.API_VALIDATION_ERROR, "Faq list Found Error.");
        }
        return data;
    });
}
function findOneFaq(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const getfaq = yield (0, faq_repository_1.getOneById)(id);
        if (!getfaq[0]) {
            throw new standard_error_1.default(error_type_1.ErrorCodes.NOT_FOUND, "Faq is not found.");
        }
        return getfaq;
    });
}
function deleteFaq(id) {
    return __awaiter(this, void 0, void 0, function* () {
        let getfaq = yield (0, faq_repository_1.getOneById)(id);
        if (!getfaq[0]) {
            throw new standard_error_1.default(error_type_1.ErrorCodes.NOT_FOUND, "Faq is not found.");
        }
        const deletedata = yield (0, faq_repository_1.deleteOne)(id);
        return deletedata;
    });
}
function updateFaq(id, faq) {
    return __awaiter(this, void 0, void 0, function* () {
        let getfaq = yield (0, faq_repository_1.getOneById)(id);
        if (!getfaq[0]) {
            throw new standard_error_1.default(error_type_1.ErrorCodes.NOT_FOUND, "Faq is not found.");
        }
        let updateFaq = yield (0, faq_repository_1.updateOne)(id, faq);
        return updateFaq;
    });
}
//# sourceMappingURL=faq.service.js.map