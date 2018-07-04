// PACKAGES
const express = require('express'),
	  app = express(),
	  server = require('http').createServer(app), 
	  io = require('socket.io')(server);

// HELPERS
const cron = require('./helpers/cron'),
	  littlebirds = require('./helpers/littlebirds');

// ROUTE
const dashboardRouter = require('./routes/dashboard').dashboardRouter;

io.set('origins', '*:*');
app.set('socketio', io);
app.use('/', dashboardRouter);

littlebirds.dashboard_connecter( io );

cron.admin_cron();
server.listen(1607);