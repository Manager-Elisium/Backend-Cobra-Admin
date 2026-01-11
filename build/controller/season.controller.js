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
exports.getSeason = getSeason;
exports.allSeason = allSeason;
exports.update = update;
exports.getSeasonWithReward = getSeasonWithReward;
exports.deleteSeason = deleteSeason;
const encrypt_1 = require("src/common/encrypt");
const error_type_1 = require("src/common/error-type");
const upload_1 = require("src/common/upload");
const season_service_1 = require("src/services/season.service");
const secretKey = (_b = (_a = process === null || process === void 0 ? void 0 : process.env) === null || _a === void 0 ? void 0 : _a.SECRET_KEY) !== null && _b !== void 0 ? _b : 'SWS0zf0thg8T5Gz3scOSQ2W4r6r7GJAg';
const secretKeyGamePlay = (_d = (_c = process === null || process === void 0 ? void 0 : process.env) === null || _c === void 0 ? void 0 : _c.SECRET_KEY_GAME_PLAY) !== null && _d !== void 0 ? _d : 'SM20zD0thg8T5Gz3scOSQ2W4r6r7GJqR';
function insert(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const fileupload = yield (0, upload_1.uploadFile)(req, res, next);
            if (!fileupload.status) {
                return res.status(error_type_1.ErrorCodeMap.API_VALIDATION_ERROR)
                    .json({ status: false, message: "File field is required" });
            }
            const reqBody = Object.assign(Object.assign({}, req.body), { BUCKET_NAME: fileupload.BUCKET_NAME, KEY: fileupload.KEY });
            let data = yield (0, season_service_1.createSeasonService)(reqBody);
            let encryptedData = yield (0, encrypt_1.encrypt)(JSON.stringify(data), secretKey);
            return res.json({ status: true, data: encryptedData, message: "Season create successfully" });
        }
        catch (error) {
            return res.json({ status: false, message: (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : "" });
        }
    });
}
function getSeason(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const { id } = req.params;
            const query = { ID: id };
            let data = yield (0, season_service_1.getSeasonService)(query);
            let encryptedData = yield (0, encrypt_1.encrypt)(JSON.stringify(data), secretKey);
            return res.json({ status: true, data: encryptedData, message: "Get Season" });
        }
        catch (error) {
            return res.json({ status: false, message: (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : "" });
        }
    });
}
function deleteSeason(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const { id: primaryId } = req.params;
            const deleteOne = yield (0, season_service_1.deleteSeasonService)(primaryId);
            let encryptedData = yield (0, encrypt_1.encrypt)(JSON.stringify(primaryId), secretKey);
            return res.json({ status: true, id: encryptedData, msg: "Season deleted successfully" });
        }
        catch (error) {
            return res.json({ status: false, message: (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : "" });
        }
    });
}
function allSeason(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const { take, page } = req.query;
            const query = { take: take || 10, page: page || 1 };
            let data = yield (0, season_service_1.paginateSeasonService)(query);
            let encryptedData = yield (0, encrypt_1.encrypt)(JSON.stringify(data), secretKey);
            return res.json({
                status: true,
                data: encryptedData,
                message: "Season list"
            });
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
            let isUploadFile = yield (0, upload_1.uploadFile)(req, res, next);
            const { id } = req.params;
            if (isUploadFile.status) {
                const reqBody = Object.assign(Object.assign({}, req.body), { BUCKET_NAME: isUploadFile.BUCKET_NAME, KEY: isUploadFile.KEY, IS_NEW: true });
                let updatedSeason = yield (0, season_service_1.updateSeasonService)(id, reqBody);
                let encryptedData = yield (0, encrypt_1.encrypt)(JSON.stringify(updatedSeason), secretKey);
                return res.json({
                    status: true,
                    data: encryptedData,
                    message: "updated data sucessfully",
                });
            }
            else {
                const reqBody = Object.assign(Object.assign({}, req.body), { IS_NEW: false });
                let updatedSeason = yield (0, season_service_1.updateSeasonService)(id, reqBody);
                let encryptedData = yield (0, encrypt_1.encrypt)(JSON.stringify(updatedSeason), secretKey);
                return res.json({
                    status: true,
                    data: encryptedData,
                    message: "updated data sucessfully",
                });
            }
        }
        catch (error) {
            return res.json({ status: false, message: (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : "" });
        }
    });
}
function getSeasonWithReward(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            let data = yield (0, season_service_1.getSeasonWithRewardService)();
            return res.json({ status: true, data, message: "Get Season" });
        }
        catch (error) {
            return res.json({ status: false, message: (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : "" });
        }
    });
}
//# sourceMappingURL=season.controller.js.map