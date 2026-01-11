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
exports.getListForDashboard = getListForDashboard;
exports.allDataList = allDataList;
exports.update = update;
exports.Delete = Delete;
exports.Get = Get;
exports.addBenefit = addBenefit;
exports.GetBenefit = GetBenefit;
exports.UpdateBenefit = UpdateBenefit;
exports.deleteEmojiFile = deleteEmojiFile;
exports.updateEmojiFile = updateEmojiFile;
const encrypt_1 = require("src/common/encrypt");
const client_s3_1 = require("@aws-sdk/client-s3");
const dotenv_1 = __importDefault(require("dotenv"));
const vip_card_service_1 = require("src/services/vip_card.service");
const upload_1 = require("src/common/upload");
const vip_card_entity_1 = require("src/domain/vip-card.entity");
const vip_card_benefits_entity_1 = require("src/domain/vip-card-benefits.entity");
const vip_card_repository_1 = require("src/repository/vip_card.repository");
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
        var _a, _b, _c, _d, _e, _f;
        try {
            let responseFile = yield (0, upload_1.uploadVip)(req, res, next);
            if (responseFile.status) {
                console.log(req.body);
                console.log(responseFile.VIP_CARD_IMAGE);
                console.log(responseFile.EMOJI_IMAGES);
                console.log(responseFile.IMAGE_LIST);
                const benefits = JSON.parse(req.body.BENEFITS);
                console.log(benefits.filter((data) => data.TYPE === "COINS"));
                const vipCard = new vip_card_entity_1.VipCard();
                vipCard.KEY = responseFile.VIP_CARD_IMAGE.KEY;
                vipCard.BUCKET_NAME = responseFile.VIP_CARD_IMAGE.BUCKET_NAME;
                vipCard.FILE = responseFile.VIP_CARD_IMAGE.FILE;
                vipCard.DAYS_PRICE = JSON.parse(req.body.DAYS_PRICE);
                vipCard.TITLE = req.body.TITLE;
                vipCard.DESCRIPTION = req.body.DESCRIPTION;
                let insertVipCard = yield vipCard.save();
                for (let index = 0; index < responseFile.IMAGE_LIST.length; index++) {
                    const type = responseFile.IMAGE_LIST[index].TYPE;
                    // COINS, DIAMONDS, XP, BENEFIT_IMAGE, EMOJI, VIP_CARD_IMAGE
                    if (type === "COINS" || type === "DIAMONDS" || type === "XP") {
                        const vipCardBenefits = new vip_card_benefits_entity_1.VipCardBenefits();
                        vipCardBenefits.KEY = responseFile.IMAGE_LIST[index].KEY;
                        vipCardBenefits.BUCKET_NAME = responseFile.IMAGE_LIST[index].BUCKET_NAME;
                        // vipCardBenefits.FILE = responseFile.IMAGE_LIST[index].FILE;
                        vipCardBenefits.TYPE = responseFile.IMAGE_LIST[index].TYPE;
                        const filterValue = benefits.filter((data) => data.TYPE === type);
                        vipCardBenefits.VALUE = (_a = filterValue[0]) === null || _a === void 0 ? void 0 : _a.COUNT;
                        vipCardBenefits.TEXT = (_b = filterValue[0]) === null || _b === void 0 ? void 0 : _b.TEXT;
                        vipCardBenefits.BENEFITS = insertVipCard;
                        let insertVipCardBenefits = yield vipCardBenefits.save();
                        console.log(insertVipCardBenefits);
                    }
                    else if (type === "BENEFIT_IMAGE") {
                        const vipCardBenefits = new vip_card_benefits_entity_1.VipCardBenefits();
                        vipCardBenefits.KEY = responseFile.IMAGE_LIST[index].KEY;
                        vipCardBenefits.BUCKET_NAME = responseFile.IMAGE_LIST[index].BUCKET_NAME;
                        // vipCardBenefits.FILE = responseFile.IMAGE_LIST[index].FILE;
                        const filterValue = benefits.filter((data) => data.TYPE === "EMOJI");
                        vipCardBenefits.VALUE = (_c = filterValue[0]) === null || _c === void 0 ? void 0 : _c.COUNT;
                        vipCardBenefits.TYPE = (_d = filterValue[0]) === null || _d === void 0 ? void 0 : _d.TYPE;
                        vipCardBenefits.TEXT = (_e = filterValue[0]) === null || _e === void 0 ? void 0 : _e.TEXT;
                        vipCardBenefits.EMOJI_IMAGES = responseFile.EMOJI_IMAGES;
                        vipCardBenefits.BENEFITS = insertVipCard;
                        let insertVipCardBenefits = yield vipCardBenefits.save();
                        console.log(insertVipCardBenefits);
                    }
                }
                return res.json({ status: true, message: "Successfully Insert VIP Card." });
            }
            else {
                return res.json({ status: false, message: "File Upload Error." });
            }
        }
        catch (error) {
            return res.json({ status: false, message: (_f = error === null || error === void 0 ? void 0 : error.message) !== null && _f !== void 0 ? _f : "" });
        }
    });
}
function list(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            let data = yield (0, vip_card_service_1.findVipCard)();
            // let encryptedData = encrypt(JSON.stringify(data), secretKeyGamePlay)
            // return res.json({ status: true, data: await encryptedData });
            return res.json({ status: true, data });
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
            let { list } = yield (0, vip_card_service_1.findVipCardForDashboardService)();
            // let encryptedData = encrypt(JSON.stringify(data), secretKeyGamePlay)
            // return res.json({ status: true, data: await encryptedData });
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
                keyword: keyword || ''
            };
            let data = yield (0, vip_card_service_1.findAllVipCard)(query);
            let encryptedData = (0, encrypt_1.encrypt)(JSON.stringify(data), secretKey);
            return res.json({ status: true, data: yield encryptedData, message: "Vip_card list" });
            // return res.json({ status: true, data, message: "Vip_card list" });
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
            yield (0, vip_card_service_1.deleteVipCard)(id);
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
                let find = yield (0, vip_card_repository_1.getOneById)(id);
                console.log(find);
                let key = find === null || find === void 0 ? void 0 : find.KEY;
                if (!!key) {
                    let deleteParams = {
                        Bucket: process.env.BUCKET_NAME,
                        Key: find === null || find === void 0 ? void 0 : find.KEY
                    };
                    const deleteObjectCommand = new client_s3_1.DeleteObjectCommand(deleteParams);
                    yield s3Client.send(deleteObjectCommand);
                    console.log("Object deleted successfully.");
                }
                const body = Object.assign(Object.assign({}, req.body), { FILE: isUploadFile.FILE, BUCKET_NAME: isUploadFile.BUCKET_NAME, KEY: isUploadFile.KEY, DAYS_PRICE: JSON.parse(req.body.DAYS_PRICE) });
                yield (0, vip_card_repository_1.updateOne)(id, body);
                let updatedReward = yield (0, vip_card_repository_1.getOneById)(id);
                let encryptedData = (0, encrypt_1.encrypt)(JSON.stringify(updatedReward), secretKey);
                return res.json({
                    status: true,
                    data: yield encryptedData,
                    message: "updated data sucessfully",
                });
            }
            else {
                const body = Object.assign(Object.assign({}, req.body), { DAYS_PRICE: JSON.parse(req.body.DAYS_PRICE) });
                yield (0, vip_card_repository_1.updateOne)(id, body);
                let updatedReward = yield (0, vip_card_repository_1.getOneById)(id);
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
            let find = yield (0, vip_card_service_1.findOneVipCard)(id);
            let encryptedData = (0, encrypt_1.encrypt)(JSON.stringify(find), secretKey);
            return res.json({
                status: true,
                data: yield encryptedData,
                // data: find,
                msg: "get successfully",
            });
        }
        catch (error) {
            return res.json({ status: false, message: (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : "" });
        }
    });
}
function GetBenefit(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const { id } = req.params;
            let find = yield (0, vip_card_service_1.findOneBenefitVipCard)(id);
            let encryptedData = (0, encrypt_1.encrypt)(JSON.stringify(find), secretKey);
            return res.json({
                status: true,
                data: yield encryptedData,
                // data: find,
                msg: "get successfully",
            });
        }
        catch (error) {
            return res.json({ status: false, message: (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : "" });
        }
    });
}
function UpdateBenefit(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            let isUploadFile = yield (0, upload_1.uploadFile)(req, res, next);
            const { id } = req.params;
            if (isUploadFile.status) {
                let find = yield (0, vip_card_service_1.findOneBenefitVipCard)(id);
                console.log(find);
                let key = find === null || find === void 0 ? void 0 : find.KEY;
                if (!!key) {
                    // let deleteParams = {
                    //     Bucket: process.env.BUCKET_NAME,
                    //     Key: find?.KEY
                    // };
                    // const deleteObjectCommand = new DeleteObjectCommand(deleteParams);
                    // await s3Client.send(deleteObjectCommand);
                    console.log("Object deleted successfully.");
                }
                const body = Object.assign(Object.assign({}, req.body), { BUCKET_NAME: isUploadFile.BUCKET_NAME, KEY: isUploadFile.KEY });
                yield (0, vip_card_repository_1.updateOneBenefit)(id, body);
                let updatedReward = yield (0, vip_card_service_1.findOneBenefitVipCard)(id);
                let encryptedData = (0, encrypt_1.encrypt)(JSON.stringify(updatedReward), secretKey);
                return res.json({
                    status: true,
                    data: yield encryptedData,
                    message: "updated data sucessfully",
                });
            }
            else {
                const body = Object.assign({}, req.body);
                yield (0, vip_card_repository_1.updateOneBenefit)(id, body);
                let updatedReward = yield (0, vip_card_service_1.findOneBenefitVipCard)(id);
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
function deleteEmojiFile(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const { id } = req.params;
            const { KEY } = req.body;
            let find = yield (0, vip_card_service_1.findOneBenefitVipCard)(id);
            const currentItems = find === null || find === void 0 ? void 0 : find.EMOJI_IMAGES.filter((data) => KEY !== data.KEY);
            let key = find === null || find === void 0 ? void 0 : find.EMOJI_IMAGES.filter((data) => KEY === data.KEY);
            if (key.length > 0) {
                // let deleteParams = {
                //     Bucket: process.env.BUCKET_NAME,
                //     Key: key[0]?.KEY
                // };
                // const deleteObjectCommand = new DeleteObjectCommand(deleteParams);
                // await s3Client.send(deleteObjectCommand);
                console.log("Object deleted successfully.");
            }
            console.log(currentItems);
            const body = {
                EMOJI_IMAGES: currentItems
            };
            yield (0, vip_card_repository_1.updateOneBenefit)(id, body);
            let updatedReward = yield (0, vip_card_service_1.findOneBenefitVipCard)(id);
            let encryptedData = (0, encrypt_1.encrypt)(JSON.stringify(updatedReward), secretKey);
            return res.json({
                status: true,
                data: yield encryptedData,
                message: "delete data sucessfully",
            });
        }
        catch (error) {
            return res.json({ status: false, message: (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : "" });
        }
    });
}
function updateEmojiFile(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c;
        try {
            let isUploadFile = yield (0, upload_1.uploadFile)(req, res, next);
            const { id } = req.params;
            if (isUploadFile.status) {
                const { KEY } = req.body;
                let find = yield (0, vip_card_service_1.findOneBenefitVipCard)(id);
                let key = (_a = find === null || find === void 0 ? void 0 : find.EMOJI_IMAGES.filter((data) => KEY === (data === null || data === void 0 ? void 0 : data.KEY))) !== null && _a !== void 0 ? _a : [];
                if (key.length > 0) {
                    // let deleteParams = {
                    //     Bucket: process.env.BUCKET_NAME,
                    //     Key: key[0]?.KEY
                    // };
                    // const deleteObjectCommand = new DeleteObjectCommand(deleteParams);
                    // await s3Client.send(deleteObjectCommand);
                    console.log("Object deleted successfully.");
                }
                const currentItems = (_b = find === null || find === void 0 ? void 0 : find.EMOJI_IMAGES.filter((data) => KEY !== (data === null || data === void 0 ? void 0 : data.KEY))) !== null && _b !== void 0 ? _b : [];
                const data = {
                    FILE: isUploadFile.FILE,
                    BUCKET_NAME: isUploadFile.BUCKET_NAME,
                    KEY: isUploadFile.KEY
                };
                const getData = [...currentItems, data];
                const body = {
                    EMOJI_IMAGES: getData
                };
                yield (0, vip_card_repository_1.updateOneBenefit)(id, body);
                let updatedReward = yield (0, vip_card_service_1.findOneBenefitVipCard)(id);
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
            return res.json({ status: false, message: (_c = error === null || error === void 0 ? void 0 : error.message) !== null && _c !== void 0 ? _c : "" });
        }
    });
}
function addBenefit(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const isUploadFile = yield (0, upload_1.uploadVipBenefit)(req, res, next);
            if (isUploadFile.status) {
                const { id } = req.params;
                const { TYPE } = req.body;
                let find = yield (0, vip_card_repository_1.getOneById)(id);
                if (!find) {
                    return res
                        .status(400)
                        .json({ status: false, message: "Benefit is not exsits." });
                }
                if (find.BENEFITS.filter((data) => data.TYPE === TYPE).length) {
                    console.log(find.BENEFITS.filter((data) => data.TYPE === TYPE).length);
                    return res
                        .status(400)
                        .json({ status: false, message: "Benefit Type is exsits." });
                }
                const data = Object.assign(Object.assign({ BUCKET_NAME: isUploadFile.BENEFIT_IMAGE.BUCKET_NAME, KEY: isUploadFile.BENEFIT_IMAGE.KEY, EMOJI_IMAGES: isUploadFile.EMOJI_IMAGES.length > 0 ? isUploadFile.EMOJI_IMAGES : [] }, req.body), { BENEFITS: id });
                let insert = yield (0, vip_card_service_1.createVipBenefitService)(data);
                console.log(insert);
                return res.json({ status: true, message: "Successfully Insert VIP Card Benefit." });
            }
            else {
                return res
                    .status(400)
                    .json({ message: "Benefit Image File is compulsory." });
            }
        }
        catch (error) {
            return res.json({ status: false, message: (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : "" });
        }
    });
}
//# sourceMappingURL=vip_card.controller.js.map