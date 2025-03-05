import React, { useState } from 'react';

const TicketInfo = ({ ticket }) => {
    const [isOpen, setIsOpen] = useState(true);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex justify-between items-center cursor-pointer" onClick={toggleDropdown}>
                <h3 className="text-lg font-semibold">
                    <i className="fas fa-ticket-alt text-blue-500"></i>
                    <span className="ml-2">Ticket Information</span>
                </h3>
                <i className={`fas fa-angle-down ${isOpen ? 'transform rotate-180' : ''}`}></i>
            </div>
            {isOpen && (
                <div className="mt-2 space-y-2">
                    <p>
                        <small className="text-gray-500">
                            <span>department</span>
                        </small>
                        <div className="text-blue-600">{ticket.department}</div>
                    </p>
                    <p>
                        <small className="text-gray-500">
                            <span>Subject</span>
                        </small>
                        <div className="text-blue-600">{ticket.subject}</div>
                    </p>
                    <p>
                        <small className="text-gray-500">
                            <span>Status</span>
                        </small>
                        <div className="text-blue-600">{ticket.status}</div> {/** add dynamic color for the status that changed based on the status value */}
                    </p>
                    <p>
                        <small className="text-gray-500">
                            <span>Date</span>
                        </small>
                        <div className="text-blue-600">{ticket.date}</div>
                    </p>
                </div>
            )}
        </div>
    );
};

export default TicketInfo;