const express = require('express');
const app = express(); //sets up express app
app.use((req,res)=>{
    res.status(200).json({message: 'Hello World'});
}); //middleware

module.exports = app; //exports app to be used in server.js