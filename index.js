require("dotenv").config();
const express = require("express");
const cors = require("cors");
const passport = require('passport');
const passportJWT = require("./config/passport-jwt-strategy")
const db = require('./config/mongoose.js');
// Enable CORS
const corsOptions = {
  origin: [
    'https://onebox-email.onrender.com/',
    'http://localhost:5173'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ["Authorization", "Content-Type"],
  credentials: true
};

const app = express();
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.initialize());

app.use('/', require('./routes'));

app.listen(5000, (err) => {
    if(err){
      console.log(`Error while starting server : ${err}`)
    }else{
      console.log("Server running on port: 5000")
    }
});
