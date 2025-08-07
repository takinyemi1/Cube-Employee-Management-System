import bcrypt from 'bcrypt'

const plainPassword = 'admin';

bcrypt.hash(plainPassword, 10, function(err, hash) {
    if (err) {
        console.log(err);
    } else {
        console.log("Hashed Password: ", hash);
    }
}) 