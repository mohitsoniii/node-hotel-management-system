const express = require('express');
const app = express();
const db = require('./db');
require('dotenv').config();
const passport = require('./auth')

const bodyParser = require('body-parser');
app.use(bodyParser.json()); // req.body

// Middleware Function
const logRequest = (req, res, next) => {
    console.log(`[ ${new Date().toLocaleString()} ] Request made to : ${req.originalUrl}`);
    next(); // move on to next phase
}
app.use(logRequest); // this line will apply midd leware for all endpoints

// Authentication Middleware
app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate('local', {session : false}) 


app.get('/',function(req, res) {
    res.send("Welcome to my Hotel, How can i help you...?")
})


// Person Routes
const personRoutes = require('./routes/personRoutes');
app.use('/person', localAuthMiddleware, personRoutes)

// Menu Item Routes
const menuItemsRoutes = require('./routes/menuItemsRoutes')
app.use('/menuItems', menuItemsRoutes)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log("listening on port 3000");
});