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
exports.lobbyNameList = lobbyNameList;
exports.getListForDashboard = getListForDashboard;
const encrypt_1 = require("src/common/encrypt");
const error_type_1 = require("src/common/error-type");
const client_s3_1 = require("@aws-sdk/client-s3");
const lobby_service_1 = require("src/services/lobby.service");
const dotenv_1 = __importDefault(require("dotenv"));
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const moment_1 = __importDefault(require("moment"));
const upload_1 = require("src/common/upload");
dotenv_1.default.config();
const secretKey = (_b = (_a = process === null || process === void 0 ? void 0 : process.env) === null || _a === void 0 ? void 0 : _a.SECRET_KEY) !== null && _b !== void 0 ? _b : "SWS0zf0thg8T5Gz3scOSQ2W4r6r7GJAg";
const secretKeyGamePlay = (_d = (_c = process === null || process === void 0 ? void 0 : process.env) === null || _c === void 0 ? void 0 : _c.SECRET_KEY_GAME_PLAY) !== null && _d !== void 0 ? _d : "SM20zD0thg8T5Gz3scOSQ2W4r6r7GJqR";
const s3Client = new client_s3_1.S3Client({
    region: "ap-south-1",
    credentials: {
        accessKeyId: "AKIAUBKFCJYP2UJDMJYK",
        secretAccessKey: "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",
    },
});
// const s3Client = new S3Client({
//     region: 'ap-south-1',
//     credentials: {
//         accessKeyId: 'AKIAYMI5KXNR7R4J77IE',
//         secretAccessKey: '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'
//     },
// });
function insert(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c;
        try {
            const file = req.file;
            if (!file) {
                return res
                    .status(error_type_1.ErrorCodeMap.API_VALIDATION_ERROR)
                    .json({ message: { file: "File field is required" } });
            }
            const fileKey = `${(0, moment_1.default)().unix()}-${file.originalname}`;
            const bucketName = (_b = (_a = process === null || process === void 0 ? void 0 : process.env) === null || _a === void 0 ? void 0 : _a.BUCKET_NAME) !== null && _b !== void 0 ? _b : "cobra-bucket";
            const uploadParams = {
                Bucket: `${bucketName}`,
                Key: `${fileKey}`,
                Body: file.buffer,
                ContentType: file.mimetype,
            };
            const command = new client_s3_1.PutObjectCommand(uploadParams);
            yield s3Client.send(command);
            const getObjectParams = {
                Bucket: process.env.BUCKET_NAME,
                Key: fileKey,
            };
            const result = JSON.parse(req.body.DATA);
            const url = yield (0, s3_request_presigner_1.getSignedUrl)(s3Client, new client_s3_1.GetObjectCommand(getObjectParams), { expiresIn: 604800 });
            const body = Object.assign(Object.assign({}, req.body), { DATA: result, FILE: url, KEY: fileKey, BUCKET_NAME: process.env.BUCKET_NAME });
            let data = yield (0, lobby_service_1.createLobby)(body);
            if (!data) {
                return res
                    .status(error_type_1.ErrorCodeMap.FORM_VALIDATION_ERROR)
                    .json({ message: "lobby create Error." });
            }
            let encryptedData = (0, encrypt_1.encrypt)(JSON.stringify(data), secretKey);
            return res.json({
                status: true,
                data: yield encryptedData,
                message: "lobby created successfully",
            });
        }
        catch (error) {
            return res.json({ status: false, message: (_c = error === null || error === void 0 ? void 0 : error.message) !== null && _c !== void 0 ? _c : "" });
        }
    });
}
function list(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            let data = yield (0, lobby_service_1.findLobby)();
            return res.json({ status: true, data: data });
        }
        catch (error) {
            return res.json({ status: false, message: (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : "" });
        }
    });
}
function getListForDashboard(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            let { list } = yield (0, lobby_service_1.findLobbyForDashboardService)();
            return res.json({ status: true, list });
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
                keyword: keyword || "",
            };
            let data = yield (0, lobby_service_1.findAllLobby)(query);
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
            yield (0, lobby_service_1.deleteLobby)(id);
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
function update(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c;
        try {
            let isUploadFile = (yield (0, upload_1.uploadFile)(req, res, next));
            const { id } = req.params;
            if (isUploadFile.status) {
                let find = yield (0, lobby_service_1.findOneLobby)(id);
                console.log(find);
                let key = (_a = find[0]) === null || _a === void 0 ? void 0 : _a.KEY;
                if (!!key) {
                    let deleteParams = {
                        Bucket: process.env.BUCKET_NAME,
                        Key: (_b = find[0]) === null || _b === void 0 ? void 0 : _b.KEY,
                    };
                    const deleteObjectCommand = new client_s3_1.DeleteObjectCommand(deleteParams);
                    yield s3Client.send(deleteObjectCommand);
                    console.log("Object deleted successfully.");
                }
                const result = JSON.parse(req.body.DATA);
                const body = Object.assign(Object.assign({}, req.body), { FILE: isUploadFile.FILE, BUCKET_NAME: isUploadFile.BUCKET_NAME, KEY: isUploadFile.KEY, DATA: result });
                yield (0, lobby_service_1.updateLobby)(id, body);
                let updatedReward = yield (0, lobby_service_1.findOneLobby)(id);
                let encryptedData = (0, encrypt_1.encrypt)(JSON.stringify(updatedReward), secretKey);
                return res.json({
                    status: true,
                    data: yield encryptedData,
                    message: "updated data sucessfully",
                });
            }
            else {
                const result = JSON.parse(req.body.DATA);
                const body = Object.assign(Object.assign({}, req.body), { DATA: result });
                yield (0, lobby_service_1.updateLobby)(id, body);
                let updatedReward = yield (0, lobby_service_1.findOneLobby)(id);
                let encryptedData = (0, encrypt_1.encrypt)(JSON.stringify(updatedReward), secretKey);
                return res.json({
                    status: true,
                    data: yield encryptedData,
                    message: "updated data sucessfully",
                });
            }
        }
        catch (error) {
            return res.json({ status: false, message: (_c = error === null || error === void 0 ? void 0 : error.message) !== null && _c !== void 0 ? _c : "" });
        }
    });
}
function lobbyNameList(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            let data = yield (0, lobby_service_1.findLobbyNameService)();
            let encryptedData = yield (0, encrypt_1.encrypt)(JSON.stringify(data), secretKey);
            return res.json({
                status: true,
                data: encryptedData,
                message: "Lobby list",
            });
        }
        catch (error) {
            return res.json({ status: false, message: (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : "" });
        }
    });
}
//# sourceMappingURL=lobby.controller.js.map