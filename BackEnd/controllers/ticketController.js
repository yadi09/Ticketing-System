import Ticket from "../models/ticketModel.js";

// Create a new ticket
export const createTicket = async (req, res) => {
    try {
        console.log(req.body);
        const { subject, department, relatedService, priority, message } = req.body;

        const ticket = new Ticket({
            user: req.user.userId,
            subject,
            department,
            relatedService,
            priority,
            message,
        });

        await ticket.save();
        res.status(201).json({ success: true, message: "Ticket created successfully", ticket });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

// Get all tickets
export const getAllTickets = async (req, res) => {
    try {
        let tickets;

        if (req.user.role === "admin") {
            tickets = await Ticket.find().populate("user", "email");
        } else {
            tickets = await Ticket.find({ user: req.user.userId }).populate("user", "email");
        }
        res.status(200).json({ success: true, tickets });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

// Update a ticket
export const updateTicket = async (req, res) => {
    try {
        const { status } = req.body;
        const { id } = req.params;
        const { adminReply } = req.body;

        const ticket = await Ticket.findById(id);
        if (!ticket) {
            return res.status(404).json({ success: false, message: "Ticket not found" });
        }

        // Only admins can update the ticket
        if (req.user.role !== "admin") {
            return res.status(403).json({ success: false, message: "Access denied" });
        }

        // Update the admin reply and status
        ticket.status = status;
        ticket.adminReply.message = adminReply;
        ticket.adminReply.updatedAt = Date.now();

        await ticket.save();
        res.status(200).json({ success: true, message: "Ticket updated successfully", ticket });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

// Get a single ticket
export const viewTicket = async (req, res) => {
    try {
        const { id } = req.params;

        const ticket = await Ticket.findById(id).populate("user", "email");
        if (!ticket) {
            return res.status(404).json({ success: false, message: "Ticket not found" });
        }
        res.status(200).json({ success: true, ticket });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};