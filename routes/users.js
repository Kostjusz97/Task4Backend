const express = require('express');
const isAuthenticated = require('../middleware/isAuthenticated');
const sequelize = require('../config/database');
const User = require('../models/user')(sequelize);

const router = express.Router();


router.get('/', (req, res) => {
  console.log('Users route hit');
  User.findAll()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Internal Server Error');
    });
});

router.delete('/remove', (req, res) => {
  const userIds = req.body.userIds;

  User.destroy({
    where: {
      id: userIds,
    },
  })
    .then(() => {
      res.status(204).send();
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Internal Server Error');
    });
});

router.put('/status', (req, res) => {
  const userIds = req.body.userIds;
  const newStatus = req.body.status;

  User.update(
    { status: newStatus },
    { where: { id: userIds } }
  )
    .then(() => {
      res.status(200).send('Status updated successfully');
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Internal Server Error');
    });
});

module.exports = router;
