import React, { Component } from 'react';
import Logo from "../assets/saas logo.jpg";
import { Link } from 'react-router-dom';

class Header extends Component {
    render() {
        const { userName } = this.props;
        return (
            <header className="flex justify-between items-center p-4 border-b">
                <Link to="/">
                    <img src={Logo} alt="Company Logo" className="h-10" />
                </Link>
                <div className="flex space-x-4">
                    <Link to="/login" className="text-blue-600">Login</Link>
                    <Link to="/register" className="text-blue-600">Register</Link>
                </div>
            </header>
        );
    }
}

export default Header;