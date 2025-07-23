import { Schema, model } from 'mongoose';

const productCollection = 'products';

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  code_bar: {
    type: String,
    unique: true,
    sparse: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  status: {
    type: Boolean,
    default: true
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  },
  category: {
    type: String,
    trim: true
  },
  thumbnails: [{
    type: String,
    trim: true
  }],
  num: {
    type: Number,
    required: true,
    unique: true
  }
}, { 
  versionKey: false,
  timestamps: true
});

const productModel = model(productCollection, productSchema);
export default productModel; 