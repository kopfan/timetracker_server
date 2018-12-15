const { MongoClient, ObjectID } = require('mongodb');

const debug = require('debug')('app2:bookController');

function bookController(bookService, nav) {

  function getIndex(req, res) {
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
  }
  function getById(req, res) {
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

        debug(book);

        book.details = await bookService.getBookById(book.bookId);

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
  }
  function middleware(req, res, next) {
    // uncomment to enable/disable login necessity
    // if (req.user) {
    next();
    // } else {
    //  res.redirect('/');
    // }
  }

  // the revealing object pattern
  return ({
    getIndex,
    getById,
    middleware
  });
}

module.exports = bookController;
