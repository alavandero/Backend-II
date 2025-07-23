import { Schema, model } from "mongoose";

const ticketCollection = "tickets";

const ticketSchema = new Schema({
  code: {
    type: String,
    required: true,
    unique: true
  },
  purchase_datetime: {
    type: Date,
    default: Date.now
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  purchaser: {
    type: String,
    required: true
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
        min: 1
      }
    }
  ]
}, { 
  versionKey: false,
  timestamps: true
});

const ticketModel = model(ticketCollection, ticketSchema);
export default ticketModel; 