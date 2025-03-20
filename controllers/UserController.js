const User = require('../models/User')
const jwt = require('jsonwebtoken');

module.exports.getUser=async function(req, res){
    console.log("get user Request"+req.user);
    const user=await User.findById(req.user._id);
    console.log('user get by rehydrate : '+user)
    return res.status(200).json({
        user:user,
    })
}

module.exports.registerUser = async (req, res) => {
    try {
        console.log('register user --> ' + req.body)
        const newUser = await User.create(req.body);
        console.log('new user is : '+newUser)
        return res.status(200).json({
            user: newUser,
            message: 'user created successfully !'
        })
    } catch (error) {
        console.log(' error while creating user : ' + error);
        return res.status(400).json({
            message: 'Error while creating user !'
        })
    }
}

module.exports.createSession = async function (req, res) {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user || req.body.password != user.password) {
            return res.status(422).json({
                message: "Invalid username/password"
            })
        }
        return res.status(200).json({
            message: "SignIn successful !",
            token: jwt.sign(user.toJSON(), process.env.SECRET_KEY, { expiresIn: "1d" })
            
        })
    } catch (error) {
        console.log("Error while signing in :" + error);
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}