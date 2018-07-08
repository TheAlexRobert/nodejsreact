//L100
const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

//L98 - reach out to stripe API
module.exports = app => {
    //EXPRESS - can pass ass many middlewares
    app.post('/api/stripe', requireLogin, async (req, res) => {
       // console.log(req.body);

        if (!req.user){
            return res.status(401).send({ error: 'You must log in!'});
        }

       //already did on FrontEnd, redo BackEnd
       const charge = await stripe.charges.create({
           amount: 500,
           currency: 'usd',
           description: '$5 for 5 credits',
           source: req.body.id
       });

       //console.log(charge);
       
       //doesnt actually save it
       req.user.credits += 5;

       const user = await req.user.save();

       res.send(user);

    });
};