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
exports.createVipCard = createVipCard;
exports.findVipCard = findVipCard;
exports.findAllVipCard = findAllVipCard;
exports.findOneVipCard = findOneVipCard;
exports.updateVipCard = updateVipCard;
exports.deleteVipCard = deleteVipCard;
exports.findOneBenefitVipCard = findOneBenefitVipCard;
exports.createVipBenefitService = createVipBenefitService;
exports.findVipCardForDashboardService = findVipCardForDashboardService;
const standard_error_1 = __importDefault(require("src/common/standard-error"));
const error_type_1 = require("src/common/error-type");
const vip_card_repository_1 = require("src/repository/vip_card.repository");
const upload_1 = require("src/common/upload");
function createVipCard(vip_card) {
    return __awaiter(this, void 0, void 0, function* () {
        const createOne = yield (0, vip_card_repository_1.insertOne)(vip_card);
        if (!createOne) {
            throw new standard_error_1.default(error_type_1.ErrorCodes.API_VALIDATION_ERROR, "VipCard create Error.");
        }
        return createOne;
    });
}
function findVipCard() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e, _f, _g;
        const [count, list] = yield Promise.all([(0, vip_card_repository_1.getCount)(), (0, vip_card_repository_1.findAll)()]);
        for (let mainIndex = 0; mainIndex < list.length; mainIndex++) {
            const mainUrl = yield (0, upload_1.generatePermanentPresignedUrl)((_a = list[mainIndex]) === null || _a === void 0 ? void 0 : _a.BUCKET_NAME, (_b = list[mainIndex]) === null || _b === void 0 ? void 0 : _b.KEY);
            list[mainIndex].FILE = mainUrl;
            const benefits = (_d = (_c = list[mainIndex]) === null || _c === void 0 ? void 0 : _c.BENEFITS) !== null && _d !== void 0 ? _d : 0;
            for (let index = 0; index < benefits.length; index++) {
                const bucketName = benefits[index].BUCKET_NAME;
                const key = benefits[index].KEY;
                const benefitsUrl = yield (0, upload_1.generatePermanentPresignedUrl)(bucketName, key);
                benefits[index].FILE = benefitsUrl;
                const emojiImages = (_e = benefits[index]) === null || _e === void 0 ? void 0 : _e.EMOJI_IMAGES;
                if (!!emojiImages) {
                    for (let indexEmoji = 0; indexEmoji < emojiImages.length; indexEmoji++) {
                        const emojiImagesUrl = yield (0, upload_1.generatePermanentPresignedUrl)((_f = emojiImages[indexEmoji]) === null || _f === void 0 ? void 0 : _f.BUCKET_NAME, (_g = emojiImages[indexEmoji]) === null || _g === void 0 ? void 0 : _g.KEY);
                        emojiImages[indexEmoji].FILE = emojiImagesUrl;
                    }
                }
            }
        }
        return { count, list };
    });
}
function findVipCardForDashboardService() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        const list = yield (0, vip_card_repository_1.findAll)();
        for (let mainIndex = 0; mainIndex < list.length; mainIndex++) {
            const mainUrl = yield (0, upload_1.generatePermanentPresignedUrl)((_a = list[mainIndex]) === null || _a === void 0 ? void 0 : _a.BUCKET_NAME, (_b = list[mainIndex]) === null || _b === void 0 ? void 0 : _b.KEY);
            list[mainIndex].FILE = mainUrl;
            delete list[mainIndex].DAYS_PRICE;
            delete list[mainIndex].UPDATED_DATE;
            delete list[mainIndex].BENEFITS;
            delete list[mainIndex].CREATED_DATE;
        }
        return { list };
    });
}
function findAllVipCard(query) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e, _f, _g;
        const data = yield (0, vip_card_repository_1.findAllData)(query);
        if (!data) {
            throw new standard_error_1.default(error_type_1.ErrorCodes.API_VALIDATION_ERROR, "VipCard list Found Error.");
        }
        const list = data.data;
        for (let mainIndex = 0; mainIndex < list.length; mainIndex++) {
            const mainUrl = yield (0, upload_1.generatePermanentPresignedUrl)((_a = list[mainIndex]) === null || _a === void 0 ? void 0 : _a.BUCKET_NAME, (_b = list[mainIndex]) === null || _b === void 0 ? void 0 : _b.KEY);
            list[mainIndex].FILE = mainUrl;
            const benefits = (_d = (_c = list[mainIndex]) === null || _c === void 0 ? void 0 : _c.BENEFITS) !== null && _d !== void 0 ? _d : 0;
            for (let index = 0; index < benefits.length; index++) {
                const bucketName = benefits[index].BUCKET_NAME;
                const key = benefits[index].KEY;
                const benefitsUrl = yield (0, upload_1.generatePermanentPresignedUrl)(bucketName, key);
                benefits[index].FILE = benefitsUrl;
                const emojiImages = (_e = benefits[index]) === null || _e === void 0 ? void 0 : _e.EMOJI_IMAGES;
                if (!!emojiImages) {
                    for (let indexEmoji = 0; indexEmoji < emojiImages.length; indexEmoji++) {
                        const emojiImagesUrl = yield (0, upload_1.generatePermanentPresignedUrl)((_f = emojiImages[indexEmoji]) === null || _f === void 0 ? void 0 : _f.BUCKET_NAME, (_g = emojiImages[indexEmoji]) === null || _g === void 0 ? void 0 : _g.KEY);
                        emojiImages[indexEmoji].FILE = emojiImagesUrl;
                    }
                }
            }
        }
        return { count: data.count, data: list };
    });
}
function findOneVipCard(id) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c;
        const find_vip_card = yield (0, vip_card_repository_1.getOneById)(id);
        if (!find_vip_card) {
            throw new standard_error_1.default(error_type_1.ErrorCodes.NOT_FOUND, "VipCard is not found.");
        }
        const mainUrl = yield (0, upload_1.generatePermanentPresignedUrl)(find_vip_card === null || find_vip_card === void 0 ? void 0 : find_vip_card.BUCKET_NAME, find_vip_card === null || find_vip_card === void 0 ? void 0 : find_vip_card.KEY);
        find_vip_card.FILE = mainUrl;
        const benefits = find_vip_card.BENEFITS;
        for (let index = 0; index < benefits.length; index++) {
            const bucketName = benefits[index].BUCKET_NAME;
            const key = benefits[index].KEY;
            const benefitsUrl = yield (0, upload_1.generatePermanentPresignedUrl)(bucketName, key);
            benefits[index].FILE = benefitsUrl;
            const emojiImages = (_a = benefits[index]) === null || _a === void 0 ? void 0 : _a.EMOJI_IMAGES;
            if (!!emojiImages) {
                for (let indexEmoji = 0; indexEmoji < emojiImages.length; indexEmoji++) {
                    const emojiImagesUrl = yield (0, upload_1.generatePermanentPresignedUrl)((_b = emojiImages[indexEmoji]) === null || _b === void 0 ? void 0 : _b.BUCKET_NAME, (_c = emojiImages[indexEmoji]) === null || _c === void 0 ? void 0 : _c.KEY);
                    emojiImages[indexEmoji].FILE = emojiImagesUrl;
                }
            }
        }
        return find_vip_card;
    });
}
function updateVipCard(id, vip_card) {
    return __awaiter(this, void 0, void 0, function* () {
        let find_vip_card = yield (0, vip_card_repository_1.getOneById)(id);
        if (!find_vip_card[0]) {
            throw new standard_error_1.default(error_type_1.ErrorCodes.NOT_FOUND, "VipCard is not found.");
        }
        const updateVipCard = yield (0, vip_card_repository_1.updateOne)(id, vip_card);
        return updateVipCard;
    });
}
function deleteVipCard(id) {
    return __awaiter(this, void 0, void 0, function* () {
        // let find_vip_card = await getOneById(id);
        // if (!find_vip_card) {
        //   throw new StandardError(
        //     ErrorCodes.NOT_FOUND,
        //     "VipCard is not found."
        //   );
        // }
        const deletedata = yield (0, vip_card_repository_1.updateOne)(id, { IS_DELETED: true });
        return deletedata;
    });
}
function findOneBenefitVipCard(id) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        const find_vip_card = yield (0, vip_card_repository_1.getOneBenefitById)(id);
        if (!find_vip_card) {
            throw new standard_error_1.default(error_type_1.ErrorCodes.NOT_FOUND, "VipCard is not found.");
        }
        const mainUrl = yield (0, upload_1.generatePermanentPresignedUrl)(find_vip_card === null || find_vip_card === void 0 ? void 0 : find_vip_card.BUCKET_NAME, find_vip_card === null || find_vip_card === void 0 ? void 0 : find_vip_card.KEY);
        find_vip_card.FILE = mainUrl;
        const emojiImages = find_vip_card === null || find_vip_card === void 0 ? void 0 : find_vip_card.EMOJI_IMAGES;
        if (!!emojiImages) {
            for (let indexEmoji = 0; indexEmoji < emojiImages.length; indexEmoji++) {
                const emojiImagesUrl = yield (0, upload_1.generatePermanentPresignedUrl)((_a = emojiImages[indexEmoji]) === null || _a === void 0 ? void 0 : _a.BUCKET_NAME, (_b = emojiImages[indexEmoji]) === null || _b === void 0 ? void 0 : _b.KEY);
                emojiImages[indexEmoji].FILE = emojiImagesUrl;
            }
        }
        return find_vip_card;
    });
}
function createVipBenefitService(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const createOne = yield (0, vip_card_repository_1.insertOneVipBenefit)(data);
        if (!createOne) {
            throw new standard_error_1.default(error_type_1.ErrorCodes.API_VALIDATION_ERROR, "VipCard benefit create Error.");
        }
        return createOne;
    });
}
//# sourceMappingURL=vip_card.service.js.map