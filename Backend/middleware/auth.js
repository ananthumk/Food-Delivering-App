import jwt from 'jsonwebtoken';

const userMiddleware = async(req, res, next) => {
    try {
        const {token} = req.headers
        
        if(!token) {
            return res.status(401).json({success: false, message: "No token provided"})
        }
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.userId = decoded.id
        next()
    } catch(error) {
        console.log("Token verification failed:", error)
        return res.status(401).json({success: false, message: 'Invalid or expired token'})
    }   
}

export default userMiddleware