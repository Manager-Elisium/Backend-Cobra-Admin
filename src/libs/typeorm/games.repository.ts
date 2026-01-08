import { MultiGames } from "src/domain/games.entity";
import { Like } from "typeorm";

async function insertOne(data: MultiGames) {
    return await MultiGames.save(data)
}

async function getCount() {
    return await MultiGames.count();
}

async function findAll() {
    return await MultiGames.find();
}

async function deleteOne(id: string) {
    const entity = await MultiGames.find({ where: { ID: id } });
    return await MultiGames.softRemove(entity);
}

async function updateOne(id: string, multiGames: MultiGames) {
    return MultiGames.update(id, multiGames)
}

async function getOneById(id: string) {
    return await MultiGames.find({
        where: {
            ID: id
        }
    });
}

async function findAllData(query:any) {
    const [result, total] = await MultiGames.findAndCount(
        {
            where: { NAME: Like('%' + query.keyword + '%') },
            order: { CREATED_DATE: 'DESC' },
            take: query.take,
            skip: (query.page - 1) * query.take
        }
    );
    return { count: total, data: result }
}

export { insertOne, getCount, findAll, findAllData, updateOne, getOneById, deleteOne };
