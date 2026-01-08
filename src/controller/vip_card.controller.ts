import { NextFunction } from "express";
import { Response, Request } from "express";
import { encrypt } from "src/common/encrypt";
import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3"
import dotenv from 'dotenv'
import { findVipCard, findAllVipCard, findOneVipCard, updateVipCard, deleteVipCard, findOneBenefitVipCard, createVipBenefitService, findVipCardForDashboardService } from "src/services/vip_card.service";
import { uploadFile, uploadVip, uploadVipBenefit } from "src/common/upload";
import { VipCard } from "src/domain/vip-card.entity";
import { VipCardBenefits } from "src/domain/vip-card-benefits.entity";
import { getOneById, updateOne, updateOneBenefit } from "src/repository/vip_card.repository";

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
        let responseFile = await uploadVip(req, res, next);
        if (responseFile.status) {
            console.log(req.body)
            console.log(responseFile.VIP_CARD_IMAGE)
            console.log(responseFile.EMOJI_IMAGES)
            console.log(responseFile.IMAGE_LIST)
            const benefits = JSON.parse(req.body.BENEFITS);
            console.log(benefits.filter((data) => data.TYPE === "COINS"))
            const vipCard = new VipCard();
            vipCard.KEY = responseFile.VIP_CARD_IMAGE.KEY;
            vipCard.BUCKET_NAME = responseFile.VIP_CARD_IMAGE.BUCKET_NAME;
            vipCard.FILE = responseFile.VIP_CARD_IMAGE.FILE;
            vipCard.DAYS_PRICE = JSON.parse(req.body.DAYS_PRICE);
            vipCard.TITLE = req.body.TITLE;
            vipCard.DESCRIPTION = req.body.DESCRIPTION;
            let insertVipCard = await vipCard.save();
            for (let index = 0; index < responseFile.IMAGE_LIST.length; index++) {
                const type = responseFile.IMAGE_LIST[index].TYPE;
                // COINS, DIAMONDS, XP, BENEFIT_IMAGE, EMOJI, VIP_CARD_IMAGE
                if (type === "COINS" || type === "DIAMONDS" || type === "XP") {
                    const vipCardBenefits = new VipCardBenefits();
                    vipCardBenefits.KEY = responseFile.IMAGE_LIST[index].KEY;
                    vipCardBenefits.BUCKET_NAME = responseFile.IMAGE_LIST[index].BUCKET_NAME;
                    // vipCardBenefits.FILE = responseFile.IMAGE_LIST[index].FILE;
                    vipCardBenefits.TYPE = responseFile.IMAGE_LIST[index].TYPE;
                    const filterValue = benefits.filter((data) => data.TYPE === type)
                    vipCardBenefits.VALUE = filterValue[0]?.COUNT;
                    vipCardBenefits.TEXT = filterValue[0]?.TEXT;
                    vipCardBenefits.BENEFITS = insertVipCard;
                    let insertVipCardBenefits = await vipCardBenefits.save();
                    console.log(insertVipCardBenefits);


                } else if (type === "BENEFIT_IMAGE") {
                    const vipCardBenefits = new VipCardBenefits();
                    vipCardBenefits.KEY = responseFile.IMAGE_LIST[index].KEY;
                    vipCardBenefits.BUCKET_NAME = responseFile.IMAGE_LIST[index].BUCKET_NAME;
                    // vipCardBenefits.FILE = responseFile.IMAGE_LIST[index].FILE;
                    const filterValue = benefits.filter((data) => data.TYPE === "EMOJI")
                    vipCardBenefits.VALUE = filterValue[0]?.COUNT;
                    vipCardBenefits.TYPE = filterValue[0]?.TYPE;
                    vipCardBenefits.TEXT = filterValue[0]?.TEXT;
                    vipCardBenefits.EMOJI_IMAGES = responseFile.EMOJI_IMAGES;
                    vipCardBenefits.BENEFITS = insertVipCard;
                    let insertVipCardBenefits = await vipCardBenefits.save();
                    console.log(insertVipCardBenefits);
                }
            }
            return res.json({ status: true, message: "Successfully Insert VIP Card." });
        } else {
            return res.json({ status: false, message: "File Upload Error." });
        }
    } catch (error) {
        return res.json({ status: false, message: error?.message ?? "" });
    }
}

async function list(req: Request, res: Response, next: NextFunction) {
    try {
        let data = await findVipCard();
        // let encryptedData = encrypt(JSON.stringify(data), secretKeyGamePlay)
        // return res.json({ status: true, data: await encryptedData });
        return res.json({ status: true, data });
    } catch (error) {
        return res.json({ status: false, message: error?.message ?? "" });
    }
}

async function getListForDashboard(req: Request, res: Response, next: NextFunction) {
    try {
        let { list } = await findVipCardForDashboardService();
        // let encryptedData = encrypt(JSON.stringify(data), secretKeyGamePlay)
        // return res.json({ status: true, data: await encryptedData });
        return res.json({ status: true, list });
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
        let data = await findAllVipCard(query);
        let encryptedData = encrypt(JSON.stringify(data), secretKey)
        return res.json({ status: true, data: await encryptedData, message: "Vip_card list" });
        // return res.json({ status: true, data, message: "Vip_card list" });
    } catch (error) {
        return res.json({ status: false, message: error?.message ?? "" });
    }
}

async function Delete(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;
        await deleteVipCard(id);
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
            let key = find?.KEY;
            if (!!key) {
                let deleteParams = {
                    Bucket: process.env.BUCKET_NAME,
                    Key: find?.KEY
                };
                const deleteObjectCommand = new DeleteObjectCommand(deleteParams);
                await s3Client.send(deleteObjectCommand);
                console.log("Object deleted successfully.");
            }

            const body = {
                ...req.body,
                FILE: isUploadFile.FILE,
                BUCKET_NAME: isUploadFile.BUCKET_NAME,
                KEY: isUploadFile.KEY,
                DAYS_PRICE: JSON.parse(req.body.DAYS_PRICE)
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
                ...req.body,
                DAYS_PRICE: JSON.parse(req.body.DAYS_PRICE)
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

async function Get(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;
        let find = await findOneVipCard(id) as any

        let encryptedData = encrypt(JSON.stringify(find), secretKey);

        return res.json({
            status: true,
            data: await encryptedData,
            // data: find,
            msg: "get successfully",
        });
    } catch (error) {
        return res.json({ status: false, message: error?.message ?? "" });
    }
}


async function GetBenefit(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;
        let find = await findOneBenefitVipCard(id) as any

        let encryptedData = encrypt(JSON.stringify(find), secretKey);

        return res.json({
            status: true,
            data: await encryptedData,
            // data: find,
            msg: "get successfully",
        });
    } catch (error) {
        return res.json({ status: false, message: error?.message ?? "" });
    }
}


async function UpdateBenefit(req: Request, res: Response, next: NextFunction) {
    try {
        let isUploadFile = await uploadFile(req, res, next) as any;
        const { id } = req.params;
        if (isUploadFile.status) {
            let find = await findOneBenefitVipCard(id) as any
            console.log(find)
            let key = find?.KEY;
            if (!!key) {
                // let deleteParams = {
                //     Bucket: process.env.BUCKET_NAME,
                //     Key: find?.KEY
                // };
                // const deleteObjectCommand = new DeleteObjectCommand(deleteParams);
                // await s3Client.send(deleteObjectCommand);
                console.log("Object deleted successfully.");
            }

            const body = {
                ...req.body,
                BUCKET_NAME: isUploadFile.BUCKET_NAME,
                KEY: isUploadFile.KEY
            }

            await updateOneBenefit(id, body);
            let updatedReward = await findOneBenefitVipCard(id);
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
            await updateOneBenefit(id, body);
            let updatedReward = await findOneBenefitVipCard(id);
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


async function deleteEmojiFile(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;
        const { KEY } = req.body;
        let find = await findOneBenefitVipCard(id) as any;
        const currentItems = find?.EMOJI_IMAGES.filter((data: any) => KEY !== data.KEY);
        let key = find?.EMOJI_IMAGES.filter((data: any) => KEY === data.KEY)
        if (key.length > 0) {
            // let deleteParams = {
            //     Bucket: process.env.BUCKET_NAME,
            //     Key: key[0]?.KEY
            // };
            // const deleteObjectCommand = new DeleteObjectCommand(deleteParams);
            // await s3Client.send(deleteObjectCommand);
            console.log("Object deleted successfully.");
        }

        console.log(currentItems)

        const body = {
            EMOJI_IMAGES: currentItems
        };

        await updateOneBenefit(id, body);
        let updatedReward = await findOneBenefitVipCard(id);
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

async function updateEmojiFile(req: Request, res: Response, next: NextFunction) {
    try {
        let isUploadFile = await uploadFile(req, res, next) as any;
        const { id } = req.params;
        if (isUploadFile.status) {
            const { KEY } = req.body;
            let find = await findOneBenefitVipCard(id) as any;
            let key = find?.EMOJI_IMAGES.filter((data: any) => KEY === data?.KEY) ?? [];
            if (key.length > 0) {
                // let deleteParams = {
                //     Bucket: process.env.BUCKET_NAME,
                //     Key: key[0]?.KEY
                // };
                // const deleteObjectCommand = new DeleteObjectCommand(deleteParams);
                // await s3Client.send(deleteObjectCommand);
                console.log("Object deleted successfully.");
            }
            const currentItems = find?.EMOJI_IMAGES.filter((data: any) => KEY !== data?.KEY) ?? [];
            const data = {
                FILE: isUploadFile.FILE,
                BUCKET_NAME: isUploadFile.BUCKET_NAME,
                KEY: isUploadFile.KEY
            }
            const getData = [...currentItems, data];
            const body = {
                EMOJI_IMAGES: getData
            };

            await updateOneBenefit(id, body);
            let updatedReward = await findOneBenefitVipCard(id);
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


async function addBenefit(req: Request, res: Response, next: NextFunction) {
    try {
        const isUploadFile = await uploadVipBenefit(req, res, next) as any;
        if (isUploadFile.status) {
            const { id } = req.params;
            const { TYPE } = req.body;
            let find = await getOneById(id) as any;
            if (!find) {
                return res
                    .status(400)
                    .json({ status: false, message: "Benefit is not exsits." });
            }
            if (find.BENEFITS.filter((data: any) => data.TYPE === TYPE).length) {
                console.log(find.BENEFITS.filter((data: any) => data.TYPE === TYPE).length)
                return res
                    .status(400)
                    .json({ status: false, message: "Benefit Type is exsits." });
            }

            const data = {
                BUCKET_NAME: isUploadFile.BENEFIT_IMAGE.BUCKET_NAME,
                KEY: isUploadFile.BENEFIT_IMAGE.KEY,
                EMOJI_IMAGES: isUploadFile.EMOJI_IMAGES.length > 0 ? isUploadFile.EMOJI_IMAGES : [],
                ...req.body,
                BENEFITS: id
            }

            let insert = await createVipBenefitService(data);
            console.log(insert);
            return res.json({ status: true, message: "Successfully Insert VIP Card Benefit." });

        } else {
            return res
                .status(400)
                .json({ message: "Benefit Image File is compulsory." });
        }

    } catch (error) {
        return res.json({ status: false, message: error?.message ?? "" });
    }
}

export { insert, list, getListForDashboard, allDataList, update, Delete, Get, addBenefit, GetBenefit, UpdateBenefit, deleteEmojiFile, updateEmojiFile };
