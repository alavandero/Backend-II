class ProductDTO {
  constructor(product) {
    this.id = product._id;
    this.title = product.title;
    this.description = product.description;
    this.price = product.price;
    this.stock = product.stock;
    this.category = product.category;
    this.code = product.code;
    this.status = product.status;
    this.thumbnails = product.thumbnails;
    this.owner = product.owner;
  }
}
export default ProductDTO; 