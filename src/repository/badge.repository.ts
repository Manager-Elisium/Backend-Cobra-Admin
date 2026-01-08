import { Badge } from "src/domain/badge.entity";


async function insertOne(data: Badge) {
    return await Badge.save(data)
}

async function countType(query: any) {
    return await Badge.count(query);
}


async function findAllData(query: any) {
    return await Badge.findAndCount(query);
}

async function deleteAndReturnById(id: string) {
    const entity = await Badge.findOne({ where: { ID: id } });
    return await Badge.softRemove(entity);
    // return await Badge.createQueryBuilder()
    //     .delete()
    //     .from(Badge)
    //     .where("ID = :ID", { ID: id })
    //     .returning('*')
    //     .execute();
}

async function getOneById(query: any) {
    return await Badge.findOne(query);
}


async function updateAndReturnById(id: string, data: Badge) {
    return await Badge
        .createQueryBuilder()
        .update(Badge)
        .set({ ...data })
        .where("ID = :id", { id })
        .returning('*')
        .execute();
}

export { insertOne, countType, findAllData, deleteAndReturnById, getOneById, updateAndReturnById };