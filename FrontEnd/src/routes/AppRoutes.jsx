import React from 'react';
import HomePage from '../pages/HomePage';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import Ticket from '../pages/TicketPage';
import Tickets from '../pages/TicketsPage';
import ViewTicket from '../pages/ViewTicket';
import TableComponent from '../components/TableComponent';
import PrivateRoute from './PrivateRoute';
import { Route, Routes, Navigate } from 'react-router-dom';

function AppRoutes() {
    return (
        <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Private Routes */}
            <Route element={<PrivateRoute />}>
                <Route path="/ticket" element={<Ticket />} />
                <Route path="/table" element={<TableComponent />} />
                <Route path="/tickets" element={<Tickets />} />
                <Route path="/tickets/:id" element={<ViewTicket />} />
            </Route>

            {/* Redirect unknown routes to login */}
            <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
    );
}

export default AppRoutes;