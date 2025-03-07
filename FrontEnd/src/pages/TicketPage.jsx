import React from 'react';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import OpenTicket from '../components/OpenTicket';
import Footer from '../components/Footer';
import RecentTicket from '../components/RecentTicket';
import Support from '../components/Support';

const Ticket = () => {
    // Mock user data
    const user = {
        _id: "67ca37618086d8b09ba4d904",
        name: "Yadi",
        email: "yadi@gmail.com",
    };
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <NavBar />
            <section className="flex flex-col lg:flex-row p-4 gap-4 flex-grow">
                {/* Left Side: Recent Tickets and Support */}
                <div className="w-full lg:w-1/4 space-y-4">
                    <RecentTicket />
                    <Support />
                </div>

                {/* Right Side: Open Ticket Form */}
                <div className="w-full lg:w-3/4">
                    <OpenTicket user={user} />
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default Ticket;