import React from 'react';
import HomePage from './pages/HomePage';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Ticket from './pages/TicketPage';
import Tickets from './pages/TicketsPage';
import ViewTicket from './pages/ViewTicket';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/ticket" element={<Ticket />} />
        <Route path="/tickets" element={<Tickets />} />
        <Route path="/tickets/:id" element={<ViewTicket />} />
      </Routes>
    </Router>
  );
}

export default App;