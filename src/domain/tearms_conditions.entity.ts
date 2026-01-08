import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm"

@Entity({ name: "TERM_CONDITION" })
export class TermsAndConditions extends BaseEntity {

    @PrimaryGeneratedColumn("uuid", { name: "ID" })
    ID: string;

    @Column()
    TITLE: string;

    @Column()
    DESCRIPTIONS: string;

    @Column('timestamp with time zone', { nullable: true })
    UPDATED_DATE?: Date

    @Column('timestamp with time zone', { nullable: false, default: () => 'CURRENT_TIMESTAMP' })
    CREATED_DATE: Date;

}