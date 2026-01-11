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
exports.getCount = getCount;
exports.findAll = findAll;
exports.findAllData = findAllData;
exports.getOneById = getOneById;
exports.updateOne = updateOne;
const mission_entity_1 = require("src/domain/mission.entity");
const typeorm_1 = require("typeorm");
function insertOne(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const mission = yield mission_entity_1.Mission.save(data);
        return mission;
    });
}
function getCount() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield mission_entity_1.Mission.count({ where: { IS_DELETED: false } });
    });
}
function findAll() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield mission_entity_1.Mission.find({
            where: { IS_DELETED: false },
            take: 3
        });
    });
}
function updateOne(id, mission) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield mission_entity_1.Mission.update(id, mission);
    });
}
function getOneById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        // return await Mission
        //         .getRepository()
        //         .createQueryBuilder()
        //         .select(['TASK_LOBBY_ID'])
        //     // .createQueryBuilder('mission')
        //     // .select(['mission.ID AS ID',
        //     //     'mission.FILE AS FILE',
        //     //     'mission.BUCKET_NAME AS BUCKET_NAME',
        //     //     'mission.TYPE AS TYPE',
        //     //     'mission.KEY AS KEY',
        //     //     'mission.TITLE AS TITLE',
        //     //     'mission.TEXT AS TEXT',
        //     //     'mission.TASK_KEY AS TASK_KEY',
        //     //     'mission.TASK_LOBBY_ID AS TASK_LOBBY_ID',
        //     //     'mission.TASK_VALUE AS TASK_VALUE',
        //     //     'mission.MISSIONS AS MISSIONS',
        //     //     'mission.UPDATED_DATE AS UPDATED_DATE',
        //     //     'mission.CREATED_DATE AS CREATED_DATE'])
        //     .where('ID = :id', { id })
        //     .getRawOne();
        return yield mission_entity_1.Mission.findOne({
            where: {
                ID: id
            },
            select: ["TASK_LOBBY_ID"],
            relations: ['TASK_LOBBY_ID'],
        });
    });
}
function findAllData(query) {
    return __awaiter(this, void 0, void 0, function* () {
        const [result, total] = yield mission_entity_1.Mission.findAndCount({
            where: { TITLE: (0, typeorm_1.Like)('%' + query.keyword + '%'), IS_DELETED: false },
            order: { CREATED_DATE: 'DESC' },
            take: query.take,
            skip: (query.page - 1) * query.take,
        });
        return { count: total, data: result };
    });
}
//# sourceMappingURL=mission.repository.js.map