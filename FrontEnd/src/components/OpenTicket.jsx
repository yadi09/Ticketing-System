import React from 'react';

const OpenTicket = () => {
    const UserName = "Yadamzer Terefe";
    const UserEmail = "yadamzerterefe09@gmail.com";

    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="border-b pb-2 mb-4">
                <h1 className="text-2xl font-bold">Open Ticket</h1>
            </div>
            <form className="space-y-4">
                <input type="hidden" name="status" value="open" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="Name" className="block text-sm font-medium text-gray-700">Name</label>
                        <input type="text" name="name" id="Name" value={UserName} disabled className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                    </div>
                    <div>
                        <label htmlFor="Email" className="block text-sm font-medium text-gray-700">Your Email Address</label>
                        <input type="email" name="email" id="Email" value={UserEmail} disabled className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                    </div>
                </div>
                <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
                    <input type="text" name="subject" id="subject" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label htmlFor="department" className="block text-sm font-medium text-gray-700">Department</label>
                        <select name="department" id="department" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                            <option value="">Select Department</option>
                            <option value="Technical">Technical</option>
                            <option value="Sales">Sales</option>
                            <option value="Marketing">Marketing</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="relatedService" className="block text-sm font-medium text-gray-700">Related Service</label>
                        <select name="relatedService" id="relatedService" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                            <option value="">Select Related Service</option>
                            <option value="Technical Support">Technical Support</option>
                            <option value="Sales Support">Sales Support</option>
                            <option value="Marketing Support">Marketing Support</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="priority" className="block text-sm font-medium text-gray-700">Priority</label>
                        <select name="priority" id="priority" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                            <option value="">Select Priority</option>
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                    </div>
                </div>
                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                    <textarea name="message" id="message" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"></textarea>
                </div>
                <div className="flex space-x-4">
                    <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md">Open Ticket</button>
                    <button type="reset" className="bg-gray-500 text-white px-4 py-2 rounded-md">Reset</button>
                </div>
            </form>
        </div>
    );
};

export default OpenTicket;