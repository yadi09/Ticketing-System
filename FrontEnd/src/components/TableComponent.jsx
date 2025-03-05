import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import mockData from './mockData.json'; // Import the mock data

const TableComponent = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const ticketsPerPage = 10;
    const navigate = useNavigate(); // Initialize useNavigate

    // Global search: Filter tickets based on search term across all fields
    const filteredTickets = mockData.filter(ticket =>
        Object.values(ticket).some(value =>
            String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    // Pagination logic
    const indexOfLastTicket = currentPage * ticketsPerPage;
    const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;
    const currentTickets = filteredTickets.slice(indexOfFirstTicket, indexOfLastTicket);

    const totalPages = Math.ceil(filteredTickets.length / ticketsPerPage);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1); // Reset to the first page when searching
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handleRowClick = (id) => {
        navigate(`/tickets/${id}`); // Navigate to the single ticket page
    };

    const getBadgeColor = (value) => {
        switch (value) {
            case 'High': return 'bg-red-500';
            case 'Medium': return 'bg-yellow-500';
            case 'Low': return 'bg-green-500';
            case 'Open': return 'bg-blue-500';
            case 'Closed': return 'bg-gray-500';
            default: return 'bg-gray-500';
        }
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="border-b pb-2 mb-4">
                <h1 className="text-2xl font-bold">Open Tickets</h1>
            </div>
            <div>
                {/* Global Search Input */}
                <div className="mb-4">
                    <label>
                        <input
                            type="search"
                            placeholder="Search tickets..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </label>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="py-2 px-4 border">Department</th>
                                <th className="py-2 px-4 border">Subject</th>
                                <th className="py-2 px-4 border">Priority</th>
                                <th className="py-2 px-4 border">Status</th>
                                <th className="py-2 px-4 border">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentTickets.map((ticket) => (
                                <tr
                                    key={ticket.id}
                                    onClick={() => handleRowClick(ticket.id)} // Add click handler
                                    className="hover:bg-gray-100 cursor-pointer"
                                >
                                    <td className="py-2 px-4 border">{ticket.department}</td>
                                    <td className="py-2 px-4 border">{ticket.subject}</td>
                                    <td className="py-2 px-4 border">
                                        <span className={`px-2 py-1 rounded-full text-white ${getBadgeColor(ticket.priority)}`}>
                                            {ticket.priority.toUpperCase()}
                                        </span>
                                    </td>
                                    <td className="py-2 px-4 border">
                                        <span className={`px-2 py-1 rounded-full text-white ${getBadgeColor(ticket.status)}`}>
                                            {ticket.status.toUpperCase()}
                                        </span>
                                    </td>
                                    <td className="py-2 px-4 border">{new Date(ticket.date).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex justify-between items-center mt-4">
                    <div>
                        <span>
                            Showing {indexOfFirstTicket + 1} to {Math.min(indexOfLastTicket, filteredTickets.length)} of {filteredTickets.length} tickets
                        </span>
                    </div>
                    <div className="flex space-x-2">
                        <button
                            onClick={goToPreviousPage}
                            disabled={currentPage === 1}
                            className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50"
                        >
                            Previous
                        </button>
                        <span className="px-4 py-2">
                            Page {currentPage} of {totalPages}
                        </span>
                        <button
                            onClick={goToNextPage}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TableComponent;