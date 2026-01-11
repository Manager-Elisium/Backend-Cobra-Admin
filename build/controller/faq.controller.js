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
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
exports.insert = insert;
exports.list = list;
exports.allDataList = allDataList;
exports.update = update;
exports.Delete = Delete;
const encrypt_1 = require("src/common/encrypt");
const error_type_1 = require("src/common/error-type");
const faq_service_1 = require("src/services/faq.service");
const secretKey = (_b = (_a = process === null || process === void 0 ? void 0 : process.env) === null || _a === void 0 ? void 0 : _a.SECRET_KEY) !== null && _b !== void 0 ? _b : 'SWS0zf0thg8T5Gz3scOSQ2W4r6r7GJAg';
const secretKeyGamePlay = (_d = (_c = process === null || process === void 0 ? void 0 : process.env) === null || _c === void 0 ? void 0 : _c.SECRET_KEY_GAME_PLAY) !== null && _d !== void 0 ? _d : 'SM20zD0thg8T5Gz3scOSQ2W4r6r7GJqR';
function insert(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            let data = yield (0, faq_service_1.createFaq)(req.body);
            if (!data) {
                return res
                    .status(error_type_1.ErrorCodeMap.FORM_VALIDATION_ERROR)
                    .json({ message: "Faq Error." });
            }
            let encryptedData = (0, encrypt_1.encrypt)(JSON.stringify(data), secretKey);
            return res.json({ status: true, data: yield encryptedData, message: "Faq create successfully" });
        }
        catch (error) {
            return res.json({ status: false, message: (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : "" });
        }
    });
}
function list(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            let data = yield (0, faq_service_1.findFaq)();
            let encryptedData = (0, encrypt_1.encrypt)(JSON.stringify(data), secretKeyGamePlay);
            return res.json({ status: true, data: yield encryptedData });
        }
        catch (error) {
            return res.json({ status: false, message: (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : "" });
        }
    });
}
function allDataList(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const { take, page, keyword } = req.query;
            const query = {
                take: take || 10,
                page: page || 1,
                keyword: keyword || ''
            };
            let data = yield (0, faq_service_1.findAllFaq)(query);
            let encryptedData = (0, encrypt_1.encrypt)(JSON.stringify(data), secretKey);
            return res.json({ status: true, data: yield encryptedData, message: "Faqs list" });
        }
        catch (error) {
            return res.json({ status: false, message: (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : "" });
        }
    });
}
function Delete(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const { id: primaryId } = req.params;
            yield (0, faq_service_1.deleteFaq)(primaryId);
            let encryptedData = (0, encrypt_1.encrypt)(JSON.stringify(primaryId), secretKey);
            return res.json({ status: true, id: yield encryptedData, msg: "deleted successfully" });
        }
        catch (error) {
            return res.json({ status: false, message: (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : "" });
        }
    });
}
function update(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const { id } = req.params;
            yield (0, faq_service_1.updateFaq)(id, req.body);
            let updatedFaq = yield (0, faq_service_1.findOneFaq)(id);
            let encryptedData = (0, encrypt_1.encrypt)(JSON.stringify(updatedFaq), secretKey);
            return res.json({
                status: true, data: yield encryptedData, message: "updated data sucessfully"
            });
        }
        catch (error) {
            return res.json({ status: false, message: (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : "" });
        }
    });
}
//# sourceMappingURL=faq.controller.js.map