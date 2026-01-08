import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, DeleteDateColumn } from "typeorm"
import { MultiGames } from "./games.entity";


@Entity({ name: "LOBBY" })
export class Lobby extends BaseEntity {

    @PrimaryGeneratedColumn("uuid", { name: "ID" })
    ID: string;

    @ManyToOne(() => MultiGames, game => game.ID, { nullable: true })
    GAME: MultiGames;

    @Column()
    FILE: string;

    @Column()
    TITLE: string;

    @Column({ type: 'jsonb' })
    DATA: any;

    @Column()
    BUCKET_NAME: string;

    @Column()
    KEY: string;

    @Column('timestamp with time zone', { nullable: true })
    UPDATED_DATE?: Date

    @Column('timestamp with time zone', { nullable: false, default: () => 'CURRENT_TIMESTAMP' })
    CREATED_DATE: Date;

    @DeleteDateColumn({ nullable: true })
    DELETED_DATE?: Date;

}