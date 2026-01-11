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
exports.signAccessToken = signAccessToken;
exports.verifyAccessToken = verifyAccessToken;
const jsonwebtoken_1 = __importStar(require("jsonwebtoken"));
const standard_error_1 = __importDefault(require("./../common/standard-error"));
const error_type_1 = require("./../common/error-type");
function signAccessToken(data) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const payload = Object.assign({}, data);
        const secret = (_a = process.env.AUTH_KEY) !== null && _a !== void 0 ? _a : "";
        const options = {
            expiresIn: "700d",
            issuer: "cobra.user.com",
            audience: JSON.stringify(payload)
        };
        let getToken = yield jsonwebtoken_1.default.sign(payload, secret, options);
        if (!getToken) {
            throw new standard_error_1.default(error_type_1.ErrorCodes.INVALID_AUTH, "Invalid Login.");
        }
        return getToken;
    });
}
function verifyAccessToken(request, response, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        if (!(request === null || request === void 0 ? void 0 : request.headers["authorization"])) {
            return response
                .status(error_type_1.ErrorCodeMap.INVALID_AUTH)
                .json({ message: "Invalid Authorization." });
        }
        const authHeader = (_a = request === null || request === void 0 ? void 0 : request.headers["authorization"]) === null || _a === void 0 ? void 0 : _a.split(" ");
        if (!authHeader[1]) {
            return response
                .status(error_type_1.ErrorCodeMap.INVALID_AUTH)
                .json({ message: "Invalid Authorization." });
        }
        return new Promise((resolve, reject) => {
            var _a;
            (0, jsonwebtoken_1.verify)(authHeader[1], (_a = process.env.AUTH_KEY) !== null && _a !== void 0 ? _a : "", (error, decoded) => {
                if (error) {
                    return response
                        .status(error_type_1.ErrorCodeMap.INVALID_AUTH)
                        .json({ message: error });
                }
                else {
                    // request.body.token = JSON.parse(JSON.stringify(decoded));
                    next();
                }
            });
        });
    });
}
//# sourceMappingURL=auth.token.js.map