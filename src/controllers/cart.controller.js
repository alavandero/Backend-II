import CartService from '../services/cart.service.js';
import CartDTO from '../DTO/cart.DTO.js';

const cartService = new CartService();

class CartController {
  async create(req, res) {
    try {
      const cart = await cartService.createCart(req.body);
      res.status(201).json(new CartDTO(cart));
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  async getById(req, res) {
    try {
      const cart = await cartService.getCartById(req.params.id);
      res.json(new CartDTO(cart));
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
  async update(req, res) {
    try {
      const updated = await cartService.updateCart(req.params.id, req.body);
      res.json(new CartDTO(updated));
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  async delete(req, res) {
    try {
      await cartService.deleteCart(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  async getAll(req, res) {
    try {
      const carts = await cartService.getAllCarts();
      res.json(carts.map(c => new CartDTO(c)));
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  async purchase(req, res) {
    try {
      const cartId = req.params.id;
      const purchaserEmail = req.user.email;
      const result = await cartService.purchaseCart(cartId, purchaserEmail);
      res.json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}
export default new CartController(); 