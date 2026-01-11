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
exports.update = update;
exports.deleteSetting = deleteSetting;
exports.getSetting = getSetting;
exports.getDataByGame = getDataByGame;
const encrypt_1 = require("src/common/encrypt");
const error_type_1 = require("src/common/error-type");
const setting_service_1 = require("src/services/setting.service");
const secretKey = (_b = (_a = process === null || process === void 0 ? void 0 : process.env) === null || _a === void 0 ? void 0 : _a.SECRET_KEY) !== null && _b !== void 0 ? _b : 'SWS0zf0thg8T5Gz3scOSQ2W4r6r7GJAg';
const secretKeyGamePlay = (_d = (_c = process === null || process === void 0 ? void 0 : process.env) === null || _c === void 0 ? void 0 : _c.SECRET_KEY_GAME_PLAY) !== null && _d !== void 0 ? _d : 'SM20zD0thg8T5Gz3scOSQ2W4r6r7GJqR';
function insert(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            let data = yield (0, setting_service_1.createSetting)(req.body);
            if (!data) {
                return res
                    .status(error_type_1.ErrorCodeMap.FORM_VALIDATION_ERROR)
                    .json({ message: "Setting Error." });
            }
            let encryptedData = (0, encrypt_1.encrypt)(JSON.stringify(data), secretKey);
            return res.json({ status: true, data: yield encryptedData, message: "Setting create successfully" });
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
            let data = yield (0, setting_service_1.paginationSettingService)(query);
            let encryptedData = (0, encrypt_1.encrypt)(JSON.stringify(data), secretKey);
            return res.json({ status: true, data: yield encryptedData, message: "Setting list" });
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
            const updateSetting = yield (0, setting_service_1.updateSettingService)(id, req.body);
            let encryptedData = (0, encrypt_1.encrypt)(JSON.stringify(updateSetting), secretKey);
            return res.json({
                status: true, data: yield encryptedData, message: "Updated Data Sucessfully" // await encryptedData
            });
        }
        catch (error) {
            return res.json({ status: false, message: (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : "" });
        }
    });
}
function deleteSetting(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const { id: primaryId } = req.params;
            const deleteOne = yield (0, setting_service_1.deleteSettingService)(primaryId);
            let encryptedData = (0, encrypt_1.encrypt)(JSON.stringify(primaryId), secretKey);
            return res.json({ status: true, id: yield encryptedData, msg: "Setting deleted successfully" });
        }
        catch (error) {
            return res.json({ status: false, message: (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : "" });
        }
    });
}
function getSetting(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const { id } = req.params;
            let data = yield (0, setting_service_1.findOneSettingService)(id);
            if (!data) {
                return res
                    .status(error_type_1.ErrorCodeMap.FORM_VALIDATION_ERROR)
                    .json({ message: "Get Setting Error." });
            }
            let encryptedData = (0, encrypt_1.encrypt)(JSON.stringify(data), secretKey);
            return res.json({ status: true, data: yield encryptedData, message: "Get setting successfully" }); // : 
        }
        catch (error) {
            return res.json({ status: false, message: (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : "" });
        }
    });
}
function getDataByGame(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const { name: TYPE } = req.query;
            let settingDetail = yield (0, setting_service_1.findSettingServiceByType)(TYPE);
            if (!settingDetail) {
                return res
                    .status(error_type_1.ErrorCodeMap.FORM_VALIDATION_ERROR)
                    .json({ message: "Get Setting Error." });
            }
            return res.json(yield (0, encrypt_1.encrypt)(JSON.stringify({ status: true, message: "Get setting successfully", settingDetail }), secretKeyGamePlay));
        }
        catch (error) {
            return res.json(yield (0, encrypt_1.encrypt)(JSON.stringify({ status: false, message: (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : "" }), secretKeyGamePlay));
        }
    });
}
//# sourceMappingURL=setting.controller.js.map