const express = require('express');

const app = express();
const chalk = require('chalk'); // givin colors to output
const debug = require('debug')('app2'); // giving debugging options e.g. DEBUG=* node app2.js
const morgan = require('morgan'); // controls logging output
const server = require('http').Server(app);
// const io = require('socket.io')(server);
const path = require('path');
const bodyParser = require('body-parser');
// const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');

app.use(morgan('tiny'));
/* use for full output for client requests
app.use(morgan('combined'));
*/
app.use(bodyParser.json()); // to parse POST data by forms
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: 'library' }));

require('./src/config/passport.js')(app);

app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/socket.io-client/dist')));
app.set('views', './src/views');
// app.set('view engine', 'pug'); // use template engine pug
app.set('view engine', 'ejs'); // use template engine ejs

const port = process.env.PORT || 8080;

// const messages = [];

const nav = [{ link: '/books', title: 'Book' },
  { link: '/authors', title: 'Author' }];

// setting up a router for link routing
const bookRouter = require('./src/routes/bookRoutes')(nav);
const adminRouter = require('./src/routes/adminRoutes')(nav);
const authRouter = require('./src/routes/authRoutes')(nav);

app.use('/books', bookRouter); // end of use bookRouter: sets the base folder for boorouter to /books
app.use('/admin', adminRouter); // end of use adminRouter: sets the base folder for boorouter to /admin
app.use('/auth', authRouter);


app.get('/', (req, res) => {
  // res.sendFile(`${__dirname}/tester.html`);
  res.render(
    'index',
    {
      nav: [{ link: '/books', title: 'Books' },
        { link: '/authors', title: 'authors' }],
      title: 'Library'
    }
  ); // connection to app.set 'views' and pug
});

/*
app.get('/starter', (req, res) => {
  res.sendFile(`${__dirname}/public/starter.html`);
});

app.get('/finisher', (req, res) => {
  res.sendFile(`${__dirname}/public/finisher.html`);
});

function getServerTime() {
  return Date.now();
}

io.on('connection', (socket) => {
  console.log('New client connected.');
  if (messages.length == 0) {
    socket.emit('news', 'Init!');
  } else {
    messages.forEach((element) => {
      socket.emit('news', element);
    });
  }

  socket.on('messages', (data) => {
    console.log(`client data: >${data}<`);

    messages.push(data);

    if (data === 'timer_start') {
      data += `_${getServerTime()}`;
    }
    if (data === 'timer_finish') {
      data += `_${getServerTime()}`;
    }

    // emit data to the original sender
    socket.emit('news', data);
    // emit data to all connected clients
    socket.broadcast.emit('news', data);
  });
  socket.on('disconnect', () => {
    console.log('Client disconnected.');
  });
});
*/
server.listen(port, () => {
  debug(`Server ${chalk.green('ready')}`);
  debug(`Server ${chalk.green('running on port ')} ${chalk.red(port)}`);
});
