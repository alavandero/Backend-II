import TicketRepository from '../repositories/ticket.repository.js';

class TicketService {
  async createTicket(ticketData) {
    // Ensure code is unique
    const existing = await TicketRepository.getTicketByCode(ticketData.code);
    if (existing) throw new Error('Ticket code already exists');
    return await TicketRepository.createTicket(ticketData);
  }
  async getTicketById(id) {
    const ticket = await TicketRepository.getTicketById(id);
    if (!ticket) throw new Error('Ticket not found');
    return ticket;
  }
  async getTicketByCode(code) {
    const ticket = await TicketRepository.getTicketByCode(code);
    if (!ticket) throw new Error('Ticket not found');
    return ticket;
  }
  async updateTicket(id, updateData) {
    const updated = await TicketRepository.updateTicket(id, updateData);
    if (!updated) throw new Error('Ticket not found or update failed');
    return updated;
  }
  async deleteTicket(id) {
    const deleted = await TicketRepository.deleteTicket(id);
    if (!deleted) throw new Error('Ticket not found or delete failed');
    return deleted;
  }
  async getAllTickets(filter = {}) {
    return await TicketRepository.getAllTickets(filter);
  }
}
export default new TicketService(); 