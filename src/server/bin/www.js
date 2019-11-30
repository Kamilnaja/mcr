#!/usr/bin/env node

var app = require("../app");
var debug = require("debug")("backend:server");
var http = require("http");
const io = require("socket.io")(server);

var port = normalizePort(process.env.PORT || "8080");
app.set("port", port);

var server = http.createServer(app);

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

const expressServerUtils = require("express-server-utils")(server, port);
expressServerUtils.listen();
expressServerUtils.handleOnError();
expressServerUtils.handleOnListening();

const exitActions = [server.close];
expressServerUtils.handleShutDown(exitActions);
