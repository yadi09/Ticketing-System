import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import ticketRoutes from "./routes/ticketRoutes.js";
import { errorHandler } from "./middlewares/errorHandler.js";

dotenv.config();
connectDB();

const app = express();

// Serve static files (e.g., the React build)
app.use(express.static(path.join(__dirname, 'FrontEnd', 'dist')));

// Fallback route to serve index.html for any non-API request
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
