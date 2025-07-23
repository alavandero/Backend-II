// /src/repositories/user.repository.js

import userModel from "../models/user.model.js";

class UserRepository {
  constructor() {
    this.model = userModel;
  }

  async create(userData) {
    return await this.model.create(userData);
  }

  async getAll() {
    return await this.model.find().select('-password');
  }

  async getById(id) {
    return await this.model.findById(id).select('-password');
  }

  async getByEmail(email) {
    return await this.model.findOne({ email });
  }

  async getByNum(num) {
    return await this.model.findOne({ num }).select('-password');
  }

  async getByResetToken(token) {
    return await this.model.findOne({ 
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: new Date() }
    });
  }

  async updateById(id, updateData) {
    return await this.model.updateOne({ _id: id }, updateData);
  }

  async updateByNum(num, updateData) {
    return await this.model.updateOne({ num }, updateData);
  }

  async deleteById(id) {
    return await this.model.deleteOne({ _id: id });
  }

  async deleteByNum(num) {
    return await this.model.deleteOne({ num });
  }

  async findByIdAndUpdate(id, updateData) {
    return await this.model.findByIdAndUpdate(id, updateData, { new: true }).select('-password');
  }
}

export default UserRepository; 