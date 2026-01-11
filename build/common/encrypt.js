"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.encrypt = encrypt;
exports.decrypt = decrypt;
const crypto = __importStar(require("crypto"));
const standard_error_1 = __importDefault(require("./standard-error"));
const error_type_1 = require("./error-type");
const logger_1 = require("./logger");
const algorithm = 'aes-256-cbc';
const iv = crypto.randomBytes(16);
function encrypt(text, secretKey) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            (0, logger_1.info)(`******************************************`);
            (0, logger_1.success)(`Response : ${text}`);
            const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
            const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
            return {
                public_key: iv.toString('hex'),
                content: encrypted.toString('hex')
            };
        }
        catch (error) {
            throw new standard_error_1.default(error_type_1.ErrorCodes.FORM_VALIDATION_ERROR, "Don't try to hack. It's impossible.");
        }
    });
}
function decrypt(data, secretKey) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { public_key, content } = data;
            const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(public_key, 'hex'));
            const decrpyted = Buffer.concat([decipher.update(Buffer.from(content, 'hex')), decipher.final()]);
            (0, logger_1.info)(`******************************************`);
            (0, logger_1.error)(`Request : ${decrpyted.toString()}`);
            return decrpyted.toString();
        }
        catch (error) {
            throw new standard_error_1.default(error_type_1.ErrorCodes.FORM_VALIDATION_ERROR, "Don't try to hack. It's impossible.");
        }
    });
}
// console.log(decrypt({
//     "public_key": "4f28a17675b640b84c732aa77c08624d",
//     "content": "0e186adfc9e26790fce9119a0a29727cb576d92745ca66d3447a990a18a076e7cc616aea0f708c743da3aa1a638fb57350dfef17076b77ab106586c47735a68853c56c1bbf3a49768f144ef627ba0ffbff24d490dc27e1d8ab722e11cd303632"
// }, "SWS0zf0thg8T5Gz3scOSQ2W4r6r7GJAg"))
//# sourceMappingURL=encrypt.js.map