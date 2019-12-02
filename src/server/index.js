#!/usr/bin/env node
/* eslint-disable import/order */
const http = require('http');
const { normalizePort } = require('../utils/Utils');
const app = require('./app');

const server = http.createServer(app);
const io = require('socket.io')(server);

const port = normalizePort(process.env.PORT || '8080');
const expressServerUtils = require('express-server-utils')(server, port);

app.set('port', port);
require('./socket/socket')(io);


expressServerUtils.listen();
expressServerUtils.handleOnError();
expressServerUtils.handleOnListening();

const exitActions = [server.close];
expressServerUtils.handleShutDown(exitActions);
