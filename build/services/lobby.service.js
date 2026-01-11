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
exports.createLobby = createLobby;
exports.findLobby = findLobby;
exports.findAllLobby = findAllLobby;
exports.findOneLobby = findOneLobby;
exports.updateLobby = updateLobby;
exports.deleteLobby = deleteLobby;
exports.findLobbyNameService = findLobbyNameService;
exports.findLobbyForDashboardService = findLobbyForDashboardService;
const standard_error_1 = __importDefault(require("src/common/standard-error"));
const error_type_1 = require("src/common/error-type");
const lobby_repository_1 = require("src/repository/lobby.repository");
const upload_1 = require("src/common/upload");
function createLobby(lobby) {
    return __awaiter(this, void 0, void 0, function* () {
        const createOne = yield (0, lobby_repository_1.insertOne)(lobby);
        if (!createOne) {
            throw new standard_error_1.default(error_type_1.ErrorCodes.API_VALIDATION_ERROR, "Lobby create Error.");
        }
        return createOne;
    });
}
function findLobby() {
    return __awaiter(this, void 0, void 0, function* () {
        const [count, list] = yield Promise.all([(0, lobby_repository_1.getCount)(), (0, lobby_repository_1.findAll)()]);
        for (let index = 0; index < list.length; index++) {
            const getSignedUrl = list[index].FILE;
            const getBucketname = list[index].BUCKET_NAME;
            const getKey = list[index].KEY;
            const url = new URL(getSignedUrl);
            const expirationString = url.searchParams.get("expires");
            const currentTimestamp = Math.floor(Date.now() / 1000); // Convert to seconds
            if (!expirationString || parseInt(expirationString, 10) < currentTimestamp) {
                list[index].FILE = yield (0, upload_1.generatePermanentPresignedUrl)(getBucketname, getKey);
            }
        }
        return { count, list };
    });
}
function findLobbyForDashboardService() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        const list = yield (0, lobby_repository_1.findAll)();
        for (let mainIndex = 0; mainIndex < list.length; mainIndex++) {
            const mainUrl = yield (0, upload_1.generatePermanentPresignedUrl)((_a = list[mainIndex]) === null || _a === void 0 ? void 0 : _a.BUCKET_NAME, (_b = list[mainIndex]) === null || _b === void 0 ? void 0 : _b.KEY);
            list[mainIndex].FILE = mainUrl;
            delete list[mainIndex].UPDATED_DATE;
            delete list[mainIndex].DATA;
            delete list[mainIndex].CREATED_DATE;
            delete list[mainIndex].GAME;
            delete list[mainIndex].BUCKET_NAME;
            delete list[mainIndex].KEY;
        }
        return { list };
    });
}
function findAllLobby(query) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield (0, lobby_repository_1.findAllData)(query);
        if (!data) {
            throw new standard_error_1.default(error_type_1.ErrorCodes.API_VALIDATION_ERROR, "Lobby list Found Error.");
        }
        for (let index = 0; index < data.data.length; index++) {
            const getSignedUrl = data.data[index].FILE;
            const getBucketname = data.data[index].BUCKET_NAME;
            const getKey = data.data[index].KEY;
            const url = new URL(getSignedUrl);
            const expirationString = url.searchParams.get("expires");
            const currentTimestamp = Math.floor(Date.now() / 1000); // Convert to seconds
            if (!expirationString || parseInt(expirationString, 10) < currentTimestamp) {
                data.data[index].FILE = yield (0, upload_1.generatePermanentPresignedUrl)(getBucketname, getKey);
            }
        }
        return data;
    });
}
function findOneLobby(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const findLobby = yield (0, lobby_repository_1.getOneById)(id);
        if (!findLobby[0]) {
            throw new standard_error_1.default(error_type_1.ErrorCodes.NOT_FOUND, "Lobby is not found.");
        }
        return findLobby;
    });
}
function updateLobby(id, Lobby) {
    return __awaiter(this, void 0, void 0, function* () {
        let getLobby = yield (0, lobby_repository_1.getOneById)(id);
        if (!getLobby[0]) {
            throw new standard_error_1.default(error_type_1.ErrorCodes.NOT_FOUND, "Lobby is not found.");
        }
        const updateLobby = yield (0, lobby_repository_1.updateOne)(id, Lobby);
        return updateLobby;
    });
}
function deleteLobby(id) {
    return __awaiter(this, void 0, void 0, function* () {
        let getlobby = yield (0, lobby_repository_1.getOneById)(id);
        if (!getlobby) {
            throw new standard_error_1.default(error_type_1.ErrorCodes.NOT_FOUND, "Lobby is not found.");
        }
        const deletedata = yield (0, lobby_repository_1.deleteOne)(id);
        return deletedata;
    });
}
function findLobbyNameService() {
    return __awaiter(this, void 0, void 0, function* () {
        const list = yield (0, lobby_repository_1.findAll)();
        return list === null || list === void 0 ? void 0 : list.map((data) => ({ TASK_LOBBY_ID: data === null || data === void 0 ? void 0 : data.ID, NAME: data === null || data === void 0 ? void 0 : data.TITLE }));
    });
}
//# sourceMappingURL=lobby.service.js.map