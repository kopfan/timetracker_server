const express = require('express');

const bookController = require('../controllers/bookController');

// setting up a router for link routing
const bookRouter = express.Router();
const bookService = require('../services/goodreadsService');

function router(nav) {
  const { getIndex, getById, middleware } = bookController(bookService, nav);

  bookRouter.use(middleware);

  // make use of bookRouter
  bookRouter.route('/')
    .get(getIndex);

  bookRouter.route('/:id')
    /* .all((req, res, next) => {
      if (req.user) {
        next();
      } else {
        res.redirect('/');
      }
    }) */
    .get(getById);


  return bookRouter;
}
module.exports = router;
