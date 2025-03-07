import React, { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { TicketContext } from '../context/TicketContext';
import { AuthContext } from '../context/AuthContext';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import TicketInfo from '../components/TicketInfo';
import Support from '../components/Support';
import TicketDetail from '../components/TicketDetail';
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const ViewTicket = () => {
    const { id } = useParams(); // Get ticket ID from URL
    const { selectedTicket, fetchTicketById, loading, error } = useContext(TicketContext);
    const { currentUser } = useContext(AuthContext); // Use currentUser from context

    useEffect(() => {
        fetchTicketById(id);
    }, [id]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen text-blue-600 text-lg">
                <AiOutlineLoading3Quarters className="animate-spin mr-2 text-3xl" />
                Loading ticket details...
            </div>
        );
    }
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <NavBar />
            <section className="flex flex-col lg:flex-row p-4 gap-4 flex-grow">
                <div className="w-full lg:w-1/4 space-y-4">
                    {selectedTicket && <TicketInfo ticket={selectedTicket} />}
                    <Support />
                </div>
                <div className="w-full lg:w-3/4">
                    {selectedTicket ? (
                        <TicketDetail ticket={selectedTicket} currentUser={currentUser} />
                    ) : (
                        <div>Ticket not found</div>
                    )}
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default ViewTicket;
