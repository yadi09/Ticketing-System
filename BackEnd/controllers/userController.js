import User from "../models/User.js";

// Register User
export const registerUser = async (req, res) => {
    try {
        const { FullName, email, password } = req.body;

        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Create user (password will be hashed by the pre-save middleware)
        const user = new User({ FullName, email, password });

        await user.save();

        // Generate access token
        const accessToken = user.generateAccessToken();

        // Send the token in the response
        res.status(201).json({ message: "User registered successfully", accessToken });
    } catch (error) {
        console.error("Error during user registration:", error);
        res.status(500).json({ error: error.message });
    }
};

// Login User
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid email or password" });

        // Use the matchPassword method to compare passwords
        const isMatch = await user.matchPassword(password);
        if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

        // Generate access token
        const accessToken = user.generateAccessToken();

        // Send tokens to frontend
        res.status(200).json({
            message: "Login successful",
            accessToken,
            user: { id: user._id, name: user.FullName, email: user.email, role: user.role },
        });

    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Something went wrong. Please try again." });
    }
};
