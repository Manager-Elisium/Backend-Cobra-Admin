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
exports.insertOneSeasonReward = insertOne;
exports.findAllSeasonReward = findAll;
exports.getOneByIdSeasonReward = getOneById;
exports.updateAndReturnByIdSeasonReward = updateAndReturnById;
exports.countSeasonReward = countSeasonReward;
exports.countSeasonRewardIsPresentOrNot = countSeasonRewardIsPresentOrNot;
const season_reward_entity_1 = require("src/domain/season-reward.entity");
function insertOne(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield season_reward_entity_1.SeasonReward.save(data);
    });
}
function countSeasonReward(query) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield season_reward_entity_1.SeasonReward.count(query);
    });
}
function countSeasonRewardIsPresentOrNot(query) {
    return __awaiter(this, void 0, void 0, function* () {
        const getSeasonReward = season_reward_entity_1.SeasonReward.getRepository();
        const count = yield getSeasonReward
            .createQueryBuilder('reward')
            .where('reward.LEVEL = :level', { level: query.LEVEL })
            .andWhere('reward.IS_DELETED = :isDeleted', { isDeleted: false })
            .andWhere('reward.REWARDS.ID = :rewardsId', { rewardsId: query.REWARDS })
            .getCount();
        return count;
    });
}
function findAll(query) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield season_reward_entity_1.SeasonReward.findAndCount(query); // relations: ['BENEFITS']
    });
}
function getOneById(query) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield season_reward_entity_1.SeasonReward.findOne(query);
    });
}
function updateAndReturnById(id, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield season_reward_entity_1.SeasonReward
            .createQueryBuilder()
            .update(season_reward_entity_1.SeasonReward)
            .set(Object.assign({}, data))
            .where("ID = :id", { id })
            .returning('*')
            .execute();
    });
}
//# sourceMappingURL=season-reward.repository.js.map