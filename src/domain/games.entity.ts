import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, DeleteDateColumn } from "typeorm"

enum TypeGame {
    CARD_GAME = "CARD_GAME",
    PUZZEL = "PUZZEL",
    ARCADE = "ARCADE"
}

@Entity({ name: "GAMES" })
export class MultiGames extends BaseEntity {

    @PrimaryGeneratedColumn("uuid", { name: "ID" })
    ID: string;

    @Column({ unique: true })
    UNIQUE_NAME: string;

    @Column()
    NAME: string;

    @Column({ type: 'enum', enum: TypeGame, nullable: true, default: TypeGame.CARD_GAME })
    TYPE: TypeGame;

    @Column({ default: false })
    IS_SHOW: boolean;

    @Column('timestamp with time zone', { nullable: true })
    UPDATED_DATE?: Date

    @Column('timestamp with time zone', { nullable: false, default: () => 'CURRENT_TIMESTAMP' })
    CREATED_DATE: Date;

    @DeleteDateColumn({ nullable: true })
    deletedAt: Date;

}