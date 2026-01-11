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
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDatabase = connectToDatabase;
const logger_1 = require("src/common/logger");
const ormconfig_1 = require("../lib/ormconfig");
function connectToDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let connection = yield ormconfig_1.AppDataSource.initialize();
            (0, logger_1.info)('Database Connection Established Successfully...', connection.isInitialized);
            return connection.isInitialized;
        }
        catch (errors) {
            (0, logger_1.error)('Failed to connect to database:', {
                message: errors instanceof Error ? errors.message : String(errors),
                stack: errors instanceof Error ? errors.stack : undefined
            });
            return false;
        }
    });
}
//# sourceMappingURL=postgres.js.map