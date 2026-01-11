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
exports.createSetting = createSetting;
exports.paginationSettingService = paginationSettingService;
exports.updateSettingService = updateSettingService;
exports.findOneSettingService = findOneSettingService;
exports.deleteSettingService = deleteSettingService;
exports.findSettingServiceByType = findSettingServiceByType;
const standard_error_1 = __importDefault(require("src/common/standard-error"));
const error_type_1 = require("src/common/error-type");
const setting_entity_1 = require("src/domain/setting.entity");
const setting_repository_1 = require("src/repository/setting.repository");
function createSetting(setting) {
    return __awaiter(this, void 0, void 0, function* () {
        const { TYPE } = setting;
        const arraySetting = ["Career History", "Fair Game Play", "Terms & Conditions", "Privacy Policy", "Game Rules", "Contact Us", "Instant Play", "Other"];
        if (!arraySetting.includes(TYPE)) {
            throw new standard_error_1.default(error_type_1.ErrorCodes.API_VALIDATION_ERROR, "Please Select Current Type.");
        }
        const query = {
            where: { TYPE }
        };
        const isAvalible = yield (0, setting_repository_1.countType)(query);
        if (isAvalible && TYPE !== setting_entity_1.SettingKey.OTHER) {
            throw new standard_error_1.default(error_type_1.ErrorCodes.API_VALIDATION_ERROR, "Type already exists.");
        }
        const createOne = yield (0, setting_repository_1.insertOne)(setting);
        if (!createOne) {
            throw new standard_error_1.default(error_type_1.ErrorCodes.API_VALIDATION_ERROR, "Setting create Error.");
        }
        return createOne;
    });
}
function paginationSettingService(query) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield (0, setting_repository_1.findAllData)(query);
        if (!data) {
            throw new standard_error_1.default(error_type_1.ErrorCodes.API_VALIDATION_ERROR, "Setting list Found Error.");
        }
        return data;
    });
}
function findOneSettingService(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = {
            where: {
                ID: id
            }
        };
        const getSetting = yield (0, setting_repository_1.getOneById)(query);
        if (!getSetting) {
            throw new standard_error_1.default(error_type_1.ErrorCodes.NOT_FOUND, "Setting is not found.");
        }
        return getSetting;
    });
}
function findSettingServiceByType(type) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = {
            where: {
                TYPE: type
            }
        };
        const getSetting = yield (0, setting_repository_1.getOneById)(query);
        if (!getSetting) {
            throw new standard_error_1.default(error_type_1.ErrorCodes.NOT_FOUND, "Setting is not found.");
        }
        return getSetting;
    });
}
function deleteSettingService(id) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        let deleteSetting = yield (0, setting_repository_1.deleteAndReturnById)(id);
        if (!(deleteSetting === null || deleteSetting === void 0 ? void 0 : deleteSetting.affected)) {
            throw new standard_error_1.default(error_type_1.ErrorCodes.NOT_FOUND, "Setting is not found.");
        }
        return (_a = deleteSetting === null || deleteSetting === void 0 ? void 0 : deleteSetting.raw) === null || _a === void 0 ? void 0 : _a[0];
    });
}
function updateSettingService(id, setting) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        let updateSetting = yield (0, setting_repository_1.updateAndReturnById)(id, setting);
        if (!(updateSetting === null || updateSetting === void 0 ? void 0 : updateSetting.affected)) {
            throw new standard_error_1.default(error_type_1.ErrorCodes.NOT_FOUND, "Setting is not found.");
        }
        return (_a = updateSetting === null || updateSetting === void 0 ? void 0 : updateSetting.raw) === null || _a === void 0 ? void 0 : _a[0];
    });
}
//# sourceMappingURL=setting.service.js.map