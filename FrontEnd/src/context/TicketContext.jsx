import { createContext, useState, useEffect } from "react";
import { createTicket, getTickets as apiGetTickets, getTicket, updateTicket as apiUpdateTicket } from "../api/auth";

export const TicketContext = createContext();

export const TicketProvider = ({ children }) => {
    const [tickets, setTickets] = useState([]);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    // Function to create a new ticket
    const handleCreateTicket = async (ticketData) => {
        try {
            setLoading(true);
            const response = await createTicket(ticketData);
            setTickets((prev) => [...prev, response.data]);
            setLoading(false);
            fetchTickets(); // Fetch fresh tickets after creating a new ticket
            return { success: true, message: "Ticket created successfully!" };
        } catch (error) {
            setError(error.response?.data?.message || "Failed to create ticket");
            setLoading(false);
            return { success: false, message: error.response?.data?.message || "Failed to create ticket" };
        }
    };

    // Function to fetch all tickets
    const fetchTickets = async () => {
        try {
            setLoading(true);
            const response = await apiGetTickets();
            setTickets(response.data.tickets);
            setLoading(false);
        } catch (error) {
            setError(error.response?.data?.message || "Failed to fetch tickets");
            setLoading(false);
        }
    };

    // Function to fetch a single ticket by ID
    const fetchTicketById = async (id) => {
        try {
            setLoading(true);
            const response = await getTicket(id);
            setSelectedTicket(response.data.ticket);
            setLoading(false);
        } catch (error) {
            setError(error.response?.data?.message || "Failed to fetch ticket");
            setLoading(false);
        }
    };

    // Function to update the ticket (for admins)
    const updateTicket = async (ticketId, updatedData) => {
        try {
            setLoading(true);
            const response = await apiUpdateTicket(ticketId, updatedData);
            // Optionally update the ticket list after updating the ticket
            setTickets((prevTickets) =>
                prevTickets.map((ticket) =>
                    ticket._id === ticketId ? { ...ticket, ...response.data.ticket } : ticket
                )
            );
            setSuccess("Ticket updated successfully!");
            setLoading(false);
        } catch (error) {
            setError(error.response?.data?.message || "Failed to update ticket");
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTickets();
    }, []);

    return (
        <TicketContext.Provider
            value={{
                fetchTickets,
                setTickets,
                tickets,
                selectedTicket,
                loading,
                error,
                success,
                handleCreateTicket,
                fetchTicketById,
                updateTicket, // Providing the updateTicket function
            }}
        >
            {children}
        </TicketContext.Provider>
    );
};
