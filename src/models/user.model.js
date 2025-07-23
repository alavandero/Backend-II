import { Schema, model } from 'mongoose';

const userCollection = 'users';

const userSchema = new Schema({
  first_name: {
    type: String,
    required: true,
    trim: true
  },
  last_name: {
    type: String,
    required: true,
    trim: true
  },
  age: {
    type: Number,
    min: 0,
    max: 120
  },
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  cart: {
    type: Schema.Types.ObjectId,
    ref: "carts"
  },
  role: {
    type: String,
    enum: ["USER", "ADMIN", "PREMIUM", "GUEST"],
    default: "USER"
  },
  num: {
    type: Number,
    required: true,
    unique: true
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date
}, { 
  versionKey: false,
  timestamps: true
});

const userModel = model(userCollection, userSchema);
export default userModel; 