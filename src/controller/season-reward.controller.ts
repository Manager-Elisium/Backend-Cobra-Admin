import { NextFunction } from "express";
import { Response, Request } from "express";
import { encrypt } from "src/common/encrypt";
import { ErrorCodeMap } from "src/common/error-type";
import { uploadFile, uploadSeasonRewardFile } from "src/common/upload";
import { SeasonReward } from "src/domain/season-reward.entity";
import { updateAndReturnByIdSeasonReward } from "src/repository/season-reward.repository";
import { createSeasonRewardService, createSeasonService, deleteSeasonRewardItemService, deleteSeasonRewardService, getSeasonRewardService, getSeasonService, paginateSeasonRewardService, paginateSeasonService, updateSeasonRewardService, updateSeasonService } from "src/services/season.service";

const secretKey = process?.env?.SECRET_KEY ?? 'SWS0zf0thg8T5Gz3scOSQ2W4r6r7GJAg';
const secretKeyGamePlay = process?.env?.SECRET_KEY_GAME_PLAY ?? 'SM20zD0thg8T5Gz3scOSQ2W4r6r7GJqR';


async function allSeasonReward(req: Request, res: Response, next: NextFunction) {
    try {
        const { take, page, seasonId } = req.query;
        const query = { take: take || 10, page: page || 1, seasonId };
        let data = await paginateSeasonRewardService(query);
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


async function insertSeasonReward(req: Request, res: Response, next: NextFunction) {
    try {
        const fileupload = await uploadSeasonRewardFile(req, res, next) as any;
        if (!fileupload.status) {
            return res.status(ErrorCodeMap.API_VALIDATION_ERROR)
                .json({ status: false, message: "File field is required" });
        }
        const { seasonId } = req.query;
        const reqBody = {
            ...req.body,
            BUCKET_NAME: fileupload.BUCKET_NAME,
            KEY: fileupload.KEY,
            EMOJI_IMAGES: fileupload.ITEM_IMAGES,
            REWARDS: seasonId
        }
        let data = await createSeasonRewardService(reqBody);
        let encryptedData = await encrypt(JSON.stringify(data), secretKey)
        return res.json({ status: true, data: encryptedData, message: "Season Reward create successfully" });
    } catch (error) {
        return res.json({ status: false, message: error?.message ?? "" });
    }
}



async function getSeasonReward(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;
        const query = { ID: id }
        let data = await getSeasonRewardService(query);
        let encryptedData = await encrypt(JSON.stringify(data), secretKey);
        return res.json({ status: true, data: encryptedData, message: "Get Season Reward" });
    } catch (error) {
        return res.json({ status: false, message: error?.message ?? "" });
    }
}



async function deleteSeasonReward(req: Request, res: Response, next: NextFunction) {
    try {
        const { id: primaryId } = req.params;
        const deleteOne = await deleteSeasonRewardService(primaryId);
        let encryptedData = await encrypt(JSON.stringify(primaryId), secretKey)
        return res.json({ status: true, id: encryptedData, msg: "Season deleted successfully" });
    } catch (error) {
        return res.json({ status: false, message: error?.message ?? "" });
    }
}

async function updateSeasonReward(req: Request, res: Response, next: NextFunction) {
    try {
        let isUploadFile = await uploadFile(req, res, next) as any;
        const { id } = req.params;
        if (isUploadFile.status) {
            const reqBody = {
                ...req.body, BUCKET_NAME: isUploadFile.BUCKET_NAME,
                KEY: isUploadFile.KEY, IS_NEW: true
            };
            let updatedSeason = await updateSeasonRewardService(id, reqBody);
            let encryptedData = await encrypt(JSON.stringify(updatedSeason), secretKey);
            return res.json({
                status: true,
                data: encryptedData,
                message: "updated data sucessfully",
            });
        } else {
            const reqBody = { ...req.body, IS_NEW: false };
            let updatedSeason = await updateSeasonRewardService(id, reqBody);
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


async function deleteSeasonRewardItemFile(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;
        let deleteSeasonRewardItem = await deleteSeasonRewardItemService(id, req.body);
        let encryptedData = await encrypt(JSON.stringify(deleteSeasonRewardItem), secretKey);
        return res.json({
            status: true,
            data: encryptedData,
            message: "delete data sucessfully",
        });
    } catch (error) {
        return res.json({ status: false, message: error?.message ?? "" });
    }

}


async function updateSeasonRewardItemFile(req: Request, res: Response, next: NextFunction) {
    try {
        let isUploadFile = await uploadFile(req, res, next) as any;
        const { id } = req.params;
        if (!isUploadFile?.status) {
            return res
                .status(400)
                .json({ status: false, message: "Season Reward file is compulsory." });
        }
        let deleteSeasonRewardItem = await deleteSeasonRewardItemService(id, req.body)
        const currentItems = deleteSeasonRewardItem?.EMOJI_IMAGES ?? [];
        const data = {   
            BUCKET_NAME: isUploadFile.BUCKET_NAME,
            KEY: isUploadFile.KEY
        }
        const getData = [...currentItems, data];
        const body = {
            EMOJI_IMAGES: getData
        } as SeasonReward;
        let updatedSeasonReward = await updateAndReturnByIdSeasonReward(id, body);
        let encryptedData = encrypt(JSON.stringify(updatedSeasonReward?.raw?.[0]), secretKey);
        return res.json({
            status: true,
            data: await encryptedData,
            message: "update data sucessfully",
        });
    } catch (error) {
        return res.json({ status: false, message: error?.message ?? "" });
    }
}

export { insertSeasonReward, getSeasonReward, updateSeasonReward, allSeasonReward, deleteSeasonRewardItemFile, updateSeasonRewardItemFile, deleteSeasonReward };