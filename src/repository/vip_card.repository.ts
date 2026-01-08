import { VipCardBenefits } from "src/domain/vip-card-benefits.entity";
import { VipCard } from "src/domain/vip-card.entity";
import { Like } from "typeorm";

async function insertOne(data: VipCard) {
    return await VipCard.save(data)
}

async function getCount() {
    return await VipCard.count({ where: { IS_DELETED: false } });
}

async function findAll() {
    return VipCard.find({
        where: { IS_DELETED: false },
        relations: ['BENEFITS']
    })
}

async function updateOne(id: string, vip_card: any) {
    return await VipCard.update(id, vip_card)
}

async function getOneById(id: string) {
    return VipCard.findOne({
        where: {
            ID: id
        },
        relations: ['BENEFITS']
    })
}

async function getOneBenefitById(id: string) {
    return VipCardBenefits.findOne({
        where: {
            ID: id
        }
    })
}

async function updateOneBenefit(id: string, vip_card: any) {
    return await VipCardBenefits.update(id, vip_card)
}

async function findAllData(query: any) {

    const [result, total] = await VipCard.findAndCount({
        where: { TITLE: Like('%' + query.keyword + '%'), IS_DELETED: false },
        order: { CREATED_DATE: 'DESC' },
        take: query.take,
        skip: (query.page - 1) * query.take,
        relations: ['BENEFITS'],
    });
    return { count: total, data: result };
}


async function insertOneVipBenefit(data: VipCardBenefits) {
    return await VipCardBenefits.save(data)
}

export { insertOne, getCount, findAll, findAllData, updateOne, getOneById, insertOneVipBenefit, getOneBenefitById, updateOneBenefit };
