import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Logo from "../assets/saas logo.jpg";
import { AuthContext } from '../context/AuthContext'; // Import the AuthContext

const Header = () => {
    const { user, logoutUser } = useContext(AuthContext); // Get user and logoutUser from context

    return (
        <header className="flex justify-between items-center p-4 border-b">
            <Link to="/">
                <img src={Logo} alt="Company Logo" className="h-10" />
            </Link>
            <div className="flex space-x-4">
                {user ? (
                    // If user is logged in, show the logout button
                    <button
                        onClick={logoutUser}
                        className="text-blue-600"
                    >
                        Logout
                    </button>
                ) : (
                    // If user is not logged in, show login/register links
                    <>
                        <Link to="/login" className="text-blue-600">Login</Link>
                        <Link to="/register" className="text-blue-600">Register</Link>
                    </>
                )}
            </div>
        </header>
    );
};

export default Header;
