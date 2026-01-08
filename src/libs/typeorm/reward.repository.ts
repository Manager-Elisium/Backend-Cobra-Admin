import { Reward } from "src/domain/reward.entity";

async function insertOne(data: Reward) {
    return await Reward.save(data)
}

async function getCount() {
    return await Reward.count();
}

async function findAll() {
    return await Reward.find({
        order: {
            DAY: 'ASC'
        }
    });
}

async function updateOne(id: string, reward: Reward) {
    return await Reward.update(id, reward)

}

async function getOneById(id: string) {
    return await Reward.find({
        where: {
            ID: id
        }
    });
}

async function findAllData(query:any) {
    let whereCondition = {};
    if (query?.keyword && !isNaN(parseFloat(query.keyword))) {
        whereCondition = { DAY: parseFloat(query.keyword) };
    }
    const [result, total] = await Reward.findAndCount({
        where: whereCondition,
        order: { CREATED_DATE: 'DESC' },
        take: query.take,
        skip: (query.page - 1) * query.take,
    });
    return { count: total, data: result };
}

async function deleteOne(id:string) {
    return await Reward.delete(id);
}

export { insertOne, getCount, findAll, findAllData, getOneById, updateOne, deleteOne };
