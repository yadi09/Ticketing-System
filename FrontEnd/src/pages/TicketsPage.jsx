import React from 'react';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import RecentTicket from '../components/RecentTicket';
import Support from '../components/Support';
import TableComponent from '../components/TableComponent';

const Tickets = () => {
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
                    <TableComponent />
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default Tickets;