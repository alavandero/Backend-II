import CartModel from '../../models/cart.model.js';

class CartDAO {
  async createCart(cartData) {
    return await CartModel.create(cartData);
  }
  async findById(id) {
    return await CartModel.findById(id).populate('products.product');
  }
  async updateCart(id, updateData) {
    return await CartModel.findByIdAndUpdate(id, updateData, { new: true }).populate('products.product');
  }
  async deleteCart(id) {
    return await CartModel.findByIdAndDelete(id);
  }
  async findAll(filter = {}) {
    return await CartModel.find(filter).populate('products.product');
  }
}
export default new CartDAO(); 