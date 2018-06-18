const passport = require('passport');

module.exports = (app) => {

    app.get('/auth/google', 
        passport.authenticate('google', {
            scope: ['profile', 'email']
        })
    );

    app.get('/auth/google/callback', passport.authenticate('google'));

    //L43 -> empty screen
    app.get('/api/logout', (req, res) => {
        req.logout();
        res.send(req.user);
    });


    //L42
    app.get('/api/current_user', (req, res) => {
        res.send(req.user); //get access once logged in
    });
    //{"_id":"5b22d242187ca292c1e54c0b","googleId":"113743642761270487096","__v":0}


};