class CartDTO {
  constructor(cart) {
    this.id = cart._id;
    this.products = cart.products;
    this.user = cart.user;
  }
}
export default CartDTO; 