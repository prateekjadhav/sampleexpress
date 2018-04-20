
// const { isDev } = require('./src/globals/methods');
const { port, apiPrefix, mobApiPrefix } = require('./config');
const config = require('./config');
const express = require('express'),
  app = express(),
  mailer = require('express-mailer');
  bodyParser = require('body-parser'),
  // expCtrl = require('express-controllers-routes'),
  expCtrl = require('./src/utilities/routes-generator'),
  restResponse = require('express-rest-response'),
  session = require('express-session');

// app.use(require('cors')());
app.set('views', __dirname + '/src/view');
app.set('view engine', 'jade');
//express-rest-response middleware configuration  
app.use(restResponse({
  showStatusCode: true,
  showDefaultMessage: true
}));

mailer.extend(app, {
  from: 'no-reply@example.com',
  host: 'smtp.gmail.com', // hostname 
  secureConnection: true, // use SSL 
  port: 465, // port for secure SMTP 
  transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts 
  auth: {
    user: 'prateek.jadhav@a3logics.in',
    pass: 'Prateek@1331'
  }
});


//using express-session middleware
app.use(session({
  cookie: {
    httpOnly: config.expressSessionHttpOnly,
    path: '/',
    maxAge: (7 * 24 * 60 * 60 * 1000), //expires 7 days
    secure: config.expressSessionSecure,
  },
  resave: false,
  saveUninitialized: true,
  secret: '98safhsaf98safklnf'
}));



//using body-parser middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));




//use cors for Access-Control-Allow-Origin' issue
// if (isDev) {
// app.use(require('cors')());
// }

//check auth and roles using middleware
// app.use(require('./src/auth/checkPermissions'));

//defining and using routers
const router = express.Router();
expCtrl.bind(router, __dirname + '/src/controllers/', apiPrefix); // For Api Routing
// expCtrl.bind(router, __dirname + '/src/mob-apis/', mobApiPrefix); // For Mobile Api Routing
app.use(router);


//capture all 404 urls
app.use(function (req, res, next) {
  // respond with json
  if (req.accepts('json')) {
    res.rest.notFound();
    return;
  }
  // default to plain-text. send()
  res.type('txt').send('Not found');
});

//connecting database
const connect = require('./src/db/connect');
// require('./src/db/connect')();

app.listen(port, () => {
  console.log('Express App listening on port:', port);
});
