import { DeleteResult, UpdateResult } from 'typeorm';
import StandardError from 'src/common/standard-error';
import { ErrorCodes } from 'src/common/error-type';
import { Achievement } from 'src/domain/achievement.entity';
import { countType, insertOne, findAllData, deleteAndReturnById, getOneById, updateAndReturnById } from 'src/repository/achievement.repository';
import { generatePermanentPresignedUrl } from 'src/common/upload';


async function createAchievementService(achievement: Achievement): Promise<Achievement> {
    const { TYPE } = achievement;
    const arrayAchievement = ["Lucky Streak", "Cobra Charmer", "Globe Trotter", "High Roller", "Slick n Quick"]
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
    const createOne = await insertOne(achievement);
    if (!createOne) {
        throw new StandardError(
            ErrorCodes.API_VALIDATION_ERROR,
            "Achievement create Error."
        );
    }
    return createOne;
}



async function paginationAchievementService(body: any): Promise<{ data: Achievement[], count: number }> {
    const query = {
        order: { CREATED_DATE: 'DESC' },
        take: body.take,
        skip: (body.page - 1) * body.take
    };
    const data = await findAllData(query) as any;
    if (!data) {
        throw new StandardError(
            ErrorCodes.API_VALIDATION_ERROR,
            "Achievement list Found Error."
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



async function deleteAchievementService(id: string): Promise<Achievement> {
    let deleteSetting = await deleteAndReturnById(id);
    if (!deleteSetting) {
        throw new StandardError(
            ErrorCodes.NOT_FOUND,
            "Achievement is not found."
        );
    }
    return deleteSetting;
}


async function findOneAchievementService(id: string): Promise<Achievement> {
    const query = {
        where: {
            ID: id
        },
        relations: ['TASK_LOBBY_ID']
    };
    const getAchievement = await getOneById(query) as any;
    if (!getAchievement) {
        throw new StandardError(
            ErrorCodes.NOT_FOUND,
            "Achievement is not found."
        );
    }
    getAchievement.FILE = await generatePermanentPresignedUrl(getAchievement?.BUCKET_NAME, getAchievement?.KEY);
    return getAchievement;
}


async function updateAchievementService(id: string, setting: Achievement): Promise<UpdateResult> {
    let updateAchievement = await updateAndReturnById(id, setting);
    if (!updateAchievement?.affected) {
        throw new StandardError(
            ErrorCodes.NOT_FOUND,
            "Achievement is not found."
        );
    }
    return updateAchievement?.raw?.[0];
}



async function listAchievementService(): Promise<{ data: Achievement[], count: number }> {
    const query = {
        order: { CREATED_DATE: 'DESC' }
    };
    const data = await findAllData(query) as any;
    if (!data) {
        throw new StandardError(
            ErrorCodes.API_VALIDATION_ERROR,
            "Achievement list Found Error."
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
    createAchievementService, paginationAchievementService, deleteAchievementService,
    findOneAchievementService, updateAchievementService, listAchievementService
};