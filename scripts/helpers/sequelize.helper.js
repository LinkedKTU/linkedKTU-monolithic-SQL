const { Sequelize } = require('sequelize');
require('dotenv').config(); // Load environment variables from .env file



const sequelize = new Sequelize(
    process.env.DB_NAME, // Database name
    process.env.DB_USER, // Username
    process.env.DB_PASSWORD, // Password
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'mysql',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        },
        logging: console.log, // Enable logging to debug connection issues
    }
);

// Test the connection


module.exports = sequelize;
