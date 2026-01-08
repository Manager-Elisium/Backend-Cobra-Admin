import { SeasonReward } from "src/domain/season-reward.entity";


async function insertOne(data: SeasonReward) {
    return await SeasonReward.save(data);
}

async function countSeasonReward(query: any) {
    return await SeasonReward.count(query);
}

async function countSeasonRewardIsPresentOrNot(query: any) {
    const getSeasonReward = SeasonReward.getRepository();
    const count = await getSeasonReward
        .createQueryBuilder('reward')
        .where('reward.LEVEL = :level', { level: query.LEVEL })
        .andWhere('reward.IS_DELETED = :isDeleted', { isDeleted: false })
        .andWhere('reward.REWARDS.ID = :rewardsId', { rewardsId: query.REWARDS})
        .getCount();
    return count;
}


async function findAll(query: any) {
    return await SeasonReward.findAndCount(query); // relations: ['BENEFITS']
}

async function getOneById(query: any) {
    return await SeasonReward.findOne(query)
}

async function updateAndReturnById(id: string, data: SeasonReward) {
    return await SeasonReward
        .createQueryBuilder()
        .update(SeasonReward)
        .set({ ...data })
        .where("ID = :id", { id })
        .returning('*')
        .execute();
}



export {
    insertOne as insertOneSeasonReward,
    findAll as findAllSeasonReward,
    getOneById as getOneByIdSeasonReward,
    updateAndReturnById as updateAndReturnByIdSeasonReward,
    countSeasonReward,
    countSeasonRewardIsPresentOrNot
};