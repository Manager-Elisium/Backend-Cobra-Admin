import { DeleteResult, UpdateResult } from 'typeorm';
import StandardError from 'src/common/standard-error';
import { ErrorCodes } from 'src/common/error-type';
import { insertOne, getCount, findAll, findAllData, getOneById, updateOne, groupAll } from 'src/repository/shop.repository';
import { Shop } from 'src/domain/shop.entity';
import { generatePermanentPresignedUrl } from 'src/common/upload';

async function createShop(shop: Shop): Promise<Shop> {
    const createOne = await insertOne(shop);
    if (!createOne) {
        throw new StandardError(
            ErrorCodes.API_VALIDATION_ERROR,
            "Shop create Error."
        );
    }
    return createOne;
}

async function findShop(type: string) {
    if (type === "all") {
        const getData = await groupAll() as any;
        for (let index = 0; index < getData.length; index++) {
            const bucketName = getData[index]?.BUCKET_NAME;
            const key = getData[index]?.KEY;
            if (!!bucketName && !!key) {
                getData[index].FILE = await generatePermanentPresignedUrl(bucketName, key) ?? "";
                const itemImages: any = getData[index]?.ITEM_IMAGES ?? 0;
                for (let itemIndex = 0; itemIndex < itemImages.length; itemIndex++) {
                    const bucketName = itemImages[itemIndex].BUCKET_NAME;
                    const key = itemImages[itemIndex].KEY;
                    const benefitsUrl = await generatePermanentPresignedUrl(bucketName, key);
                    itemImages[itemIndex].FILE = benefitsUrl;
                }
            } else {
                getData[index].FILE = null;
            }
        }
        const groupByType = getData.reduce((group: { [key: string]: any[] }, item) => {
            if (!group[item.TYPE]) {
                group[item.TYPE] = [];
            }
            group[item.TYPE].push(item);
            return group;
        }, {});
        return groupByType;
    } else {
        const list = await findAll({
            where: {
                TYPE: type,
                IS_DELETED: false
            }
        }) as any;
        for (let index = 0; index < list.length; index++) {
            const bucketName = list[index]?.BUCKET_NAME;
            const key = list[index]?.KEY;
            if (!!bucketName && !!key) {
                list[index].FILE = await generatePermanentPresignedUrl(bucketName, key) ?? "";
                const itemImages: any = list[index]?.ITEM_IMAGES ?? 0;
                for (let itemIndex = 0; itemIndex < itemImages.length; itemIndex++) {
                    const bucketName = itemImages[itemIndex].BUCKET_NAME;
                    const key = itemImages[itemIndex].KEY;
                    const benefitsUrl = await generatePermanentPresignedUrl(bucketName, key);
                    itemImages[itemIndex].FILE = benefitsUrl;
                }
            } else {
                list[index].FILE = null;
            }
        }
        return list;
    }
}

async function findAllShop(query: any): Promise<{ data: any, count: number }> {
    const data = await findAllData(query);
    if (!data) {
        throw new StandardError(
            ErrorCodes.API_VALIDATION_ERROR,
            "Shop list Found Error."
        );
    }
    const list: any = data?.data;
    for (let index = 0; index < list.length; index++) {
        const bucketName = list[index]?.BUCKET_NAME;
        const key = list[index]?.KEY;
        if (!!bucketName && !!key) {
            list[index].FILE = await generatePermanentPresignedUrl(bucketName, key) ?? "";
        } else {
            list[index].FILE = null;
        }
    }

    return { data: list, count: data.count };
}

async function findOneShop(id: string): Promise<any> {
    const find_shop = await getOneById(id) as any;
    if (!find_shop) {
        throw new StandardError(
            ErrorCodes.NOT_FOUND,
            "Shop is not found."
        );
    }
    if (!!find_shop?.KEY && !!find_shop?.BUCKET_NAME) {
        find_shop.FILE = await generatePermanentPresignedUrl(find_shop?.BUCKET_NAME, find_shop?.KEY);
        const itemImages: any = find_shop?.ITEM_IMAGES ?? 0;
        for (let index = 0; index < itemImages.length; index++) {
            const bucketName = itemImages[index].BUCKET_NAME;
            const key = itemImages[index].KEY;
            const benefitsUrl = await generatePermanentPresignedUrl(bucketName, key);
            itemImages[index].FILE = benefitsUrl;
        }
    } else {
        find_shop.FILE = null;
    }
    return find_shop
}

async function updateShop(id: string, shop: Shop): Promise<UpdateResult> {
    let find_shop = await getOneById(id);
    if (!find_shop) {
        throw new StandardError(
            ErrorCodes.NOT_FOUND,
            "Shop is not found."
        );
    }
    const update = await updateOne(id, shop);
    return update;
}

async function deleteShop(id: string): Promise<DeleteResult> {
    let find_shop = await getOneById(id);
    if (!find_shop) {
        throw new StandardError(
            ErrorCodes.NOT_FOUND,
            "Shop is not found."
        );
    }
    const deleteData = await updateOne(id, {
        IS_DELETED: true
    } as Shop);
    return deleteData;
}

export { createShop, findShop, findAllShop, findOneShop, updateShop, deleteShop };



