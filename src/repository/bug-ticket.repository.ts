import { AppDataSource } from "src/lib/ormconfig";
import { BugTicket } from "src/domain/bug-ticket.entity";

export const BugTicketRepository = AppDataSource.getRepository(BugTicket);
