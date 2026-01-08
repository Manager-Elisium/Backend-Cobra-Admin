import { Lobby } from "src/domain/lobby.entity";
import { Like } from "typeorm";

async function insertOne(data: Lobby) {
    return await Lobby.save(data)
}

async function getCount() {
    return await Lobby.count();
}

async function findAll() {
    return await Lobby.find();
}

async function updateOne(id: string, reward: Lobby) {
    return await Lobby.update(id, reward)
}

async function getOneById(id) {
    return await Lobby.find({
        where: {
            ID: id
        }
    });
}

async function findAllData(query) {

    const [result, total] = await Lobby.findAndCount({
        where: { TITLE: Like('%' + query.keyword + '%') },
        order: { CREATED_DATE: 'DESC' },
        take: query.take,
        skip: (query.page - 1) * query.take,
    });
    return { count: total, data: result };
}

async function deleteOne(id: string) {
    const entity = await Lobby.findOne({ where: { ID: id } });
    return await Lobby.softRemove(entity);
    // return await Lobby.delete(id);
}

export { insertOne, getCount, findAll, findAllData, getOneById, updateOne, deleteOne };
