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
exports.createMission = createMission;
exports.findMission = findMission;
exports.findAllMission = findAllMission;
exports.findOneMission = findOneMission;
exports.updateMission = updateMission;
exports.deleteMission = deleteMission;
const standard_error_1 = __importDefault(require("src/common/standard-error"));
const error_type_1 = require("src/common/error-type");
const mission_repository_1 = require("src/repository/mission.repository");
const upload_1 = require("src/common/upload");
function createMission(mission) {
    return __awaiter(this, void 0, void 0, function* () {
        const createOne = yield (0, mission_repository_1.insertOne)(mission);
        if (!createOne) {
            throw new standard_error_1.default(error_type_1.ErrorCodes.API_VALIDATION_ERROR, "Mission create Error.");
        }
        return createOne;
    });
}
function findMission() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        const [count, list] = yield Promise.all([(0, mission_repository_1.getCount)(), (0, mission_repository_1.findAll)()]);
        for (let mainIndex = 0; mainIndex < list.length; mainIndex++) {
            const mainUrl = yield (0, upload_1.generatePermanentPresignedUrl)((_a = list[mainIndex]) === null || _a === void 0 ? void 0 : _a.BUCKET_NAME, (_b = list[mainIndex]) === null || _b === void 0 ? void 0 : _b.KEY);
            list[mainIndex].FILE = mainUrl;
        }
        return { count, list };
    });
}
function findAllMission(query) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        const data = yield (0, mission_repository_1.findAllData)(query);
        if (!data) {
            throw new standard_error_1.default(error_type_1.ErrorCodes.API_VALIDATION_ERROR, "Mission list Found Error.");
        }
        const list = data.data;
        for (let mainIndex = 0; mainIndex < list.length; mainIndex++) {
            const mainUrl = yield (0, upload_1.generatePermanentPresignedUrl)((_a = list[mainIndex]) === null || _a === void 0 ? void 0 : _a.BUCKET_NAME, (_b = list[mainIndex]) === null || _b === void 0 ? void 0 : _b.KEY);
            list[mainIndex].FILE = mainUrl;
        }
        return data;
    });
}
function findOneMission(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const findMission = yield (0, mission_repository_1.getOneById)(id);
        console.log(findMission);
        if (!findMission) {
            throw new standard_error_1.default(error_type_1.ErrorCodes.NOT_FOUND, "Mission is not found.");
        }
        const mainUrl = yield (0, upload_1.generatePermanentPresignedUrl)(findMission === null || findMission === void 0 ? void 0 : findMission.BUCKET_NAME, findMission === null || findMission === void 0 ? void 0 : findMission.KEY);
        findMission.FILE = mainUrl;
        return findMission;
    });
}
function deleteMission(id) {
    return __awaiter(this, void 0, void 0, function* () {
        let getMission = yield (0, mission_repository_1.getOneById)(id);
        if (!getMission) {
            throw new standard_error_1.default(error_type_1.ErrorCodes.NOT_FOUND, "Mission is not found.");
        }
        const deletedata = yield (0, mission_repository_1.updateOne)(id, { IS_DELETED: true });
        return deletedata;
    });
}
function updateMission(id, mission) {
    return __awaiter(this, void 0, void 0, function* () {
        let getMission = yield (0, mission_repository_1.getOneById)(id);
        if (!getMission) {
            throw new standard_error_1.default(error_type_1.ErrorCodes.NOT_FOUND, "Mission is not found.");
        }
        const updateMission = yield (0, mission_repository_1.updateOne)(id, mission);
        return updateMission;
    });
}
//# sourceMappingURL=mission.service.js.map