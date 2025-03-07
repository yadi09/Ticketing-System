import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema(
    {
        subject: { type: String, required: true, trim: true },
        department: { type: String, enum: ["Technical", "General"], required: true },
        relatedService: {
            type: String,
            enum: [
                "CRM & Sales",
                "Purchasing",
                "Finance",
                "Inventory Management",
                "Manufacturing",
                "Warehouse",
                "Human Resource"
            ],
            required: true
        },
        priority: { type: String, enum: ["Low", "Medium", "High"], default: "Medium" },
        message: { type: String, required: true, trim: true },
        status: { type: String, enum: ["Open", "Pending", "Closed"], default: "Open" },

        // Single admin reply with edit functionality
        adminReply: {
            message: { type: String, trim: true, default: "" },
            updatedAt: { type: Date, default: Date.now }, // Stores last edit timestamp
            adminUser: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
        },

        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true }
    },
    { timestamps: true }
);

export default mongoose.model("Ticket", ticketSchema);
