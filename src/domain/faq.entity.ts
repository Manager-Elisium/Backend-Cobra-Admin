import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm"

@Entity({ name: "FAQS" })
export class Faq extends BaseEntity {
    
    @PrimaryGeneratedColumn("uuid", { name: "ID" })
    ID: string;

    @Column()
    QUESTION: string;

    @Column()
    ANSWER: string;

    @Column('timestamp with time zone', { nullable: true })
    UPDATED_DATE?: Date

    @Column('timestamp with time zone', { nullable: false, default: () => 'CURRENT_TIMESTAMP' })
    CREATED_DATE: Date;
}