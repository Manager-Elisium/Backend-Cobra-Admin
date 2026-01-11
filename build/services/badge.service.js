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
exports.createBadgeService = createBadgeService;
exports.paginationBadgeService = paginationBadgeService;
exports.deleteBadgeService = deleteBadgeService;
exports.findOneBadgeService = findOneBadgeService;
exports.updateBadgeService = updateBadgeService;
exports.listBadgeService = listBadgeService;
const standard_error_1 = __importDefault(require("src/common/standard-error"));
const error_type_1 = require("src/common/error-type");
const badge_repository_1 = require("src/repository/badge.repository");
const upload_1 = require("src/common/upload");
function createBadgeService(badge) {
    return __awaiter(this, void 0, void 0, function* () {
        const { TYPE } = badge;
        const arrayAchievement = ["Card Shark", "Seasoned Elite", "Rising Star", "Gold Miner", "Diamond Driller"];
        if (!arrayAchievement.includes(TYPE)) {
            throw new standard_error_1.default(error_type_1.ErrorCodes.API_VALIDATION_ERROR, "Please Select Current Type.");
        }
        const query = {
            where: { TYPE }
        };
        const isAvalible = yield (0, badge_repository_1.countType)(query);
        if (isAvalible) {
            throw new standard_error_1.default(error_type_1.ErrorCodes.API_VALIDATION_ERROR, "Type already exists.");
        }
        const createOne = yield (0, badge_repository_1.insertOne)(badge);
        if (!createOne) {
            throw new standard_error_1.default(error_type_1.ErrorCodes.API_VALIDATION_ERROR, "Badge create Error.");
        }
        return createOne;
    });
}
function paginationBadgeService(body) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = {
            order: { CREATED_DATE: 'DESC' },
            take: body.take,
            skip: (body.page - 1) * body.take
        };
        const data = yield (0, badge_repository_1.findAllData)(query);
        if (!data) {
            throw new standard_error_1.default(error_type_1.ErrorCodes.API_VALIDATION_ERROR, "Badge list Found Error.");
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
function deleteBadgeService(id) {
    return __awaiter(this, void 0, void 0, function* () {
        let deleteBadge = yield (0, badge_repository_1.deleteAndReturnById)(id);
        if (!deleteBadge) {
            throw new standard_error_1.default(error_type_1.ErrorCodes.NOT_FOUND, "Badge is not found.");
        }
        return deleteBadge;
    });
}
function findOneBadgeService(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = {
            where: {
                ID: id
            },
        };
        const getBadge = yield (0, badge_repository_1.getOneById)(query);
        if (!getBadge) {
            throw new standard_error_1.default(error_type_1.ErrorCodes.NOT_FOUND, "Badge is not found.");
        }
        getBadge.FILE = yield (0, upload_1.generatePermanentPresignedUrl)(getBadge === null || getBadge === void 0 ? void 0 : getBadge.BUCKET_NAME, getBadge === null || getBadge === void 0 ? void 0 : getBadge.KEY);
        return getBadge;
    });
}
function updateBadgeService(id, setting) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        let updateBadge = yield (0, badge_repository_1.updateAndReturnById)(id, setting);
        if (!(updateBadge === null || updateBadge === void 0 ? void 0 : updateBadge.affected)) {
            throw new standard_error_1.default(error_type_1.ErrorCodes.NOT_FOUND, "Badge is not found.");
        }
        return (_a = updateBadge === null || updateBadge === void 0 ? void 0 : updateBadge.raw) === null || _a === void 0 ? void 0 : _a[0];
    });
}
function listBadgeService() {
    return __awaiter(this, void 0, void 0, function* () {
        const query = {
            order: { CREATED_DATE: 'DESC' }
        };
        const data = yield (0, badge_repository_1.findAllData)(query);
        if (!data) {
            throw new standard_error_1.default(error_type_1.ErrorCodes.API_VALIDATION_ERROR, "Badge list Found Error.");
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
//# sourceMappingURL=badge.service.js.map