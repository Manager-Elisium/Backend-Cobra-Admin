import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, DeleteDateColumn } from "typeorm"


@Entity({ name: "NOTIFICATION" })
export class Notification extends BaseEntity {

    @PrimaryGeneratedColumn("uuid", { name: "ID" })
    ID: string;

    @Column()
    TOPIC: string;

    @Column()
    TITLE: string;

    @Column({ type: 'jsonb', nullable: true })
    BODY: any;

    @Column({ type: 'jsonb', nullable: true })
    DATA: any;

    @Column({ nullable: true })
    BUCKET_NAME: string;

    @Column({ nullable: true })
    KEY: string;

    @Column('timestamp with time zone', { nullable: false, default: () => 'CURRENT_TIMESTAMP' })
    CREATED_DATE: Date;

    @Column({ default: false })
    IS_DELETED: boolean;

}