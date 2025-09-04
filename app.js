
require('dotenv').config();

// External Module
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

// Local Module
const errorController = require("./controllers/errorController");
const sellerRouter = require('./routers/sellerRouter');
const authRouter = require('./routers/authRouter');
const { isLoggedIn, isSeller, isCustomer } = require('./middleware/auth');
const customerRouter = require('./routers/customerRouter');

const MONGO_DB_URL =`mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@airbnb.u9j8ctf.mongodb.net/${process.env.MONGO_DB_DATABASE}`;
  

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/auth', authRouter);
app.use('/api/seller', isLoggedIn,isSeller,sellerRouter);
// Public customer routes (no auth required)
app.use('/api/customer', isLoggedIn,isCustomer,customerRouter);
// Protected customer routes will be handled within the router

app.use(errorController.get404);

const PORT = process.env.PORT || 3000;
mongoose.connect(MONGO_DB_URL).then(() => {
  app.listen(PORT, () => {
    console.log(`Server running at: http://localhost:${PORT}`);
  });
})
.catch(err => {
  console.log("MongoDB connection error:",err);
});


