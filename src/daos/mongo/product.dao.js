import ProductModel from '../../models/product.model.js';

class ProductDAO {
  async createProduct(productData) {
    return await ProductModel.create(productData);
  }
  async findById(id) {
    return await ProductModel.findById(id);
  }
  async findByCode(code) {
    return await ProductModel.findOne({ code });
  }
  async updateProduct(id, updateData) {
    return await ProductModel.findByIdAndUpdate(id, updateData, { new: true });
  }
  async deleteProduct(id) {
    return await ProductModel.findByIdAndDelete(id);
  }
  async findAll(filter = {}) {
    return await ProductModel.find(filter);
  }
}
export default new ProductDAO(); 