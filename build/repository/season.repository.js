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
exports.findAll = findAll;
exports.getOneById = getOneById;
exports.updateAndReturnById = updateAndReturnById;
exports.currentReward = currentReward;
exports.maximumDate = maximumDate;
const season_entity_1 = require("src/domain/season.entity");
function insertOne(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield season_entity_1.Season.save(data);
    });
}
function findAll(query) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield season_entity_1.Season.findAndCount(query); // relations: ['BENEFITS']
    });
}
function getOneById(query) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield season_entity_1.Season.findOne(query);
    });
}
function maximumDate() {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = season_entity_1.Season.getRepository();
        const maxDate = yield connection
            .createQueryBuilder()
            .select('MAX("entity"."END_DATE")', 'maxDate')
            .from(season_entity_1.Season, 'entity')
            .where('"entity"."IS_DELETED" = false')
            .getRawOne();
        return maxDate;
    });
}
function updateAndReturnById(id, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield season_entity_1.Season
            .createQueryBuilder()
            .update(season_entity_1.Season)
            .set(Object.assign({}, data))
            .where("ID = :id", { id })
            .returning('*')
            .execute();
    });
}
function currentReward(query) {
    return __awaiter(this, void 0, void 0, function* () {
        // localhost:3002/season/get-season-reward
        const seasonRepository = season_entity_1.Season.getRepository();
        const season = yield seasonRepository
            .createQueryBuilder('user')
            .leftJoinAndSelect('user.REWARDS', 'REWARDS')
            .where('user.START_DATE >= :startDate', { startDate: query.startDate })
            .andWhere('user.END_DATE <= :endDate', { endDate: query.endDate })
            .andWhere('user.IS_DELETED = false')
            .andWhere('REWARDS.IS_DELETED = false')
            .orderBy('REWARDS.LEVEL', 'ASC')
            .getOne();
        return season;
    });
}
//# sourceMappingURL=season.repository.js.map