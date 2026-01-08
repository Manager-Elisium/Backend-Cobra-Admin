import { NextFunction } from "express";
import { Response, Request } from "express";
import { encrypt } from "src/common/encrypt";
import { ErrorCodeMap } from "src/common/error-type";
import { uploadFile } from "src/common/upload";
import { createNotification, paginationNotification, getNotificationService, deleteNotificationService } from "src/services/notification.service";

const secretKey = process?.env?.SECRET_KEY ?? 'SWS0zf0thg8T5Gz3scOSQ2W4r6r7GJAg';
const secretKeyGamePlay = process?.env?.SECRET_KEY_GAME_PLAY ?? 'SM20zD0thg8T5Gz3scOSQ2W4r6r7GJqR';

async function insertNotification(req: Request, res: Response, next: NextFunction) {
    try {
        const fileupload = await uploadFile(req, res, next) as any;
        if (fileupload.status) {
            req.body.BUCKET_NAME = fileupload.BUCKET_NAME;
            req.body.KEY = fileupload.KEY;
        }
        let data = await createNotification(req.body);
        if (!data) {
            return res
                .status(ErrorCodeMap.FORM_VALIDATION_ERROR)
                .json({ message: "Notification Error." });
        }
        let encryptedData = encrypt(JSON.stringify(data), secretKey)

        return res.json({ status: true, data: await encryptedData, message: "Notification send successfully" });
    } catch (error) {
        return res.json({ status: false, message: error?.message ?? "" });
    }
}

async function listNotification(req: Request, res: Response, next: NextFunction) {
    try {
        const { take, page } = req.query
        const query = {
            take: take || 10,
            page: page || 1
        }
        let data = await paginationNotification(query);
        let encryptedData = encrypt(JSON.stringify(data), secretKey)

        return res.json({ status: true, data: await encryptedData, message: "Notification list" });
    } catch (error) {
        return res.json({ status: false, message: error?.message ?? "" });
    }
}

async function getNotification(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;
        const query = {
            ID: id
        }
        let data = await getNotificationService(query);
        let encryptedData = encrypt(JSON.stringify(data), secretKey)

        return res.json({ status: true, data: await encryptedData, message: "Get Notification" });
    } catch (error) {
        return res.json({ status: false, message: error?.message ?? "" });
    }
}



async function deleteNotification(req: Request, res: Response, next: NextFunction) {
    try {
        const { id: primaryId } = req.params;
        const deleteOne = await deleteNotificationService(primaryId);
        let encryptedData = await encrypt(JSON.stringify(primaryId), secretKey)
        return res.json({ status: true, id: encryptedData, msg: "Notification deleted successfully" });
    } catch (error) {
        return res.json({ status: false, message: error?.message ?? "" });
    }
}


export { insertNotification, listNotification, getNotification, deleteNotification };