import { DeleteResult, UpdateResult } from 'typeorm';
import StandardError from 'src/common/standard-error';
import { ErrorCodes } from 'src/common/error-type';
import { VipCard } from 'src/domain/vip-card.entity';
import { insertOne, getCount, findAll, findAllData, getOneById, updateOne, getOneBenefitById, insertOneVipBenefit } from 'src/repository/vip_card.repository';
import { generatePermanentPresignedUrl } from 'src/common/upload';

async function createVipCard(vip_card: VipCard): Promise<VipCard> {
  const createOne = await insertOne(vip_card);
  if (!createOne) {
    throw new StandardError(
      ErrorCodes.API_VALIDATION_ERROR,
      "VipCard create Error."
    );
  }
  return createOne;
}

async function findVipCard(): Promise<{ count: number, list: any }> {
  const [count, list] = await Promise.all([getCount(), findAll()]);

  for (let mainIndex = 0; mainIndex < list.length; mainIndex++) {
    const mainUrl = await generatePermanentPresignedUrl(list[mainIndex]?.BUCKET_NAME, list[mainIndex]?.KEY)
    list[mainIndex].FILE = mainUrl;
    const benefits: any = list[mainIndex]?.BENEFITS ?? 0;
    for (let index = 0; index < benefits.length; index++) {
      const bucketName = benefits[index].BUCKET_NAME;
      const key = benefits[index].KEY;
      const benefitsUrl = await generatePermanentPresignedUrl(bucketName, key);
      benefits[index].FILE = benefitsUrl;
      const emojiImages: any = benefits[index]?.EMOJI_IMAGES;
      if (!!emojiImages) {
        for (let indexEmoji = 0; indexEmoji < emojiImages.length; indexEmoji++) {
          const emojiImagesUrl = await generatePermanentPresignedUrl(emojiImages[indexEmoji]?.BUCKET_NAME, emojiImages[indexEmoji]?.KEY);
          emojiImages[indexEmoji].FILE = emojiImagesUrl;
        }
      }
    }
  }

  return { count, list };
}



async function findVipCardForDashboardService(): Promise<{ list: any }> {
  const list = await findAll();
  for (let mainIndex = 0; mainIndex < list.length; mainIndex++) {
    const mainUrl = await generatePermanentPresignedUrl(list[mainIndex]?.BUCKET_NAME, list[mainIndex]?.KEY)
    list[mainIndex].FILE = mainUrl;
    delete list[mainIndex].DAYS_PRICE;
    delete list[mainIndex].UPDATED_DATE;
    delete list[mainIndex].BENEFITS;
    delete list[mainIndex].CREATED_DATE;
  }

  return { list };
}

async function findAllVipCard(query: any): Promise<{ data: VipCard[], count: number }> {
  const data = await findAllData(query);
  if (!data) {
    throw new StandardError(
      ErrorCodes.API_VALIDATION_ERROR,
      "VipCard list Found Error."
    );
  }
  const list: any = data.data;
  for (let mainIndex = 0; mainIndex < list.length; mainIndex++) {
    const mainUrl = await generatePermanentPresignedUrl(list[mainIndex]?.BUCKET_NAME, list[mainIndex]?.KEY)
    list[mainIndex].FILE = mainUrl;
    const benefits: any = list[mainIndex]?.BENEFITS ?? 0;
    for (let index = 0; index < benefits.length; index++) {
      const bucketName = benefits[index].BUCKET_NAME;
      const key = benefits[index].KEY;
      const benefitsUrl = await generatePermanentPresignedUrl(bucketName, key);
      benefits[index].FILE = benefitsUrl;
      const emojiImages: any = benefits[index]?.EMOJI_IMAGES;
      if (!!emojiImages) {
        for (let indexEmoji = 0; indexEmoji < emojiImages.length; indexEmoji++) {
          const emojiImagesUrl = await generatePermanentPresignedUrl(emojiImages[indexEmoji]?.BUCKET_NAME, emojiImages[indexEmoji]?.KEY);
          emojiImages[indexEmoji].FILE = emojiImagesUrl;
        }
      }
    }
  }
  return { count: data.count, data: list };
}

async function findOneVipCard(id: string) {
  const find_vip_card = await getOneById(id);
  if (!find_vip_card) {
    throw new StandardError(
      ErrorCodes.NOT_FOUND,
      "VipCard is not found."
    );
  }
  const mainUrl = await generatePermanentPresignedUrl(find_vip_card?.BUCKET_NAME, find_vip_card?.KEY)
  find_vip_card.FILE = mainUrl
  const benefits: any = find_vip_card.BENEFITS;
  for (let index = 0; index < benefits.length; index++) {
    const bucketName = benefits[index].BUCKET_NAME;
    const key = benefits[index].KEY;
    const benefitsUrl = await generatePermanentPresignedUrl(bucketName, key);
    benefits[index].FILE = benefitsUrl;
    const emojiImages: any = benefits[index]?.EMOJI_IMAGES;
    if (!!emojiImages) {
      for (let indexEmoji = 0; indexEmoji < emojiImages.length; indexEmoji++) {
        const emojiImagesUrl = await generatePermanentPresignedUrl(emojiImages[indexEmoji]?.BUCKET_NAME, emojiImages[indexEmoji]?.KEY);
        emojiImages[indexEmoji].FILE = emojiImagesUrl;
      }
    }
  }
  return find_vip_card;
}

async function updateVipCard(id: string, vip_card: VipCard): Promise<UpdateResult> {
  let find_vip_card = await getOneById(id);
  if (!find_vip_card[0]) {
    throw new StandardError(
      ErrorCodes.NOT_FOUND,
      "VipCard is not found."
    );
  }
  const updateVipCard = await updateOne(id, vip_card);
  return updateVipCard;
}

async function deleteVipCard(id: string): Promise<DeleteResult> {
  // let find_vip_card = await getOneById(id);
  // if (!find_vip_card) {
  //   throw new StandardError(
  //     ErrorCodes.NOT_FOUND,
  //     "VipCard is not found."
  //   );
  // }
  const deletedata = await updateOne(id, { IS_DELETED: true });
  return deletedata;
}



async function findOneBenefitVipCard(id: string) {
  const find_vip_card = await getOneBenefitById(id) as any;
  if (!find_vip_card) {
    throw new StandardError(
      ErrorCodes.NOT_FOUND,
      "VipCard is not found."
    );
  }
  const mainUrl = await generatePermanentPresignedUrl(find_vip_card?.BUCKET_NAME, find_vip_card?.KEY)
  find_vip_card.FILE = mainUrl;
  const emojiImages: any = find_vip_card?.EMOJI_IMAGES;
  if (!!emojiImages) {
    for (let indexEmoji = 0; indexEmoji < emojiImages.length; indexEmoji++) {
      const emojiImagesUrl = await generatePermanentPresignedUrl(emojiImages[indexEmoji]?.BUCKET_NAME, emojiImages[indexEmoji]?.KEY);
      emojiImages[indexEmoji].FILE = emojiImagesUrl;
    }
  }
  return find_vip_card;
}


async function createVipBenefitService(data: any) {
  const createOne = await insertOneVipBenefit(data);
  if (!createOne) {
    throw new StandardError(
      ErrorCodes.API_VALIDATION_ERROR,
      "VipCard benefit create Error."
    );
  }
  return createOne;
}

export {
  createVipCard, findVipCard, findAllVipCard, findOneVipCard, updateVipCard,
  deleteVipCard, findOneBenefitVipCard, createVipBenefitService, findVipCardForDashboardService
};



