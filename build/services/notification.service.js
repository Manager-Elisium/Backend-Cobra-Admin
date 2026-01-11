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
exports.createNotification = createNotification;
exports.paginationNotification = paginationNotification;
exports.getNotificationService = getNotificationService;
exports.deleteNotificationService = deleteNotificationService;
const standard_error_1 = __importDefault(require("src/common/standard-error"));
const error_type_1 = require("src/common/error-type");
const notification_repository_1 = require("src/repository/notification.repository");
const upload_1 = require("src/common/upload");
function createNotification(reward) {
    return __awaiter(this, void 0, void 0, function* () {
        const createOne = yield (0, notification_repository_1.insertOne)(Object.assign(Object.assign({}, reward), { DATA: !!reward.DATA ? JSON.parse(reward.DATA) : {} }));
        if (!createOne) {
            throw new standard_error_1.default(error_type_1.ErrorCodes.API_VALIDATION_ERROR, "Reward create Error.");
        }
        return createOne;
    });
}
function paginationNotification(query) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield (0, notification_repository_1.findAllData)(query);
        if (!data) {
            throw new standard_error_1.default(error_type_1.ErrorCodes.API_VALIDATION_ERROR, "Notification list Found Error.");
        }
        return data;
    });
}
function getNotificationService(query) {
    return __awaiter(this, void 0, void 0, function* () {
        const createQuery = {
            where: {
                ID: query.ID
            }
        };
        const data = yield (0, notification_repository_1.getOneNotification)(createQuery);
        if (!data) {
            throw new standard_error_1.default(error_type_1.ErrorCodes.API_VALIDATION_ERROR, "Notification Found Error.");
        }
        if (!!data.KEY && !!data.BUCKET_NAME) {
            data.KEY = yield (0, upload_1.generatePermanentPresignedUrl)(data.BUCKET_NAME, data.KEY);
            console.log(data.KEY);
        }
        return data;
    });
}
function deleteNotificationService(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const deletedata = yield (0, notification_repository_1.updateNotification)(id, { IS_DELETED: true });
        return deletedata;
    });
}
//# sourceMappingURL=notification.service.js.map