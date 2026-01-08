import { NextFunction } from "express";
import { Response, Request } from "express";
import { encrypt } from "src/common/encrypt";
import { ErrorCodeMap } from "src/common/error-type";
import {
    createSetting, paginationSettingService, updateSettingService, findOneSettingService, deleteSettingService, findSettingServiceByType
} from "src/services/setting.service";
const secretKey = process?.env?.SECRET_KEY ?? 'SWS0zf0thg8T5Gz3scOSQ2W4r6r7GJAg';
const secretKeyGamePlay = process?.env?.SECRET_KEY_GAME_PLAY ?? 'SM20zD0thg8T5Gz3scOSQ2W4r6r7GJqR';

async function insert(req: Request, res: Response, next: NextFunction) {
    try {
        let data = await createSetting(req.body);
        if (!data) {
            return res
                .status(ErrorCodeMap.FORM_VALIDATION_ERROR)
                .json({ message: "Setting Error." });
        }
        let encryptedData = encrypt(JSON.stringify(data), secretKey);
        return res.json({ status: true, data: await encryptedData, message: "Setting create successfully" });
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
        let data = await paginationSettingService(query);
        let encryptedData = encrypt(JSON.stringify(data), secretKey)

        return res.json({ status: true, data: await encryptedData, message: "Setting list" });
    } catch (error) {
        return res.json({ status: false, message: error?.message ?? "" });
    }
}

async function update(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;
        const updateSetting = await updateSettingService(id, req.body);
        let encryptedData = encrypt(JSON.stringify(updateSetting), secretKey)
        return res.json({
            status: true, data: await encryptedData, message: "Updated Data Sucessfully" // await encryptedData
        });
    } catch (error) {
        return res.json({ status: false, message: error?.message ?? "" });
    }
}

async function deleteSetting(req: Request, res: Response, next: NextFunction) {
    try {
        const { id: primaryId } = req.params;
        const deleteOne = await deleteSettingService(primaryId);
        let encryptedData = encrypt(JSON.stringify(primaryId), secretKey)
        return res.json({ status: true, id: await encryptedData, msg: "Setting deleted successfully" });
    } catch (error) {
        return res.json({ status: false, message: error?.message ?? "" });
    }
}


async function getSetting(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;
        let data = await findOneSettingService(id);
        if (!data) {
            return res
                .status(ErrorCodeMap.FORM_VALIDATION_ERROR)
                .json({ message: "Get Setting Error." });
        }
        let encryptedData = encrypt(JSON.stringify(data), secretKey);
        return res.json({ status: true, data: await encryptedData, message: "Get setting successfully" }); // : 
    } catch (error) {
        return res.json({ status: false, message: error?.message ?? "" });
    }
}

async function getDataByGame(req: Request, res: Response, next: NextFunction) {
    try {
        const { name: TYPE } = req.query;
        let settingDetail = await findSettingServiceByType(TYPE);
        if (!settingDetail) {
            return res
                .status(ErrorCodeMap.FORM_VALIDATION_ERROR)
                .json({ message: "Get Setting Error." });
        }
        return res.json(await encrypt(JSON.stringify({ status: true, message: "Get setting successfully", settingDetail }), secretKeyGamePlay));
    } catch (error) {
        return res.json(await encrypt(JSON.stringify({ status: false, message: error?.message ?? "" }), secretKeyGamePlay));
    }
}

export { insert, allDataList, update, deleteSetting, getSetting, getDataByGame };
