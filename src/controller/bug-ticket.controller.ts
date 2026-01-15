import { NextFunction } from "express";
import { Response, Request } from "express";
import { encrypt } from "src/common/encrypt";
import { ErrorCodeMap } from "src/common/error-type";
import { createBugTicket, paginationBugTicket, getBugTicketService, updateBugTicketService, deleteBugTicketService } from "src/services/bug-ticket.service";

const secretKey = process?.env?.SECRET_KEY ?? 'SWS0zf0thg8T5Gz3scOSQ2W4r6r7GJAg';

async function insertBugTicket(req: Request, res: Response, next: NextFunction) {
    try {
        let data = await createBugTicket(req.body);
        if (!data) {
            return res
                .status(ErrorCodeMap.FORM_VALIDATION_ERROR)
                .json({ message: "Bug Ticket Error." });
        }
        let encryptedData = encrypt(JSON.stringify(data), secretKey)

        return res.json({ status: true, data: await encryptedData, message: "Bug Ticket created successfully" });
    } catch (error) {
        return res.json({ status: false, message: error?.message ?? "" });
    }
}

async function listBugTicket(req: Request, res: Response, next: NextFunction) {
    try {
        const { take, page } = req.query
        const query = {
            take: take || 10,
            page: page || 1
        }
        let data = await paginationBugTicket(query);
        let encryptedData = encrypt(JSON.stringify(data), secretKey)

        return res.json({ status: true, data: await encryptedData, message: "Bug Ticket list" });
    } catch (error) {
        return res.json({ status: false, message: error?.message ?? "" });
    }
}

async function getBugTicket(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;
        const query = {
            ID: id
        }
        let data = await getBugTicketService(query);
        let encryptedData = encrypt(JSON.stringify(data), secretKey)

        return res.json({ status: true, data: await encryptedData, message: "Get Bug Ticket" });
    } catch (error) {
        return res.json({ status: false, message: error?.message ?? "" });
    }
}

async function updateBugTicket(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;
        let data = await updateBugTicketService(id, req.body);
        let encryptedData = encrypt(JSON.stringify(data), secretKey)

        return res.json({ status: true, data: await encryptedData, message: "Bug Ticket updated successfully" });
    } catch (error) {
        return res.json({ status: false, message: error?.message ?? "" });
    }
}

async function deleteBugTicket(req: Request, res: Response, next: NextFunction) {
    try {
        const { id: primaryId } = req.params;
        await deleteBugTicketService(primaryId);
        let encryptedData = await encrypt(JSON.stringify(primaryId), secretKey)
        return res.json({ status: true, id: encryptedData, msg: "Bug Ticket deleted successfully" });
    } catch (error) {
        return res.json({ status: false, message: error?.message ?? "" });
    }
}

export { insertBugTicket, listBugTicket, getBugTicket, updateBugTicket, deleteBugTicket };
