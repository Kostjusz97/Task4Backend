const express = require('express');
const authRoutes = require('./auth');
const usersRoutes = require('./users');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', usersRoutes);
router.get('/', (req, res) => {
    res.send('Hello from the server!');
  });
  
module.exports = router;