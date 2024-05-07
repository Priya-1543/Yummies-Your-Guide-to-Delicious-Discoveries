const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})

UserSchema.methods.generate_token = async function () {
    try {
        return jwt.sign(
            { UserId: this._id.toString(), name: this.name },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn:"30d"
            }
        )
    }
    catch (err) {
        console.log(err)
    }
}

const UserModel = mongoose.model("user", UserSchema)

module.exports = UserModel