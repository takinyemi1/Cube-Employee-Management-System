// change "type" in package.json to "module"
import user from './models/user.js'
import bcrypt from 'bcrypt'
import connectToDatabase from './db/db.js'

const userRegister = async () => {
    connectToDatabase()
    try {
        const hashPassword = await bcrypt.hash("admin", 10)
        const newuser = new user ({
            name: "Admin",
            email: "admin@gmail.com",
            password: hashPassword,
            role: "admin"
        })
        
        await newuser.save()
        
    } catch(error) {
        console.log(error)
    }
}

userRegister();