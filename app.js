// Main file which triggers the application

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
// Import Routes
// authRoute contains routes for registration & login. I don't have any better name in my head.
const authRoute = require('./routes/auth');
const dashboard = require('./Private_Routes/dashboard');
const verify = require('./middleware/verifyToken');
const blogController = require('./controllers/blogController');

   
// 
dotenv.config();

// Connect to DB
mongoose.connect(process.env.DB_CONNECT,{useNewUrlParser: true, useUnifiedTopology:true, useFindAndModify:true},() => console.log('Connected to Database...'));

// Middleware
app.use(bodyParser.json());


// Routes MiddleWare
// Public Route
app.use('/api/user', authRoute);
// Show existing data from database
app.get('/api/showall', blogController.getAll);
// Private Route (Only authorized user can access.)
app.use('/api/dashboard',verify,dashboard);

// express doesn't consider not found 404 as an error so we need to handle 404 explicitly
// handle 404 error
app.use(function(req, res, next) {
    let err = new Error('Not Found');
       err.status = 404;
       next(err);
   });
   // handle errors
   app.use(function(err, req, res, next) {
    console.log(err);
    
     if(err.status === 404)
      res.status(404).json({message: "Not found"});
     else 
       res.status(500).json({message: "Something looks wrong :( !!!"});
   });






// Port on which server listens
const port = process.env.PORT ||  3000;

// Start App
app.listen(port,()=> console.log(`Server started and listening on ${port} ...`));