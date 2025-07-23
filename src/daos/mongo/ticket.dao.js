import TicketModel from '../../models/ticket.model.js';

class TicketDAO {
  async createTicket(ticketData) {
    return await TicketModel.create(ticketData);
  }
  async findById(id) {
    return await TicketModel.findById(id);
  }
  async findByCode(code) {
    return await TicketModel.findOne({ code });
  }
  async updateTicket(id, updateData) {
    return await TicketModel.findByIdAndUpdate(id, updateData, { new: true });
  }
  async deleteTicket(id) {
    return await TicketModel.findByIdAndDelete(id);
  }
  async findAll(filter = {}) {
    return await TicketModel.find(filter);
  }
}
export default new TicketDAO(); 