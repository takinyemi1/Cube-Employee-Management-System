import jwt from 'jsonwebtoken'
import User from '../models/user.js'

// verify the user
const verifyUser = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];

        if (!token) {
            return res.status(404).json({
                success: false, 
                error: "Token not provided"
            })
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_KEY
        )

        if (!decoded) {
            return res.status(404).json({
                success: false, 
                error: "Token not provided"
            })   
        }

        const user = await User.findById({_id: decoded._id}).select('-password')

        if (!user) {
            // if user does not exist
            return res.status(404).json({
                success: false, 
                error: "User does not exist"
            }) 
        }

        req.user = user
        next()

    } catch(error) {
        // check the token -> pass from frontend
        return res.status(500).json({
            success: false, 
            error: "Server Error"
        }) 
    }
}

export default verifyUser