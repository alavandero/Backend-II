import ProductRepository from '../repositories/product.repository.js';

class ProductService {
  async createProduct(productData) {
    // Check for duplicate code
    const existing = await ProductRepository.getProductByCode(productData.code);
    if (existing) throw new Error('Product code already exists');
    return await ProductRepository.createProduct(productData);
  }
  async getProductById(id) {
    const product = await ProductRepository.getProductById(id);
    if (!product) throw new Error('Product not found');
    return product;
  }
  async getProductByCode(code) {
    const product = await ProductRepository.getProductByCode(code);
    if (!product) throw new Error('Product not found');
    return product;
  }
  async updateProduct(id, updateData) {
    const updated = await ProductRepository.updateProduct(id, updateData);
    if (!updated) throw new Error('Product not found or update failed');
    return updated;
  }
  async deleteProduct(id) {
    const deleted = await ProductRepository.deleteProduct(id);
    if (!deleted) throw new Error('Product not found or delete failed');
    return deleted;
  }
  async getAllProducts(filter = {}) {
    return await ProductRepository.getAllProducts(filter);
  }
}
export default new ProductService(); 