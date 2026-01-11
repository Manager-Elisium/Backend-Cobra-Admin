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
const encrypt_1 = require("src/common/encrypt");
const error_type_1 = require("src/common/error-type");
const client_s3_1 = require("@aws-sdk/client-s3");
const mission_service_1 = require("src/services/mission.service");
const dotenv_1 = __importDefault(require("dotenv"));
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const moment_1 = __importDefault(require("moment"));
const reward_gridfs_1 = require("src/connection/reward.gridfs");
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
                    .json({ message: "File field is required" });
            }
            const fileKey = `${(0, moment_1.default)().unix()}-${file.originalname}`;
            const bucketName = (_b = (_a = process === null || process === void 0 ? void 0 : process.env) === null || _a === void 0 ? void 0 : _a.BUCKET_NAME) !== null && _b !== void 0 ? _b : "cobra-bucket";
            const uploadParams = {
                Bucket: bucketName,
                Body: file.buffer,
                Key: fileKey,
                ContentType: file.mimetype,
            };
            const command = new client_s3_1.PutObjectCommand(uploadParams);
            yield s3Client.send(command);
            const getObjectParams = {
                Bucket: bucketName,
                Key: fileKey,
            };
            const url = yield (0, s3_request_presigner_1.getSignedUrl)(s3Client, new client_s3_1.GetObjectCommand(getObjectParams), { expiresIn: 604800 });
            const body = Object.assign(Object.assign({}, req.body), { MISSIONS: JSON.parse(req.body.MISSIONS), FILE: url, BUCKET_NAME: bucketName, KEY: fileKey });
            let data = yield (0, mission_service_1.createMission)(body);
            if (!data) {
                return res
                    .status(error_type_1.ErrorCodeMap.FORM_VALIDATION_ERROR)
                    .json({ message: "Mission create Error." });
            }
            let encryptedData = (0, encrypt_1.encrypt)(JSON.stringify(data), secretKey);
            return res.json({
                status: true,
                data: yield encryptedData,
                message: "Mission created successfully",
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
            let data = yield (0, mission_service_1.findMission)();
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
                keyword: keyword || "",
            };
            let data = yield (0, mission_service_1.findAllMission)(query);
            let encryptedData = yield (0, encrypt_1.encrypt)(JSON.stringify(data), secretKey);
            return res.json({
                status: true,
                data: encryptedData,
                message: "Mission list",
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
            yield (0, mission_service_1.deleteMission)(id);
            let encryptedData = yield (0, encrypt_1.encrypt)(JSON.stringify(id), secretKey);
            return res.json({
                status: true,
                id: encryptedData,
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
        var _a;
        try {
            let isUploadFile = (yield (0, reward_gridfs_1.uploadFile)(req, res));
            if (isUploadFile.status) {
                const file = isUploadFile.filename;
                const { id } = req.params;
                let find = yield (0, mission_service_1.findOneMission)(id);
                let key = find.KEY;
                let deleteParams = {
                    Bucket: process.env.BUCKET_NAME,
                    Key: key,
                };
                const deleteObjectCommand = new client_s3_1.DeleteObjectCommand(deleteParams);
                yield s3Client.send(deleteObjectCommand);
                const fileKey = `${(0, moment_1.default)().unix()}-${file.originalname}`;
                const uploadParams = {
                    Bucket: process.env.BUCKET_NAME,
                    Body: file.buffer,
                    Key: fileKey,
                    ContentType: file.mimetype,
                };
                yield s3Client.send(new client_s3_1.PutObjectCommand(uploadParams));
                const getObjectParams = {
                    Bucket: process.env.BUCKET_NAME,
                    Key: fileKey,
                };
                const url = yield (0, s3_request_presigner_1.getSignedUrl)(s3Client, new client_s3_1.GetObjectCommand(getObjectParams), { expiresIn: 604800 });
                const body = Object.assign(Object.assign({}, req.body), { FILE: url, MISSIONS: JSON.parse(req.body.MISSIONS) });
                yield (0, mission_service_1.updateMission)(id, body);
                let updatedReward = yield (0, mission_service_1.findOneMission)(id);
                let encryptedData = (0, encrypt_1.encrypt)(JSON.stringify(updatedReward), secretKey);
                return res.json({
                    status: true,
                    data: yield encryptedData,
                    message: "updated data sucessfully",
                });
            }
            else {
                const { id } = req.params;
                const body = Object.assign(Object.assign({}, req.body), { MISSIONS: JSON.parse(req.body.MISSIONS) });
                yield (0, mission_service_1.updateMission)(id, body);
                let updatedReward = yield (0, mission_service_1.findOneMission)(id);
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
function Get(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const { id } = req.params;
            let find = (yield (0, mission_service_1.findOneMission)(id));
            let encryptedData = (0, encrypt_1.encrypt)(JSON.stringify(find), secretKey);
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
//# sourceMappingURL=mission.controller.js.map