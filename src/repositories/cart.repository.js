import CartDAO from '../daos/mongo/cart.dao.js';

class CartRepository {
  async getAllCarts(filter = {}) {
    return await CartDAO.findAll(filter);
  }
  async getCartById(id) {
    return await CartDAO.findById(id);
  }
  async createCart(cartData) {
    return await CartDAO.createCart(cartData);
  }
  async updateCart(id, updateData) {
    return await CartDAO.updateCart(id, updateData);
  }
  async deleteCart(id) {
    return await CartDAO.deleteCart(id);
  }
}
export default new CartRepository(); 