// const auth = require('../middleware/auth');
// const jwt = require('jsonwebtoken');
// const config = require('config');
// const bcrypt = require('bcrypt');
const _ = require('lodash');
// const {User, validate} = require('../models/user');
const {User} = require('../models/user');
// const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const users = await User.find().sort('name');
  console.log("Debugging info request received.")
  console.log(users);
  res.send(users);
});

module.exports = router; 
