import React from 'react';
import { useParams } from 'react-router-dom'; // Import useParams to get the ticket ID
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import TicketInfo from '../components/TicketInfo';
import Support from '../components/Support';
import TicketDetail from '../components/TicketDetail';
import mockData from '../components/mockData.json'; // Import the mock data

const Ticket = () => {
    const { id } = useParams(); // Get the ticket ID from the URL

    // Find the ticket with the matching ID
    const ticket = mockData.find(ticket => ticket.id === parseInt(id));

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <NavBar />
            <section className="flex flex-col lg:flex-row p-4 gap-4 flex-grow">
                {/* Left Side: Recent Tickets and Support */}
                <div className="w-full lg:w-1/4 space-y-4">
                    <TicketInfo ticket={ticket} /> {/** pass the single ticket object to it */}
                    <Support />
                </div>

                {/* Right Side: Ticket Detail */}
                <div className="w-full lg:w-3/4">
                    {ticket ? (
                        <TicketDetail ticket={ticket} /> // Pass the ticket data to TicketDetail
                    ) : (
                        <div>Ticket not found</div> // Handle case where ticket is not found
                    )}
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default Ticket;