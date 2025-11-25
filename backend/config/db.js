const mongoose = require('mongoose');
require('dotenv').config(); // Load .env file

//An async function that helps to connect to Db
const initDB = async() => {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("DB connection successful!");
    } catch (err){
        console.log("Cannot connect to DB", err);
        process.exit(1); // Immediately stops the execution of node.js process
    }
};

module.exports = initDB;