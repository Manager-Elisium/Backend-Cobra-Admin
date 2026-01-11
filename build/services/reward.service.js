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
exports.createReward = createReward;
exports.findReward = findReward;
exports.findAllReward = findAllReward;
exports.updateReward = updateReward;
exports.findOneReward = findOneReward;
exports.deleteReward = deleteReward;
exports.findDays = findDays;
const standard_error_1 = __importDefault(require("src/common/standard-error"));
const error_type_1 = require("src/common/error-type");
const reward_repository_1 = require("src/repository/reward.repository");
const upload_1 = require("src/common/upload");
function createReward(reward) {
    return __awaiter(this, void 0, void 0, function* () {
        const createOne = yield (0, reward_repository_1.insertOne)(reward);
        if (!createOne) {
            throw new standard_error_1.default(error_type_1.ErrorCodes.API_VALIDATION_ERROR, "Reward create Error.");
        }
        return createOne;
    });
}
function findReward() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c, _d;
        const [count, list] = yield Promise.all([(0, reward_repository_1.getCount)(), (0, reward_repository_1.findAll)()]);
        for (let mainIndex = 0; mainIndex < list.length; mainIndex++) {
            const mainUrl = yield (0, upload_1.generatePermanentPresignedUrl)((_a = list[mainIndex]) === null || _a === void 0 ? void 0 : _a.BUCKET_NAME, (_b = list[mainIndex]) === null || _b === void 0 ? void 0 : _b.KEY);
            list[mainIndex].FILE = mainUrl;
            const itemImages = (_d = (_c = list[mainIndex]) === null || _c === void 0 ? void 0 : _c.ITEM_IMAGES) !== null && _d !== void 0 ? _d : 0;
            for (let index = 0; index < itemImages.length; index++) {
                const bucketName = itemImages[index].BUCKET_NAME;
                const key = itemImages[index].KEY;
                const benefitsUrl = yield (0, upload_1.generatePermanentPresignedUrl)(bucketName, key);
                itemImages[index].FILE = benefitsUrl;
            }
        }
        return { count, list };
    });
}
function findAllReward(query) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c, _d;
        const data = yield (0, reward_repository_1.findAllData)(query);
        if (!data) {
            throw new standard_error_1.default(error_type_1.ErrorCodes.API_VALIDATION_ERROR, "Reward list Found Error.");
        }
        const list = data.data;
        for (let mainIndex = 0; mainIndex < list.length; mainIndex++) {
            const mainUrl = yield (0, upload_1.generatePermanentPresignedUrl)((_a = list[mainIndex]) === null || _a === void 0 ? void 0 : _a.BUCKET_NAME, (_b = list[mainIndex]) === null || _b === void 0 ? void 0 : _b.KEY);
            list[mainIndex].FILE = mainUrl;
            const itemImages = (_d = (_c = list[mainIndex]) === null || _c === void 0 ? void 0 : _c.ITEM_IMAGES) !== null && _d !== void 0 ? _d : 0;
            for (let index = 0; index < itemImages.length; index++) {
                const bucketName = itemImages[index].BUCKET_NAME;
                const key = itemImages[index].KEY;
                const benefitsUrl = yield (0, upload_1.generatePermanentPresignedUrl)(bucketName, key);
                itemImages[index].FILE = benefitsUrl;
            }
        }
        return data;
    });
}
function findOneReward(id) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        const findReward = yield (0, reward_repository_1.getOneById)(id);
        if (!findReward[0]) {
            throw new standard_error_1.default(error_type_1.ErrorCodes.NOT_FOUND, "Reward is not found.");
        }
        const mainUrl = yield (0, upload_1.generatePermanentPresignedUrl)((_a = findReward[0]) === null || _a === void 0 ? void 0 : _a.BUCKET_NAME, (_b = findReward[0]) === null || _b === void 0 ? void 0 : _b.KEY);
        findReward[0].FILE = mainUrl;
        if (findReward[0].ITEM_IMAGES.length > 0) {
            for (let index = 0; index < findReward[0].ITEM_IMAGES.length; index++) {
                const key = findReward[0].ITEM_IMAGES[index].KEY;
                const bucketName = findReward[0].ITEM_IMAGES[index].BUCKET_NAME;
                const itemImageUrl = yield (0, upload_1.generatePermanentPresignedUrl)(bucketName, key);
                findReward[0].ITEM_IMAGES[index].FILE = itemImageUrl;
            }
        }
        return findReward;
    });
}
function deleteReward(id) {
    return __awaiter(this, void 0, void 0, function* () {
        let getreward = yield (0, reward_repository_1.getOneById)(id);
        if (!getreward[0]) {
            throw new standard_error_1.default(error_type_1.ErrorCodes.NOT_FOUND, "Reward is not found.");
        }
        const deletedata = yield (0, reward_repository_1.updateOne)(id, { IS_DELETED: true });
        return deletedata;
    });
}
function updateReward(id, reward) {
    return __awaiter(this, void 0, void 0, function* () {
        let getreward = yield (0, reward_repository_1.getOneById)(id);
        if (!getreward[0]) {
            throw new standard_error_1.default(error_type_1.ErrorCodes.NOT_FOUND, "Reward is not found.");
        }
        const updateReward = yield (0, reward_repository_1.updateOne)(id, reward);
        return updateReward;
    });
}
function findDays() {
    return __awaiter(this, void 0, void 0, function* () {
        const getList = yield (0, reward_repository_1.findAll)();
        const currentArray = ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7", "Day 8", "Day 9", "Day 10", "Day 11", "Day 12", "Day 13", "Day 14", "Day 15", "Day 16", "Day 17", "Day 18", "Day 19", "Day 20", "Day 21", "Day 22", "Day 23", "Day 24", "Day 25", "Day 26", "Day 27", "Day 28", "Day 29", "Day 30"];
        const dbArray = getList.map((data) => data.DAY);
        const pendingArray = currentArray.filter(day => !dbArray.includes(day));
        return pendingArray;
    });
}
//# sourceMappingURL=reward.service.js.map