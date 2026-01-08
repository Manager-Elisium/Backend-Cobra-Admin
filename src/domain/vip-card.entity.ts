import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, } from "typeorm";
import { VipCardBenefits } from "./vip-card-benefits.entity";

@Entity({ name: "VIP_CARD" })
export class VipCard extends BaseEntity {

    @PrimaryGeneratedColumn("uuid", { name: "ID" })
    ID: string;

    @Column()
    FILE: string;

    @Column()
    TITLE: string;


    @Column()
    DESCRIPTION: string;

    //[{"DAY": 30, "PRICE": 100 }] 
    // accept : [30,45,60]
    @Column({ type: 'jsonb', nullable: false })
    DAYS_PRICE: any;

    @Column({ nullable: true })
    BUCKET_NAME: string;

    @Column({ nullable: true })
    KEY: string;

    @OneToMany(() => VipCardBenefits, (vipCardBenefits) => vipCardBenefits.BENEFITS)
    BENEFITS: VipCardBenefits[];

    @Column('timestamp with time zone', { nullable: true })
    UPDATED_DATE?: Date

    @Column('timestamp with time zone', { nullable: false, default: () => 'CURRENT_TIMESTAMP' })
    CREATED_DATE: Date;

    @Column({ default: false })
    IS_DELETED: boolean;

}