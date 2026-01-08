import { NextFunction } from "express";
import { Response, Request } from "express";
import { encrypt } from "src/common/encrypt";
import { ErrorCodeMap } from "src/common/error-type";
import { createFaq, findFaq, findAllFaq, updateFaq, findOneFaq, deleteFaq } from "src/services/faq.service";
const secretKey = process?.env?.SECRET_KEY ?? 'SWS0zf0thg8T5Gz3scOSQ2W4r6r7GJAg';
const secretKeyGamePlay = process?.env?.SECRET_KEY_GAME_PLAY ?? 'SM20zD0thg8T5Gz3scOSQ2W4r6r7GJqR';

async function insert(req: Request, res: Response, next: NextFunction) {
    try {
        let data = await createFaq(req.body);
        if (!data) {
            return res
                .status(ErrorCodeMap.FORM_VALIDATION_ERROR)
                .json({ message: "Faq Error." });
        }
        let encryptedData = encrypt(JSON.stringify(data), secretKey)

        return res.json({ status: true, data: await encryptedData, message: "Faq create successfully" });
    } catch (error) {
        return res.json({ status: false, message: error?.message ?? "" });
    }
}

async function list(req: Request, res: Response, next: NextFunction) {
    try {
        let data = await findFaq();
        let encryptedData = encrypt(JSON.stringify(data), secretKeyGamePlay)

        return res.json({ status: true, data: await encryptedData });
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
        let data = await findAllFaq(query);
        let encryptedData = encrypt(JSON.stringify(data), secretKey)

        return res.json({ status: true, data: await encryptedData, message: "Faqs list" });
    } catch (error) {
        return res.json({ status: false, message: error?.message ?? "" });
    }
}

async function Delete(req: Request, res: Response, next: NextFunction) {
    try {
        const { id: primaryId } = req.params;
        await deleteFaq(primaryId);
        let encryptedData = encrypt(JSON.stringify(primaryId), secretKey)
        return res.json({ status: true, id: await encryptedData, msg: "deleted successfully" });
    } catch (error) {
        return res.json({ status: false, message: error?.message ?? "" });
    }
}

async function update(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;

        await updateFaq(id, req.body);
        let updatedFaq = await findOneFaq(id)
        let encryptedData = encrypt(JSON.stringify(updatedFaq), secretKey)
        return res.json({
            status: true, data: await encryptedData, message: "updated data sucessfully"
        });
    } catch (error) {
        return res.json({ status: false, message: error?.message ?? "" });
    }
}

export { insert, list, allDataList, update, Delete };
