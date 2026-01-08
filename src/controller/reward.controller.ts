import { NextFunction } from "express";
import { Response, Request } from "express";
import { encrypt } from "src/common/encrypt";
import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3"
import { createReward, findReward, findAllReward, updateReward, findOneReward, deleteReward, findDays, } from "src/services/reward.service";
import dotenv from "dotenv";
import { uploadFile, uploadMultipleFile } from "src/common/upload";
import { getOneById } from "src/repository/reward.repository";
import { Reward } from "src/domain/reward.entity";

dotenv.config();
const secretKey = process?.env?.SECRET_KEY ?? "SWS0zf0thg8T5Gz3scOSQ2W4r6r7GJAg";
const secretKeyGamePlay = process?.env?.SECRET_KEY_GAME_PLAY ?? "SM20zD0thg8T5Gz3scOSQ2W4r6r7GJqR";

const s3Client = new S3Client({
    region: process.env.REGION,
    credentials: {
        accessKeyId: process.env.ACCESS_KEY_ID,
        secretAccessKey: process.env.SECRET_ACCESS_KEY,
    },
});

async function days(req: Request, res: Response, next: NextFunction) {
    try {
        const getDays = await findDays();
        let encryptedData = encrypt(JSON.stringify(getDays), secretKey);
        return res.json({
            status: true,
            data: await encryptedData,
            message: "Reward days successfully",
        });
    } catch (error) {
        return res.json({ status: false, message: error?.message ?? "" });
    }
}

async function insert(req: Request, res: Response, next: NextFunction) {
    try {
        let isUploadFile = await uploadFile(req, res, next) as any;
        if (!isUploadFile.status) {
            return res
                .status(400)
                .json({ message: "Reward file is compulsory." });
        }
        const reqBody = {
            ...req.body,
            FILE: isUploadFile?.FILE,
            BUCKET_NAME: isUploadFile?.BUCKET_NAME,
            KEY: isUploadFile?.KEY
        }
        let data = await createReward(reqBody);
        if (!data) {
            return res
                .status(400)
                .json({ message: "Reward create Error." });
        }
        let encryptedData = encrypt(JSON.stringify(data), secretKey);
        return res.json({
            status: true,
            data: await encryptedData,
            message: "Reward created successfully",
        });

    } catch (error) {
        return res.json({ status: false, message: error?.message ?? "" });
    }
}

async function insertItem(req: Request, res: Response, next: NextFunction) {
    try {
        let isUploadFile = await uploadMultipleFile(req, res, next) as any;
        console.log(isUploadFile)
        if (!isUploadFile.status) {
            return res
                .status(400)
                .json({ message: "Reward file is compulsory." });
        }
        const reqBody = {
            ...req.body,
            FILE: isUploadFile?.FILE,
            BUCKET_NAME: isUploadFile?.BUCKET_NAME,
            KEY: isUploadFile?.KEY,
            ITEM_IMAGES: isUploadFile?.ITEM_IMAGES
        }
        let data = await createReward(reqBody);
        if (!data) {
            return res
                .status(400)
                .json({ message: "Reward create Error." });
        }
        let encryptedData = encrypt(JSON.stringify(data), secretKey);
        return res.json({
            status: true,
            data: await encryptedData,
            message: "Reward created successfully",
        });

    } catch (error) {
        return res.json({ status: false, message: error?.message ?? "" });
    }
}

async function list(req: Request, res: Response, next: NextFunction) {
    try {
        let data = await findReward();
        // let encryptedData = encrypt(JSON.stringify(data), secretKeyGamePlay);
        return res.json({ status: true, data });
    } catch (error) {
        return res.json({ status: false, message: error?.message ?? "" });
    }
}

async function allDataList(req: Request, res: Response, next: NextFunction) {
    try {
        const { take, page, keyword } = req.query;
        const query = {
            take: take || 10,
            page: page || 1,
            keyword: keyword || '',
        };
        let data = await findAllReward(query);
        let encryptedData = encrypt(JSON.stringify(data), secretKey);

        return res.json({
            status: true,
            data: await encryptedData,
            message: "Reward list",
        });
    } catch (error) {
        return res.json({ status: false, message: error?.message ?? "" });
    }
}

async function Delete(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;

        await deleteReward(id);
        let encryptedData = encrypt(JSON.stringify(id), secretKey);

        return res.json({
            status: true,
            id: await encryptedData,
            msg: "deleted successfully",
        });
    } catch (error) {
        return res.json({ status: false, message: error?.message ?? "" });
    }
}

async function Get(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;
        let find = await findOneReward(id) as any


        let encryptedData = encrypt(JSON.stringify(find?.[0]), secretKey);

        return res.json({
            status: true,
            id: await encryptedData,
            msg: "get successfully",
        });
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
            let key = find?.KEY;
            if (!!key) {
                // let deleteParams = {
                //     Bucket: process.env.BUCKET_NAME,
                //     Key: find?.KEY
                // };
                // const deleteObjectCommand = new DeleteObjectCommand(deleteParams);
                // await s3Client.send(deleteObjectCommand);
                // console.log("Object deleted successfully.");
            }

            const body = {
                ...req.body,
                FILE: isUploadFile.FILE,
                BUCKET_NAME: isUploadFile.BUCKET_NAME,
                KEY: isUploadFile.KEY,
                VALUE: req.body.VALUE
            }

            await updateReward(id, body);
            let updatedReward = await findOneReward(id);
            let encryptedData = encrypt(JSON.stringify(updatedReward), secretKey);

            return res.json({
                status: true,
                data: await encryptedData,
                message: "updated data sucessfully",
            });

        } else {
            await updateReward(id, req.body);
            let updatedReward = await findOneReward(id);
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


async function deleteItemFile(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;
        const { KEY } = req.body;
        if (!KEY) {

        }
        let find = await getOneById(id) as any;
        const currentItems = find?.[0]?.ITEM_IMAGES.filter((data: any) => KEY !== data.KEY);
        let key = find?.[0]?.ITEM_IMAGES.filter((data: any) => KEY === data.KEY)
        if (key.length > 0) {
            // let deleteParams = {
            //     Bucket: process.env.BUCKET_NAME,
            //     Key: key[0]?.KEY
            // };
            // const deleteObjectCommand = new DeleteObjectCommand(deleteParams);
            // await s3Client.send(deleteObjectCommand);
            // console.log("Object deleted successfully.");
        }

        console.log(currentItems)

        const body = {
            ITEM_IMAGES: currentItems,
            VALUE: currentItems?.length
        } as Reward;

        await updateReward(id, body);
        let updatedReward = await findOneReward(id);
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
            let key = find[0]?.ITEM_IMAGES.filter((data: any) => KEY === data?.KEY) ?? [];
            if (key.length > 0) {
                // let deleteParams = {
                //     Bucket: process.env.BUCKET_NAME,
                //     Key: key[0]?.KEY
                // };
                // const deleteObjectCommand = new DeleteObjectCommand(deleteParams);
                // await s3Client.send(deleteObjectCommand);
                // console.log("Object deleted successfully.");
            }
            const currentItems = find[0]?.ITEM_IMAGES.filter((data: any) => KEY !== data?.KEY) ?? [];
            const data = {
                FILE: isUploadFile.FILE,
                BUCKET_NAME: isUploadFile.BUCKET_NAME,
                KEY: isUploadFile.KEY,
                INDEX: currentItems.length + 1
            }
            const getData = [...currentItems, data];
            const body = {
                ITEM_IMAGES: getData,
                VALUE: req.body.VALUE
            } as Reward;

            await updateReward(id, body);
            let updatedReward = await findOneReward(id);
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
                .json({ message: "Reward file is compulsory." });
        }
    } catch (error) {
        return res.json({ status: false, message: error?.message ?? "" });
    }
}


export { insert, list, allDataList, update, Delete, Get, days, insertItem, deleteItemFile, updateItemFile };
