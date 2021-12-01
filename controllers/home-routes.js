const router = require('express').Router();
const sequelize = require('../config/connection');
const { User } = require('../models');

router.get('/', (req, res) => {
  res.render('homepage');
})

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    // res.redirect('/dashboard');
    // return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  res.render('signup');
})

router.get('/contact-us', (req, res) => {
  res.render('contact-us');
})


module.exports = router;