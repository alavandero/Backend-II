// /src/utils/mailer.js

import nodemailer from "nodemailer";
import config from "../config/index.js";

const transporter = nodemailer.createTransport({
  host: config.MAIL_HOST,
  port: 587,
  secure: false,
  auth: {
    user: config.MAIL_USER,
    pass: config.MAIL_PASS,
  },
});

export async function sendPasswordResetEmail(to, resetLink) {
  const mailOptions = {
    from: config.MAIL_FROM,
    to,
    subject: "Restablece tu contraseña",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Solicitud de restablecimiento de contraseña</h2>
        <p>Haz clic en el botón para cambiar tu contraseña. El enlace expira en 1 hora.</p>
        <a href="${resetLink}" style="display: inline-block; padding: 12px 24px; background: #4CAF50; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0;">
          Restablecer Contraseña
        </a>
        <p style="color: #666; font-size: 14px;">Si no solicitaste este cambio, puedes ignorar este correo.</p>
      </div>
    `,
  };

  try {
    const result = await transporter.sendMail(mailOptions);
    console.log("✅ Password reset email sent successfully");
    return result;
  } catch (error) {
    console.error("❌ Error sending password reset email:", error);
    throw error;
  }
}

export async function sendWelcomeEmail(to, firstName) {
  const mailOptions = {
    from: config.MAIL_FROM,
    to,
    subject: "¡Bienvenido a nuestra plataforma!",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">¡Hola ${firstName}!</h2>
        <p>Te damos la bienvenida a nuestra plataforma. Tu cuenta ha sido creada exitosamente.</p>
        <p>Ya puedes comenzar a explorar nuestros productos y servicios.</p>
        <a href="${config.FRONTEND_URL}" style="display: inline-block; padding: 12px 24px; background: #007bff; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0;">
          Ir a la plataforma
        </a>
      </div>
    `,
  };

  try {
    const result = await transporter.sendMail(mailOptions);
    console.log("✅ Welcome email sent successfully");
    return result;
  } catch (error) {
    console.error("❌ Error sending welcome email:", error);
    throw error;
  }
}