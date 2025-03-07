import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // Extract the token from the header

    if (!token) {
        return res.status(401).json({ message: "No access token, please log in" });
    }
    try {
        // Verify the token and decode its payload
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach the decoded payload to req.user
        req.user = decoded;

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        return res.status(403).json({ message: "Invalid or expired token, please log in" });
    }
};
