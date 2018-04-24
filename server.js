/**
 * server.js : where the actions begins.
 *             this is the main file to initialize all the stuff. 
 */ 
// Imports
const express = require('express'); // using express framework to handle the routing system
const config = require('./config/constants'); // constants for port values, some message text, error codes etc
const apiRouter = require('./config/api_routes'); //  route pattern -> controller are defined in this file  

const app = express(); // initialize express

app.use(express.static('public')); // static content folder

apiRouter.api(app); // apiRouter component initialized with express stuff


// Server Startup
app.listen( config.HTTP_SERVER_PORT, () => {
 // Message showed when the server has been started up.    
 console.log('Server listening on port : ', config.HTTP_SERVER_PORT ); 
});
