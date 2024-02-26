const express = require('express');
const passport = require('passport');
const sequelize = require('../config/database');
const User = require('../models/user')(sequelize);

const router = express.Router();

router.post('/login', 
  (req, res, next) => {
    const { username, password } = req.body;

    User.findOne({
      where: {
        username: username,
      },
    })
      .then(user => {
        if (!user) {
          return res.status(401).json({ error: 'Authentication failed. User not found.' });
        }

        if (user.status === 'blocked') {
          return res.status(403).json({ error: 'Authentication failed. User is blocked.' });
        }
        
        passport.authenticate('local', { failureRedirect: '/login' });
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
      });
  },
  (req, res) => {
    const userId = req.user.id;

    User.update(
      { lastLoginDate: new Date() },
      { where: { id: userId } }
    )
    .then(user => {
      res.json({user})
    })
      .catch(err => {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
      });
  }
);




router.post('/register', (req, res) => {
    const request  = req.body;
  const { username, email, password } = req.body;
  const registrationDate = new Date();

  console.log('Received registration request:',request);

  User.create({
    username: username,
    email: email,
    password: password,
    registrationDate: registrationDate,
    lastLoginDate: registrationDate,
    status: 'active',
  })
    .then(user => {
      res.json({user})
    })
    .catch(err => {
      console.error(err);
    });
});

module.exports = router;