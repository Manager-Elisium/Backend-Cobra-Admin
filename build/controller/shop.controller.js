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
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
exports.insert = insert;
exports.list = list;
exports.allDataList = allDataList;
exports.update = update;
exports.Delete = Delete;
exports.Get = Get;
exports.GetById = GetById;
exports.deleteItemFile = deleteItemFile;
exports.updateItemFile = updateItemFile;
const encrypt_1 = require("src/common/encrypt");
const client_s3_1 = require("@aws-sdk/client-s3");
const dotenv_1 = __importDefault(require("dotenv"));
const shop_service_1 = require("src/services/shop.service");
const upload_1 = require("src/common/upload");
const error_type_1 = require("src/common/error-type");
const shop_repository_1 = require("src/repository/shop.repository");
dotenv_1.default.config();
const secretKey = (_b = (_a = process === null || process === void 0 ? void 0 : process.env) === null || _a === void 0 ? void 0 : _a.SECRET_KEY) !== null && _b !== void 0 ? _b : 'SWS0zf0thg8T5Gz3scOSQ2W4r6r7GJAg';
const secretKeyGamePlay = (_d = (_c = process === null || process === void 0 ? void 0 : process.env) === null || _c === void 0 ? void 0 : _c.SECRET_KEY_GAME_PLAY) !== null && _d !== void 0 ? _d : 'SM20zD0thg8T5Gz3scOSQ2W4r6r7GJqR';
// Set up AWS S3
const s3Client = new client_s3_1.S3Client({
    region: 'ap-south-1',
    credentials: {
        accessKeyId: 'AKIA3YQTGJIW7HUXC523',
        secretAccessKey: '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'
    },
});
// const s3Client = new S3Client({
//     region: process?.env?.REGION ?? "ap-south-1",
//     credentials: {
//         accessKeyId: process?.env?.ACCESS_KEY_ID ?? "AKIAYMI5KXNR7R4J77IE",
//         secretAccessKey: process?.env?.SECRET_ACCESS_KEY ?? "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"
//     },
// });
function insert(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        try {
            const isUploadFile = yield (0, upload_1.uploadSeasonRewardFile)(req, res, next);
            if (!isUploadFile.status) {
                return res
                    .status(400)
                    .json({ message: "Shop file is compulsory." });
            }
            const body = Object.assign(Object.assign({}, req.body), { KEY: isUploadFile === null || isUploadFile === void 0 ? void 0 : isUploadFile.KEY, BUCKET_NAME: process.env.BUCKET_NAME, ITEM_IMAGES: isUploadFile === null || isUploadFile === void 0 ? void 0 : isUploadFile.ITEM_IMAGES, EXCLUSIVE_OFFER: ((_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.EXCLUSIVE_OFFER) == 'true' ? true : false });
            let data = yield (0, shop_service_1.createShop)(body);
            if (!data) {
                return res
                    .status(error_type_1.ErrorCodeMap.FORM_VALIDATION_ERROR)
                    .json({ message: "Shop create Error." });
            }
            console.log(data);
            let encryptedData = yield (0, encrypt_1.encrypt)(JSON.stringify(data), secretKey);
            return res.json({
                status: true,
                data: encryptedData,
                message: "Shop created successfully",
            });
        }
        catch (error) {
            return res.json({ status: false, message: (_b = error === null || error === void 0 ? void 0 : error.message) !== null && _b !== void 0 ? _b : "" });
        }
    });
}
function list(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const { id: TYPE } = req.params;
            let data = yield (0, shop_service_1.findShop)(TYPE);
            return res.json({ status: true, data });
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
            const { take, page, keyword } = req.query;
            const query = {
                take: take || 10,
                page: page || 1,
                keyword: keyword || ''
            };
            let data = yield (0, shop_service_1.findAllShop)(query);
            let encryptedData = (0, encrypt_1.encrypt)(JSON.stringify(data), secretKey);
            return res.json({ status: true, data: yield encryptedData, message: "Shop list" });
        }
        catch (error) {
            return res.json({ status: false, message: (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : "" });
        }
    });
}
function Delete(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const { id } = req.params;
            yield (0, shop_service_1.deleteShop)(id);
            let encryptedData = (0, encrypt_1.encrypt)(JSON.stringify(id), secretKey);
            return res.json({ status: true, id: yield encryptedData, msg: "deleted successfully" });
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
                let find = yield (0, shop_repository_1.getOneById)(id);
                console.log(find);
                // let key = find?.KEY;
                // if (!!key) {
                //     let deleteParams = {
                //         Bucket: process.env.BUCKET_NAME,
                //         Key: find?.KEY
                //     };
                //     const deleteObjectCommand = new DeleteObjectCommand(deleteParams);
                //     await s3Client.send(deleteObjectCommand);
                //     console.log("Object deleted successfully.");
                // }
                const body = Object.assign(Object.assign({}, req.body), { BUCKET_NAME: isUploadFile.BUCKET_NAME, KEY: isUploadFile.KEY });
                yield (0, shop_repository_1.updateOne)(id, body);
                let updatedReward = yield (0, shop_repository_1.getOneById)(id);
                let encryptedData = (0, encrypt_1.encrypt)(JSON.stringify(updatedReward), secretKey);
                return res.json({
                    status: true,
                    data: yield encryptedData,
                    message: "updated data sucessfully",
                });
            }
            else {
                const body = Object.assign({}, req.body);
                yield (0, shop_repository_1.updateOne)(id, body);
                let updatedReward = yield (0, shop_repository_1.getOneById)(id);
                let encryptedData = (0, encrypt_1.encrypt)(JSON.stringify(updatedReward), secretKey);
                return res.json({
                    status: true,
                    data: yield encryptedData,
                    message: "updated data sucessfully",
                });
            }
        }
        catch (error) {
            return res.json({ status: false, message: (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : "" });
        }
    });
}
function GetById(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const { id } = req.params;
            let find = yield (0, shop_service_1.findOneShop)(id);
            return res.json({
                status: true,
                data: find,
                msg: "get successfully",
            });
        }
        catch (error) {
            return res.json({ status: false, message: (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : "" });
        }
    });
}
function Get(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const { id } = req.params;
            let find = yield (0, shop_service_1.findOneShop)(id);
            let encryptedData = yield (0, encrypt_1.encrypt)(JSON.stringify(find), secretKey);
            // decrypt(await encrypt(JSON.stringify(find?.[0]), secretKey), secretKey)
            return res.json({
                status: true,
                id: encryptedData,
                msg: "get successfully",
            });
        }
        catch (error) {
            return res.json({ status: false, message: (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : "" });
        }
    });
}
function deleteItemFile(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c;
        try {
            const { id } = req.params;
            const { KEY } = req.body;
            let find = yield (0, shop_repository_1.getOneById)(id);
            const currentItems = (_a = find === null || find === void 0 ? void 0 : find.ITEM_IMAGES) === null || _a === void 0 ? void 0 : _a.filter((data) => KEY !== data.KEY);
            let key = (_b = find === null || find === void 0 ? void 0 : find.ITEM_IMAGES) === null || _b === void 0 ? void 0 : _b.find((data) => KEY === data.KEY);
            if (!!key) {
                // let deleteParams = {
                //     Bucket: process.env.BUCKET_NAME,
                //     Key: key.KEY
                // };
                // const deleteObjectCommand = new DeleteObjectCommand(deleteParams);
                // await s3Client.send(deleteObjectCommand);
                console.log("Object deleted successfully.");
            }
            console.log(currentItems);
            const body = {
                ITEM_IMAGES: currentItems
            };
            yield (0, shop_repository_1.updateOne)(id, body);
            let updatedReward = yield (0, shop_repository_1.getOneById)(id);
            let encryptedData = (0, encrypt_1.encrypt)(JSON.stringify(updatedReward), secretKey);
            return res.json({
                status: true,
                data: yield encryptedData,
                message: "delete data sucessfully",
            });
        }
        catch (error) {
            return res.json({ status: false, message: (_c = error === null || error === void 0 ? void 0 : error.message) !== null && _c !== void 0 ? _c : "" });
        }
    });
}
function updateItemFile(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        try {
            let isUploadFile = yield (0, upload_1.uploadFile)(req, res, next);
            const { id } = req.params;
            if (isUploadFile.status) {
                const { KEY } = req.body;
                let find = yield (0, shop_repository_1.getOneById)(id);
                // let key = find?.ITEM_IMAGES.filter((data: any) => KEY === data?.KEY) ?? [];
                // if (key.length > 0) {
                //     let deleteParams = {
                //         Bucket: process.env.BUCKET_NAME,
                //         Key: key[0]?.KEY
                //     };
                //     const deleteObjectCommand = new DeleteObjectCommand(deleteParams);
                //     await s3Client.send(deleteObjectCommand);
                //     console.log("Object deleted successfully.");
                // }
                const currentItems = (_a = find === null || find === void 0 ? void 0 : find.EMOJI_IMAGES.filter((data) => KEY !== (data === null || data === void 0 ? void 0 : data.KEY))) !== null && _a !== void 0 ? _a : [];
                const data = {
                    BUCKET_NAME: isUploadFile.BUCKET_NAME,
                    KEY: isUploadFile.KEY
                };
                const getData = [...currentItems, data];
                const body = {
                    ITEM_IMAGES: getData
                };
                yield (0, shop_repository_1.updateOne)(id, body);
                let updatedReward = yield (0, shop_repository_1.getOneById)(id);
                let encryptedData = (0, encrypt_1.encrypt)(JSON.stringify(updatedReward), secretKey);
                return res.json({
                    status: true,
                    // updatedReward,
                    data: yield encryptedData,
                    message: "update data sucessfully",
                });
            }
            else {
                return res
                    .status(400)
                    .json({ message: "Emoji file is compulsory." });
            }
        }
        catch (error) {
            return res.json({ status: false, message: (_b = error === null || error === void 0 ? void 0 : error.message) !== null && _b !== void 0 ? _b : "" });
        }
    });
}
//# sourceMappingURL=shop.controller.js.map