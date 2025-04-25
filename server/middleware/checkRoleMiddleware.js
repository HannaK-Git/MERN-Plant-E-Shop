const jwt = require("jsonwebtoken");

module.exports = function (requiredRole) {
  return (req, res, next) => {
    // Allow preflight requests without checking authorization
    if (req.method === "OPTIONS") {
      return next();
    }

    // Check if the authorization header exists
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "Not authorized" });
    }

    // Expected format: "Bearer <token>"
    const parts = authHeader.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer") {
      return res.status(401).json({ message: "Not authorized" });
    }

    const token = parts[1];

    try {
      // Verify token and extract payload
      const decoded = jwt.verify(token, process.env.SECRET_KEY);

      // Check if the user's role matches the required role
      if (decoded.role !== requiredRole) {
        return res.status(403).json({ message: "No access" });
      }

      // Attach the decoded payload to the request for downstream usage
      req.user = decoded;
      return next();
    } catch (error) {
      console.error("JWT verification error:", error);
      return res.status(401).json({ message: "Not authorized" });
    }
  };
};
