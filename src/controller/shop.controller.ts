import { NextFunction } from "express";
import { Response, Request } from "express";
import { encrypt, decrypt } from "src/common/encrypt";
import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3"
import dotenv from 'dotenv'
import moment from "moment";
import { createShop, findShop, findAllShop, findOneShop, updateShop, deleteShop } from "src/services/shop.service";
import { uploadFile, uploadSeasonRewardFile } from "src/common/upload";
import { ErrorCodeMap } from "src/common/error-type";
import { getOneById, updateOne } from "src/repository/shop.repository";
import { Shop } from "src/domain/shop.entity";

dotenv.config()
const secretKey = process?.env?.SECRET_KEY ?? 'SWS0zf0thg8T5Gz3scOSQ2W4r6r7GJAg';
const secretKeyGamePlay = process?.env?.SECRET_KEY_GAME_PLAY ?? 'SM20zD0thg8T5Gz3scOSQ2W4r6r7GJqR';

// Set up AWS S3
const s3Client = new S3Client({
    region: 'ap-south-1',
    credentials: {
        accessKeyId: 'AKIA3YQTGJIW7HUXC523',
        secretAccessKey: '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'
    },
});

// const s3Client = new S3Client({
//     region: process?.env?.REGION ?? "ap-south-1",
//     credentials: {
//         accessKeyId: process?.env?.ACCESS_KEY_ID ?? "AKIAYMI5KXNR7R4J77IE",
//         secretAccessKey: process?.env?.SECRET_ACCESS_KEY ?? "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"
//     },
// });

async function insert(req: Request, res: Response, next: NextFunction) {
    try {
        const isUploadFile = await uploadSeasonRewardFile(req, res, next) as any;
        if (!isUploadFile.status) {
            return res
                .status(400)
                .json({ message: "Shop file is compulsory." });
        }
        const body = {
            ...req.body,
            KEY: isUploadFile?.KEY,
            BUCKET_NAME: process.env.BUCKET_NAME,
            ITEM_IMAGES: isUploadFile?.ITEM_IMAGES,
            EXCLUSIVE_OFFER: req?.body?.EXCLUSIVE_OFFER == 'true' ? true : false
        };
        let data = await createShop(body);
        if (!data) {
            return res
                .status(ErrorCodeMap.FORM_VALIDATION_ERROR)
                .json({ message: "Shop create Error." });
        }
        console.log(data)
        let encryptedData = await encrypt(JSON.stringify(data), secretKey);
        return res.json({
            status: true,
            data: encryptedData,
            message: "Shop created successfully",
        });

    } catch (error) {
        return res.json({ status: false, message: error?.message ?? "" });
    }
}

async function list(req: Request, res: Response, next: NextFunction) {
    try {
        const { id: TYPE } = req.params;
        let data = await findShop(TYPE);
        return res.json({ status: true, data });
    } catch (error) {
        return res.json({ status: false, message: error?.message ?? "" });
    }
}

async function allDataList(req: Request, res: Response, next: NextFunction) {
    try {
        const { take, page, keyword } = req.query
        const query = {
            take: take || 10,
            page: page || 1,
            keyword: keyword || ''
        }
        let data = await findAllShop(query);
        let encryptedData = encrypt(JSON.stringify(data), secretKey)
        return res.json({ status: true, data: await encryptedData, message: "Shop list" });
    } catch (error) {
        return res.json({ status: false, message: error?.message ?? "" });
    }
}

async function Delete(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;
        await deleteShop(id);
        let encryptedData = encrypt(JSON.stringify(id), secretKey)
        return res.json({ status: true, id: await encryptedData, msg: "deleted successfully" });
    } catch (error) {
        return res.json({ status: false, message: error?.message ?? "" });
    }
}

async function update(req: Request, res: Response, next: NextFunction) {
    try {
        let isUploadFile = await uploadFile(req, res, next) as any;
        const { id } = req.params;
        if (isUploadFile.status) {
            let find = await getOneById(id) as any
            console.log(find)
            // let key = find?.KEY;
            // if (!!key) {
            //     let deleteParams = {
            //         Bucket: process.env.BUCKET_NAME,
            //         Key: find?.KEY
            //     };
            //     const deleteObjectCommand = new DeleteObjectCommand(deleteParams);
            //     await s3Client.send(deleteObjectCommand);
            //     console.log("Object deleted successfully.");
            // }

            const body = {
                ...req.body,
                BUCKET_NAME: isUploadFile.BUCKET_NAME,
                KEY: isUploadFile.KEY
            }

            await updateOne(id, body);
            let updatedReward = await getOneById(id);
            let encryptedData = encrypt(JSON.stringify(updatedReward), secretKey);

            return res.json({
                status: true,
                data: await encryptedData,
                message: "updated data sucessfully",
            });

        } else {
            const body = {
                ...req.body
            }
            await updateOne(id, body);
            let updatedReward = await getOneById(id);
            let encryptedData = encrypt(JSON.stringify(updatedReward), secretKey);

            return res.json({
                status: true,
                data: await encryptedData,
                message: "updated data sucessfully",
            });
        }
    } catch (error) {
        return res.json({ status: false, message: error?.message ?? "" });
    }
}


async function GetById(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;
        let find = await findOneShop(id) as any
        return res.json({
            status: true,
            data: find,
            msg: "get successfully",
        });
    } catch (error) {
        return res.json({ status: false, message: error?.message ?? "" });
    }
}


async function Get(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;
        let find = await findOneShop(id) as any
        let encryptedData = await encrypt(JSON.stringify(find), secretKey);
        // decrypt(await encrypt(JSON.stringify(find?.[0]), secretKey), secretKey)
        return res.json({
            status: true,
            id: encryptedData,
            msg: "get successfully",
        });
    } catch (error) {
        return res.json({ status: false, message: error?.message ?? "" });
    }
}


async function deleteItemFile(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;
        const { KEY } = req.body;
        let find = await getOneById(id) as any;
        const currentItems = find?.ITEM_IMAGES?.filter((data: any) => KEY !== data.KEY);
        let key = find?.ITEM_IMAGES?.find((data: any) => KEY === data.KEY)
        if (!!key) {
            // let deleteParams = {
            //     Bucket: process.env.BUCKET_NAME,
            //     Key: key.KEY
            // };
            // const deleteObjectCommand = new DeleteObjectCommand(deleteParams);
            // await s3Client.send(deleteObjectCommand);
            console.log("Object deleted successfully.");
        }

        console.log(currentItems)

        const body = {
            ITEM_IMAGES: currentItems
        } as Shop;

        await updateOne(id, body);
        let updatedReward = await getOneById(id);
        let encryptedData = encrypt(JSON.stringify(updatedReward), secretKey);

        return res.json({
            status: true,
            data: await encryptedData,
            message: "delete data sucessfully",
        });
    } catch (error) {
        return res.json({ status: false, message: error?.message ?? "" });
    }

}



async function updateItemFile(req: Request, res: Response, next: NextFunction) {
    try {
        let isUploadFile = await uploadFile(req, res, next) as any;
        const { id } = req.params;
        if (isUploadFile.status) {
            const { KEY } = req.body;
            let find = await getOneById(id) as any;
            // let key = find?.ITEM_IMAGES.filter((data: any) => KEY === data?.KEY) ?? [];
            // if (key.length > 0) {
            //     let deleteParams = {
            //         Bucket: process.env.BUCKET_NAME,
            //         Key: key[0]?.KEY
            //     };
            //     const deleteObjectCommand = new DeleteObjectCommand(deleteParams);
            //     await s3Client.send(deleteObjectCommand);
            //     console.log("Object deleted successfully.");
            // }
            const currentItems = find?.EMOJI_IMAGES.filter((data: any) => KEY !== data?.KEY) ?? [];
            const data = {
                BUCKET_NAME: isUploadFile.BUCKET_NAME,
                KEY: isUploadFile.KEY
            }
            const getData = [...currentItems, data];
            const body = {
                ITEM_IMAGES: getData
            } as Shop;

            await updateOne(id, body);
            let updatedReward = await getOneById(id);
            let encryptedData = encrypt(JSON.stringify(updatedReward), secretKey);

            return res.json({
                status: true,
                // updatedReward,
                data: await encryptedData,
                message: "update data sucessfully",
            });
        } else {
            return res
                .status(400)
                .json({ message: "Emoji file is compulsory." });
        }
    } catch (error) {
        return res.json({ status: false, message: error?.message ?? "" });
    }
}



export { insert, list, allDataList, update, Delete, Get, GetById, deleteItemFile, updateItemFile };
