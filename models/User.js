const mongoose = require('mongoose');


// Define the main user schema
const userSchema = new mongoose.Schema({
    name: {
        type:String
    },
    email:  {
        type:String
    },
    password:  {
        type:String
    },
    number:{
        type:String
    }, 
    account:[
        {
            type:String
        }
    ],
    avatar:{
        type:Object
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;