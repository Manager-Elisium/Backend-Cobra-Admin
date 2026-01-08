import { Notification } from "src/domain/notification.entity";


async function insertOne(data: Notification) {
    return await Notification.save(data);
}


async function findAllData(query: any) {
    const [result, total] = await Notification.findAndCount(
        {
            order: { CREATED_DATE: 'DESC' },
            take: query.take,
            skip: (query.page - 1) * query.take,
            where: { IS_DELETED: false }
        }
    );
    return { count: total, data: result }
}

async function getOneNotification(query: any) {
    return await Notification.findOne(query);
}

async function updateNotification(id: string, data: any) {
    return await Notification
        .createQueryBuilder()
        .update(Notification)
        .set({ ...data })
        .where("ID = :id", { id })
        .returning('*')
        .execute();
}

export { insertOne, findAllData, getOneNotification, updateNotification };