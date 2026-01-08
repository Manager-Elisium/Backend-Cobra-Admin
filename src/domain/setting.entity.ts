import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm"


export enum SettingKey {
    CAREER_HISTORY = "Career History",
    FAIR_GAME_PLAY = "Fair Game Play",
    TERMS_CONDITIONS = "Terms & Conditions",
    PRIVACY_POLICY = "Privacy Policy",
    GAME_RULES = "Game Rules",
    CONTACT_US = "Contact Us",
    INSTANT_PLAY = "Instant Play",
    CLUB_INFO = "Club Info",
    OTHER = "Other"
}


@Entity({ name: "SETTING" })
export class Setting extends BaseEntity {

    @PrimaryGeneratedColumn("uuid", { name: "ID" })
    ID: string;

    @Column({ type: 'enum', enum: SettingKey })
    TYPE: SettingKey;

    @Column()
    TITLE: string;

    @Column({ nullable: true })
    SUB_TITLE: string;

    @Column({ type: 'jsonb' })
    DATA: any;

    @Column('timestamp with time zone', { nullable: true })
    UPDATED_DATE?: Date

    @Column('timestamp with time zone', { nullable: false, default: () => 'CURRENT_TIMESTAMP' })
    CREATED_DATE: Date;
}