import { DeleteResult, FindOperator, InsertManyResult, InsertOneOptions, InsertOneResult, UpdateResult } from 'typeorm';
import StandardError from 'src/common/standard-error';
import { ErrorCodes } from 'src/common/error-type';
import { insertOne, getCount, findAll, findAllData, getOneById, updateOne } from 'src/repository/reward.repository';
import { Reward } from 'src/domain/reward.entity';
import { generatePermanentPresignedUrl } from 'src/common/upload';

async function createReward(reward: Reward): Promise<Reward> {
  const createOne = await insertOne(reward);
  if (!createOne) {
    throw new StandardError(
      ErrorCodes.API_VALIDATION_ERROR,
      "Reward create Error."
    );
  }
  return createOne;
}

async function findReward(): Promise<{ count: number, list: Reward[] }> {
  const [count, list] = await Promise.all([getCount(), findAll()]);
  for (let mainIndex = 0; mainIndex < list.length; mainIndex++) {
    const mainUrl = await generatePermanentPresignedUrl(list[mainIndex]?.BUCKET_NAME, list[mainIndex]?.KEY)
    list[mainIndex].FILE = mainUrl;
    const itemImages: any = list[mainIndex]?.ITEM_IMAGES ?? 0;
    for (let index = 0; index < itemImages.length; index++) {
      const bucketName = itemImages[index].BUCKET_NAME;
      const key = itemImages[index].KEY;
      const benefitsUrl = await generatePermanentPresignedUrl(bucketName, key);
      itemImages[index].FILE = benefitsUrl;
    }
  }
  return { count, list };
}

async function findAllReward(query: any): Promise<{ data: Reward[], count: number }> {
  const data = await findAllData(query);
  if (!data) {
    throw new StandardError(
      ErrorCodes.API_VALIDATION_ERROR,
      "Reward list Found Error."
    );
  }
  const list: any = data.data;
  for (let mainIndex = 0; mainIndex < list.length; mainIndex++) {
    const mainUrl = await generatePermanentPresignedUrl(list[mainIndex]?.BUCKET_NAME, list[mainIndex]?.KEY)
    list[mainIndex].FILE = mainUrl;
    const itemImages: any = list[mainIndex]?.ITEM_IMAGES ?? 0;
    for (let index = 0; index < itemImages.length; index++) {
      const bucketName = itemImages[index].BUCKET_NAME;
      const key = itemImages[index].KEY;
      const benefitsUrl = await generatePermanentPresignedUrl(bucketName, key);
      itemImages[index].FILE = benefitsUrl;
    }
  }
  return data;
}

async function findOneReward(id: string): Promise<Reward[]> {
  const findReward = await getOneById(id);
  if (!findReward[0]) {
    throw new StandardError(
      ErrorCodes.NOT_FOUND,
      "Reward is not found."
    );
  }
  const mainUrl = await generatePermanentPresignedUrl(findReward[0]?.BUCKET_NAME, findReward[0]?.KEY)
  findReward[0].FILE = mainUrl;
  if (findReward[0].ITEM_IMAGES.length > 0) {
    for (let index = 0; index < findReward[0].ITEM_IMAGES.length; index++) {
      const key = findReward[0].ITEM_IMAGES[index].KEY;
      const bucketName = findReward[0].ITEM_IMAGES[index].BUCKET_NAME;
      const itemImageUrl = await generatePermanentPresignedUrl(bucketName, key)
      findReward[0].ITEM_IMAGES[index].FILE = itemImageUrl;
    }
  }
  return findReward
}

async function deleteReward(id: string): Promise<DeleteResult> {
  let getreward = await getOneById(id);

  if (!getreward[0]) {
    throw new StandardError(
      ErrorCodes.NOT_FOUND,
      "Reward is not found."
    );
  }
  const deletedata = await updateOne(id, { IS_DELETED: true } as Reward);
  return deletedata;
}

async function updateReward(id: string, reward: Reward): Promise<UpdateResult> {

  let getreward = await getOneById(id);
  if (!getreward[0]) {
    throw new StandardError(
      ErrorCodes.NOT_FOUND,
      "Reward is not found."
    );
  }
  const updateReward = await updateOne(id, reward);
  return updateReward;
}


async function findDays() {
  const getList = await findAll() as any;
  const currentArray = ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7", "Day 8", "Day 9", "Day 10", "Day 11", "Day 12", "Day 13", "Day 14", "Day 15", "Day 16", "Day 17", "Day 18", "Day 19", "Day 20", "Day 21", "Day 22", "Day 23", "Day 24", "Day 25", "Day 26", "Day 27", "Day 28", "Day 29", "Day 30"];
  const dbArray = getList.map((data: any) => data.DAY)
  const pendingArray = currentArray.filter(day => !dbArray.includes(day));
  return pendingArray;
}

export { createReward, findReward, findAllReward, updateReward, findOneReward, deleteReward, findDays };



