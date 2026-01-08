import { Reward } from "src/domain/reward.entity";
import { Like } from "typeorm";

async function insertOne(data: Reward) {
    return await Reward.save(data)
}

async function getCount() {
    return await Reward.count({
        where: {
            IS_DELETED: false
        }
    });
}

async function findAll() {
    return await Reward.find({
        where: {
            IS_DELETED: false
        },
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

async function findAllData(query: any) {
    const [result, total] = await Reward.findAndCount({
        where: {
            IS_DELETED: false
        },
        order: { CREATED_DATE: 'DESC' },
        take: query.take,
        skip: (query.page - 1) * query.take,
    });
    return { count: total, data: result };
}

export { insertOne, getCount, findAll, findAllData, getOneById, updateOne };
