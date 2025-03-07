import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import ticketRoutes from "./routes/ticketRoutes.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();
connectDB();

const app = express();

// Get the current directory path
const __filename = fileURLToPath(import.meta.url);  // Convert URL to file path
const __dirname = path.dirname(__filename);  // Get the directory name

// Serve static files from the frontend (React) build folder
app.use(express.static(path.join(__dirname, 'FrontEnd', 'dist')));

// Catch-all route to serve index.html for all non-API requests
app.get('*', (req, res) => {
    res.sendFile(path.resolve('FrontEnd', 'dist', 'index.html'));
});

// Middleware
app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(cookieParser());

// Routes
app.use("/api/auth", userRoutes);
app.use("/api", ticketRoutes);

// Global error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
