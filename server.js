//entry point
//const express = require('express');//imports express library into my project
import express from 'express';//import express library into my project
import path from 'path';
//const path = require('path');//a utility to just help with file paths
//const { title } = require('process');
import posts from './routes/posts.js';
import logger from './midleware/logger.js'; //import logger middleware
import errorHandler from './midleware/error.js'; //import logger middleware
import notfound from './midleware/notfound.js';



const app = express();//initializing express into this variable,this is what we gonna use for everything.(to create routes,to create middleware,to start the server and also to listen on a port)
const portNum = process.env.PORT || 5050;//this is the port number that we are gonna use to listen on.and the port number is stored on the env file

//body parser middleware
app.use(express.json());//this takes care of being able to send raw json data
app.use(express.urlencoded({extended: false }));

//logger middleware
app.use(logger);


/*
//creating a simple rout
app.get('/', (req, res) => {
    //res.send('Hello world');//sends this respond to the browser.got to lovalhost:5000
    //we can even send jason data without having to stringify it 
    //res.send({message: 'Hello Innocent'});
});

//second rout
app.get('/about', (req, res) => {
    res.send('This is the about page')
});*/

/*
___first option
//using sending a file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));//allows us to join files and folders
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'about.html'));//allows us to join files and folders
});*/

/*
//___first option (creating static server)
//using sending a file
//setup static folder
app.use(express.static(path.join(__dirname, 'public')));//this is a middleware that allows us to serve static files from the public folder
*/


//Now working with json data
//we pretending that this is on the database and now we want to save these posts through the endpoints


//get all posts

//after moving routes to their files.
//routes
app.use('/api/posts', posts);

//catching url not found or page not found page.
app.use(notfound);

//error handler
app.use(errorHandler);

app.listen(portNum, () => console.log(`server is running on port ${portNum}`));

//middleware - are functions that have access to request and response objects. and they can litteraly do anything,can be used for logging, authentication and many more