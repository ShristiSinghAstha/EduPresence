const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log("Full Authorization Header:", req.headers.authorization);

    console.log("Auth Header:", authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized - No Token" });
    }

    const token = authHeader.split(" ")[1];
    console.log("Token Received:", token);

    try {
        const payload = jwt.verify(token, "Astha");
        console.log("Decoded Payload:", payload);
        req.user = payload;
        next();
    } catch (error) {
        console.log("JWT Error:", error.message);
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};

module.exports =  verifyToken;
