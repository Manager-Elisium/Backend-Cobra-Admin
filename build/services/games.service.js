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
exports.createGame = createGame;
exports.findGame = findGame;
exports.findAllGame = findAllGame;
exports.updateGame = updateGame;
exports.findOneGame = findOneGame;
exports.deleteGame = deleteGame;
const standard_error_1 = __importDefault(require("src/common/standard-error"));
const error_type_1 = require("src/common/error-type");
const games_repository_1 = require("src/repository/games.repository");
function createGame(multiGames) {
    return __awaiter(this, void 0, void 0, function* () {
        const createOne = yield (0, games_repository_1.insertOne)(multiGames);
        if (!createOne) {
            throw new standard_error_1.default(error_type_1.ErrorCodes.API_VALIDATION_ERROR, "Game create Error.");
        }
        return createOne;
    });
}
function findGame() {
    return __awaiter(this, void 0, void 0, function* () {
        const [count, list] = yield Promise.all([(0, games_repository_1.getCount)(), (0, games_repository_1.findAll)()]);
        return { count, list };
    });
}
function findAllGame(query) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield (0, games_repository_1.findAllData)(query);
        if (!data) {
            throw new standard_error_1.default(error_type_1.ErrorCodes.API_VALIDATION_ERROR, "Game list Found Error.");
        }
        return data;
    });
}
function findOneGame(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const findGame = yield (0, games_repository_1.getOneById)(id);
        if (!findGame[0]) {
            throw new standard_error_1.default(error_type_1.ErrorCodes.NOT_FOUND, "Game is not found.");
        }
        return findGame;
    });
}
function deleteGame(id) {
    return __awaiter(this, void 0, void 0, function* () {
        let getgame = yield (0, games_repository_1.getOneById)(id);
        if (!getgame[0]) {
            throw new standard_error_1.default(error_type_1.ErrorCodes.NOT_FOUND, "Game is not found.");
        }
        const deletedata = yield (0, games_repository_1.deleteOne)(id);
        return deletedata;
    });
}
function updateGame(id, multiGames) {
    return __awaiter(this, void 0, void 0, function* () {
        let getgame = yield (0, games_repository_1.getOneById)(id);
        if (!getgame[0]) {
            throw new standard_error_1.default(error_type_1.ErrorCodes.NOT_FOUND, "Game is not found.");
        }
        let updateGame = yield (0, games_repository_1.updateOne)(id, multiGames);
        return updateGame;
    });
}
//# sourceMappingURL=games.service.js.map