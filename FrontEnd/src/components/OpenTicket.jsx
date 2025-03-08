import React, { useState, useContext } from "react";
import { TicketContext } from "../context/TicketContext"; // Import TicketContext

const OpenTicket = ({ user }) => {
    const { handleCreateTicket } = useContext(TicketContext); // Get the createTicket function from context

    // State for form fields
    const [formData, setFormData] = useState({
        subject: "",
        department: "",
        relatedService: "",
        priority: "Medium", // Default priority
        message: "",
    });

    // State for success/error messages
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Add user info to the ticket data
            const ticketData = {
                ...formData,
                user: user._id,
            };

            // Call the API to create a ticket using the context function
            const response = await handleCreateTicket(ticketData);

            console.log("response....", response);
            // Check for errors
            if (response.success === false) {
                // Display error message
                setMessage(response.message || "Failed to create ticket");
                setIsError(true);
            } else {
                // Display success message
                setMessage(response.message || "Ticket created successfully");
                setIsError(false);
            }


            // Clear the form (optional)
            setFormData({
                subject: "",
                department: "",
                relatedService: "",
                priority: "Medium",
                message: "",
            });
        } catch (error) {
            // Display error message
            setMessage(error.response?.data?.message || "Failed to create ticket");
            setIsError(true);
        }
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="border-b pb-2 mb-4">
                <h1 className="text-2xl font-bold">Open Ticket</h1>
            </div>
            <form className="space-y-4" onSubmit={handleSubmit}>
                <input type="hidden" name="status" value="open" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="Name" className="block text-sm font-medium text-gray-700">Name</label>
                        <input type="text" name="name" id="Name" value={user.name} disabled className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                    </div>
                    <div>
                        <label htmlFor="Email" className="block text-sm font-medium text-gray-700">Your Email Address</label>
                        <input type="email" name="email" id="Email" value={user.email} disabled className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                    </div>
                </div>
                <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
                    <input
                        type="text"
                        name="subject"
                        id="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label htmlFor="department" className="block text-sm font-medium text-gray-700">Department</label>
                        <select
                            name="department"
                            id="department"
                            value={formData.department}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        >
                            <option value="">Select Department</option>
                            <option value="Technical">Technical</option>
                            <option value="General">General</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="relatedService" className="block text-sm font-medium text-gray-700">Related Service</label>
                        <select
                            name="relatedService"
                            id="relatedService"
                            value={formData.relatedService}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        >
                            <option value="">Select Related Service</option>
                            <option value="CRM & Sales">CRM & Sales</option>
                            <option value="Purchasing">Purchasing</option>
                            <option value="Finance">Finance</option>
                            <option value="Inventory Management">Inventory Management</option>
                            <option value="Manufacturing">Manufacturing</option>
                            <option value="Warehouse">Warehouse</option>
                            <option value="Human Resource">Human Resource</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="priority" className="block text-sm font-medium text-gray-700">Priority</label>
                        <select
                            name="priority"
                            id="priority"
                            value={formData.priority}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        >
                            <option value="">Select Priority</option>
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                    </div>
                </div>
                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                    <textarea
                        name="message"
                        id="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    ></textarea>
                </div>
                <div className="flex space-x-4">
                    <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md">Open Ticket</button>
                    <button type="reset" className="bg-gray-500 text-white px-4 py-2 rounded-md">Reset</button>
                </div>
                {message && (
                    <p className={`mt-4 text-sm ${isError ? "text-red-500" : "text-green-500"}`}>
                        {message}
                    </p>
                )}
            </form>
        </div>
    );
};

export default OpenTicket;
