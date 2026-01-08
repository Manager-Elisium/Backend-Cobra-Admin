import multer from "multer";
import { Request, Response } from "express";
import util from "util";


const storage = multer.memoryStorage()
var multerFile = multer({ storage: storage });
// const multerFile = multer({ dest: "public/files" });
/**
 * Returns File name 
 * 
 * @description Upload Bundle for Paid (Admin) Customers
 * @returns File Name 
 * 
 */
async function uploadFile(req: Request, res: Response) {
    let filename:any;
    try {
        const upload = util.promisify(multerFile.single('FILE'));

        await upload(req, res);
        
        filename = req?.file;
        if (!!filename) {
            return {
                status: true,
                filename
            };
        } else {
            return {
                status: false,
                msg: "File must be required."
            };
        }
    } catch (e) {
        return {
            status: false,
            msg: "File must be required."
        };
    }
}

export { uploadFile,multerFile };