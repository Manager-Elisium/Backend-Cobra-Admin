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
exports.createSeasonService = createSeasonService;
exports.getSeasonService = getSeasonService;
exports.paginateSeasonService = paginateSeasonService;
exports.updateSeasonService = updateSeasonService;
exports.deleteSeasonService = deleteSeasonService;
exports.paginateSeasonRewardService = paginateSeasonRewardService;
exports.createSeasonRewardService = createSeasonRewardService;
exports.getSeasonRewardService = getSeasonRewardService;
exports.updateSeasonRewardService = updateSeasonRewardService;
exports.deleteSeasonRewardItemService = deleteSeasonRewardItemService;
exports.deleteSeasonRewardService = deleteSeasonRewardService;
exports.getSeasonWithRewardService = getSeasonWithRewardService;
const standard_error_1 = __importDefault(require("src/common/standard-error"));
const error_type_1 = require("src/common/error-type");
const season_repository_1 = require("src/repository/season.repository");
const season_entity_1 = require("src/domain/season.entity");
const upload_1 = require("src/common/upload");
const season_reward_repository_1 = require("src/repository/season-reward.repository");
const moment_1 = __importDefault(require("moment"));
function createSeasonService(season) {
    return __awaiter(this, void 0, void 0, function* () {
        let startDate = (0, moment_1.default)(season === null || season === void 0 ? void 0 : season.START_DATE).startOf('day').add(1, 'minute');
        // let endDate = moment(season?.END_DATE).endOf('day');
        // if (!moment(endDate).isAfter(startDate)) {
        //     throw new StandardError(
        //         ErrorCodes.API_VALIDATION_ERROR,
        //         "End Date is greater than start date."
        //     );
        // }
        let getDate = yield (0, season_repository_1.maximumDate)();
        // console.log(moment(season?.START_DATE).startOf('month'))
        // console.log(moment(season?.END_DATE).endOf('month'))
        if ((0, moment_1.default)(startDate).diff((0, moment_1.default)(getDate === null || getDate === void 0 ? void 0 : getDate.maxDate).endOf('day'), 'seconds') < 0) {
            throw new standard_error_1.default(error_type_1.ErrorCodes.API_VALIDATION_ERROR, "New Season Start Date must be greater than previous sesason end date.");
        }
        // season.START_DATE = moment(season?.START_DATE).startOf('month').toDate();
        // season.END_DATE = moment(season?.END_DATE).endOf('month').toDate();
        const createSeason = new season_entity_1.Season();
        createSeason.END_DATE = new Date((0, moment_1.default)(season === null || season === void 0 ? void 0 : season.START_DATE).endOf('month').format('YYYY-MM-DD HH:mm:ssZ'));
        createSeason.START_DATE = new Date((0, moment_1.default)(season === null || season === void 0 ? void 0 : season.START_DATE).startOf('month').format('YYYY-MM-DD HH:mm:ssZ'));
        createSeason.BUCKET_NAME = season.BUCKET_NAME;
        createSeason.KEY = season.KEY;
        createSeason.TITLE = season.TITLE;
        let createOne = yield createSeason.save();
        // const createOne = await insertOne({ ...season } as Season);
        if (!createOne) {
            throw new standard_error_1.default(error_type_1.ErrorCodes.API_VALIDATION_ERROR, "Season create Error.");
        }
        return createOne;
    });
}
function getSeasonService(query) {
    return __awaiter(this, void 0, void 0, function* () {
        const createQuery = {
            where: {
                ID: query.ID
            }
        };
        const data = yield (0, season_repository_1.getOneById)(createQuery);
        if (!data) {
            throw new standard_error_1.default(error_type_1.ErrorCodes.API_VALIDATION_ERROR, "Season Found Error.");
        }
        if (!!data.KEY && !!data.BUCKET_NAME) {
            data.FILE = yield (0, upload_1.generatePermanentPresignedUrl)(data.BUCKET_NAME, data.KEY);
        }
        return data;
    });
}
function paginateSeasonService(query) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const listQuery = {
            order: { CREATED_DATE: 'DESC' },
            take: query.take,
            skip: (query.page - 1) * query.take,
            where: { IS_DELETED: false }
        };
        const data = yield (0, season_repository_1.findAll)(listQuery);
        if (!data) {
            throw new standard_error_1.default(error_type_1.ErrorCodes.API_VALIDATION_ERROR, "Season Found Error.");
        }
        const list = (_a = data === null || data === void 0 ? void 0 : data[0]) !== null && _a !== void 0 ? _a : [];
        for (let index = 0; index < list.length; index++) {
            const bucketName = list[index].BUCKET_NAME;
            const key = list[index].KEY;
            if (!!key && !!bucketName) {
                const mainUrl = yield (0, upload_1.generatePermanentPresignedUrl)(bucketName, key);
                list[index].FILE = mainUrl;
            }
        }
        return { data: list, count: data === null || data === void 0 ? void 0 : data[1] };
    });
}
function updateSeasonService(id, query) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        if (query.IS_NEW) {
            const createQuery = {
                where: {
                    ID: id
                }
            };
            const data = yield (0, season_repository_1.getOneById)(createQuery);
            if (!data) {
                throw new standard_error_1.default(error_type_1.ErrorCodes.API_VALIDATION_ERROR, "Season Found Error.");
            }
            // if (!!data.KEY && !!data.BUCKET_NAME) {
            //     await deleteFile(data.BUCKET_NAME, data.KEY);
            // }
        }
        delete query.IS_NEW;
        delete query.END_DATE;
        delete query.START_DATE;
        const update = yield (0, season_repository_1.updateAndReturnById)(id, query);
        return (_a = update === null || update === void 0 ? void 0 : update.raw) === null || _a === void 0 ? void 0 : _a[0];
    });
}
function deleteSeasonService(id) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            let deleteSetting = yield (0, season_repository_1.updateAndReturnById)(id, { IS_DELETED: true });
            if (!(deleteSetting === null || deleteSetting === void 0 ? void 0 : deleteSetting.affected)) {
                throw new standard_error_1.default(error_type_1.ErrorCodes.NOT_FOUND, "Season is not found.");
            }
            return (_a = deleteSetting === null || deleteSetting === void 0 ? void 0 : deleteSetting.raw) === null || _a === void 0 ? void 0 : _a[0];
        }
        catch (error) {
            throw new standard_error_1.default(error_type_1.ErrorCodes.NOT_FOUND, "Season is not found.");
        }
    });
}
function paginateSeasonRewardService(query) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const listQuery = {
            where: [
                { REWARDS: { ID: query.seasonId }, IS_DELETED: false }
            ],
            order: { CREATED_DATE: 'DESC' },
            take: query.take,
            skip: (query.page - 1) * query.take
        };
        const data = yield (0, season_reward_repository_1.findAllSeasonReward)(listQuery);
        if (!data) {
            throw new standard_error_1.default(error_type_1.ErrorCodes.API_VALIDATION_ERROR, "Season Reward Found Error.");
        }
        const list = (_a = data === null || data === void 0 ? void 0 : data[0]) !== null && _a !== void 0 ? _a : [];
        for (let index = 0; index < list.length; index++) {
            const bucketName = list[index].BUCKET_NAME;
            const key = list[index].KEY;
            if (!!key && !!bucketName) {
                const mainUrl = yield (0, upload_1.generatePermanentPresignedUrl)(bucketName, key);
                list[index].FILE = mainUrl;
            }
        }
        return { data: list, count: data === null || data === void 0 ? void 0 : data[1] };
    });
}
function createSeasonRewardService(seasonReward) {
    return __awaiter(this, void 0, void 0, function* () {
        const { LEVEL, REWARDS } = seasonReward;
        const query = {
            LEVEL,
            IS_DELETED: false,
            REWARDS
        };
        const countSeason = yield (0, season_reward_repository_1.countSeasonRewardIsPresentOrNot)(query);
        if (countSeason) {
            throw new standard_error_1.default(error_type_1.ErrorCodes.API_VALIDATION_ERROR, "Season Reward level exists.");
        }
        const createOne = yield (0, season_reward_repository_1.insertOneSeasonReward)(Object.assign({}, seasonReward));
        if (!createOne) {
            throw new standard_error_1.default(error_type_1.ErrorCodes.API_VALIDATION_ERROR, "Season Reward create Error.");
        }
        return createOne;
    });
}
function getSeasonRewardService(query) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const getQuery = {
            where: {
                ID: query.ID
            }
        };
        const data = yield (0, season_reward_repository_1.getOneByIdSeasonReward)(getQuery);
        if (!data) {
            throw new standard_error_1.default(error_type_1.ErrorCodes.API_VALIDATION_ERROR, "Season Reward Found Error.");
        }
        if (!!data.KEY && !!data.BUCKET_NAME) {
            data.FILE = yield (0, upload_1.generatePermanentPresignedUrl)(data.BUCKET_NAME, data.KEY);
            const itemImages = (_a = data === null || data === void 0 ? void 0 : data.EMOJI_IMAGES) !== null && _a !== void 0 ? _a : 0;
            for (let index = 0; index < itemImages.length; index++) {
                const bucketName = itemImages[index].BUCKET_NAME;
                const key = itemImages[index].KEY;
                const benefitsUrl = yield (0, upload_1.generatePermanentPresignedUrl)(bucketName, key);
                itemImages[index].FILE = benefitsUrl;
            }
        }
        return data;
    });
}
function updateSeasonRewardService(id, query) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        if (query.IS_NEW) {
            const createQuery = {
                where: {
                    ID: id
                }
            };
            const data = yield (0, season_reward_repository_1.getOneByIdSeasonReward)(createQuery);
            if (!data) {
                throw new standard_error_1.default(error_type_1.ErrorCodes.API_VALIDATION_ERROR, "Season Reward Found Error.");
            }
            // if (!!data.KEY && !!data.BUCKET_NAME) {
            //     await deleteFile(data.BUCKET_NAME, data.KEY);
            // }
        }
        delete query.IS_NEW;
        const update = yield (0, season_reward_repository_1.updateAndReturnByIdSeasonReward)(id, query);
        return (_a = update === null || update === void 0 ? void 0 : update.raw) === null || _a === void 0 ? void 0 : _a[0];
    });
}
function deleteSeasonRewardItemService(id, query) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const { KEY } = query;
        const getRewardQuery = {
            where: {
                ID: id
            }
        };
        const data = yield (0, season_reward_repository_1.getOneByIdSeasonReward)(getRewardQuery);
        if (!data) {
            throw new standard_error_1.default(error_type_1.ErrorCodes.API_VALIDATION_ERROR, "Season Reward Found Error.");
        }
        // const itemImages: any = data?.EMOJI_IMAGES ?? 0;
        // for (let index = 0; index < itemImages.length; index++) {
        //     const bucketName = itemImages[index]?.BUCKET_NAME;
        //     const key = itemImages[index]?.KEY;
        //     if (key === KEY) {
        //         await deleteFile(bucketName, key);
        //         break;
        //     }
        // }
        const currentItems = data === null || data === void 0 ? void 0 : data.EMOJI_IMAGES.filter((data) => KEY !== data.KEY);
        const updateData = {
            EMOJI_IMAGES: currentItems
        };
        const update = yield (0, season_reward_repository_1.updateAndReturnByIdSeasonReward)(id, updateData);
        return (_a = update === null || update === void 0 ? void 0 : update.raw) === null || _a === void 0 ? void 0 : _a[0];
    });
}
function deleteSeasonRewardService(id) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            let deleteSetting = yield (0, season_reward_repository_1.updateAndReturnByIdSeasonReward)(id, { IS_DELETED: true });
            if (!(deleteSetting === null || deleteSetting === void 0 ? void 0 : deleteSetting.affected)) {
                throw new standard_error_1.default(error_type_1.ErrorCodes.NOT_FOUND, "Season Reward is not found.");
            }
            return (_a = deleteSetting === null || deleteSetting === void 0 ? void 0 : deleteSetting.raw) === null || _a === void 0 ? void 0 : _a[0];
        }
        catch (error) {
            throw new standard_error_1.default(error_type_1.ErrorCodes.NOT_FOUND, "Season Reward is not found.");
        }
    });
}
function getSeasonWithRewardService() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const createQuery = {
            startDate: (0, moment_1.default)().startOf('M').format('YYYY-MM-DD 00:00:00+00'),
            endDate: (0, moment_1.default)().endOf('M').format('YYYY-MM-DD 23:59:59+00')
        };
        const data = yield (0, season_repository_1.currentReward)(createQuery);
        if (!data) {
            throw new standard_error_1.default(error_type_1.ErrorCodes.API_VALIDATION_ERROR, "Season Found Error.");
        }
        if (!data.IS_ACTIVE) {
            const updateBool = {
                IS_ACTIVE: true,
                IS_UPCOMING: false,
                IS_COMPLETE: false
            };
            yield (0, season_repository_1.updateAndReturnById)(data.ID, updateBool);
        }
        if (!!data.KEY && !!data.BUCKET_NAME) {
            data.FILE = yield (0, upload_1.generatePermanentPresignedUrl)(data.BUCKET_NAME, data.KEY);
            for (let index = 0; index < ((_a = data === null || data === void 0 ? void 0 : data.REWARDS) === null || _a === void 0 ? void 0 : _a.length); index++) {
                data.REWARDS[index].FILE = yield (0, upload_1.generatePermanentPresignedUrl)(data.REWARDS[index].BUCKET_NAME, data.REWARDS[index].KEY);
            }
        }
        return data;
    });
}
//# sourceMappingURL=season.service.js.map