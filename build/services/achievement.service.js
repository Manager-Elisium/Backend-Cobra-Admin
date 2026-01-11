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
exports.createAchievementService = createAchievementService;
exports.paginationAchievementService = paginationAchievementService;
exports.deleteAchievementService = deleteAchievementService;
exports.findOneAchievementService = findOneAchievementService;
exports.updateAchievementService = updateAchievementService;
exports.listAchievementService = listAchievementService;
const standard_error_1 = __importDefault(require("src/common/standard-error"));
const error_type_1 = require("src/common/error-type");
const achievement_repository_1 = require("src/repository/achievement.repository");
const upload_1 = require("src/common/upload");
function createAchievementService(achievement) {
    return __awaiter(this, void 0, void 0, function* () {
        const { TYPE } = achievement;
        const arrayAchievement = ["Lucky Streak", "Cobra Charmer", "Globe Trotter", "High Roller", "Slick n Quick"];
        if (!arrayAchievement.includes(TYPE)) {
            throw new standard_error_1.default(error_type_1.ErrorCodes.API_VALIDATION_ERROR, "Please Select Current Type.");
        }
        const query = {
            where: { TYPE }
        };
        const isAvalible = yield (0, achievement_repository_1.countType)(query);
        if (isAvalible) {
            throw new standard_error_1.default(error_type_1.ErrorCodes.API_VALIDATION_ERROR, "Type already exists.");
        }
        const createOne = yield (0, achievement_repository_1.insertOne)(achievement);
        if (!createOne) {
            throw new standard_error_1.default(error_type_1.ErrorCodes.API_VALIDATION_ERROR, "Achievement create Error.");
        }
        return createOne;
    });
}
function paginationAchievementService(body) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = {
            order: { CREATED_DATE: 'DESC' },
            take: body.take,
            skip: (body.page - 1) * body.take
        };
        const data = yield (0, achievement_repository_1.findAllData)(query);
        if (!data) {
            throw new standard_error_1.default(error_type_1.ErrorCodes.API_VALIDATION_ERROR, "Achievement list Found Error.");
        }
        const list = data === null || data === void 0 ? void 0 : data[0];
        for (let index = 0; index < list.length; index++) {
            const bucketName = list[index].BUCKET_NAME;
            const key = list[index].KEY;
            list[index].FILE = yield (0, upload_1.generatePermanentPresignedUrl)(bucketName, key);
        }
        return { data: list, count: data === null || data === void 0 ? void 0 : data[1] };
    });
}
function deleteAchievementService(id) {
    return __awaiter(this, void 0, void 0, function* () {
        let deleteSetting = yield (0, achievement_repository_1.deleteAndReturnById)(id);
        if (!deleteSetting) {
            throw new standard_error_1.default(error_type_1.ErrorCodes.NOT_FOUND, "Achievement is not found.");
        }
        return deleteSetting;
    });
}
function findOneAchievementService(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = {
            where: {
                ID: id
            },
            relations: ['TASK_LOBBY_ID']
        };
        const getAchievement = yield (0, achievement_repository_1.getOneById)(query);
        if (!getAchievement) {
            throw new standard_error_1.default(error_type_1.ErrorCodes.NOT_FOUND, "Achievement is not found.");
        }
        getAchievement.FILE = yield (0, upload_1.generatePermanentPresignedUrl)(getAchievement === null || getAchievement === void 0 ? void 0 : getAchievement.BUCKET_NAME, getAchievement === null || getAchievement === void 0 ? void 0 : getAchievement.KEY);
        return getAchievement;
    });
}
function updateAchievementService(id, setting) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        let updateAchievement = yield (0, achievement_repository_1.updateAndReturnById)(id, setting);
        if (!(updateAchievement === null || updateAchievement === void 0 ? void 0 : updateAchievement.affected)) {
            throw new standard_error_1.default(error_type_1.ErrorCodes.NOT_FOUND, "Achievement is not found.");
        }
        return (_a = updateAchievement === null || updateAchievement === void 0 ? void 0 : updateAchievement.raw) === null || _a === void 0 ? void 0 : _a[0];
    });
}
function listAchievementService() {
    return __awaiter(this, void 0, void 0, function* () {
        const query = {
            order: { CREATED_DATE: 'DESC' }
        };
        const data = yield (0, achievement_repository_1.findAllData)(query);
        if (!data) {
            throw new standard_error_1.default(error_type_1.ErrorCodes.API_VALIDATION_ERROR, "Achievement list Found Error.");
        }
        const list = data === null || data === void 0 ? void 0 : data[0];
        for (let index = 0; index < list.length; index++) {
            const bucketName = list[index].BUCKET_NAME;
            const key = list[index].KEY;
            list[index].FILE = yield (0, upload_1.generatePermanentPresignedUrl)(bucketName, key);
        }
        return { data: list, count: data === null || data === void 0 ? void 0 : data[1] };
    });
}
//# sourceMappingURL=achievement.service.js.map