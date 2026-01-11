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
exports.uploadFile = uploadFile;
exports.deleteFile = deleteFile;
exports.uploadMultipleFile = uploadMultipleFile;
exports.uploadVip = uploadVip;
exports.generatePermanentPresignedUrl = generatePermanentPresignedUrl;
exports.uploadVipBenefit = uploadVipBenefit;
exports.uploadSeasonRewardFile = uploadSeasonRewardFile;
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const multer_1 = __importDefault(require("multer"));
const util_1 = __importDefault(require("util"));
const moment_1 = __importDefault(require("moment"));
const storage = multer_1.default.memoryStorage();
var multerFile = (0, multer_1.default)({ storage: storage });
// Set up AWS S3
const s3Client = new client_s3_1.S3Client({
    region: "ap-south-1",
    credentials: {
        accessKeyId: "AKIAUBKFCJYP2UJDMJYK",
        secretAccessKey: "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",
    },
});
// const s3Client = new S3Client({
//     region: process?.env?.REGION ?? "ap-south-1",
//     credentials: {
//         accessKeyId: process?.env?.ACCESS_KEY_ID ?? "AKIAYMI5KXNR7R4J77IE",
//         secretAccessKey: process?.env?.SECRET_ACCESS_KEY ?? "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"
//     },
// });
// Permanent Presigned URL
function generatePermanentPresignedUrl(bucketName, key) {
    return __awaiter(this, void 0, void 0, function* () {
        const expiresIn = 600000;
        const command = new client_s3_1.GetObjectCommand({ Bucket: bucketName, Key: key });
        const signedUrl = yield (0, s3_request_presigner_1.getSignedUrl)(s3Client, command, { expiresIn }); // 1 year in seconds
        return signedUrl;
    });
}
// Upload User File
function uploadFile(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        try {
            const upload = util_1.default.promisify(multerFile.single("FILE"));
            yield upload(req, res);
            const file = req === null || req === void 0 ? void 0 : req.file;
            if (!file) {
                // return res.status(400).json({ status: false, msg: 'Please Upload User Avatar' });
                return {
                    status: false,
                };
            }
            else {
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
                const presignedUrl = yield generatePermanentPresignedUrl(bucketName, `${fileKey}`);
                if (!presignedUrl) {
                    return res
                        .status(400)
                        .json({ status: false, message: "AWS upload error." });
                }
                return {
                    status: true,
                    FILE: presignedUrl,
                    BUCKET_NAME: bucketName,
                    KEY: `${fileKey}`,
                };
            }
        }
        catch (error) {
            console.log(error);
            next(error);
        }
    });
}
function uploadMultipleFile(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v;
        try {
            const upload = util_1.default.promisify(multerFile.fields([{ name: "FILES" }, { name: "FILE", maxCount: 1 }]));
            yield upload(req, res);
            const file = req === null || req === void 0 ? void 0 : req.files;
            const checkImage = (_b = (_a = file === null || file === void 0 ? void 0 : file.FILE) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0;
            const checkMutipleImage = (_d = (_c = file === null || file === void 0 ? void 0 : file.FILES) === null || _c === void 0 ? void 0 : _c.length) !== null && _d !== void 0 ? _d : 0;
            console.log(file.FILE);
            console.log(file.FILES);
            if (checkImage <= 0 || checkMutipleImage <= 0) {
                // return res.status(400).json({ status: false, msg: 'Please Upload User Avatar' });
                return {
                    status: false,
                };
            }
            else {
                const fileKey = `${(0, moment_1.default)().unix()}-${(_e = file === null || file === void 0 ? void 0 : file.FILE) === null || _e === void 0 ? void 0 : _e[0].originalname}`;
                const bucketName = (_g = (_f = process === null || process === void 0 ? void 0 : process.env) === null || _f === void 0 ? void 0 : _f.BUCKET_NAME) !== null && _g !== void 0 ? _g : "cobra-bucket";
                const uploadParams = {
                    Bucket: `${bucketName}`,
                    Key: `${fileKey}`,
                    Body: (_j = (_h = file === null || file === void 0 ? void 0 : file.FILE) === null || _h === void 0 ? void 0 : _h[0]) === null || _j === void 0 ? void 0 : _j.buffer,
                    ContentType: (_l = (_k = file === null || file === void 0 ? void 0 : file.FILE) === null || _k === void 0 ? void 0 : _k[0]) === null || _l === void 0 ? void 0 : _l.mimetype,
                };
                const command = new client_s3_1.PutObjectCommand(uploadParams);
                yield s3Client.send(command);
                const presignedUrl = yield generatePermanentPresignedUrl(bucketName, `${fileKey}`);
                if (!presignedUrl) {
                    return res
                        .status(400)
                        .json({ status: false, message: "AWS upload error." });
                }
                const ITEM_IMAGES = [];
                for (let index = 0; index < ((_m = file === null || file === void 0 ? void 0 : file.FILES) === null || _m === void 0 ? void 0 : _m.length); index++) {
                    const fileKey = `${(0, moment_1.default)().unix()}-${(_p = (_o = file === null || file === void 0 ? void 0 : file.FILES) === null || _o === void 0 ? void 0 : _o[index]) === null || _p === void 0 ? void 0 : _p.originalname}`;
                    const bucketName = (_r = (_q = process === null || process === void 0 ? void 0 : process.env) === null || _q === void 0 ? void 0 : _q.BUCKET_NAME) !== null && _r !== void 0 ? _r : "cobra-bucket";
                    const uploadParams = {
                        Bucket: `${bucketName}`,
                        Key: `${fileKey}`,
                        Body: (_t = (_s = file === null || file === void 0 ? void 0 : file.FILES) === null || _s === void 0 ? void 0 : _s[index]) === null || _t === void 0 ? void 0 : _t.buffer,
                        ContentType: (_v = (_u = file === null || file === void 0 ? void 0 : file.FILES) === null || _u === void 0 ? void 0 : _u[index]) === null || _v === void 0 ? void 0 : _v.mimetype,
                    };
                    const command = new client_s3_1.PutObjectCommand(uploadParams);
                    yield s3Client.send(command);
                    const presignedUrl = yield generatePermanentPresignedUrl(bucketName, `${fileKey}`);
                    ITEM_IMAGES.push({
                        FILE: presignedUrl,
                        BUCKET_NAME: bucketName,
                        KEY: `${fileKey}`,
                        INDEX: index + 1,
                    });
                }
                return {
                    status: true,
                    FILE: presignedUrl,
                    BUCKET_NAME: bucketName,
                    KEY: `${fileKey}`,
                    ITEM_IMAGES,
                };
            }
        }
        catch (error) {
            console.log(error);
            next(error);
        }
    });
}
// delete File
function deleteFile(bucketName, key) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield s3Client.send(new client_s3_1.DeleteObjectCommand({ Bucket: bucketName, Key: key }));
            return !!data;
        }
        catch (error) {
            return false;
        }
    });
}
function uploadVip(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e;
        try {
            const upload = util_1.default.promisify(multerFile.any());
            yield upload(req, res);
            const file = req === null || req === void 0 ? void 0 : req.files;
            let VIP_CARD_IMAGE;
            const IMAGE_LIST = [];
            const EMOJI_IMAGES = [];
            for (let index = 0; index < file.length; index++) {
                const fieldname = file[index].fieldname;
                const fileKey = `${(0, moment_1.default)().unix()}-${(_a = file === null || file === void 0 ? void 0 : file[index]) === null || _a === void 0 ? void 0 : _a.originalname}`;
                const bucketName = (_c = (_b = process === null || process === void 0 ? void 0 : process.env) === null || _b === void 0 ? void 0 : _b.BUCKET_NAME) !== null && _c !== void 0 ? _c : "cobra-bucket";
                // COINS, DIAMONDS, XP, BENEFIT_IMAGE, EMOJI, VIP_CARD_IMAGE
                const uploadParams = {
                    Bucket: `${bucketName}`,
                    Key: `${fileKey}`,
                    Body: (_d = file[index]) === null || _d === void 0 ? void 0 : _d.buffer,
                    ContentType: (_e = file[index]) === null || _e === void 0 ? void 0 : _e.mimetype,
                };
                const command = new client_s3_1.PutObjectCommand(uploadParams);
                yield s3Client.send(command);
                const presignedUrl = yield generatePermanentPresignedUrl(bucketName, `${fileKey}`);
                if (fieldname === "VIP_CARD_IMAGE") {
                    VIP_CARD_IMAGE = {
                        KEY: fileKey,
                        BUCKET_NAME: bucketName,
                        FILE: presignedUrl,
                    };
                }
                else {
                    if (fieldname !== "EMOJI") {
                        IMAGE_LIST.push({
                            TYPE: fieldname,
                            KEY: fileKey,
                            BUCKET_NAME: bucketName,
                            FILE: presignedUrl,
                        });
                    }
                    else {
                        EMOJI_IMAGES.push({
                            KEY: fileKey,
                            BUCKET_NAME: bucketName,
                            FILE: presignedUrl,
                        });
                    }
                }
            }
            console.log(IMAGE_LIST);
            console.log(EMOJI_IMAGES);
            console.log(VIP_CARD_IMAGE);
            return {
                status: true,
                IMAGE_LIST,
                EMOJI_IMAGES,
                VIP_CARD_IMAGE,
            };
        }
        catch (error) {
            console.log(error);
            next(error);
        }
    });
}
function uploadVipBenefit(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e;
        try {
            const upload = util_1.default.promisify(multerFile.any());
            yield upload(req, res);
            const file = req === null || req === void 0 ? void 0 : req.files;
            let BENEFIT_IMAGE;
            const EMOJI_IMAGES = [];
            for (let index = 0; index < file.length; index++) {
                const fieldname = file[index].fieldname;
                const fileKey = `${(0, moment_1.default)().unix()}-${(_a = file === null || file === void 0 ? void 0 : file[index]) === null || _a === void 0 ? void 0 : _a.originalname}`;
                const bucketName = (_c = (_b = process === null || process === void 0 ? void 0 : process.env) === null || _b === void 0 ? void 0 : _b.BUCKET_NAME) !== null && _c !== void 0 ? _c : "cobra-bucket";
                // COINS, DIAMONDS, XP, BENEFIT_IMAGE, EMOJI, VIP_CARD_IMAGE
                const uploadParams = {
                    Bucket: `${bucketName}`,
                    Key: `${fileKey}`,
                    Body: (_d = file[index]) === null || _d === void 0 ? void 0 : _d.buffer,
                    ContentType: (_e = file[index]) === null || _e === void 0 ? void 0 : _e.mimetype,
                };
                const command = new client_s3_1.PutObjectCommand(uploadParams);
                yield s3Client.send(command);
                const presignedUrl = yield generatePermanentPresignedUrl(bucketName, `${fileKey}`);
                if (fieldname === "BENEFIT_IMAGE") {
                    BENEFIT_IMAGE = {
                        KEY: fileKey,
                        BUCKET_NAME: bucketName,
                        FILE: presignedUrl,
                    };
                }
                else {
                    EMOJI_IMAGES.push({
                        KEY: fileKey,
                        BUCKET_NAME: bucketName,
                        FILE: presignedUrl,
                    });
                }
            }
            return {
                status: true,
                EMOJI_IMAGES,
                BENEFIT_IMAGE,
            };
        }
        catch (error) {
            console.log(error);
            next(error);
        }
    });
}
function uploadSeasonRewardFile(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v;
        try {
            const upload = util_1.default.promisify(multerFile.fields([{ name: "FILES" }, { name: "FILE", maxCount: 1 }]));
            yield upload(req, res);
            const file = req === null || req === void 0 ? void 0 : req.files;
            const checkImage = (_b = (_a = file === null || file === void 0 ? void 0 : file.FILE) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0;
            const checkMutipleImage = (_d = (_c = file === null || file === void 0 ? void 0 : file.FILES) === null || _c === void 0 ? void 0 : _c.length) !== null && _d !== void 0 ? _d : 0;
            console.log(file.FILE);
            console.log(file.FILES);
            if (checkImage <= 0) {
                return {
                    status: false,
                };
            }
            else {
                const fileKey = `${(0, moment_1.default)().unix()}-${(_e = file === null || file === void 0 ? void 0 : file.FILE) === null || _e === void 0 ? void 0 : _e[0].originalname}`;
                const bucketName = (_g = (_f = process === null || process === void 0 ? void 0 : process.env) === null || _f === void 0 ? void 0 : _f.BUCKET_NAME) !== null && _g !== void 0 ? _g : "cobra-bucket";
                const uploadParams = {
                    Bucket: `${bucketName}`,
                    Key: `${fileKey}`,
                    Body: (_j = (_h = file === null || file === void 0 ? void 0 : file.FILE) === null || _h === void 0 ? void 0 : _h[0]) === null || _j === void 0 ? void 0 : _j.buffer,
                    ContentType: (_l = (_k = file === null || file === void 0 ? void 0 : file.FILE) === null || _k === void 0 ? void 0 : _k[0]) === null || _l === void 0 ? void 0 : _l.mimetype,
                };
                const command = new client_s3_1.PutObjectCommand(uploadParams);
                yield s3Client.send(command);
                const ITEM_IMAGES = [];
                for (let index = 0; index < ((_m = file === null || file === void 0 ? void 0 : file.FILES) === null || _m === void 0 ? void 0 : _m.length); index++) {
                    const fileKey = `${(0, moment_1.default)().unix()}-${(_p = (_o = file === null || file === void 0 ? void 0 : file.FILES) === null || _o === void 0 ? void 0 : _o[index]) === null || _p === void 0 ? void 0 : _p.originalname}`;
                    const bucketName = (_r = (_q = process === null || process === void 0 ? void 0 : process.env) === null || _q === void 0 ? void 0 : _q.BUCKET_NAME) !== null && _r !== void 0 ? _r : "cobra-bucket";
                    const uploadParams = {
                        Bucket: `${bucketName}`,
                        Key: `${fileKey}`,
                        Body: (_t = (_s = file === null || file === void 0 ? void 0 : file.FILES) === null || _s === void 0 ? void 0 : _s[index]) === null || _t === void 0 ? void 0 : _t.buffer,
                        ContentType: (_v = (_u = file === null || file === void 0 ? void 0 : file.FILES) === null || _u === void 0 ? void 0 : _u[index]) === null || _v === void 0 ? void 0 : _v.mimetype,
                    };
                    const command = new client_s3_1.PutObjectCommand(uploadParams);
                    yield s3Client.send(command);
                    ITEM_IMAGES.push({
                        BUCKET_NAME: bucketName,
                        KEY: `${fileKey}`,
                    });
                }
                return {
                    status: true,
                    BUCKET_NAME: bucketName,
                    KEY: `${fileKey}`,
                    ITEM_IMAGES,
                };
            }
        }
        catch (error) {
            console.log(error);
            next(error);
        }
    });
}
//# sourceMappingURL=upload.js.map