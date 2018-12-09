const express = require('express');

const { MongoClient, ObjectID } = require('mongodb');

const debug = require('debug')('app2:bookRoutes');

// setting up a router for link routing
const bookRouter = express.Router();

function router(nav) {
  /*   // setting up dummy array with books for the books example
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
    ]; */

  // make use of bookRouter
  bookRouter.route('/')
    .get((req, res) => {
      const url = 'mongodb://localhost:27017';
      const dbName = 'libraryApp';

      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(url);
          debug('successfully connected to mongodb');

          const db = client.db(dbName);

          const col = await db.collection('books');

          const books = await col.find().toArray();

          res.render(
            'bookListView',
            {
              nav,
              title: 'Library',
              books
            }
          );
        } catch (err) {
          debug(err.stack);
        }

        client.close();
      }());
    });

  bookRouter.route('/:id')
    .get((req, res) => {
      const url = 'mongodb://localhost:27017';
      const dbName = 'libraryApp';
      // short cut description for: const id = req.params.id came with ES6
      const { id } = req.params;

      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(url);
          debug('successfully connected to mongodb');

          const db = client.db(dbName);

          const col = await db.collection('books');

          const book = await col.findOne({ _id: ObjectID(id) });

          res.render(
            'bookView',
            {
              nav,
              title: 'Library',
              book
            }
          );
        } catch (err) {
          debug(err.stack);
        }
        client.close();
      }());
    });


  return bookRouter;
}


module.exports = router;
