import CartRepository from '../repositories/cart.repository.js';
import ProductRepository from '../repositories/product.repository.js';
import TicketRepository from '../repositories/ticket.repository.js';
import TicketDTO from '../DTO/ticket.DTO.js';

class CartService {
  async createCart(cartData) {
    return await CartRepository.createCart(cartData);
  }
  async getCartById(id) {
    const cart = await CartRepository.getCartById(id);
    if (!cart) throw new Error('Cart not found');
    return cart;
  }
  async updateCart(id, updateData) {
    const updated = await CartRepository.updateCart(id, updateData);
    if (!updated) throw new Error('Cart not found or update failed');
    return updated;
  }
  async deleteCart(id) {
    const deleted = await CartRepository.deleteCart(id);
    if (!deleted) throw new Error('Cart not found or delete failed');
    return deleted;
  }
  async getAllCarts(filter = {}) {
    return await CartRepository.getAllCarts(filter);
  }

  async purchaseCart(cartId, purchaserEmail) {
    const cart = await CartRepository.getCartById(cartId);
    if (!cart) throw new Error('Cart not found');
    let total = 0;
    const purchasedProducts = [];
    const notPurchased = [];
    for (const item of cart.products) {
      const product = await ProductRepository.getProductById(item.product._id);
      if (product && product.stock >= item.quantity) {
        // Update stock
        await ProductRepository.updateProduct(product._id, { stock: product.stock - item.quantity });
        purchasedProducts.push({ product: product._id, quantity: item.quantity });
        total += product.price * item.quantity;
      } else {
        notPurchased.push({ product: item.product._id, quantity: item.quantity });
      }
    }
    if (purchasedProducts.length === 0) throw new Error('No products could be purchased due to insufficient stock');
    // Generate unique code for ticket
    const code = 'TICKET-' + Date.now() + '-' + Math.floor(Math.random() * 10000);
    const ticket = await TicketRepository.createTicket({
      code,
      amount: total,
      purchaser: purchaserEmail,
      products: purchasedProducts,
      status: notPurchased.length === 0 ? 'completed' : 'pending'
    });
    // Optionally, update cart to remove purchased products
    cart.products = notPurchased;
    await cart.save();
    return { ticket: new TicketDTO(ticket), notPurchased };
  }
}
export default CartService; 