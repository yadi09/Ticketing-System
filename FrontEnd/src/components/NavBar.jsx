import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NavBar extends Component {
    render() {
        const userName = "Yadamzer"; // This can be dynamically set based on login
        return (
            <nav className="flex justify-between items-center p-4 bg-[rgb(0,122,255)]">
                <div className="flex space-x-4">
                    <Link to="/tickets" className="text-white">Your Tickets</Link>
                    <Link to="/ticket" className="text-white">Open Ticket</Link>
                </div>
                <span className="text-white">Welcome {userName}</span>
            </nav>
        );
    }
}

export default NavBar;