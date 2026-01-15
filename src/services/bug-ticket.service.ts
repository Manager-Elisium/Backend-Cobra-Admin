import { BugTicketRepository } from "src/repository/bug-ticket.repository";

export async function createBugTicket(data: any) {
    const bugTicket = BugTicketRepository.create(data);
    return await BugTicketRepository.save(bugTicket);
}

export async function paginationBugTicket(query: any) {
    const take = parseInt(query.take) || 10;
    const page = parseInt(query.page) || 1;
    const skip = (page - 1) * take;

    const [listOfBug, total] = await BugTicketRepository.findAndCount({
        where: { IS_DELETED: false },
        order: { CREATED_DATE: 'DESC' },
        take,
        skip
    });

    return { listOfBug, total, page, take };
}

export async function getBugTicketService(query: any) {
    return await BugTicketRepository.findOne({
        where: { ID: query.ID, IS_DELETED: false }
    });
}

export async function updateBugTicketService(id: string, data: any) {
    data.UPDATED_DATE = new Date();
    await BugTicketRepository.update({ ID: id }, data);
    return await BugTicketRepository.findOne({ where: { ID: id } });
}

export async function deleteBugTicketService(id: string) {
    return await BugTicketRepository.update({ ID: id }, { IS_DELETED: true });
}
