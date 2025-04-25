require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const path = require('path');

// import routers and middleware
const router = require("./routers/index");
const errorHandler = require("./middleware/ErrorHandlingMiddleware");

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(fileUpload({}));
app.use(express.static(path.resolve(__dirname, 'static')));


// all API routes 
app.use("/api", router); 

//middleware with errors should be ALWAYS at the end
app.use(errorHandler);


// Start server

const start = async () => {
  try {
 // connect to MongoDB
    await mongoose.connect(process.env.MDB_CONNECT, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(PORT, () => console.log(`server started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();