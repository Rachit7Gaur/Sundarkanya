import jwt from "jsonwebtoken";
import config from "../config/config.js";

export const protect = (req,res,next)=>{
  console.log("Authorization header:", req.headers.authorization);
  
   const authHeader = req.headers.authorization;

   if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ 
      message: "No token provided" 
    });
  }

  const token = authHeader.split(" ")[1];

  if(!token){
    return res.status(401).json({
      message: "No token found"
    })
  }
  

  try{
    const decoded = jwt.verify(token , config.JWT_SECRET);

    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ 
      message: "Invalid token" 
    });
  }
}

export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  };
};