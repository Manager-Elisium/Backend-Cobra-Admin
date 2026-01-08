import { DeleteResult, UpdateResult } from 'typeorm';
import StandardError from 'src/common/standard-error';
import { ErrorCodes } from 'src/common/error-type';
import { Faq } from 'src/domain/faq.entity';
import { insertOne, getCount, findAll, findAllData, getOneById, updateOne, deleteOne } from 'src/libs/typeorm/faq.repository';

async function createFaq(faq: Faq): Promise<Faq> {
    const createOne = await insertOne(faq);
    if (!createOne) {
        throw new StandardError(
            ErrorCodes.API_VALIDATION_ERROR,
            "Faq create Error."
        );
    }
    return createOne;
}

async function findFaq(): Promise<{ count: number, list: Faq[] }> {
    const [count, list] = await Promise.all([getCount(), findAll()]);
    return { count, list };
}

async function findAllFaq(query:any): Promise<{ data: Faq[], count: number }> {
    const data = await findAllData(query);
    if (!data) {
        throw new StandardError(
            ErrorCodes.API_VALIDATION_ERROR,
            "Faq list Found Error."
        );
    }
    return data;
}

async function findOneFaq(id: string): Promise<Faq[]> {
    const getfaq = await getOneById(id);
    if (!getfaq[0]) {
        throw new StandardError(
            ErrorCodes.NOT_FOUND,
            "Faq is not found."
        );
    }
    return getfaq
}

async function deleteFaq(id: string): Promise<DeleteResult> {
    let getfaq = await getOneById(id);

    if (!getfaq[0]) {
        throw new StandardError(
            ErrorCodes.NOT_FOUND,
            "Faq is not found."
        );
    }
    const deletedata = await deleteOne(id);
    return deletedata;
}

async function updateFaq(id: string, faq: Faq): Promise<UpdateResult> {
    let getfaq = await getOneById(id);
    if (!getfaq[0]) {
        throw new StandardError(
            ErrorCodes.NOT_FOUND,
            "Faq is not found."
        );
    }
    let updateFaq = await updateOne(id, faq);
    return updateFaq;
}

export { createFaq, findFaq, findAllFaq, updateFaq, findOneFaq, deleteFaq };



