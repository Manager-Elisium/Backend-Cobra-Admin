import { DeleteResult, UpdateResult } from 'typeorm';
import StandardError from 'src/common/standard-error';
import { ErrorCodes } from 'src/common/error-type';
import { Setting, SettingKey } from 'src/domain/setting.entity';
import { insertOne, findAllData, getOneById, deleteAndReturnById, countType, updateAndReturnById } from 'src/repository/setting.repository';

async function createSetting(setting: Setting): Promise<Setting> {
    const { TYPE } = setting;
    const arraySetting = ["Career History", "Fair Game Play", "Terms & Conditions", "Privacy Policy", "Game Rules", "Contact Us", "Instant Play", "Other"]
    if (!arraySetting.includes(TYPE)) {
        throw new StandardError(
            ErrorCodes.API_VALIDATION_ERROR,
            "Please Select Current Type."
        );
    }
    const query = {
        where: { TYPE }
    }
    const isAvalible = await countType(query);
    if (isAvalible && TYPE !== SettingKey.OTHER) {
        throw new StandardError(
            ErrorCodes.API_VALIDATION_ERROR,
            "Type already exists."
        );
    }
    const createOne = await insertOne(setting);
    if (!createOne) {
        throw new StandardError(
            ErrorCodes.API_VALIDATION_ERROR,
            "Setting create Error."
        );
    }
    return createOne;
}


async function paginationSettingService(query: any): Promise<{ data: Setting[], count: number }> {
    const data = await findAllData(query);
    if (!data) {
        throw new StandardError(
            ErrorCodes.API_VALIDATION_ERROR,
            "Setting list Found Error."
        );
    }
    return data;
}


async function findOneSettingService(id: string): Promise<Setting> {
    const query = {
        where: {
            ID: id
        }
    }
    const getSetting = await getOneById(query);
    if (!getSetting) {
        throw new StandardError(
            ErrorCodes.NOT_FOUND,
            "Setting is not found."
        );
    }
    return getSetting
}

async function findSettingServiceByType(type: any): Promise<Setting> {
    const query = {
        where: {
            TYPE: type
        }
    }
    const getSetting = await getOneById(query);
    if (!getSetting) {
        throw new StandardError(
            ErrorCodes.NOT_FOUND,
            "Setting is not found."
        );
    }
    return getSetting
}

async function deleteSettingService(id: string): Promise<DeleteResult> {
    let deleteSetting = await deleteAndReturnById(id);
    if (!deleteSetting?.affected) {
        throw new StandardError(
            ErrorCodes.NOT_FOUND,
            "Setting is not found."
        );
    }
    return deleteSetting?.raw?.[0];
}

async function updateSettingService(id: string, setting: Setting): Promise<UpdateResult> {
    let updateSetting = await updateAndReturnById(id, setting);
    if (!updateSetting?.affected) {
        throw new StandardError(
            ErrorCodes.NOT_FOUND,
            "Setting is not found."
        );
    }
    return updateSetting?.raw?.[0];
}

export {
    createSetting, paginationSettingService, updateSettingService, findOneSettingService, deleteSettingService, findSettingServiceByType
};



