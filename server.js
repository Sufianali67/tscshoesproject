require('dotenv').config();
var express = require('express')
var port = process.env.PORT || 1339;
var http = require('http').Server(app);
var passport = require('passport');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var cors = require('cors');
var path = require('path')
const morgan = require('morgan');
var app = express()
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, 'productImages')));

app.use(morgan('dev'));
var http = require('http').Server(app);
app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit: 1000000}));
app.use(bodyParser.json({limit: '50mb'}));
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());
mongoose.set('useCreateIndex', true)
mongoose.connect(process.env.MONGODB_URI,
  {
   useNewUrlParser: true,
    poolSize: 20,
    keepAlive: 300000,
  }); 
mongoose
.connection
.once('connected', () => console.log('Connected to database'));
require('./config/passport')(passport);

app.use('/api', passport.authenticate('jwt', { session: false }), require('./routes/authenticated.js'));
app.use('/', require('./routes/unauthenticated.js')); //routes which does't require token authentication

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

http.listen(port, function () {
    console.log('listening on *:' + port);
});


