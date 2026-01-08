import { Shop } from "src/domain/shop.entity";

async function insertOne(data: Shop) {
    return await Shop.save(data)
}

async function getCount() {
    return await Shop.count();
}

async function findAll(query: any) {
    return await Shop.find(query);
}

async function groupAll() {
    return await Shop.find();
}

async function updateOne(id: string, shop: Shop) {
    return await Shop.update(id, shop)
}

async function getOneById(id: string) {
    return await Shop.find({
        where: {
            ID: id
        }
    });
}

async function findAllData(query: any) {
    console.log(query.keyword);
    let whereCondition = {};
    if (query?.keyword) {
        whereCondition = { TYPE: query.keyword };
    }

    const [result, total] = await Shop.findAndCount({
        where: whereCondition,
        order: { CREATED_DATE: 'DESC' },
        take: query.take,
        skip: (query.page - 1) * query.take,
    });
    return { count: total, data: result };
}

async function deleteOne(id: string) {
    return await Shop.delete(id);
}

export { insertOne, getCount, findAll, getOneById, findAllData, updateOne, deleteOne, groupAll };
