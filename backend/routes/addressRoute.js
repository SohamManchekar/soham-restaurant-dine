const express = require('express');
const { createUserAddress, updateUserAddress, removeUserAddress, setUserDefaultAddress } = require('../controllers/addressController');
const addressRouter = express.Router();

// * USER ADDRESS PANEL *


// CREATE USER ADDRESS FOR ORDER VIA USER_ID
addressRouter.put("/add/:userId",createUserAddress)

// UPDATE USER ADDRESS FOR ORDER VIA USER_ID
addressRouter.put("/update/:userId",updateUserAddress)

// REMOVE USER ADDRESS VIA USER-ID
addressRouter.put("/remove/:userId",removeUserAddress)

// SET DEFAULT ADDRESS VIA USER-ID
addressRouter.put("/change/:userId",setUserDefaultAddress)

module.exports = addressRouter