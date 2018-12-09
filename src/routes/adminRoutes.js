const express = require('express');

const { MongoClient } = require('mongodb');

const debug = require('debug')('app2:adminRoutes');

// setting up a router for link routing
const adminRouter = express.Router();

function router(nav) {
  // setting up dummy array with books for the books example
  const books = [
    {
      title: 'My first book',
      author: 'Jan Orbanz',
      genre: 'Belletristik',
      read: false
    },
    {
      title: 'My second book',
      author: 'Jan Orbanz',
      genre: 'Help the world',
      read: false
    }
  ];
  adminRouter.route('/')
    .get((req, res) => {

      const url = 'mongodb://localhost:27017';
      const dbName = 'libraryApp';

      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(url);
          debug('successfully connected to mongodb');

          const db = client.db(dbName);

          const response = await db.collection('books').insertMany(books);

          res.json(response);
        } catch (error) {
          debug(error.stack);
        }

        client.close();
      }());
    });

  return adminRouter;
}

module.exports = router;
