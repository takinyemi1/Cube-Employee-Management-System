import jwt from 'jsonwebtoken';
import User from '../models/user.js'
import bcrypt from 'bcrypt'

const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});

        if (!user) {
            return res.status(404).json({
                success: false, 
                error: "User does not exist"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false, 
                error: "Incorrect password"
            });
        }

        const token = jwt.sign({
            _id: user._id,
            role: user.role},
            process.env.JWT_KEY, {expiresIn: "10d"} // expires in 10 days
        );

        res.status(200).json({
            success: true,
            token,
            user: {
                _id: user._id,
                name: user.name,
                role: user.role
            },
        });

    } catch(error) {
        return res.status(500).json({
            success: false, error: error.message
        })
    }
}

const verify = (req, res) => {
    return res.status(200).json({
        success: true, 
        user: req.user
    })
}

// ensure the res status is returned

export {login, verify}