import { TermsAndConditions } from "src/domain/tearms_conditions.entity";
import { Like } from "typeorm";

async function getCount() {
    return await TermsAndConditions.count();
}

async function findAll(page?: number, skip?: number) {
    return await TermsAndConditions.find();
}

async function insertOne(data: TermsAndConditions) {
    return await TermsAndConditions.save(data);
}

async function deleteOne(id: string) {
    return await TermsAndConditions.delete(id);
}

async function updateOne(id: string, termsAndConditions: TermsAndConditions) {
    return TermsAndConditions.update(id, termsAndConditions)
}

async function getOneById(id: string) {
    return await TermsAndConditions.find({
        where: {
            ID: id
        }
    });
}

async function findAllData(query:any) {
    const [result, total] = await TermsAndConditions.findAndCount(
        {
            where: { TITLE: Like('%' + query.keyword + '%') }, 
            order: { CREATED_DATE: "DESC" },
            take: query.take,
            skip: (query.page-1) * query.take
        }
    );
    return { count: total, data: result }
}

export { getCount, findAll, insertOne, deleteOne, updateOne, getOneById, findAllData };
