import { Season } from "src/domain/season.entity";


async function insertOne(data: Season) {
    return await Season.save(data);
}


async function findAll(query: any) {
    return await Season.findAndCount(query); // relations: ['BENEFITS']
}

async function getOneById(query: any) {
    return await Season.findOne(query)
}


async function maximumDate() {
    const connection = Season.getRepository();
    const maxDate = await connection
        .createQueryBuilder()
        .select('MAX("entity"."END_DATE")', 'maxDate')
        .from(Season, 'entity')
        .where('"entity"."IS_DELETED" = false')
        .getRawOne();
    return maxDate;
}

async function updateAndReturnById(id: string, data: Season) {
    return await Season
        .createQueryBuilder()
        .update(Season)
        .set({ ...data })
        .where("ID = :id", { id })
        .returning('*')
        .execute();
}


async function currentReward(query: any) {
    // localhost:3002/season/get-season-reward
    const seasonRepository = Season.getRepository();
    const season = await seasonRepository
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.REWARDS', 'REWARDS')
        .where('user.START_DATE >= :startDate', { startDate: query.startDate })
        .andWhere('user.END_DATE <= :endDate', { endDate: query.endDate })
        .andWhere('user.IS_DELETED = false')
        .andWhere('REWARDS.IS_DELETED = false')
        .orderBy('REWARDS.LEVEL', 'ASC')
        .getOne();
    return season;
}




export { insertOne, findAll, getOneById, updateAndReturnById, currentReward, maximumDate };
