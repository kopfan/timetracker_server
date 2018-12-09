const express = require('express');

const { MongoClient } = require('mongodb');

const debug = require('debug')('app2:authRoutes');

// setting up a router for link routing
const authRouter = express.Router/*  */();

function router(nav) {
  authRouter.route('/signup')
    .post((req, res) => {
      debug(req.body);

      const url = 'mongodb://localhost:27017';
      const dbName = 'libraryApp';

      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(url);
          debug('successfully connected to mongodb');

          const db = client.db(dbName);

          const response = await db.collection('users').insertOne({ username: req.body.username, password: req.body.password });

          res.json(response);
        } catch (error) {
          debug(error.stack);
        }

        client.close();
      }());
    });

  return authRouter;
}

module.exports = router;
