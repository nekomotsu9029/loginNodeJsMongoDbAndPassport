const express = require('express');
const engine = require('ejs-mate');
const path = require('path');
const morgan = require('morgan');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');


const routes = require('./routes/index.js');

//Initializations
const app = express();
require('./database.js');
require('./passport/local-auth');

//Settings
app.set('views', path.join( __dirname, 'views' ));
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('PORT', process.env.PORT || 3000);

//Middlewares
app.use( morgan('dev') );
app.use(express.urlencoded({extended: false}));
app.use(session({
    secret: 'secretSessionByNekomotsu9029',
    resave: false,
    saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    app.locals.signupMessage = req.flash('signupMessage');
    app.locals.signinMessage = req.flash('signinMessage');
    app.locals.userData = req.user;
    next();
});

//Routes
app.use('/', routes);


//Starting server
app.listen(app.get('PORT'), ()=>{
    console.log('Server on Port ', app.get('PORT'));
});