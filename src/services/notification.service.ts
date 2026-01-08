import { DeleteResult, FindOperator, InsertManyResult, InsertOneOptions, InsertOneResult, UpdateResult } from 'typeorm';
import StandardError from 'src/common/standard-error';
import { ErrorCodes } from 'src/common/error-type';
import { insertOne, findAllData, getOneNotification, updateNotification } from 'src/repository/notification.repository';
import { Notification } from 'src/domain/notification.entity';
import { generatePermanentPresignedUrl } from 'src/common/upload';

async function createNotification(reward: Notification): Promise<Notification> {
    const createOne = await insertOne({
        ...reward,
        DATA: !!reward.DATA ? JSON.parse(reward.DATA) : {}
    } as Notification);
    if (!createOne) {
        throw new StandardError(
            ErrorCodes.API_VALIDATION_ERROR,
            "Reward create Error."
        );
    }
    return createOne;
}

async function paginationNotification(query: any): Promise<{ data: Notification[], count: number }> {
    const data = await findAllData(query);
    if (!data) {
        throw new StandardError(
            ErrorCodes.API_VALIDATION_ERROR,
            "Notification list Found Error."
        );
    }
    return data;
}


async function getNotificationService(query: any): Promise<Notification> {
    const createQuery = {
        where: {
            ID: query.ID
        }
    }
    const data = await getOneNotification(createQuery);
    if (!data) {
        throw new StandardError(
            ErrorCodes.API_VALIDATION_ERROR,
            "Notification Found Error."
        );
    }
    if(!!data.KEY && !!data.BUCKET_NAME) {
        data.KEY = await generatePermanentPresignedUrl(data.BUCKET_NAME, data.KEY);
        console.log(data.KEY)
    }
    return data;
}



async function deleteNotificationService(id: string): Promise<UpdateResult> {
    const deletedata = await updateNotification(id, { IS_DELETED: true } as Notification);
    return deletedata;
}

export { createNotification, paginationNotification, getNotificationService, deleteNotificationService };