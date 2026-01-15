import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm"

@Entity({ name: "BUG_TICKET" })
export class BugTicket extends BaseEntity {

    @PrimaryGeneratedColumn("uuid", { name: "ID" })
    ID: string;

    @Column({ nullable: true })
    SUBJECT: string;

    @Column({ nullable: true })
    DESCRPTION: string;

    @Column({ nullable: true })
    REPLY: string;

    @Column({ nullable: true })
    USER_ID: string;

    @Column({ nullable: true })
    STATUS: string;

    @Column('timestamp with time zone', { nullable: false, default: () => 'CURRENT_TIMESTAMP' })
    CREATED_DATE: Date;

    @Column('timestamp with time zone', { nullable: true })
    UPDATED_DATE: Date;

    @Column({ default: false })
    IS_DELETED: boolean;

}
