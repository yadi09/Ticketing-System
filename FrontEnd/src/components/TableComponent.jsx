import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdOutlineErrorOutline } from 'react-icons/md'; // You can use any icon library

const TableComponent = ({ tickets }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const ticketsPerPage = 10;
    const navigate = useNavigate();

    // Global search: Filter tickets based on search term across all fields
    const filteredTickets = tickets.filter(ticket =>
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
        navigate(`/tickets/${id}`);
    };

    const getBadgeColor = (value) => {
        switch (value) {
            case 'High': return 'bg-red-500';
            case 'Medium': return 'bg-yellow-500';
            case 'Low': return 'bg-green-500';
            case 'Open': return 'bg-blue-500';
            case 'Pending': return 'bg-yellow-500';
            case 'Closed': return 'bg-gray-500';
            default: return 'bg-gray-500';
        }
    };

    // Helper function to safely convert string to uppercase
    const safeToUpperCase = (value) => {
        return value && typeof value === 'string' ? value.toUpperCase() : value;
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="border-b pb-2 mb-4">
                <h1 className="text-2xl font-bold">Open Tickets</h1>
            </div>

            {/* Search Input */}
            <div className="mb-4">
                <input
                    type="search"
                    placeholder="Search tickets..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Empty state when no tickets are available */}
            {filteredTickets.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8">
                    <MdOutlineErrorOutline size={50} className="text-gray-400" />
                    <p className="text-lg text-gray-500 mt-2">No tickets found</p>
                </div>
            ) : (
                <>
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
                                        key={ticket._id}
                                        onClick={() => handleRowClick(ticket._id)}
                                        className="hover:bg-gray-100 cursor-pointer"
                                    >
                                        <td className="py-2 px-4 border">{ticket.department}</td>
                                        <td className="py-2 px-4 border">{ticket.subject}</td>
                                        <td className="py-2 px-4 border">
                                            <span className={`px-2 py-1 rounded-full text-white ${getBadgeColor(ticket.priority)}`}>
                                                {safeToUpperCase(ticket.priority)}
                                            </span>
                                        </td>
                                        <td className="py-2 px-4 border">
                                            <span className={`px-2 py-1 rounded-full text-white ${getBadgeColor(ticket.status)}`}>
                                                {safeToUpperCase(ticket.status)}
                                            </span>
                                        </td>
                                        <td className="py-2 px-4 border">
                                            {ticket.createdAt ?
                                                new Date(ticket.createdAt).toLocaleDateString('en-US', {
                                                    weekday: 'long',
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })
                                                : "N/A"}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-between items-center mt-4">
                        <span>
                            Showing {indexOfFirstTicket + 1} to {Math.min(indexOfLastTicket, filteredTickets.length)} of {filteredTickets.length} tickets
                        </span>
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
                </>
            )}
        </div>
    );
};

export default TableComponent;
