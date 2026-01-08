import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, DeleteDateColumn } from "typeorm"

enum TypeShop {
    Coins = "Coins",
    Diamond = "Diamond",
    Items = "Items"
}

enum ItemType {
    Coins = "Coins",
    Diamond = "Diamond",
    EMOJI = "Emoji",
    AVATAR = "Avatar",
    FRAME = "Frame",
    TABLE = "Table",
    CARD = "Card"
}

@Entity({ name: "SHOP" })
export class Shop extends BaseEntity {

    @PrimaryGeneratedColumn("uuid", { name: "ID" })
    ID: string;

    @Column({ type: 'enum', enum: TypeShop })
    TYPE: TypeShop;

    @Column({ type: 'enum', enum: ItemType, default: null })
    SUB_TYPE: ItemType;

    @Column()
    NAME: string;

    @Column({ nullable: true })
    VALUE: number;

    @Column()
    PRICE: number;

    @Column()
    GOOGLE_STORE_ID: string;

    @Column()
    APPLE_STORE_ID: string;

    @Column({ nullable: true })
    BUCKET_NAME: string;

    @Column({ nullable: true })
    KEY: string;

    @Column({ default: false })
    EXCLUSIVE_OFFER: boolean;

    @Column({ type: 'jsonb', default: [] })
    ITEM_IMAGES: any;

    @Column('timestamp with time zone', { nullable: true })
    UPDATED_DATE?: Date

    @Column('timestamp with time zone', { nullable: false, default: () => 'CURRENT_TIMESTAMP' })
    CREATED_DATE: Date;

    @Column({ default: false })
    IS_DELETED: boolean;

}