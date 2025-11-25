const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//Handles the logic for signup route - create a new user
exports.signup = async(req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = await User.create({ username, email, password });
        res.status(201).json({ message: "User created successfully.", user_id: user._id});
    } catch(err){
        res.status(400).json({ status: false, message: err.message});
    }

};

//Handles the logic for user login
exports.login = async(req, res) => {
    try {
        const { email, username, password } = req.body;

        if (!password || (!email && !username)) {
            return res.status(400).json({ status: false, message: "Username or email and password are required" });
        }
        
        let user;
        if (email) user = await User.findOne({ email });
        else if (username) user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json({ status: false, message: "Invalid username or password.." });
        }    

        //compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({ status: false, message: "Invalid username or password!!"});
        }

        //JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.status(200).json({ message: "Login successful.", jwt_token: token});
    } catch(error){
        res.status(500).json({ status: false, message: error.message });

    }
};