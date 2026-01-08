import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, BaseEntity } from 'typeorm';
import { VipCard } from './vip-card.entity';


@Entity({ name: "VIP_CARD_BENEFITS" })
export class VipCardBenefits extends BaseEntity {
    @PrimaryGeneratedColumn("uuid", { name: "ID" })
    ID: string;

    @ManyToOne(() => VipCard, (vipCard) => vipCard.BENEFITS, { nullable: false })
    @JoinColumn({ name: 'BENEFITS' })
    BENEFITS: VipCard;

    @Column({ nullable: false })
    TYPE: string;

    @Column({ nullable: true })
    TEXT: string;

    @Column({ nullable: false })
    VALUE: string;

    @Column({ nullable: true })
    BUCKET_NAME: string;

    @Column({ nullable: true })
    KEY: string;

    @Column({ type: 'jsonb', nullable: true })
    EMOJI_IMAGES: any;

    @Column({ type: 'timestamptz', default: () => 'NOW()' })
    CREATED_DATE: Date;

    @Column('timestamp with time zone', { nullable: true })
    UPDATED_DATE?: Date

    @Column({ default: false })
    IS_DELETED: boolean;
}