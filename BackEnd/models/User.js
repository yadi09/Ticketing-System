import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
    {
        FullName: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: { type: String, enum: ["user", "admin"], default: "user" },
        refreshToken: { type: String },
    },
    { timestamps: true }
);

// Remove password from user object
userSchema.methods.toJSON = function () {
    const user = this.toObject();
    delete user.password;
    return user;
}

// Generate Access Token
userSchema.methods.generateAccessToken = function () {
    return jwt.sign({ userId: this._id, role: this.role }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE || "1d", // Default to 1 day if not set
    });
};

// Match password
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Encrypt password before saving
userSchema.pre("save", async function (next) {
    try {
        // Only hash the password if it's been modified
        if (!this.isModified("password")) {
            return next(); // No need to hash if the password hasn't changed
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);

        next(); // Continue with the save process
    } catch (error) {
        next(error); // Pass the error to the next middleware (error handler)
    }
}
);

export default mongoose.model("User", userSchema);
