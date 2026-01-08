import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, DeleteDateColumn } from "typeorm"
import { Lobby } from "./lobby.entity";

enum AchievementKey {
    LUCKY_STREAK = "Lucky Streak",
    COBRA_CHARMER = "Cobra Charmer",
    GLOBE_TROTTER = "Globe Trotter",
    HIGH_ROLLER = "High Roller",
    SLICK_N_QUICK = "Slick n Quick"
}


enum TaskKey {
    WIN_ROW_GAME = "Win Game in Row",
    EVADE_PENALTY = "Evade Penalty",
    PLAY_ALL_LOBBY = "Play All Lobby",
    WIN_SELECT_LOBBY = "Win Selected Lobby Match",
    LEVEL_UP_PER_DAY = "Level Up Per Day"
}


@Entity({ name: "ACHIEVEMENT" })
export class Achievement extends BaseEntity {

    @PrimaryGeneratedColumn("uuid", { name: "ID" })
    ID: string;

    @Column({ type: 'enum', enum: AchievementKey })
    TYPE: AchievementKey;

    @Column()
    BUCKET_NAME: string;

    @Column()
    KEY: string;

    @Column()
    TEXT: string;

    @Column({ type: 'enum', enum: TaskKey })
    TASK_KEY: TaskKey;

    @ManyToOne(() => Lobby, lobby => lobby.ID, { nullable: true })
    TASK_LOBBY_ID: Lobby;

    @Column()
    TASK_VALUE: number;

    @Column('timestamp with time zone', { nullable: true })
    UPDATED_DATE?: Date

    @Column('timestamp with time zone', { nullable: false, default: () => 'CURRENT_TIMESTAMP' })
    CREATED_DATE: Date;

    @DeleteDateColumn({ nullable: true })
    DELETED_DATE?: Date

}