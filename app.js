const { db } = require('./config.js');
const bodyParser = require('body-parser');
const compression = require('compression');
const express = require('express');
// const favicon = require('serve-favicon');
const helmet = require('helmet');
const LocalStrategy = require('passport-local').Strategy;
const logger = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path');
const RateLimit = require('express-rate-limit');

const User = require('./models/user');

// Route Files
const api = require('./routes/api/index');
const authentication = require('./routes/api/authentication');
const index = require('./routes/index');

const app = express();

// Connect Mongoose
const { connectionString } = db[(process.env.NODE_ENV || 'test')];
mongoose.connect(connectionString, {
  /* other options */
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// enable morgan logger only in we are not in test environment
// this is because otherwise console output breaks standard jest output.
if (process.env.NODE_ENV !== 'test') app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());
app.use(helmet());

app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

// configure rate limiter
const apiLimiter = new RateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 50,
  delayMs: 0, // disabled
});
app.use('/api/', apiLimiter);

app.use('/api', api);
app.use('/api/authentication', authentication);
app.use('/*', index);

// Configure passport
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
