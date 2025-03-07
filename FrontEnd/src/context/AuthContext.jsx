import { createContext, useState, useEffect } from "react";
import { loginUser, registerUser } from "../api/auth";
import { useNavigate } from "react-router-dom";

// Create Context
export const AuthContext = createContext();

// Auth Provider Component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("accessToken") || "");
    const navigate = useNavigate();

    // Load user from localStorage on app start
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (error) {
                console.error("Error parsing stored user:", error);
                localStorage.removeItem("user"); // Remove corrupted data
            }
        }
    }, []);

    // Get user from localStorage (Ensures availability)
    const currentUser = user || (() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            try {
                return JSON.parse(storedUser);
            } catch (error) {
                console.error("Error parsing stored user:", error);
                localStorage.removeItem("user"); // Remove corrupted data
                return null;
            }
        }
        return null;
    })();

    // Login function
    const handleLogin = async (credentials) => {
        try {
            const response = await loginUser(credentials);

            const { accessToken, user } = response.data;

            // Store in state
            setUser(user);
            setToken(accessToken);

            // Store in localStorage
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("user", JSON.stringify(user));

            // Redirect to tickets page
            navigate("/tickets");

        } catch (error) {
            console.error("Login error:", error.response?.data?.message || "An error occurred.");
            throw error.response?.data?.message || "Login failed. Please try again.";
        }
    };

    // Register function
    const handleRegister = async (userData) => {
        try {
            const response = await registerUser(userData);
            const { accessToken, user } = response.data;

            // Store in state
            setUser(user);
            setToken(accessToken);

            // Store in localStorage
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("user", JSON.stringify(user));

            // Redirect to login page
            navigate("/login");
        } catch (error) {
            console.error("Registration error:", error.response?.data?.message || "An error occurred.");
            throw error.response?.data?.message || "Registration failed. Please try again.";
        }
    };

    // Logout function
    const logoutUser = () => {
        setUser(null);
        setToken("");

        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");

        navigate("/login");
    };

    return (
        <AuthContext.Provider value={{ user, currentUser, token, handleLogin, logoutUser, handleRegister }}>
            {children}
        </AuthContext.Provider>
    );
};
