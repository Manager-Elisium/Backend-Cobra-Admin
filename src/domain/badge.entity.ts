import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, DeleteDateColumn } from "typeorm"

enum BadgeKey {
    CARD_SHARK = "Card Shark",
    SEASONED_ELITE = "Seasoned Elite",
    RISING_STAR = "Rising Star",
    GOLD_MINER = "Gold Miner",
    DIAMOND_DRILLER = "Diamond Driller"
}

enum TaskKey {
    LEADERBOARD_TOPPER = "Leaderboard Topper",
    BUY_SEASON_PASS = "Buy & Completing Season Pass",
    PLAY_LOBBY = "Play Lobby",
    WIN_GOLD_COIN = "Win Gold Coin",
    EARN_DIAMOND = "Earn Diamond"
}

@Entity({ name: "BADGE" })
export class Badge extends BaseEntity {

    @PrimaryGeneratedColumn("uuid", { name: "ID" })
    ID: string;

    @Column({ type: 'enum', enum: BadgeKey })
    TYPE: BadgeKey;

    @Column()
    BUCKET_NAME: string;

    @Column()
    KEY: string;

    @Column()
    TEXT: string;

    @Column({ type: 'enum', enum: TaskKey })
    TASK_KEY: TaskKey;

    @Column()
    TASK_VALUE: number;

    @Column('timestamp with time zone', { nullable: true })
    UPDATED_DATE?: Date

    @Column('timestamp with time zone', { nullable: false, default: () => 'CURRENT_TIMESTAMP' })
    CREATED_DATE: Date;

    @DeleteDateColumn({ nullable: true })
    DELETED_DATE?: Date

}