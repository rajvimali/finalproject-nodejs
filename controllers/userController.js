const User = require('../models/User');
const Product = require('../models/Product');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const nodemailer = require('nodemailer');

exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({ username, email, password });
    await user.save();
    // Send verification email...
    res.status(201).send('User account created. Please verify your email.');
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).send('Invalid credentials');
    }
    const token = jwt.sign({ id: user._id, role: user.role }, config.secret, {
      expiresIn: '1h',
    });
    res.cookie('token', token, { httpOnly: true });
    res.send('Login successful');
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.verifyEmail = async (req, res) => {
  // Verify email logic using nodemailer...
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('category subcategory brand');
    res.json(products);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
