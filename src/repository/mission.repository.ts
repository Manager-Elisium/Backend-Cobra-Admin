import { Mission } from "src/domain/mission.entity";
import { Like } from "typeorm";

async function insertOne(data: Mission) {
    const mission = await Mission.save(data)
    return mission;
}

async function getCount() {
    return await Mission.count({ where: { IS_DELETED: false } });
}

async function findAll() {
    return await Mission.find({
        where: { IS_DELETED: false },
        take: 3
    });
}

async function updateOne(id: string, mission: Mission) {
    return await Mission.update(id, mission)
}

async function getOneById(id: string) {
    // return await Mission
    //         .getRepository()
    //         .createQueryBuilder()
    //         .select(['TASK_LOBBY_ID'])
    //     // .createQueryBuilder('mission')
    //     // .select(['mission.ID AS ID',
    //     //     'mission.FILE AS FILE',
    //     //     'mission.BUCKET_NAME AS BUCKET_NAME',
    //     //     'mission.TYPE AS TYPE',
    //     //     'mission.KEY AS KEY',
    //     //     'mission.TITLE AS TITLE',
    //     //     'mission.TEXT AS TEXT',
    //     //     'mission.TASK_KEY AS TASK_KEY',
    //     //     'mission.TASK_LOBBY_ID AS TASK_LOBBY_ID',
    //     //     'mission.TASK_VALUE AS TASK_VALUE',
    //     //     'mission.MISSIONS AS MISSIONS',
    //     //     'mission.UPDATED_DATE AS UPDATED_DATE',
    //     //     'mission.CREATED_DATE AS CREATED_DATE'])
    //     .where('ID = :id', { id })
    //     .getRawOne();
    return await Mission.findOne({
        where: {
            ID: id
        },
        select: ["TASK_LOBBY_ID"],
        relations: ['TASK_LOBBY_ID'],

    });
}

async function findAllData(query: any) {

    const [result, total] = await Mission.findAndCount({
        where: { TITLE: Like('%' + query.keyword + '%'), IS_DELETED: false },
        order: { CREATED_DATE: 'DESC' },
        take: query.take,
        skip: (query.page - 1) * query.take,
    });
    return { count: total, data: result };
}


export { insertOne, getCount, findAll, findAllData, getOneById, updateOne };
