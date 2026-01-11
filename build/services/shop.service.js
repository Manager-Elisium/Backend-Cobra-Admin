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
exports.createShop = createShop;
exports.findShop = findShop;
exports.findAllShop = findAllShop;
exports.findOneShop = findOneShop;
exports.updateShop = updateShop;
exports.deleteShop = deleteShop;
const standard_error_1 = __importDefault(require("src/common/standard-error"));
const error_type_1 = require("src/common/error-type");
const shop_repository_1 = require("src/repository/shop.repository");
const upload_1 = require("src/common/upload");
function createShop(shop) {
    return __awaiter(this, void 0, void 0, function* () {
        const createOne = yield (0, shop_repository_1.insertOne)(shop);
        if (!createOne) {
            throw new standard_error_1.default(error_type_1.ErrorCodes.API_VALIDATION_ERROR, "Shop create Error.");
        }
        return createOne;
    });
}
function findShop(type) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        if (type === "all") {
            const getData = yield (0, shop_repository_1.groupAll)();
            for (let index = 0; index < getData.length; index++) {
                const bucketName = (_a = getData[index]) === null || _a === void 0 ? void 0 : _a.BUCKET_NAME;
                const key = (_b = getData[index]) === null || _b === void 0 ? void 0 : _b.KEY;
                if (!!bucketName && !!key) {
                    getData[index].FILE = (_c = yield (0, upload_1.generatePermanentPresignedUrl)(bucketName, key)) !== null && _c !== void 0 ? _c : "";
                    const itemImages = (_e = (_d = getData[index]) === null || _d === void 0 ? void 0 : _d.ITEM_IMAGES) !== null && _e !== void 0 ? _e : 0;
                    for (let itemIndex = 0; itemIndex < itemImages.length; itemIndex++) {
                        const bucketName = itemImages[itemIndex].BUCKET_NAME;
                        const key = itemImages[itemIndex].KEY;
                        const benefitsUrl = yield (0, upload_1.generatePermanentPresignedUrl)(bucketName, key);
                        itemImages[itemIndex].FILE = benefitsUrl;
                    }
                }
                else {
                    getData[index].FILE = null;
                }
            }
            const groupByType = getData.reduce((group, item) => {
                if (!group[item.TYPE]) {
                    group[item.TYPE] = [];
                }
                group[item.TYPE].push(item);
                return group;
            }, {});
            return groupByType;
        }
        else {
            const list = yield (0, shop_repository_1.findAll)({
                where: {
                    TYPE: type,
                    IS_DELETED: false
                }
            });
            for (let index = 0; index < list.length; index++) {
                const bucketName = (_f = list[index]) === null || _f === void 0 ? void 0 : _f.BUCKET_NAME;
                const key = (_g = list[index]) === null || _g === void 0 ? void 0 : _g.KEY;
                if (!!bucketName && !!key) {
                    list[index].FILE = (_h = yield (0, upload_1.generatePermanentPresignedUrl)(bucketName, key)) !== null && _h !== void 0 ? _h : "";
                    const itemImages = (_k = (_j = list[index]) === null || _j === void 0 ? void 0 : _j.ITEM_IMAGES) !== null && _k !== void 0 ? _k : 0;
                    for (let itemIndex = 0; itemIndex < itemImages.length; itemIndex++) {
                        const bucketName = itemImages[itemIndex].BUCKET_NAME;
                        const key = itemImages[itemIndex].KEY;
                        const benefitsUrl = yield (0, upload_1.generatePermanentPresignedUrl)(bucketName, key);
                        itemImages[itemIndex].FILE = benefitsUrl;
                    }
                }
                else {
                    list[index].FILE = null;
                }
            }
            return list;
        }
    });
}
function findAllShop(query) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c;
        const data = yield (0, shop_repository_1.findAllData)(query);
        if (!data) {
            throw new standard_error_1.default(error_type_1.ErrorCodes.API_VALIDATION_ERROR, "Shop list Found Error.");
        }
        const list = data === null || data === void 0 ? void 0 : data.data;
        for (let index = 0; index < list.length; index++) {
            const bucketName = (_a = list[index]) === null || _a === void 0 ? void 0 : _a.BUCKET_NAME;
            const key = (_b = list[index]) === null || _b === void 0 ? void 0 : _b.KEY;
            if (!!bucketName && !!key) {
                list[index].FILE = (_c = yield (0, upload_1.generatePermanentPresignedUrl)(bucketName, key)) !== null && _c !== void 0 ? _c : "";
            }
            else {
                list[index].FILE = null;
            }
        }
        return { data: list, count: data.count };
    });
}
function findOneShop(id) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const find_shop = yield (0, shop_repository_1.getOneById)(id);
        if (!find_shop) {
            throw new standard_error_1.default(error_type_1.ErrorCodes.NOT_FOUND, "Shop is not found.");
        }
        if (!!(find_shop === null || find_shop === void 0 ? void 0 : find_shop.KEY) && !!(find_shop === null || find_shop === void 0 ? void 0 : find_shop.BUCKET_NAME)) {
            find_shop.FILE = yield (0, upload_1.generatePermanentPresignedUrl)(find_shop === null || find_shop === void 0 ? void 0 : find_shop.BUCKET_NAME, find_shop === null || find_shop === void 0 ? void 0 : find_shop.KEY);
            const itemImages = (_a = find_shop === null || find_shop === void 0 ? void 0 : find_shop.ITEM_IMAGES) !== null && _a !== void 0 ? _a : 0;
            for (let index = 0; index < itemImages.length; index++) {
                const bucketName = itemImages[index].BUCKET_NAME;
                const key = itemImages[index].KEY;
                const benefitsUrl = yield (0, upload_1.generatePermanentPresignedUrl)(bucketName, key);
                itemImages[index].FILE = benefitsUrl;
            }
        }
        else {
            find_shop.FILE = null;
        }
        return find_shop;
    });
}
function updateShop(id, shop) {
    return __awaiter(this, void 0, void 0, function* () {
        let find_shop = yield (0, shop_repository_1.getOneById)(id);
        if (!find_shop) {
            throw new standard_error_1.default(error_type_1.ErrorCodes.NOT_FOUND, "Shop is not found.");
        }
        const update = yield (0, shop_repository_1.updateOne)(id, shop);
        return update;
    });
}
function deleteShop(id) {
    return __awaiter(this, void 0, void 0, function* () {
        let find_shop = yield (0, shop_repository_1.getOneById)(id);
        if (!find_shop) {
            throw new standard_error_1.default(error_type_1.ErrorCodes.NOT_FOUND, "Shop is not found.");
        }
        const deleteData = yield (0, shop_repository_1.updateOne)(id, {
            IS_DELETED: true
        });
        return deleteData;
    });
}
//# sourceMappingURL=shop.service.js.map