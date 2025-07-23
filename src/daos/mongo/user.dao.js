import UserModel from '../../models/user.model.js';

class UserDAO {
  async createUser(userData) {
    try {
      return await UserModel.create(userData);
    } catch (error) {
      throw new Error('Error creating user: ' + error.message);
    }
  }

  async findByEmail(email) {
    try {
      return await UserModel.findOne({ email });
    } catch (error) {
      throw new Error('Error finding user by email: ' + error.message);
    }
  }

  async findById(id) {
    try {
      return await UserModel.findById(id);
    } catch (error) {
      throw new Error('Error finding user by ID: ' + error.message);
    }
  }

  async updateUser(id, updateData) {
    try {
      return await UserModel.findByIdAndUpdate(id, updateData, { new: true });
    } catch (error) {
      throw new Error('Error updating user: ' + error.message);
    }
  }

  async deleteUser(id) {
    try {
      return await UserModel.findByIdAndDelete(id);
    } catch (error) {
      throw new Error('Error deleting user: ' + error.message);
    }
  }

  async findAll(filter = {}) {
    try {
      return await UserModel.find(filter);
    } catch (error) {
      throw new Error('Error finding users: ' + error.message);
    }
  }
}

export default new UserDAO(); 