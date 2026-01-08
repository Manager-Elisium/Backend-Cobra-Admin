import { NextFunction } from "express";
import { Response, Request } from "express";
import { encrypt } from "src/common/encrypt";
import { ErrorCodeMap } from "src/common/error-type";
import { uploadFile } from "src/common/upload";
import {
    createAchievementService, deleteAchievementService, findOneAchievementService, listAchievementService, paginationAchievementService, updateAchievementService
} from "src/services/achievement.service";
const secretKey = process?.env?.SECRET_KEY ?? 'SWS0zf0thg8T5Gz3scOSQ2W4r6r7GJAg';
const secretKeyGamePlay = process?.env?.SECRET_KEY_GAME_PLAY ?? 'SM20zD0thg8T5Gz3scOSQ2W4r6r7GJqR';


async function insert(req: Request, res: Response, next: NextFunction) {
    try {
        let isUploadFile = await uploadFile(req, res, next) as any;
        if (!isUploadFile.status) {
            return res
                .status(400)
                .json({ message: "Achievement file is compulsory.", status: false });
        }
        const reqBody = {
            ...req.body,
            BUCKET_NAME: isUploadFile?.BUCKET_NAME,
            KEY: isUploadFile?.KEY
        }
        let data = await createAchievementService(reqBody);
        if (!data) {
            return res
                .status(ErrorCodeMap.FORM_VALIDATION_ERROR)
                .json({ message: "Achievement Error.", status: false });
        }
        let encryptedData = encrypt(JSON.stringify(data), secretKey);
        return res.json({ status: true, data: await encryptedData, message: "Achievement create successfully" });
    } catch (error) {
        return res.json({ status: false, message: error?.message ?? "" });
    }
}


async function allDataList(req: Request, res: Response, next: NextFunction) {
    try {
        const { take, page } = req.query
        const query = {
            take: take || 10,
            page: page || 1
        }
        let data = await paginationAchievementService(query);
        let encryptedData = encrypt(JSON.stringify(data), secretKey);
        // return res.json({ status: true, data, message: "Achievement list" });
        return res.json({ status: true, data: await encryptedData, message: "Achievement list" });
    } catch (error) {
        return res.json({ status: false, message: error?.message ?? "" });
    }
}

async function deleteAchievement(req: Request, res: Response, next: NextFunction) {
    try {
        const { id: primaryId } = req.params;
        const deleteOne = await deleteAchievementService(primaryId);
        let encryptedData = encrypt(JSON.stringify(primaryId), secretKey)
        return res.json({ status: true, id: await encryptedData, msg: "Achievement deleted successfully" });
    } catch (error) {
        return res.json({ status: false, message: error?.message ?? "" });
    }
}


async function getAchievement(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;
        let data = await findOneAchievementService(id);
        if (!data) {
            return res
                .status(ErrorCodeMap.FORM_VALIDATION_ERROR)
                .json({ message: "Get Achievement Error." });
        }
        let encryptedData = encrypt(JSON.stringify(data), secretKey);
        return res.json({ status: true, data: await encryptedData, message: "Get Achievement successfully" }); // : 
    } catch (error) {
        return res.json({ status: false, message: error?.message ?? "" });
    }
}


async function update(req: Request, res: Response, next: NextFunction) {
    try {
        const fileupload = await uploadFile(req, res, next) as any;
        const { id } = req.params;
        if (fileupload.status) {
            req.body.BUCKET_NAME = fileupload.BUCKET_NAME;
            req.body.KEY = fileupload.KEY;
        }
        const updateAchievement = await updateAchievementService(id, req.body);
        let encryptedData = encrypt(JSON.stringify(updateAchievement), secretKey)
        return res.json({
            status: true, data: await encryptedData, message: "Updated Data Sucessfully" // await encryptedData
        });
    } catch (error) {
        return res.json({ status: false, message: error?.message ?? "" });
    }
}


async function listForUnity(req: Request, res: Response, next: NextFunction) {
    try {
        let data = await listAchievementService();
        // return res.json({ status: true, data, message: "Achievement list" });
        return res.json({ status: true, data, message: "Achievement list" });
    } catch (error) {
        return res.json({ status: false, message: error?.message ?? "" });
    }
}

export { insert, allDataList, deleteAchievement, getAchievement, update, listForUnity };
