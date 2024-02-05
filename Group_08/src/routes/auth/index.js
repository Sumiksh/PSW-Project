/* global process */
// JWT and Content-Type
const jwt = require('jsonwebtoken');
//const contentType = require('content-type');

const bcryptjs = require('bcryptjs');

// logger
const logger = require('../../logger');

// User Model
const User = require('../../models/userModel');

// // JSON Body Parser
 const jsonBody = require('../../helper/jsonBodyParser');


// Express and Router
const express = require('express');
const router = express.Router();

// Getting success response
const { createSuccessResponse, createErrorResponse } = require('../../response');

router.post('/login', jsonBody(), (req, res) => {
  // Get the payload from the request body
  const payload = { user: req.body.email };
  // Sign the payload using the JWT_SECRET from the .env file
  const token = jwt.sign(payload, process.env.JWT_SECRET);
  // Return the token to the client
  res.status(200).json(
    createSuccessResponse({
      message: 'Login successful',
      token: token,
    })
  );
});

router.post('/register', jsonBody(), async (req, res) => {
  try {
    const { email, password, firstName, lastName, PSW } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      console.log({user})
      res.status(400).json(createErrorResponse({ message: 'User already exists' }));
      return;
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      PSW,
    });

    newUser.save().then((user) => {
      logger.debug(`User created: ${user}`);
      logger.info(`User created`);
      res.status(201).json(createSuccessResponse({ message: 'User created' }));
    });
  } catch (error) {
    console.log(error);
    logger.error(`Error creating user: ${error}`);
    res.status(500).json(createErrorResponse({ message: 'Error creating user' }));
  }
});

module.exports = router;
