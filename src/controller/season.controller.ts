import { NextFunction } from "express";
import { Response, Request } from "express";
import { encrypt } from "src/common/encrypt";
import { ErrorCodeMap } from "src/common/error-type";
import { uploadFile } from "src/common/upload";
import { createSeasonService, deleteSeasonService, getSeasonService, getSeasonWithRewardService, paginateSeasonService, updateSeasonService } from "src/services/season.service";

const secretKey = process?.env?.SECRET_KEY ?? 'SWS0zf0thg8T5Gz3scOSQ2W4r6r7GJAg';
const secretKeyGamePlay = process?.env?.SECRET_KEY_GAME_PLAY ?? 'SM20zD0thg8T5Gz3scOSQ2W4r6r7GJqR';

async function insert(req: Request, res: Response, next: NextFunction) {
    try {
        const fileupload = await uploadFile(req, res, next) as any;
        if (!fileupload.status) {
            return res.status(ErrorCodeMap.API_VALIDATION_ERROR)
                .json({ status: false, message: "File field is required" });
        }
        const reqBody = {
            ...req.body,
            BUCKET_NAME: fileupload.BUCKET_NAME,
            KEY: fileupload.KEY
        }
        let data = await createSeasonService(reqBody);
        let encryptedData = await encrypt(JSON.stringify(data), secretKey)
        return res.json({ status: true, data: encryptedData, message: "Season create successfully" });
    } catch (error) {
        return res.json({ status: false, message: error?.message ?? "" });
    }
}


async function getSeason(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;
        const query = { ID: id }
        let data = await getSeasonService(query);
        let encryptedData = await encrypt(JSON.stringify(data), secretKey);
        return res.json({ status: true, data: encryptedData, message: "Get Season" });
    } catch (error) {
        return res.json({ status: false, message: error?.message ?? "" });
    }
}


async function deleteSeason(req: Request, res: Response, next: NextFunction) {
    try {
        const { id: primaryId } = req.params;
        const deleteOne = await deleteSeasonService(primaryId);
        let encryptedData = await encrypt(JSON.stringify(primaryId), secretKey)
        return res.json({ status: true, id: encryptedData, msg: "Season deleted successfully" });
    } catch (error) {
        return res.json({ status: false, message: error?.message ?? "" });
    }
}

async function allSeason(req: Request, res: Response, next: NextFunction) {
    try {
        const { take, page } = req.query;
        const query = { take: take || 10, page: page || 1 };
        let data = await paginateSeasonService(query);
        let encryptedData = await encrypt(JSON.stringify(data), secretKey);
        return res.json({
            status: true,
            data: encryptedData,
            message: "Season list"
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
            const reqBody = {
                ...req.body, BUCKET_NAME: isUploadFile.BUCKET_NAME,
                KEY: isUploadFile.KEY, IS_NEW: true
            };
            let updatedSeason = await updateSeasonService(id, reqBody);
            let encryptedData = await encrypt(JSON.stringify(updatedSeason), secretKey);
            return res.json({
                status: true,
                data: encryptedData,
                message: "updated data sucessfully",
            });
        } else {
            const reqBody = { ...req.body, IS_NEW: false };
            let updatedSeason = await updateSeasonService(id, reqBody);
            let encryptedData = await encrypt(JSON.stringify(updatedSeason), secretKey);
            return res.json({
                status: true,
                data: encryptedData,
                message: "updated data sucessfully",
            });
        }
    } catch (error) {
        return res.json({ status: false, message: error?.message ?? "" });
    }
}



async function getSeasonWithReward(req: Request, res: Response, next: NextFunction) {
    try {
        let data = await getSeasonWithRewardService();
        return res.json({ status: true, data, message: "Get Season" });
    } catch (error) {
        return res.json({ status: false, message: error?.message ?? "" });
    }
}


export { insert, getSeason, allSeason, update, getSeasonWithReward, deleteSeason };