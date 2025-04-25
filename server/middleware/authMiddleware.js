const jwt = require('jsonwebtoken')


module.exports = function (req, res, next) {
  //Allow options method to send request without authentication
  if(req.method === 'OPTIONS') {
    return next();
  }
  try{
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "Not authorized" });
    }
    // Expect the authorization header format to be: "Bearer <token>"
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Not authorized" });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    return next();
  }catch(e){
    console.error("JWT verification error: ", e)
    return res.status(401).json({message: 'Not authorized'})
  }
}