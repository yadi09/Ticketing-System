import React, { useState, useContext } from 'react';
import { TicketContext } from '../context/TicketContext'; // Import the TicketContext

const TicketDetail = ({ ticket, currentUser }) => {
    console.log("Ticket...", ticket)
    const { updateTicket, loading, success, error } = useContext(TicketContext); // Get context values
    const [adminReply, setAdminReply] = useState(ticket.adminReply?.message || "");
    const [status, setStatus] = useState(ticket.status);

    // Determine notification color based on ticket status
    const getNotificationColor = (status) => {
        switch (ticket.status) {
            case 'Open': return 'bg-green-200 text-green-800';
            case 'Pending': return 'bg-yellow-200 text-yellow-800';
            case 'Closed': return 'bg-red-200 text-red-800';
            default: return 'bg-gray-200 text-gray-800';
        }
    };

    // Handle admin updates (status + reply)
    const handleUpdateTicket = async () => {
        const data = { status, adminReply };
        await updateTicket(ticket._id, data); // Call the context's updateTicket method
    };

    return (
        <div className="space-y-6">
            {/* Title */}
            <div className="border-b pb-2">
                <h1 className="text-2xl font-bold">View Ticket</h1>
            </div>

            {/* Notification (Status of the ticket) */}
            <div className={`p-4 rounded-lg ${getNotificationColor(ticket.status)}`}>
                <span className="font-semibold">{ticket.status}</span>
            </div>

            {/* User Ticket Message */}
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <div className="flex items-center space-x-4">
                    <i className="fas fa-user text-2xl text-blue-500"></i>
                    <div>
                        <span className="block font-semibold">{ticket.user.email || "User Name"}</span>
                        <span className="block text-sm text-gray-500">{ticket.user.role || "Unknown"}</span>
                    </div>
                </div>
                <div className="mt-4">
                    <textarea
                        className="w-full p-3 border rounded-lg focus:outline-none"
                        rows="5"
                        value={ticket.message}
                        readOnly
                    />
                </div>
            </div>

            {/* Admin Reply Section */}
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <div className="flex items-center space-x-4">
                    <i className="fas fa-user text-2xl text-green-500"></i>
                    <div>
                        <span className="block font-semibold">{ticket.adminName || "Unknown"}</span>
                        <span className="block text-sm text-gray-500">{ticket.adminRole || "Admin"}</span>
                    </div>
                </div>

                {/* Admin Controls (Editable for Admins) */}
                {currentUser.role === "admin" ? (
                    <>
                        {/* Status Dropdown */}
                        <div className="mt-4">
                            <label className="block font-semibold">Update Status:</label>
                            <select
                                className="w-full p-2 border rounded-lg focus:outline-none"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option value="Open">Open</option>
                                <option value="Pending">Pending</option>
                                <option value="Closed">Closed</option>
                            </select>
                        </div>

                        {/* Admin Reply Input */}
                        <div className="mt-4">
                            <label className="block font-semibold">Admin Reply:</label>
                            <textarea
                                className="w-full p-3 border rounded-lg focus:outline-none"
                                rows="5"
                                value={adminReply}
                                onChange={(e) => setAdminReply(e.target.value)}
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            onClick={handleUpdateTicket}
                            disabled={loading}
                        >
                            {loading ? "Updating..." : "Update Ticket"}
                        </button>

                        {/* Success/Error Messages */}
                        {error && <p className="mt-2 text-red-500">{error}</p>}
                        {success && <p className="mt-2 text-green-500">{success}</p>}
                    </>
                ) : (
                    // Read-Only Admin Reply for Users
                    <div className="mt-4">
                        <textarea
                            className="w-full p-3 border rounded-lg focus:outline-none"
                            rows="5"
                            value={ticket.adminReply?.message || "No reply yet."}
                            readOnly
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default TicketDetail;
