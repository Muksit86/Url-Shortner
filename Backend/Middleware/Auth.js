import jwt from 'jsonwebtoken'

export const AuthMiddleware = async (req, res, next) =>{   
    const authHeadre = req.headers['authorization']
    const token = authHeadre && authHeadre.split(' ')[1]
    
    if(!token) return res.status(401).json({message: 'Access token is missing', isExpired:true})

    jwt.verify(token, process.env.JWT_SECRET, (error, user) =>{
        if(error) return res.status(403).json({ message: 'Invalid token' })
        req.user = user
        next()
    })   
}