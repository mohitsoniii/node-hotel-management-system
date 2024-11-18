// setup Passport with a local authentication strategy, using a Person model 

const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const Person = require('./models/Person');

passport.use(new localStrategy(async (USERNAME, PASSWORD, done) => {
    // authentication logic
    try {
        console.log('Received Credentials :', USERNAME, PASSWORD)
        const user = await Person.findOne({username : USERNAME})

        if (!user) {
            return done(null, false, {message : 'User not found' })
        }
        const isPasswordMatched = user.password === PASSWORD ? true : false;
        if (isPasswordMatched) {
            return done(null, user)
        }else{
            return done(null, false, {message: 'Incoorect password'}) 
        }

    } catch (err) {
        return done(err)
    }
}))

module.exports = passport;