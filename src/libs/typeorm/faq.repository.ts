import { Faq } from "src/domain/faq.entity";
import { Like } from "typeorm";

async function insertOne(data: Faq) {
    return await Faq.save(data);
}

async function getCount() {
    return await Faq.count();
}

async function findAll() {
    return await Faq.find();
}

async function deleteOne(id: string) {
    return await Faq.delete(id);
}

async function updateOne(id: string, faq: Faq) {
    return Faq.update(id, faq)
}

async function getOneById(id: string) {
    return await Faq.find({
        where: {
            ID: id
        }
    });
}

async function findAllData(query:any) {
    const [result, total] = await Faq.findAndCount(
        {
            where: { QUESTION: Like('%' + query.keyword + '%') },
            order: { CREATED_DATE: 'DESC' },
   
            take: query.take,
            skip: (query.page - 1) * query.take
        }
    );
    return { count: total, data: result }
}

export { insertOne, findAll, getCount, findAllData, updateOne, getOneById, deleteOne };
