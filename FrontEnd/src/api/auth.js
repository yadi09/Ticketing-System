import axios from "axios";

// Set your backend API URL
const API_BASE_URL = import.meta.env.REACT_APP_API_BASE_URL || "http://localhost:5000/api";

// Create an Axios instance
const API = axios.create({ baseURL: API_BASE_URL });

// Add a request interceptor to set the Authorization header
API.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Auth API
export const registerUser = (userData) => API.post("/auth/register", userData);
export const loginUser = (credentials) => API.post("/auth/login", credentials);

// Ticket API
export const createTicket = (ticketData) => API.post("/tickets", ticketData);
export const getTickets = () => API.get("/tickets");
export const getTicket = (id) => API.get(`/tickets/${id}`);
export const updateTicket = (id, ticketData) => API.put(`/tickets/${id}`, ticketData);

export default API;