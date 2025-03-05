import React from 'react';

const TicketDetail = ({ ticket }) => {
    // Determine the notification color and text based on the ticket status
    const getNotificationColor = (status) => {
        switch (status) {
            case 'Open': return 'bg-green-200 text-green-800';
            case 'Pending': return 'bg-yellow-200 text-yellow-800';
            case 'Closed': return 'bg-red-200 text-red-800';
            default: return 'bg-gray-200 text-gray-800';
        }
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
                        <span className="block font-semibold">{ticket.name || "User Name"}</span>
                        <span className="block text-sm text-gray-500">{ticket.role || "User"}</span>
                    </div>
                </div>
                <div className="mt-4">
                    <textarea
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows="5"
                        value={ticket.message}
                        readOnly
                    />
                </div>
            </div>

            {/* Admin Reply for the User message */}
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <div className="flex items-center space-x-4">
                    <i className="fas fa-user text-2xl text-green-500"></i>
                    <div>
                        <span className="block font-semibold">{ticket.adminName || "Admin Name"}</span>
                        <span className="block text-sm text-gray-500">{ticket.role || "Admin"}</span>
                    </div>
                </div>
                <div className="mt-4">
                    <textarea
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        rows="5"
                        value={ticket.adminReply || "No reply yet."}
                        readOnly
                    />
                </div>
            </div>
        </div>
    );
};

export default TicketDetail;