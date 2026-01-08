import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, BeforeInsert, OneToMany } from "typeorm"
import { SeasonReward } from "./season-reward.entity";
import { AppDataSource } from "./../lib/ormconfig";


@Entity({ name: "SEASON" })
export class Season extends BaseEntity {

    @PrimaryGeneratedColumn("uuid", { name: "ID" })
    ID: string;

    @Column()
    TITLE: string;

    @Column()
    COUNTER: string;

    @Column('timestamp with time zone', { nullable: true })
    START_DATE: Date;

    @Column('timestamp with time zone', { nullable: true })
    END_DATE: Date;

    @Column({ nullable: true })
    BUCKET_NAME: string;

    @Column({ nullable: true })
    KEY: string;

    @Column({ nullable : true })
    GOOGLE_STORE_ID: string;

    @Column({ nullable : true })
    APPLE_STORE_ID: string;

    @Column({ nullable : true })
    DIAMOND: number;

    @Column('timestamp with time zone', { nullable: true })
    UPDATED_DATE?: Date

    @Column('timestamp with time zone', { nullable: false, default: () => 'CURRENT_TIMESTAMP' })
    CREATED_DATE: Date;

    @Column({ default: false })
    IS_ACTIVE: boolean;

    @Column({ default: true })
    IS_UPCOMING: boolean;

    @Column({ default: false })
    IS_COMPLETE: boolean;

    @OneToMany(() => SeasonReward, (seasonReward) => seasonReward.REWARDS)
    REWARDS: SeasonReward[];

    @Column({ default: false })
    IS_DELETED: boolean;

    @BeforeInsert()
    async assignSeasonSequence() {
        const entityManager = AppDataSource.getRepository(Season);
        const sequenceQuery = "SELECT nextval('season_counter_sequence')";
        const result = await entityManager.query(sequenceQuery);
        this.COUNTER = `SEASON ${result[0].nextval}`;
    }
}