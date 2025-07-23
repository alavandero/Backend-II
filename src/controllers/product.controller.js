import ProductService from '../services/product.service.js';
import ProductDTO from '../DTO/product.DTO.js';

class ProductController {
  async create(req, res) {
    try {
      const product = await ProductService.createProduct(req.body);
      res.status(201).json(new ProductDTO(product));
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  async getById(req, res) {
    try {
      const product = await ProductService.getProductById(req.params.id);
      res.json(new ProductDTO(product));
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
  async getByCode(req, res) {
    try {
      const product = await ProductService.getProductByCode(req.params.code);
      res.json(new ProductDTO(product));
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
  async update(req, res) {
    try {
      const updated = await ProductService.updateProduct(req.params.id, req.body);
      res.json(new ProductDTO(updated));
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  async delete(req, res) {
    try {
      await ProductService.deleteProduct(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  async getAll(req, res) {
    try {
      const products = await ProductService.getAllProducts();
      res.json(products.map(p => new ProductDTO(p)));
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
export default new ProductController(); 