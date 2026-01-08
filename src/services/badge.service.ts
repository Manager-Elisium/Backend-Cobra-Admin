import { DeleteResult, UpdateResult } from 'typeorm';
import StandardError from 'src/common/standard-error';
import { ErrorCodes } from 'src/common/error-type';
import { Badge } from 'src/domain/badge.entity';
import { countType, insertOne, findAllData, deleteAndReturnById, getOneById, updateAndReturnById } from 'src/repository/badge.repository';
import { generatePermanentPresignedUrl } from 'src/common/upload';


async function createBadgeService(badge: Badge): Promise<Badge> {
    const { TYPE } = badge;
    const arrayAchievement = ["Card Shark", "Seasoned Elite", "Rising Star", "Gold Miner", "Diamond Driller"]
    if (!arrayAchievement.includes(TYPE)) {
        throw new StandardError(
            ErrorCodes.API_VALIDATION_ERROR,
            "Please Select Current Type."
        );
    }
    const query = {
        where: { TYPE }
    }
    const isAvalible = await countType(query);

    if (isAvalible) {
        throw new StandardError(
            ErrorCodes.API_VALIDATION_ERROR,
            "Type already exists."
        );
    }
    const createOne = await insertOne(badge);
    if (!createOne) {
        throw new StandardError(
            ErrorCodes.API_VALIDATION_ERROR,
            "Badge create Error."
        );
    }
    return createOne;
}



async function paginationBadgeService(body: any): Promise<{ data: Badge[], count: number }> {
    const query = {
        order: { CREATED_DATE: 'DESC' },
        take: body.take,
        skip: (body.page - 1) * body.take
    };
    const data = await findAllData(query) as any;
    if (!data) {
        throw new StandardError(
            ErrorCodes.API_VALIDATION_ERROR,
            "Badge list Found Error."
        );
    }
    const list = data?.[0];
    for (let index = 0; index < list.length; index++) {
        const bucketName = list[index].BUCKET_NAME;
        const key = list[index].KEY;
        list[index].FILE = await generatePermanentPresignedUrl(bucketName, key);
    }
    return { data: list, count: data?.[1] };
}



async function deleteBadgeService(id: string): Promise<Badge> {
    let deleteBadge = await deleteAndReturnById(id);
    if (!deleteBadge) {
        throw new StandardError(
            ErrorCodes.NOT_FOUND,
            "Badge is not found."
        );
    }
    return deleteBadge;
}


async function findOneBadgeService(id: string): Promise<Badge> {
    const query = {
        where: {
            ID: id
        },
    };
    const getBadge = await getOneById(query) as any;
    if (!getBadge) {
        throw new StandardError(
            ErrorCodes.NOT_FOUND,
            "Badge is not found."
        );
    }
    getBadge.FILE = await generatePermanentPresignedUrl(getBadge?.BUCKET_NAME, getBadge?.KEY);
    return getBadge;
}


async function updateBadgeService(id: string, setting: Badge): Promise<UpdateResult> {
    let updateBadge = await updateAndReturnById(id, setting);
    if (!updateBadge?.affected) {
        throw new StandardError(
            ErrorCodes.NOT_FOUND,
            "Badge is not found."
        );
    }
    return updateBadge?.raw?.[0];
}


async function listBadgeService(): Promise<{ data: Badge[], count: number }> {
    const query = {
        order: { CREATED_DATE: 'DESC' }
    };
    const data = await findAllData(query) as any;
    if (!data) {
        throw new StandardError(
            ErrorCodes.API_VALIDATION_ERROR,
            "Badge list Found Error."
        );
    }
    const list = data?.[0];
    for (let index = 0; index < list.length; index++) {
        const bucketName = list[index].BUCKET_NAME;
        const key = list[index].KEY;
        list[index].FILE = await generatePermanentPresignedUrl(bucketName, key);
    }
    return { data: list, count: data?.[1] };
}

export {
    createBadgeService, paginationBadgeService, deleteBadgeService,
    findOneBadgeService, updateBadgeService, listBadgeService
};