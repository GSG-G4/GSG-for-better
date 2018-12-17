/**
 * Module dependencies.
 */

const app = require("./app");
const debug = require("debug")("gfb");
const http = require("http");

const dbConnection = require("./database/db_connection");

/**
 * Get port from environment and store in Express.
 */

const port = process.env.PORT || "5000";
app.set("port", port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Event listener for HTTP server "error" event.
 */

onError = error => {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string"
    ? "Pipe " + port
    : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */
onListening = () => {
  const addr = server.address();  
  const bind = typeof addr === "string"
    ? "pipe " + addr
    : "port " + addr.port;
  debug("Listening on " + bind);
}

/**
 * Listen on provided port, on all network interfaces.
 */

dbConnection()
  .then((connection) => {
    console.info('connected to', connection.connections[0].name, 'db on',connection.connections[0].host);
    // start the server after establish the connection
    server.listen(port);
    server.on("error", onError);
    server.on("listening", onListening);
  })
  .catch((err) => {
    debug("fail to connect to db", err);
  });
