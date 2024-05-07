const express = require('express')
const mongoose = require('mongoose')
const cors = require("cors")
const UserModel = require("./models/User")
const settingsModel = require('./models/UserData');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')


const app = express()
app.use(express.json())
app.use(cors())
mongoose.connect("mongodb://localhost:27017/Recipe-Suggestor")


app.use('/auth/user', async (req, res, next) => {
    // console.log("Hello,user");
    const token = req.header("Authorization");
    if (!token) {
        return res.status(401).json({ message: "Unauthorizedd HTTP,Token not Provided" })
    }
    const jwtToken = token.replace("Bearer ", '').trim();
    // console.log(jwtToken)

    try {
        const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);
        const userData = await UserModel.findOne({ name: isVerified.name }).select({ password: 0 });
        console.log(userData);
        req.user = userData;
        req.token = token;
        req.userID = userData._id;


        next();
    } catch (error) {
        console.log(`Error is  : ${error}`)
        return res.status(500).json({ message: "Internal server error" })
    }
})

app.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;

    const existingUser = await UserModel.findOne({ name });

    if (existingUser) {
        return res.status(400).json({ message: 'Username already exists' });
    }

    const hashpassword = await bcrypt.hash(password, 10);

    // console.log(hashpassword)

    try {
        const user = await UserModel.create({ name, email, password: hashpassword })
        if (user) {
            return res.json({ message: "success", user, token: await user.generate_token() })
        }
    }
    catch (err) {
        console.log(err);
    }
})


app.post('/login', async (req, res) => {
    const { name, password } = req.body;

    const validuser = await UserModel.findOne({ name });
    // console.log(validuser, validuser.password)
    
    if (validuser) {
        const isPasswordValid = await bcrypt.compare(password, validuser.password);
        if (isPasswordValid) {
            const Settings= await settingsModel.findOne({name});
            console.log(validuser.generate_token())
            res.json({ token: await validuser.generate_token(),Settings:Settings, message: 'User login success' });
        } else res.status(400).json({ message: 'Invalid Password' });

    } else return res.status(400).json({ message: 'Username does not exists' });
})


app.post('/settings', async (req, res) => {

    const name = req.body.name;
    const data = req.body.data;
    const Setting = await settingsModel.findOne({ name })
    console.log(name,data)
    if (Setting) {
        Setting.userSettings = data;
        try {
            let x=await Setting.save();
            return res.status(200).json("Successful")
        }
        catch (err) {
            console.log(`there is some error : ${err}`);
            return res.status(500).json("server error")
        }
    }
    else {

        try {
            const user = await settingsModel.create({ name, userSettings: data })
            if (user) {
                return res.status(200).json({ message: "success" })
            }
        }
        catch (err) {
            console.log(`there is some error : ${err}`);
            return req.status(500).json("server error")
        }

    }

})




app.get('/auth/user', async (req, res) => {
    try {
        const userData = req.user;
        return res.status(200).json({ userData });

    } catch (error) {
        console.log(`there is some error : ${error}`)
        res.status(500).json("server error")

    }
})

app.listen(3001, () => {
    console.log("server is listing at port 3001")
})
