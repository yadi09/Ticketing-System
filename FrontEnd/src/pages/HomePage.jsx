import React, { Component } from 'react';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Login from './auth/Login';
import Register from './auth/Register';

class HomePage extends Component {
    render() {
        return (
            <div className="flex flex-col min-h-screen">
                <Header />
                <NavBar />
                <main className="flex-grow p-4">
                    <h1 className="text-center text-2xl font-bold">Frequently Asked Questions</h1>
                    {/* list of frequently asked questions */}
                </main>
                <Footer />
            </div>
        );
    }
}

export default HomePage;