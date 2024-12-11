const mongoose = require('mongoose');

// Fetch MongoDB URI from environment variables
const mongo_uri = process.env.MONGO_URL;

// Function to connect to MongoDB
const connectMongo = async () => {
  try {
    await mongoose.connect(mongo_uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Connected to MongoDB successfully...");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    // Exit the application on DB connection failure
    process.exit(1);
  }
};

// Export the function for use in other files
module.exports = connectMongo;