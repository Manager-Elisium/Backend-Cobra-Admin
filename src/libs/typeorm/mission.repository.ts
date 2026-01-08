import { Mission } from "src/domain/mission.entity";
import { Like } from "typeorm";
import { AppDataSource } from "./ormconfig";

async function insertOne(data: Mission) {
    const mission = await Mission.save(data)
    return mission;
}

async function getCount() {
    return await Mission.count();
}

async function findAll() {
    return await Mission.find({
        take: 3
    });
}

async function updateOne(id: string, mission: Mission) {
    return await Mission.update(id, mission)
}

async function getOneById(id: string) {
    return await Mission.find({
        where: {
            ID: id
        }
    });
}

async function findAllData(query: any) {

    const [result, total] = await Mission.findAndCount({
        where: { TITLE: Like('%' + query.keyword + '%') },
        order: { CREATED_DATE: 'DESC' },
        take: query.take,
        skip: (query.page - 1) * query.take,
    });
    return { count: total, data: result };
}

async function deleteOne(id: string) {
    return await Mission.delete(id);
}

export { insertOne, getCount, findAll, findAllData, getOneById, updateOne, deleteOne };
