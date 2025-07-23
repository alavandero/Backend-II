import TicketService from '../services/ticket.service.js';
import TicketDTO from '../DTO/ticket.DTO.js';

class TicketController {
  async create(req, res) {
    try {
      const ticket = await TicketService.createTicket(req.body);
      res.status(201).json(new TicketDTO(ticket));
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  async getById(req, res) {
    try {
      const ticket = await TicketService.getTicketById(req.params.id);
      res.json(new TicketDTO(ticket));
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
  async getByCode(req, res) {
    try {
      const ticket = await TicketService.getTicketByCode(req.params.code);
      res.json(new TicketDTO(ticket));
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
  async update(req, res) {
    try {
      const updated = await TicketService.updateTicket(req.params.id, req.body);
      res.json(new TicketDTO(updated));
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  async delete(req, res) {
    try {
      await TicketService.deleteTicket(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  async getAll(req, res) {
    try {
      const tickets = await TicketService.getAllTickets();
      res.json(tickets.map(t => new TicketDTO(t)));
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
export default new TicketController(); 