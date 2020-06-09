const session = require('express-session');

const knexSessionStore = require('connect-session-knex')(session);
const express = require('express');
const helmet = require('helmet');
const cors = require("cors");

const restricted = require('./auth/restricted-middleware');
const userRouter = require('./router.js');
const authRouter = require("./auth/auth-router.js")
const server = express();



const sessionConfig = {
  name: 'session1',
  secret: 'secret',
  cookie: {
    maxAge: 1000 * 60 * 60,
    secure: false, // should be true in production
    httpOnly: true
  },
  resave: false,
  saveUninitialized: false,

  store: new knexSessionStore(
    {
      knex: require("./Data/dbConfig.js"),
      tablename: "sessions",
      sidfieldname: "sid",
      createtable: true,
      clearInterval: 1000 * 60 * 60
    }
  )
}
server.use(express.json());
server.use(helmet());
server.use(cors());

server.use(session(sessionConfig));
server.use('/api/users',restricted, userRouter);
server.use('/api/auth', authRouter);


server.get('/', (req, res) => {
  res.send(`<h2>Let's write some !</h2>`);
});






module.exports = server;




