const express = require('express');

const app = express();
const chalk = require('chalk'); // givin colors to output
const debug = require('debug')('app2'); // giving debugging options e.g. DEBUG=* node app2.js
const morgan = require('morgan'); // controls logging output
const server = require('http').Server(app);
const io = require('socket.io')(server);
const path = require('path');

app.use(morgan('tiny'));
/* use for full output for client requests
app.use(morgan('combined'));
*/

app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/socket.io-client/dist')));

const port = process.env.PORT || 8080;
server.listen(port, () => {
  debug(`Server ${chalk.green('ready')}`);
  debug(`Server ${chalk.green('running on port ')} ${chalk.red(port)}`);
});

const messages = [];

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/tester.html`);
});

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
