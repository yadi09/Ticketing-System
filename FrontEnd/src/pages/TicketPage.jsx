import React, { useContext } from "react";
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import OpenTicket from '../components/OpenTicket';
import Footer from '../components/Footer';
import RecentTicket from '../components/RecentTicket';
import Support from '../components/Support';
import { TicketContext } from '../context/TicketContext';
import { AuthContext } from "../context/AuthContext";


const Ticket = () => {
    const { tickets } = useContext(TicketContext);
    const { currentUser } = useContext(AuthContext);

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <NavBar />
            <section className="flex flex-col lg:flex-row p-4 gap-4 flex-grow">
                {/* Left Side: Recent Tickets and Support */}
                <div className="w-full lg:w-1/4 space-y-4">
                    <RecentTicket tickets={tickets} />
                    <Support />
                </div>

                {/* Right Side: Open Ticket Form */}
                <div className="w-full lg:w-3/4">
                    <OpenTicket user={currentUser} />
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default Ticket;