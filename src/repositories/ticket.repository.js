import TicketDAO from '../daos/mongo/ticket.dao.js';

class TicketRepository {
  async getAllTickets(filter = {}) {
    return await TicketDAO.findAll(filter);
  }
  async getTicketById(id) {
    return await TicketDAO.findById(id);
  }
  async getTicketByCode(code) {
    return await TicketDAO.findByCode(code);
  }
  async createTicket(ticketData) {
    return await TicketDAO.createTicket(ticketData);
  }
  async updateTicket(id, updateData) {
    return await TicketDAO.updateTicket(id, updateData);
  }
  async deleteTicket(id) {
    return await TicketDAO.deleteTicket(id);
  }
}
export default new TicketRepository(); 