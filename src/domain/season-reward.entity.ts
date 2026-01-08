import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, BaseEntity } from 'typeorm';
import { Season } from './season.entity';

enum ELevel {
    LEVEL_1 = "Level 1",
    LEVEL_2 = "Level 2",
    LEVEL_3 = "Level 3",
    LEVEL_4 = "Level 4",
    LEVEL_5 = "Level 5",
    LEVEL_6 = "Level 6",
    LEVEL_7 = "Level 7",
    LEVEL_8 = "Level 8",
    LEVEL_9 = "Level 9",
    LEVEL_10 = "Level 10",
    LEVEL_11 = "Level 11",
    LEVEL_12 = "Level 12",
    LEVEL_13 = "Level 13",
    LEVEL_14 = "Level 14",
    LEVEL_15 = "Level 15",
    LEVEL_16 = "Level 16",
    LEVEL_17 = "Level 17",
    LEVEL_18 = "Level 18",
    LEVEL_19 = "Level 19",
    LEVEL_20 = "Level 20",
    LEVEL_21 = "Level 21",
    LEVEL_22 = "Level 22",
    LEVEL_23 = "Level 23",
    LEVEL_24 = "Level 24",
    LEVEL_25 = "Level 25",
    LEVEL_26 = "Level 26",
    LEVEL_27 = "Level 27",
    LEVEL_28 = "Level 28",
    LEVEL_29 = "Level 29",
    LEVEL_30 = "Level 30"
}

enum EType {
    COIN = "Coin",
    DIAMOND = "Diamond",
    ITEMS = "Items"
}

enum ItemType {
    EMOJI = "Emoji",
    AVATAR = "Avatar",
    FRAME = "Frame",
    TABLE = "Table",
    CARD = "Card"
}

@Entity({ name: "SEASON_REWARD" })
export class SeasonReward extends BaseEntity {
    @PrimaryGeneratedColumn("uuid", { name: "ID" })
    ID: string;

    @Column({ type: 'enum', enum: ELevel })
    LEVEL: ELevel;

    @Column({ type: 'enum', enum: EType, default: EType.COIN })
    TYPE: EType;

    @Column({ type: 'enum', enum: ItemType, default: null })
    ITEM_NAME: ItemType;

    @Column({ nullable: false })
    NAME: string;

    @Column({ nullable: false })
    VALUE: string;

    @ManyToOne(() => Season, (season) => season.REWARDS, { nullable: false })
    @JoinColumn({ name: 'REWARDS' })
    REWARDS: Season;

    @Column({ default: false })
    IS_PAID: boolean;

    @Column({ nullable: true })
    BUCKET_NAME: string;

    @Column({ nullable: true })
    KEY: string;

    @Column({ type: 'jsonb', default: [] })
    EMOJI_IMAGES: any;

    @Column({ type: 'timestamptz', default: () => 'NOW()' })
    CREATED_DATE: Date;

    @Column('timestamp with time zone', { nullable: true })
    UPDATED_DATE?: Date;

    @Column({ default: false })
    IS_DELETED: boolean;
}
