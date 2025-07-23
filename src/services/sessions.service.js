// /src/services/sessions.service.js

import { comparePassword } from "../utils/hash.js";
import { sendPasswordResetEmail } from "../utils/mailer.js";
import UserService from "./user.service.js";
import config from "../config/index.js";

const userService = new UserService();

class SessionService {
  async authenticateUser(email, password) {
    const user = await userService.getByEmail(email);
    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    const isValidPassword = comparePassword(password, user.password);
    if (!isValidPassword) {
      throw new Error("Contraseña incorrecta");
    }

    return user;
  }

  async createUser(userData) {
    return await userService.createUser(userData);
  }

  async setResetPasswordToken(email, token, expires) {
    return await userService.setResetPasswordToken(email, token, expires);
  }

  async sendRecoveryEmail(email, token) {
    const resetLink = `${config.FRONTEND_URL}/reset-password?token=${token}`;
    await sendPasswordResetEmail(email, resetLink);
  }

  async resetPassword(token, newPassword) {
    return await userService.resetPassword(token, newPassword);
  }
}

export default SessionService; 