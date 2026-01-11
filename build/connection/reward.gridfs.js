"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.multerFile = void 0;
exports.uploadFile = uploadFile;
const multer_1 = __importDefault(require("multer"));
const util_1 = __importDefault(require("util"));
const storage = multer_1.default.memoryStorage();
var multerFile = (0, multer_1.default)({ storage: storage });
exports.multerFile = multerFile;
// const multerFile = multer({ dest: "public/files" });
/**
 * Returns File name
 *
 * @description Upload Bundle for Paid (Admin) Customers
 * @returns File Name
 *
 */
function uploadFile(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let filename;
        try {
            const upload = util_1.default.promisify(multerFile.single('FILE'));
            yield upload(req, res);
            filename = req === null || req === void 0 ? void 0 : req.file;
            if (!!filename) {
                return {
                    status: true,
                    filename
                };
            }
            else {
                return {
                    status: false,
                    msg: "File must be required."
                };
            }
        }
        catch (e) {
            return {
                status: false,
                msg: "File must be required."
            };
        }
    });
}
//# sourceMappingURL=reward.gridfs.js.map