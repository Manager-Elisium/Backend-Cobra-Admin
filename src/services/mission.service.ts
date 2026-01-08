import { DeleteResult, FindOperator, InsertManyResult, InsertOneOptions, InsertOneResult, UpdateResult } from 'typeorm';
import StandardError from 'src/common/standard-error';
import { ErrorCodes } from 'src/common/error-type';
import { insertOne, getCount, findAll, findAllData, getOneById, updateOne } from 'src/repository/mission.repository';
import { Mission } from 'src/domain/mission.entity';
import { generatePermanentPresignedUrl } from 'src/common/upload';

async function createMission(mission: Mission): Promise<Mission> {
    const createOne = await insertOne(mission);
    if (!createOne) {
        throw new StandardError(
            ErrorCodes.API_VALIDATION_ERROR,
            "Mission create Error."
        );
    }
    return createOne;
}

async function findMission(): Promise<{ count: number, list: Mission[] }> {
    const [count, list] = await Promise.all([getCount(), findAll()]);
    for (let mainIndex = 0; mainIndex < list.length; mainIndex++) {
        const mainUrl = await generatePermanentPresignedUrl(list[mainIndex]?.BUCKET_NAME, list[mainIndex]?.KEY)
        list[mainIndex].FILE = mainUrl;
    }
    return { count, list };
}

async function findAllMission(query: any): Promise<{ data: Mission[], count: number }> {
    const data = await findAllData(query);
    if (!data) {
        throw new StandardError(
            ErrorCodes.API_VALIDATION_ERROR,
            "Mission list Found Error."
        );
    }
    const list: any = data.data;
    for (let mainIndex = 0; mainIndex < list.length; mainIndex++) {
        const mainUrl = await generatePermanentPresignedUrl(list[mainIndex]?.BUCKET_NAME, list[mainIndex]?.KEY)
        list[mainIndex].FILE = mainUrl;
    }
    return data;
}


async function findOneMission(id: string): Promise<Mission> {
    const findMission = await getOneById(id);
    console.log(findMission)
    if (!findMission) {
        throw new StandardError(
            ErrorCodes.NOT_FOUND,
            "Mission is not found."
        );
    }
    const mainUrl = await generatePermanentPresignedUrl(findMission?.BUCKET_NAME, findMission?.KEY)
    findMission.FILE = mainUrl;
    return findMission
}

async function deleteMission(id: string): Promise<DeleteResult> {
    let getMission = await getOneById(id);

    if (!getMission) {
        throw new StandardError(
            ErrorCodes.NOT_FOUND,
            "Mission is not found."
        );
    }
    const deletedata = await updateOne(id, { IS_DELETED: true } as Mission);
    return deletedata;
}

async function updateMission(id: string, mission: Mission): Promise<UpdateResult> {

    let getMission = await getOneById(id);
    if (!getMission) {
        throw new StandardError(
            ErrorCodes.NOT_FOUND,
            "Mission is not found."
        );
    }

    const updateMission = await updateOne(id, mission);
    return updateMission;
}

export { createMission, findMission, findAllMission, findOneMission, updateMission, deleteMission };



