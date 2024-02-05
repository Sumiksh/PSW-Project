/* global process */

const mongoose = require("mongoose");   
const logger = require('../logger');

async function connectDB() {
    try {
        mongoose.connect(process.env.MONGODB_URI);
        const connection = mongoose.connection;

        connection.on('connected', () => {
            logger.info('MongoDB connected successfully');
        })

        connection.on('error', (err) => {
            logger.error('MongoDB connection error. Please make sure MongoDB is running. ' + err);
            process.exit();
        })

    } catch (error) {
        logger.fatal('Something goes wrong!');
        logger.error(error);
        
    }

}

module.exports = connectDB;