import React, { useState } from 'react';

const RecentTicket = () => {
    const [isOpen, setIsOpen] = useState(true);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const tickets = [
        { id: 461327, title: 'PHP Configuration', status: 'Closed', date: '7 months ago' },
        { id: 509838, title: "I can't access my plesk C...", status: 'Closed', date: '8 months ago' },
        { id: 550463, title: 'Accessing via SSH', status: 'Closed', date: '8 months ago' },
    ];

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
                    {tickets.map(ticket => (
                        <a key={ticket.id} href="#" className="block p-2 hover:bg-gray-100 rounded">
                            <div className="text-blue-600">{ticket.title}</div>
                            <small className="text-gray-500">
                                <span>{ticket.date}</span>
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