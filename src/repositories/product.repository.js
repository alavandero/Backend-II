import ProductDAO from '../daos/mongo/product.dao.js';

class ProductRepository {
  async getAllProducts(filter = {}) {
    return await ProductDAO.findAll(filter);
  }
  async getProductById(id) {
    return await ProductDAO.findById(id);
  }
  async getProductByCode(code) {
    return await ProductDAO.findByCode(code);
  }
  async createProduct(productData) {
    return await ProductDAO.createProduct(productData);
  }
  async updateProduct(id, updateData) {
    return await ProductDAO.updateProduct(id, updateData);
  }
  async deleteProduct(id) {
    return await ProductDAO.deleteProduct(id);
  }
}
export default new ProductRepository(); 