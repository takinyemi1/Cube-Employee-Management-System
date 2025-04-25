import user from './models/user.js'
import bcrypt from 'bcrypt'
import connectToDatabase from './db/db.js'

const userRegister = async () => {
    connectToDatabase()
    try {
        const hashPassword = await bcrypt.hash("admin", 10)
        const newuser = new user ({
            name: "Administrator",
            email: "akinyemi713@gmail.com",
            password: hashPassword,
            role: "admin"
        })
        
        await newuser.save()
    } catch(error) {
        console.log(error)
    }
}

userRegister();