const jwt = require("jsonwebtoken");
const JWT_SECRET = "fdghsdfhsk4953465!&*^(@$ehfwelrh43480"; // move to .env

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(401).json({message: "Access Denied"});
    }

    const token = authHeader.split(" ")[1];

    try{
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = {id: decoded.id};
        next();
    } catch(err){
        res.status(401).json({message: "Invalid token"});
    }
}

module.exports = authMiddleware;