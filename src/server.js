import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import passport from "passport";
import cors from "cors";
import config from "./config/index.js";
import { initializedPassport } from "./config/passport.config.js";
import sessionsRouter from "./routes/sessions.router.js";
import usersRouter from "./routes/users.router.js";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import ticketsRouter from "./routes/tickets.router.js";

const app = express();
const { PORT, MONGO_URI } = config;

// Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// Initialize Passport
initializedPassport();
app.use(passport.initialize());

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/api/sessions", sessionsRouter);
app.use("/api/users", usersRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/tickets", ticketsRouter);

// Health check
app.get("/health", (req, res) => {
  res.json({ 
    status: "OK",
    message: "BackEnd II - Complete JWT Authentication System",
    timestamp: new Date().toISOString(),
    endpoints: {
      sessions: {
        register: "POST /api/sessions/register",
        login: "POST /api/sessions/login",
        current: "GET /api/sessions/current",
        logout: "POST /api/sessions/logout",
        forgotPassword: "POST /api/sessions/forgot-password",
        resetPassword: "POST /api/sessions/reset-password"
      },
      users: {
        getAll: "GET /api/users",
        getById: "GET /api/users/:id",
        getByNum: "GET /api/users/num/:num",
        getByEmail: "GET /api/users/email/:email",
        create: "POST /api/users",
        updateById: "PUT /api/users/:id",
        updateByNum: "PUT /api/users/num/:num",
        deleteById: "DELETE /api/users/:id",
        deleteByNum: "DELETE /api/users/num/:num"
      },
      products: {
        getAll: "GET /api/products",
        getById: "GET /api/products/:id",
        create: "POST /api/products",
        update: "PUT /api/products/:id",
        delete: "DELETE /api/products/:id"
      },
      carts: {
        getAll: "GET /api/carts",
        getById: "GET /api/carts/:id",
        create: "POST /api/carts",
        addProduct: "POST /api/carts/:id/products",
        updateProduct: "PUT /api/carts/:id/products/:productId",
        deleteProduct: "DELETE /api/carts/:id/products/:productId",
        clear: "DELETE /api/carts/:id",
        purchase: "POST /api/carts/:id/purchase"
      }
    }
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error("❌ Error:", error.stack);
  res.status(500).json({ 
    status: "error", 
    message: "Something went wrong!",
    error: process.env.NODE_ENV === 'development' ? error.message : undefined
  });
});

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({ 
    status: "error", 
    message: "Route not found",
    path: req.originalUrl
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`🔐 Sessions: http://localhost:${PORT}/api/sessions`);
  console.log(`👥 Users: http://localhost:${PORT}/api/users`);
  console.log(`📦 Products: http://localhost:${PORT}/api/products`);
  console.log(`🛒 Carts: http://localhost:${PORT}/api/carts`);
}); 