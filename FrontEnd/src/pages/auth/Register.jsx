import React, { useState, useContext } from "react";
import image from "../../assets/image.png";
import Header from "../../components/Header";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext"; // Import AuthContext

const Register = () => {
    const navigate = useNavigate();
    const { handleRegister } = useContext(AuthContext); // Consume handleRegister from context

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    // Handle input change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        // Basic validation
        if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword) {
            setError("All fields are required.");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            setLoading(true);
            await handleRegister({
                FullName: formData.fullName,
                email: formData.email,
                password: formData.password,
            });
            navigate("/login"); // Redirect to login after successful registration
        } catch (err) {
            setError(err || "Registration failed.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Header />
            <NavBar />
            <section className="min-h-screen flex items-center justify-center font-mono">
                <div className="flex shadow-md rounded-2xl">
                    {/* Form Section */}
                    <div className="flex flex-col items-center justify-center text-center p-10 bg-white rounded-2xl xl:rounded-tr-none xl:rounded-br-none">
                        <h1 className="text-4xl font-bold mb-4">Register</h1>

                        {error && <p className="text-red-500">{error}</p>}

                        <form className="flex flex-col text-lg text-left gap-4 w-72" onSubmit={handleSubmit}>
                            <div>
                                <label>Full Name</label>
                                <input
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    className="rounded-md p-2 border-2 outline-none w-full focus:border-blue-500 focus:bg-slate-50"
                                />
                            </div>

                            <div>
                                <label>Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="rounded-md p-2 border-2 outline-none w-full focus:border-blue-500 focus:bg-slate-50"
                                />
                            </div>

                            <div>
                                <label>Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="rounded-md p-2 border-2 outline-none w-full focus:border-blue-500 focus:bg-slate-50"
                                />
                            </div>

                            <div>
                                <label>Confirm Password</label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className="rounded-md p-2 border-2 outline-none w-full focus:border-blue-500 focus:bg-slate-50"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="px-10 py-2 text-xl rounded-md bg-blue-600 hover:bg-blue-700 text-white transition duration-300"
                            >
                                {loading ? "Registering..." : "Register"}
                            </button>
                        </form>

                        <p className="mt-4">
                            Already have an account?{" "}
                            <Link to="/login" className="text-blue-500 hover:underline">
                                Login
                            </Link>
                        </p>
                    </div>

                    {/* Image Section */}
                    <img
                        src={image}
                        alt="Register Avatar"
                        className="w-[450px] object-cover xl:rounded-tr-2xl xl:rounded-br-2xl xl:block hidden"
                    />
                </div>
            </section>
            <Footer />
        </>
    );
};

export default Register;
