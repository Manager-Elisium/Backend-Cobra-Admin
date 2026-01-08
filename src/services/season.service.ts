import StandardError from 'src/common/standard-error';
import { ErrorCodes } from 'src/common/error-type';
import { getOneById, findAll, updateAndReturnById, currentReward, maximumDate } from 'src/repository/season.repository';
import { Season } from 'src/domain/season.entity';
import { deleteFile, generatePermanentPresignedUrl } from 'src/common/upload';
import { countSeasonReward, countSeasonRewardIsPresentOrNot, findAllSeasonReward, getOneByIdSeasonReward, insertOneSeasonReward, updateAndReturnByIdSeasonReward } from 'src/repository/season-reward.repository';
import { SeasonReward } from 'src/domain/season-reward.entity';
import moment from 'moment';

async function createSeasonService(season: Season): Promise<Season | any> {
    let startDate = moment(season?.START_DATE).startOf('day').add(1, 'minute');
    // let endDate = moment(season?.END_DATE).endOf('day');
    // if (!moment(endDate).isAfter(startDate)) {
    //     throw new StandardError(
    //         ErrorCodes.API_VALIDATION_ERROR,
    //         "End Date is greater than start date."
    //     );
    // }
    let getDate = await maximumDate();
    // console.log(moment(season?.START_DATE).startOf('month'))
    // console.log(moment(season?.END_DATE).endOf('month'))

    if (moment(startDate).diff(moment(getDate?.maxDate).endOf('day'), 'seconds') < 0) {
        throw new StandardError(
            ErrorCodes.API_VALIDATION_ERROR,
            "New Season Start Date must be greater than previous sesason end date."
        );
    }
    // season.START_DATE = moment(season?.START_DATE).startOf('month').toDate();
    // season.END_DATE = moment(season?.END_DATE).endOf('month').toDate();
    const createSeason = new Season();
    createSeason.END_DATE = new Date(moment(season?.START_DATE).endOf('month').format('YYYY-MM-DD HH:mm:ssZ'));
    createSeason.START_DATE = new Date(moment(season?.START_DATE).startOf('month').format('YYYY-MM-DD HH:mm:ssZ'));
    createSeason.BUCKET_NAME = season.BUCKET_NAME;
    createSeason.KEY = season.KEY;
    createSeason.TITLE = season.TITLE;
    let createOne = await createSeason.save();
    // const createOne = await insertOne({ ...season } as Season);
    if (!createOne) {
        throw new StandardError(
            ErrorCodes.API_VALIDATION_ERROR,
            "Season create Error."
        );
    }
    return createOne;
}

async function getSeasonService(query: any): Promise<Season> {
    const createQuery = {
        where: {
            ID: query.ID
        }
    }
    const data = await getOneById(createQuery) as any;
    if (!data) {
        throw new StandardError(
            ErrorCodes.API_VALIDATION_ERROR,
            "Season Found Error."
        );
    }
    if (!!data.KEY && !!data.BUCKET_NAME) {
        data.FILE = await generatePermanentPresignedUrl(data.BUCKET_NAME, data.KEY);
    }
    return data;
}

async function paginateSeasonService(query: any): Promise<{ data: Season[], count: number }> {
    const listQuery = {
        order: { CREATED_DATE: 'DESC' },
        take: query.take,
        skip: (query.page - 1) * query.take,
        where: { IS_DELETED: false }
    }
    const data = await findAll(listQuery);
    if (!data) {
        throw new StandardError(
            ErrorCodes.API_VALIDATION_ERROR,
            "Season Found Error."
        );
    }
    const list = data?.[0] ?? [] as any;
    for (let index = 0; index < list.length; index++) {
        const bucketName = list[index].BUCKET_NAME;
        const key = list[index].KEY;
        if (!!key && !!bucketName) {
            const mainUrl = await generatePermanentPresignedUrl(bucketName, key);
            list[index].FILE = mainUrl;
        }
    }
    return { data: list, count: data?.[1] };
}


async function updateSeasonService(id: string, query: any): Promise<Season> {
    if (query.IS_NEW) {
        const createQuery = {
            where: {
                ID: id
            }
        }
        const data = await getOneById(createQuery);
        if (!data) {
            throw new StandardError(
                ErrorCodes.API_VALIDATION_ERROR,
                "Season Found Error."
            );
        }
        // if (!!data.KEY && !!data.BUCKET_NAME) {
        //     await deleteFile(data.BUCKET_NAME, data.KEY);
        // }
    }
    delete query.IS_NEW;
    delete query.END_DATE;
    delete query.START_DATE;
    const update = await updateAndReturnById(id, query);
    return update?.raw?.[0];
}

async function deleteSeasonService(id: string) {
    try {
        let deleteSetting = await updateAndReturnById(id, { IS_DELETED: true } as Season);
        if (!deleteSetting?.affected) {
            throw new StandardError(
                ErrorCodes.NOT_FOUND,
                "Season is not found."
            );
        }
        return deleteSetting?.raw?.[0];
    } catch (error) {
        throw new StandardError(
            ErrorCodes.NOT_FOUND,
            "Season is not found."
        );
    }
}

async function paginateSeasonRewardService(query: any): Promise<{ data: SeasonReward[], count: number }> {
    const listQuery = {
        where: [
            { REWARDS: { ID: query.seasonId }, IS_DELETED: false }
        ],
        order: { CREATED_DATE: 'DESC' },
        take: query.take,
        skip: (query.page - 1) * query.take
    }
    const data = await findAllSeasonReward(listQuery);
    if (!data) {
        throw new StandardError(
            ErrorCodes.API_VALIDATION_ERROR,
            "Season Reward Found Error."
        );
    }
    const list = data?.[0] ?? [] as any;
    for (let index = 0; index < list.length; index++) {
        const bucketName = list[index].BUCKET_NAME;
        const key = list[index].KEY;
        if (!!key && !!bucketName) {
            const mainUrl = await generatePermanentPresignedUrl(bucketName, key);
            list[index].FILE = mainUrl;
        }
    }
    return { data: list, count: data?.[1] };
}

async function createSeasonRewardService(seasonReward: SeasonReward): Promise<SeasonReward> {
    const { LEVEL, REWARDS } = seasonReward;
    const query = {
        LEVEL,
        IS_DELETED: false,
        REWARDS
    }
    const countSeason = await countSeasonRewardIsPresentOrNot(query);

    if (countSeason) {
        throw new StandardError(
            ErrorCodes.API_VALIDATION_ERROR,
            "Season Reward level exists."
        );
    }

    const createOne = await insertOneSeasonReward({ ...seasonReward } as SeasonReward);
    if (!createOne) {
        throw new StandardError(
            ErrorCodes.API_VALIDATION_ERROR,
            "Season Reward create Error."
        );
    }
    return createOne;
}


async function getSeasonRewardService(query: any): Promise<SeasonReward> {
    const getQuery = {
        where: {
            ID: query.ID
        }
    }
    const data = await getOneByIdSeasonReward(getQuery) as any;
    if (!data) {
        throw new StandardError(
            ErrorCodes.API_VALIDATION_ERROR,
            "Season Reward Found Error."
        );
    }
    if (!!data.KEY && !!data.BUCKET_NAME) {
        data.FILE = await generatePermanentPresignedUrl(data.BUCKET_NAME, data.KEY);
        const itemImages: any = data?.EMOJI_IMAGES ?? 0;
        for (let index = 0; index < itemImages.length; index++) {
            const bucketName = itemImages[index].BUCKET_NAME;
            const key = itemImages[index].KEY;
            const benefitsUrl = await generatePermanentPresignedUrl(bucketName, key);
            itemImages[index].FILE = benefitsUrl;
        }
    }
    return data;
}


async function updateSeasonRewardService(id: string, query: any): Promise<SeasonReward> {
    if (query.IS_NEW) {
        const createQuery = {
            where: {
                ID: id
            }
        }
        const data = await getOneByIdSeasonReward(createQuery);
        if (!data) {
            throw new StandardError(
                ErrorCodes.API_VALIDATION_ERROR,
                "Season Reward Found Error."
            );
        }
        // if (!!data.KEY && !!data.BUCKET_NAME) {
        //     await deleteFile(data.BUCKET_NAME, data.KEY);
        // }
    }
    delete query.IS_NEW;
    const update = await updateAndReturnByIdSeasonReward(id, query);
    return update?.raw?.[0];
}


async function deleteSeasonRewardItemService(id: string, query: any): Promise<SeasonReward> {
    const { KEY } = query;
    const getRewardQuery = {
        where: {
            ID: id
        }
    }
    const data = await getOneByIdSeasonReward(getRewardQuery);
    if (!data) {
        throw new StandardError(
            ErrorCodes.API_VALIDATION_ERROR,
            "Season Reward Found Error."
        );
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
    const currentItems = data?.EMOJI_IMAGES.filter((data: any) => KEY !== data.KEY);
    const updateData = {
        EMOJI_IMAGES: currentItems
    } as SeasonReward;
    const update = await updateAndReturnByIdSeasonReward(id, updateData);
    return update?.raw?.[0];
}

async function deleteSeasonRewardService(id: string) {
    try {
        let deleteSetting = await updateAndReturnByIdSeasonReward(id, { IS_DELETED: true } as SeasonReward);
        if (!deleteSetting?.affected) {
            throw new StandardError(
                ErrorCodes.NOT_FOUND,
                "Season Reward is not found."
            );
        }
        return deleteSetting?.raw?.[0];
    } catch (error) {
        throw new StandardError(
            ErrorCodes.NOT_FOUND,
            "Season Reward is not found."
        );
    }
}

async function getSeasonWithRewardService(): Promise<Season> {
    const createQuery = {
        startDate: moment().startOf('M').format('YYYY-MM-DD 00:00:00+00'),
        endDate: moment().endOf('M').format('YYYY-MM-DD 23:59:59+00')
    }
    const data = await currentReward(createQuery) as any;
    if (!data) {
        throw new StandardError(
            ErrorCodes.API_VALIDATION_ERROR,
            "Season Found Error."
        );
    }
    if (!data.IS_ACTIVE) {
        const updateBool = {
            IS_ACTIVE: true,
            IS_UPCOMING: false,
            IS_COMPLETE: false
        } as Season;
        await updateAndReturnById(data.ID, updateBool)
    }
    if (!!data.KEY && !!data.BUCKET_NAME) {
        data.FILE = await generatePermanentPresignedUrl(data.BUCKET_NAME, data.KEY);
        for (let index = 0; index < data?.REWARDS?.length; index++) {
            data.REWARDS[index].FILE = await generatePermanentPresignedUrl(data.REWARDS[index].BUCKET_NAME, data.REWARDS[index].KEY);
        }
    }
    return data;
}

export {
    createSeasonService, getSeasonService, paginateSeasonService, updateSeasonService, deleteSeasonService,
    paginateSeasonRewardService, createSeasonRewardService, getSeasonRewardService,
    updateSeasonRewardService, deleteSeasonRewardItemService, deleteSeasonRewardService,

    getSeasonWithRewardService
};