// INIT APP, SETTINGS
var express = require("express");
var app = express();
var port = 3700;

// TEMPLATE ENGINE SETUP
app.set('views', __dirname + '/view');
app.set('view engine', "jade");
app.engine('jade', require('jade').__express);

// ROUTES
app.get("/", function(req, res){
    res.render("page");
});

// STATIC FILE LOCATION
app.use(express.static(__dirname + '/public'));



// LAUNCH SERVER LISTENING
var io = require('socket.io').listen(app.listen(port));



// REACT TO CLIENT ACTIVITY
io.sockets.on('connection', function (socket) {
    socket.emit('message', { message: 'Welcome to R\'s nodejs chat. Real-time socket messaging is best demonstrated by client connections in different locations.  Enjoy.' });
    socket.on('send', function (data) {
        if(data.message){       // added a check to verify data from client
            io.sockets.emit('message', data);
        }
    });
});

console.log("Listening on port " + port);

