// const auth = require('../middleware/auth');
// const jwt = require('jsonwebtoken');
// const config = require('config');
// const bcrypt = require('bcrypt');
const _ = require('lodash');
// const {User, validate} = require('../models/user');
const {User} = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const redirect="<br />Return to the <a href=\"../../\">main page</a>."

router.get('/', async (req, res) => {
  const users = await User.find().sort('name');
  // res.send(users);
  // console.log(users);
  // console.log(users.length);
  for (let i=0;i<users.length;i++){
    res.write("<b>"+users[i].name+"</b> - <i> Class of "+users[i].dateOfGraduation+"</i><br />");
    res.write("\""+users[i].bio+"\"<br /><br />");
  }
  res.end();
});

router.post('/', async (req, res) => {
  console.log("Adding user:")
  console.log(req.body);
  // const { error } = validate(req.body); 
  // if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send('User already registered.');

  user = new User(_.pick(req.body, ['name', 'email', 'dateOfGraduation', 'bio']));
  // const salt = await bcrypt.genSalt(10);
  // user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  res.write("User "+req.body.name+" added successfully!")
  res.write(redirect);
  res.end();

  // const token = user.generateAuthToken();
  // res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));
});

router.put('/', async (req, res) => {
  console.log("Updating user:")
  console.log(req.body);
  // const { error } = validate(req.body); 
  // if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('Email not registered.');

  // user = new User(_.pick(req.body, ['name', 'email', 'dateOfGraduation', 'bio']));
  // const salt = await bcrypt.genSalt(10);
  // user.password = await bcrypt.hash(user.password, salt);
  
  user.name=req.body.name;
  user.dateOfGraduation=req.body.dateOfGraduation;
  user.bio=req.body.bio;
  
  await user.save();

  res.write("User "+req.body.name+" updated successfully!")
  res.write(redirect);
  res.end();

  // const token = user.generateAuthToken();
  // res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));
});

router.delete('/', async (req, res) => {
  console.log("Deleting user:")
  console.log(req.body);
  // const { error } = validate(req.body); 
  // if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('Email not registered.');

  // user = new User(_.pick(req.body, ['name', 'email', 'dateOfGraduation', 'bio']));
  // const salt = await bcrypt.genSalt(10);
  // user.password = await bcrypt.hash(user.password, salt);
  
  User.deleteOne({ email: req.body.email });

  res.write("User "+req.body.name+" with email "+req.body.email+" deleted!")
  res.write(redirect);
  res.end();

  // const token = user.generateAuthToken();
  // res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));
});

module.exports = router; 
