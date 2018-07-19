const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');
require('./models/Survey');
mongoose.connect(keys.mongoURI);

const app = express();

//L100 - middleware parse body
app.use(bodyParser.json());

app.use( //MIDDLEWARE
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000, //30 days
        keys: [keys.cookieKey] //encrypts cookies
    })
);

app.use(passport.initialize());
app.use(passport.session());


//ROUTES
require('./routes/authRoutes')(app);
//L98
require('./routes/billingRoutes')(app);
//L120
require('./routes/surveyRoutes')(app);

//L109 - heroku
if (process.env.NODE_ENV === 'production'){
   //EXPRESS serve production assets, like main.js/css
   app.use(express.static('client/build'));

   //EXPRESS if doesnt recognize route - catch all case
   const path = require('path');
   app.get('*', (req, res) => {
       res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
   });
}


const PORT = process.env.PORT || 5000;
app.listen(PORT);


//https://accounts.google.com/o/oauth2/
//v2/auth?response_type=code&redirect_uri
//=http%3A%2F%2Flocalhost%3A5000%2Fauth%2Fgoogle%2F
//callback&scope=profile%20email&client_id=785708532868-q8g1dm63b1ge1rbee505l3qcl9c4ujd3.apps.googleusercontent.com