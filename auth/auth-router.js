const bcrypt = require('bcryptjs')

const express = require('express');
  const db= require('../Data/usersdb.js');

const router = express.Router();

// router.post('/register', (req, res) => {
  
//     let user= req.body;
//     const hash = bcrypt.hashSync(user.password, 8);

//     user.password = hash;

//     db.add(user)
//     .then(d => {
//       res.status(200).json(d);
//     })
//     .catch(error => {
//       // log error to database
//       console.log(error);
//       res.status(500).json({
//         message: 'Error registering to the db',
//       });
//     });
//   });

 

  router.post('/register', async (req, res) => {

    const user = req.body;

    const hash = bcrypt.hashSync(user.password, 8);
    user.password = hash;

    try {
        const saved = await db.add(user);
        res.status(201).json(saved);
    } catch (err) {
        res.status(500).json(error);
    }
});

  router.post('/login', async (req, res) => {
    let { username, password } = req.body;

    try {
        const user = await db.findBy({ username }).first();
      
        if (user && bcrypt.compareSync(password, user.password)) {

            req.session.user = user;
            res.status(200).json({ message: `Welcome ${user.username}!` });
        } else {
            res.status(401).json({ message: 'invalid credentials' });
        }
    } catch (err) {   
        res.status(500).json(err);
    }
});

//   router.delete('/logout', (req, res) => {
//     if (req.session) {
     
//         req.session.destroy((err) => {
//             if (err) {
//                 res.status(400).json({ message: 'error logging out:', error: err });
//             } else {
//                 res.json({ message: 'logged out' });
//             }
//         });
//     } else {
//         res.end();
//     }
// });



module.exports = router;