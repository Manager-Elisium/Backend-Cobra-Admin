import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, DeleteDateColumn, ManyToOne } from "typeorm"
import { Lobby } from "./lobby.entity";


enum MissionType {
    EASY = "Easy",
    MEDIUM = "Medium",
    HARD = "Hard"
}

enum TaskKey {
    SEND_GIFT_FRIEND = "Send Gift Friend",
    COLLECT_GIFT_FRIEND = "Collect Gift Friend",
    ADD_NEW_FRIEND = "Add New Friend",
    PLAY_INSTANT_GAME = "Play Instant Game",
    PLAY_LOBBY_GAME = "Play Lobby Game",
    SEND_RECEIVE_CHIP_CLUB = "Send | Receive Chip Club",
    
    BUY_SHOP = "Buy Shop",
    FIRST_WIN_PER_DAY = "First Win Day",
    WIN_INSTANT_GAME = "Win Instant Game",
    DISCARD_CARD = "Discard Card", 
    WIN_LOBBY_GAME = "Win Lobby Game",

    EVADE_PENALTY_GAME = "Evade Penalty",
    WIN_LOBBY_GAME_IN_ROW = "Win Row Lobby Game",
    JOINT_CLUB = "Joint Club"
}


@Entity({ name: "MISSION" })
export class Mission extends BaseEntity {

    @PrimaryGeneratedColumn("uuid", { name: "ID" })
    ID: string;

    @Column()
    FILE: string;

    @Column()
    BUCKET_NAME: string;

    @Column({ type: 'enum', enum: MissionType })
    TYPE: MissionType;

    @Column()
    KEY: string;

    @Column()
    TITLE: string;

    @Column()
    TEXT: string;

    @Column({ type: 'enum', enum: TaskKey })
    TASK_KEY: TaskKey;

    @ManyToOne(() => Lobby, lobby => lobby.ID, { nullable: true })
    TASK_LOBBY_ID: Lobby;

    @Column()
    TASK_VALUE: number;

    @Column({ type: 'jsonb', default: [] })
    MISSIONS: any;

    @Column('timestamp with time zone', { nullable: true })
    UPDATED_DATE?: Date

    @Column('timestamp with time zone', { nullable: false, default: () => 'CURRENT_TIMESTAMP' })
    CREATED_DATE: Date;

    @Column({ default: false })
    IS_DELETED: boolean;
}
