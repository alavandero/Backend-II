// /src/config/index.js

import dotenv from "dotenv";
dotenv.config();

export default { 
  PORT: process.env.PORT || 8080,
  MONGO_URI: process.env.MONGO_URI || "mongodb://127.0.0.1:27017/backend_ii_complete",
  JWT_SECRET: process.env.JWT_SECRET || "your-secret-key",
  MAIL_HOST: process.env.MAIL_HOST || "smtp.gmail.com",
  MAIL_USER: process.env.MAIL_USER,
  MAIL_PASS: process.env.MAIL_PASS,
  MAIL_FROM: process.env.MAIL_FROM || process.env.MAIL_USER,
  FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:3000"
} 