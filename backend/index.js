// Getting express
const express = require('express');
const app = express();

// getting env variable
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 5002;

// calling db-connection method from db.js
const connectMongo = require('./Models/db.js');

// We need body-parser for accepting the user input e.g username, password entered using the form
const bodyParser = require('body-parser');

// we also need to add cors
const cors = require('cors');


// Adding Authrouter
const AuthRouter = require('./Routes/AuthRouter.js');

// use body-parser middleware to process the req data
app.use(bodyParser.json());

//use cors to avoid cross origin conflicts ( backend in 5001 and frontend in 3000 )
app.use(cors());


// Lets create a path
app.get('/test', (req, res) => {
  res.send('Hello From Server');
})

//creating auth route
app.use('/auth', AuthRouter)


// Connect to MongoDB and start the server
const startServer = async () => {
  try {
    await connectMongo(); // Connect to the database
    app.listen(PORT, (err) => {
      if (err) {
        console.log(err.message)
      }
      else {
        console.log(`Server is running on PORT: ${PORT}`);
      }
    });
  } catch (err) {
    console.error("Failed to start server:", err.message);
  }
};

startServer(); // Call the function to initialize the server

