import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, DeleteDateColumn } from "typeorm"


enum TypeReward {
    COIN = "COIN",
    DIAMOND = "DIAMOND",
    ITEMS = "ITEMS"
}

enum ItemType {
    EMOJI = "Emoji",
    AVATAR = "Avatar",
    FRAME = "Frame",
    TABLE = "Table",
    CARD = "Card"
}

enum ListDay {
    DAY_1 = "Day 1",
    DAY_2 = "Day 2",
    DAY_3 = "Day 3",
    DAY_4 = "Day 4",
    DAY_5 = "Day 5",
    DAY_6 = "Day 6",
    DAY_7 = "Day 7",
    DAY_8 = "Day 8",
    DAY_9 = "Day 9",
    DAY_10 = "Day 10",
    DAY_11 = "Day 11",
    DAY_12 = "Day 12",
    DAY_13 = "Day 13",
    DAY_14 = "Day 14",
    DAY_15 = "Day 15",
    DAY_16 = "Day 16",
    DAY_17 = "Day 17",
    DAY_18 = "Day 18",
    DAY_19 = "Day 19",
    DAY_20 = "Day 20",
    DAY_21 = "Day 21",
    DAY_22 = "Day 22",
    DAY_23 = "Day 23",
    DAY_24 = "Day 24",
    DAY_25 = "Day 25",
    DAY_26 = "Day 26",
    DAY_27 = "Day 27",
    DAY_28 = "Day 28",
    DAY_29 = "Day 29",
    DAY_30 = "Day 30"
}

@Entity({ name: "REWARD" })
export class Reward extends BaseEntity {

    @PrimaryGeneratedColumn("uuid", { name: "ID" })
    ID: string;

    @Column({ type: 'enum', enum: ListDay })
    DAY: string;

    @Column({ type: 'enum', enum: TypeReward, default: TypeReward.COIN })
    TYPE: TypeReward;

    @Column({ type: 'enum', enum: ItemType, default: null })
    ITEM_NAME: ItemType;

    @Column()
    VALUE: number;

    @Column()
    FILE: string;

    @Column()
    BUCKET_NAME: string;

    @Column()
    KEY: string;

    // [{ KEY: "", BUCKET_NAME: ""}]
    @Column({ type: 'jsonb', default: [] })
    ITEM_IMAGES: any;

    @Column('timestamp with time zone', { nullable: true })
    UPDATED_DATE?: Date

    @Column('timestamp with time zone', { nullable: false, default: () => 'CURRENT_TIMESTAMP' })
    CREATED_DATE: Date;

    @DeleteDateColumn({ nullable: true })
    deletedAt: Date;

    @Column({ default: false })
    IS_DELETED: boolean;

}
