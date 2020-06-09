const express = require('express');
  const db= require('./Data/usersdb.js');
  const restricted = require('./auth/restricted-middleware')

const router = express.Router();

router.get("/", restricted, (req, res) => {
  db.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

module.exports = router;


