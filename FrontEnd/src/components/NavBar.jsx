import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const NavBar = () => {
    const { currentUser } = useContext(AuthContext);

    return (
        <nav className="flex justify-between items-center p-4 bg-[rgb(0,122,255)]">
            {currentUser ? (
                <>
                    <div className="flex space-x-4">
                        <Link to="/tickets" className="text-white">
                            {currentUser?.role === "admin" ? "All Tickets" : "Your Tickets"}
                        </Link>

                        {/* Only show "Open Ticket" for regular users */}
                        {currentUser?.role !== "admin" && (
                            <Link to="/ticket" className="text-white">Open Ticket</Link>
                        )}

                        {/* Only show "Create User" for admins */}
                        {currentUser?.role === "admin" && (
                            <Link to="/create-user" className="text-white">Create User</Link>
                        )}
                    </div>

                    <span className="text-white">
                        Welcome {currentUser?.name || "Guest"}
                    </span>
                </>
            ) : (
                // SaaS tagline when no user is logged in
                <div className="text-white text-lg font-semibold mx-auto">
                    "Empowering businesses with seamless SaaS solutions."
                </div>
            )}
        </nav>
    );
};

export default NavBar;
