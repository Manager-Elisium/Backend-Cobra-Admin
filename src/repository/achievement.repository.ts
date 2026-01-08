import { Achievement } from "src/domain/achievement.entity";


async function insertOne(data: Achievement) {
    return await Achievement.save(data)
}

async function countType(query: any) {
    return await Achievement.count(query);
}


async function findAllData(query: any) {
    return await Achievement.findAndCount(query);
}

async function deleteAndReturnById(id: string) {
    const entity = await Achievement.findOne({ where: { ID: id } });
    return await Achievement.softRemove(entity);
    // return await Achievement.createQueryBuilder()
    //     .softDelete()
    //     .from(Achievement)
    //     .where("ID = :ID", { ID: id })
    //     .returning('*')
    //     .execute();
}

async function getOneById(query: any) {
    return await Achievement.findOne(query);
}


async function updateAndReturnById(id: string, data: Achievement) {
    return await Achievement
        .createQueryBuilder()
        .update(Achievement)
        .set({ ...data })
        .where("ID = :id", { id })
        .returning('*')
        .execute();
}

export { insertOne, countType, findAllData, deleteAndReturnById, getOneById, updateAndReturnById };