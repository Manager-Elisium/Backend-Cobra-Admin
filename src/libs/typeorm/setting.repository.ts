import { Setting } from "src/domain/setting.entity";

async function insertOne(data: Setting) {
    return await Setting.save(data);
}

async function countType(query: any) {
    return await Setting.count(query);
}


async function deleteAndReturnById(id: string) {
    return await Setting.createQueryBuilder()
        .delete()
        .from(Setting)
        .where("ID = :ID", { ID: id })
        .returning('*')
        .execute();
}


async function updateOne(id: string, faq: Setting) {
    return Setting.update(id, faq)
}

async function updateAndReturnById(id: string, data: Setting) {
    return await Setting
        .createQueryBuilder()
        .update(Setting)
        .set({ ...data })
        .where("ID = :id", { id })
        .returning('*')
        .execute();
}

async function getOneById(query: any) {
    return await Setting.findOne(query);
}

async function findAllData(query: any) {
    const [result, total] = await Setting.findAndCount(
        {
            order: { CREATED_DATE: 'DESC' },
            take: query.take,
            skip: (query.page - 1) * query.take
        }
    );
    return { count: total, data: result }
}

export { insertOne, countType, updateAndReturnById, findAllData, updateOne, getOneById, deleteAndReturnById };
