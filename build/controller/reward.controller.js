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
exports.days = days;
exports.insertItem = insertItem;
exports.deleteItemFile = deleteItemFile;
exports.updateItemFile = updateItemFile;
const encrypt_1 = require("src/common/encrypt");
const client_s3_1 = require("@aws-sdk/client-s3");
const reward_service_1 = require("src/services/reward.service");
const dotenv_1 = __importDefault(require("dotenv"));
const upload_1 = require("src/common/upload");
const reward_repository_1 = require("src/repository/reward.repository");
dotenv_1.default.config();
const secretKey = (_b = (_a = process === null || process === void 0 ? void 0 : process.env) === null || _a === void 0 ? void 0 : _a.SECRET_KEY) !== null && _b !== void 0 ? _b : "SWS0zf0thg8T5Gz3scOSQ2W4r6r7GJAg";
const secretKeyGamePlay = (_d = (_c = process === null || process === void 0 ? void 0 : process.env) === null || _c === void 0 ? void 0 : _c.SECRET_KEY_GAME_PLAY) !== null && _d !== void 0 ? _d : "SM20zD0thg8T5Gz3scOSQ2W4r6r7GJqR";
const s3Client = new client_s3_1.S3Client({
    region: process.env.REGION,
    credentials: {
        accessKeyId: process.env.ACCESS_KEY_ID,
        secretAccessKey: process.env.SECRET_ACCESS_KEY,
    },
});
function days(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const getDays = yield (0, reward_service_1.findDays)();
            let encryptedData = (0, encrypt_1.encrypt)(JSON.stringify(getDays), secretKey);
            return res.json({
                status: true,
                data: yield encryptedData,
                message: "Reward days successfully",
            });
        }
        catch (error) {
            return res.json({ status: false, message: (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : "" });
        }
    });
}
function insert(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            let isUploadFile = yield (0, upload_1.uploadFile)(req, res, next);
            if (!isUploadFile.status) {
                return res
                    .status(400)
                    .json({ message: "Reward file is compulsory." });
            }
            const reqBody = Object.assign(Object.assign({}, req.body), { FILE: isUploadFile === null || isUploadFile === void 0 ? void 0 : isUploadFile.FILE, BUCKET_NAME: isUploadFile === null || isUploadFile === void 0 ? void 0 : isUploadFile.BUCKET_NAME, KEY: isUploadFile === null || isUploadFile === void 0 ? void 0 : isUploadFile.KEY });
            let data = yield (0, reward_service_1.createReward)(reqBody);
            if (!data) {
                return res
                    .status(400)
                    .json({ message: "Reward create Error." });
            }
            let encryptedData = (0, encrypt_1.encrypt)(JSON.stringify(data), secretKey);
            return res.json({
                status: true,
                data: yield encryptedData,
                message: "Reward created successfully",
            });
        }
        catch (error) {
            return res.json({ status: false, message: (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : "" });
        }
    });
}
function insertItem(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            let isUploadFile = yield (0, upload_1.uploadMultipleFile)(req, res, next);
            console.log(isUploadFile);
            if (!isUploadFile.status) {
                return res
                    .status(400)
                    .json({ message: "Reward file is compulsory." });
            }
            const reqBody = Object.assign(Object.assign({}, req.body), { FILE: isUploadFile === null || isUploadFile === void 0 ? void 0 : isUploadFile.FILE, BUCKET_NAME: isUploadFile === null || isUploadFile === void 0 ? void 0 : isUploadFile.BUCKET_NAME, KEY: isUploadFile === null || isUploadFile === void 0 ? void 0 : isUploadFile.KEY, ITEM_IMAGES: isUploadFile === null || isUploadFile === void 0 ? void 0 : isUploadFile.ITEM_IMAGES });
            let data = yield (0, reward_service_1.createReward)(reqBody);
            if (!data) {
                return res
                    .status(400)
                    .json({ message: "Reward create Error." });
            }
            let encryptedData = (0, encrypt_1.encrypt)(JSON.stringify(data), secretKey);
            return res.json({
                status: true,
                data: yield encryptedData,
                message: "Reward created successfully",
            });
        }
        catch (error) {
            return res.json({ status: false, message: (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : "" });
        }
    });
}
function list(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            let data = yield (0, reward_service_1.findReward)();
            // let encryptedData = encrypt(JSON.stringify(data), secretKeyGamePlay);
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
                keyword: keyword || '',
            };
            let data = yield (0, reward_service_1.findAllReward)(query);
            let encryptedData = (0, encrypt_1.encrypt)(JSON.stringify(data), secretKey);
            return res.json({
                status: true,
                data: yield encryptedData,
                message: "Reward list",
            });
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
            yield (0, reward_service_1.deleteReward)(id);
            let encryptedData = (0, encrypt_1.encrypt)(JSON.stringify(id), secretKey);
            return res.json({
                status: true,
                id: yield encryptedData,
                msg: "deleted successfully",
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
            let find = yield (0, reward_service_1.findOneReward)(id);
            let encryptedData = (0, encrypt_1.encrypt)(JSON.stringify(find === null || find === void 0 ? void 0 : find[0]), secretKey);
            return res.json({
                status: true,
                id: yield encryptedData,
                msg: "get successfully",
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
                let find = yield (0, reward_repository_1.getOneById)(id);
                console.log(find);
                let key = find === null || find === void 0 ? void 0 : find.KEY;
                if (!!key) {
                    // let deleteParams = {
                    //     Bucket: process.env.BUCKET_NAME,
                    //     Key: find?.KEY
                    // };
                    // const deleteObjectCommand = new DeleteObjectCommand(deleteParams);
                    // await s3Client.send(deleteObjectCommand);
                    // console.log("Object deleted successfully.");
                }
                const body = Object.assign(Object.assign({}, req.body), { FILE: isUploadFile.FILE, BUCKET_NAME: isUploadFile.BUCKET_NAME, KEY: isUploadFile.KEY, VALUE: req.body.VALUE });
                yield (0, reward_service_1.updateReward)(id, body);
                let updatedReward = yield (0, reward_service_1.findOneReward)(id);
                let encryptedData = (0, encrypt_1.encrypt)(JSON.stringify(updatedReward), secretKey);
                return res.json({
                    status: true,
                    data: yield encryptedData,
                    message: "updated data sucessfully",
                });
            }
            else {
                yield (0, reward_service_1.updateReward)(id, req.body);
                let updatedReward = yield (0, reward_service_1.findOneReward)(id);
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
function deleteItemFile(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c;
        try {
            const { id } = req.params;
            const { KEY } = req.body;
            if (!KEY) {
            }
            let find = yield (0, reward_repository_1.getOneById)(id);
            const currentItems = (_a = find === null || find === void 0 ? void 0 : find[0]) === null || _a === void 0 ? void 0 : _a.ITEM_IMAGES.filter((data) => KEY !== data.KEY);
            let key = (_b = find === null || find === void 0 ? void 0 : find[0]) === null || _b === void 0 ? void 0 : _b.ITEM_IMAGES.filter((data) => KEY === data.KEY);
            if (key.length > 0) {
                // let deleteParams = {
                //     Bucket: process.env.BUCKET_NAME,
                //     Key: key[0]?.KEY
                // };
                // const deleteObjectCommand = new DeleteObjectCommand(deleteParams);
                // await s3Client.send(deleteObjectCommand);
                // console.log("Object deleted successfully.");
            }
            console.log(currentItems);
            const body = {
                ITEM_IMAGES: currentItems,
                VALUE: currentItems === null || currentItems === void 0 ? void 0 : currentItems.length
            };
            yield (0, reward_service_1.updateReward)(id, body);
            let updatedReward = yield (0, reward_service_1.findOneReward)(id);
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
        var _a, _b, _c, _d, _e;
        try {
            let isUploadFile = yield (0, upload_1.uploadFile)(req, res, next);
            const { id } = req.params;
            if (isUploadFile.status) {
                const { KEY } = req.body;
                let find = yield (0, reward_repository_1.getOneById)(id);
                let key = (_b = (_a = find[0]) === null || _a === void 0 ? void 0 : _a.ITEM_IMAGES.filter((data) => KEY === (data === null || data === void 0 ? void 0 : data.KEY))) !== null && _b !== void 0 ? _b : [];
                if (key.length > 0) {
                    // let deleteParams = {
                    //     Bucket: process.env.BUCKET_NAME,
                    //     Key: key[0]?.KEY
                    // };
                    // const deleteObjectCommand = new DeleteObjectCommand(deleteParams);
                    // await s3Client.send(deleteObjectCommand);
                    // console.log("Object deleted successfully.");
                }
                const currentItems = (_d = (_c = find[0]) === null || _c === void 0 ? void 0 : _c.ITEM_IMAGES.filter((data) => KEY !== (data === null || data === void 0 ? void 0 : data.KEY))) !== null && _d !== void 0 ? _d : [];
                const data = {
                    FILE: isUploadFile.FILE,
                    BUCKET_NAME: isUploadFile.BUCKET_NAME,
                    KEY: isUploadFile.KEY,
                    INDEX: currentItems.length + 1
                };
                const getData = [...currentItems, data];
                const body = {
                    ITEM_IMAGES: getData,
                    VALUE: req.body.VALUE
                };
                yield (0, reward_service_1.updateReward)(id, body);
                let updatedReward = yield (0, reward_service_1.findOneReward)(id);
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
                    .json({ message: "Reward file is compulsory." });
            }
        }
        catch (error) {
            return res.json({ status: false, message: (_e = error === null || error === void 0 ? void 0 : error.message) !== null && _e !== void 0 ? _e : "" });
        }
    });
}
//# sourceMappingURL=reward.controller.js.map