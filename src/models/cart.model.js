import { Schema, model } from "mongoose";

const cartCollection = "carts";

const cartSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  products: [
    {
      num: {
        type: Number,
        required: true
      },
      title: {
        type: String,
        required: true
      },
      price: {
        type: Number,
        required: true,
        min: 0
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
        default: 1
      }
    }
  ],
  total: {
    type: Number,
    default: 0,
    min: 0
  },
  num: {
    type: Number,
    required: true,
    unique: true
  }
}, { 
  versionKey: false,
  timestamps: true
});

const cartModel = model(cartCollection, cartSchema);
export default cartModel; 