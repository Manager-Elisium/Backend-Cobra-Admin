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
exports.allDataList = allDataList;
exports.deleteAchievement = deleteAchievement;
exports.getAchievement = getAchievement;
exports.update = update;
exports.listForUnity = listForUnity;
const encrypt_1 = require("src/common/encrypt");
const error_type_1 = require("src/common/error-type");
const upload_1 = require("src/common/upload");
const achievement_service_1 = require("src/services/achievement.service");
const secretKey = (_b = (_a = process === null || process === void 0 ? void 0 : process.env) === null || _a === void 0 ? void 0 : _a.SECRET_KEY) !== null && _b !== void 0 ? _b : 'SWS0zf0thg8T5Gz3scOSQ2W4r6r7GJAg';
const secretKeyGamePlay = (_d = (_c = process === null || process === void 0 ? void 0 : process.env) === null || _c === void 0 ? void 0 : _c.SECRET_KEY_GAME_PLAY) !== null && _d !== void 0 ? _d : 'SM20zD0thg8T5Gz3scOSQ2W4r6r7GJqR';
function insert(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            let isUploadFile = yield (0, upload_1.uploadFile)(req, res, next);
            if (!isUploadFile.status) {
                return res
                    .status(400)
                    .json({ message: "Achievement file is compulsory.", status: false });
            }
            const reqBody = Object.assign(Object.assign({}, req.body), { BUCKET_NAME: isUploadFile === null || isUploadFile === void 0 ? void 0 : isUploadFile.BUCKET_NAME, KEY: isUploadFile === null || isUploadFile === void 0 ? void 0 : isUploadFile.KEY });
            let data = yield (0, achievement_service_1.createAchievementService)(reqBody);
            if (!data) {
                return res
                    .status(error_type_1.ErrorCodeMap.FORM_VALIDATION_ERROR)
                    .json({ message: "Achievement Error.", status: false });
            }
            let encryptedData = (0, encrypt_1.encrypt)(JSON.stringify(data), secretKey);
            return res.json({ status: true, data: yield encryptedData, message: "Achievement create successfully" });
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
            const { take, page } = req.query;
            const query = {
                take: take || 10,
                page: page || 1
            };
            let data = yield (0, achievement_service_1.paginationAchievementService)(query);
            let encryptedData = (0, encrypt_1.encrypt)(JSON.stringify(data), secretKey);
            // return res.json({ status: true, data, message: "Achievement list" });
            return res.json({ status: true, data: yield encryptedData, message: "Achievement list" });
        }
        catch (error) {
            return res.json({ status: false, message: (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : "" });
        }
    });
}
function deleteAchievement(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const { id: primaryId } = req.params;
            const deleteOne = yield (0, achievement_service_1.deleteAchievementService)(primaryId);
            let encryptedData = (0, encrypt_1.encrypt)(JSON.stringify(primaryId), secretKey);
            return res.json({ status: true, id: yield encryptedData, msg: "Achievement deleted successfully" });
        }
        catch (error) {
            return res.json({ status: false, message: (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : "" });
        }
    });
}
function getAchievement(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const { id } = req.params;
            let data = yield (0, achievement_service_1.findOneAchievementService)(id);
            if (!data) {
                return res
                    .status(error_type_1.ErrorCodeMap.FORM_VALIDATION_ERROR)
                    .json({ message: "Get Achievement Error." });
            }
            let encryptedData = (0, encrypt_1.encrypt)(JSON.stringify(data), secretKey);
            return res.json({ status: true, data: yield encryptedData, message: "Get Achievement successfully" }); // : 
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
            const fileupload = yield (0, upload_1.uploadFile)(req, res, next);
            const { id } = req.params;
            if (fileupload.status) {
                req.body.BUCKET_NAME = fileupload.BUCKET_NAME;
                req.body.KEY = fileupload.KEY;
            }
            const updateAchievement = yield (0, achievement_service_1.updateAchievementService)(id, req.body);
            let encryptedData = (0, encrypt_1.encrypt)(JSON.stringify(updateAchievement), secretKey);
            return res.json({
                status: true, data: yield encryptedData, message: "Updated Data Sucessfully" // await encryptedData
            });
        }
        catch (error) {
            return res.json({ status: false, message: (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : "" });
        }
    });
}
function listForUnity(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            let data = yield (0, achievement_service_1.listAchievementService)();
            // return res.json({ status: true, data, message: "Achievement list" });
            return res.json({ status: true, data, message: "Achievement list" });
        }
        catch (error) {
            return res.json({ status: false, message: (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : "" });
        }
    });
}
//# sourceMappingURL=achievement.controller.js.map