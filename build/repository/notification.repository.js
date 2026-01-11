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
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertOne = insertOne;
exports.findAllData = findAllData;
exports.getOneNotification = getOneNotification;
exports.updateNotification = updateNotification;
const notification_entity_1 = require("src/domain/notification.entity");
function insertOne(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield notification_entity_1.Notification.save(data);
    });
}
function findAllData(query) {
    return __awaiter(this, void 0, void 0, function* () {
        const [result, total] = yield notification_entity_1.Notification.findAndCount({
            order: { CREATED_DATE: 'DESC' },
            take: query.take,
            skip: (query.page - 1) * query.take,
            where: { IS_DELETED: false }
        });
        return { count: total, data: result };
    });
}
function getOneNotification(query) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield notification_entity_1.Notification.findOne(query);
    });
}
function updateNotification(id, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield notification_entity_1.Notification
            .createQueryBuilder()
            .update(notification_entity_1.Notification)
            .set(Object.assign({}, data))
            .where("ID = :id", { id })
            .returning('*')
            .execute();
    });
}
//# sourceMappingURL=notification.repository.js.map