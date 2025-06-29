import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import passport from "passport";
import { initializedPassport } from "./config/passport.config.js";
import sessionsRouter from "./routes/sessions.router.js";
import usersRouter from "./routes/users.router.js";

const app = express();
const PORT = process.env.PORT || 8080;

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/backend_ii_complete")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// Initialize Passport
initializedPassport();
app.use(passport.initialize());

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/api/sessions", sessionsRouter);
app.use("/api/users", usersRouter);

// Health check
app.get("/", (req, res) => {
  res.json({ 
    message: "BackEnd II - Entrega N° 1: Complete JWT Authentication System",
    endpoints: {
      sessions: {
        register: "POST /api/sessions/register",
        login: "POST /api/sessions/login",
        current: "GET /api/sessions/current",
        logout: "POST /api/sessions/logout"
      },
      users: {
        getAll: "GET /api/users",
        getById: "GET /api/users/:id",
        create: "POST /api/users",
        update: "PUT /api/users/:id",
        delete: "DELETE /api/users/:id"
      }
    }
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error(error.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/`);
  console.log(`Sessions: http://localhost:${PORT}/api/sessions`);
  console.log(`Users: http://localhost:${PORT}/api/users`);
}); 