import React, { useState } from 'react';

const RecentTicket = ({ tickets = [] }) => {
    const [isOpen, setIsOpen] = useState(true);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    // Sort tickets by date (most recent first) and take the top 3
    const recentTickets = [...tickets]
        .filter(ticket => ticket.createdAt) // Ensure createdAt exists
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sort by date (descending)
        .slice(0, 3); // Get top 3

    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex justify-between items-center cursor-pointer" onClick={toggleDropdown}>
                <h3 className="text-lg font-semibold">
                    <i className="fas fa-ticket-alt text-blue-500"></i>
                    <span className="ml-2">Recent Tickets</span>
                </h3>
                <i className={`fas fa-angle-down ${isOpen ? 'transform rotate-180' : ''}`}></i>
            </div>
            {isOpen && (
                <div className="mt-2 space-y-2">
                    {recentTickets.map(ticket => (
                        <a key={ticket.id} href="#" className="block p-2 hover:bg-gray-100 rounded">
                            <div className="text-blue-600">{ticket.subject}</div>
                            <small className="text-gray-500">
                                <span>
                                    {ticket.createdAt ?
                                        new Date(ticket.createdAt).toLocaleDateString('en-US', {
                                            weekday: 'long',
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })
                                        : "N/A"}
                                </span>
                                <span className="ml-2 text-red-500">{ticket.status}</span>
                            </small>
                        </a>
                    ))}
                </div>
            )}
        </div>
    );
};

export default RecentTicket;