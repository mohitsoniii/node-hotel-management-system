const express = require('express')
const app = express();
const db = require('./db');
require('dotenv').config()

const bodyParser = require('body-parser');
app.use(bodyParser.json()); // req.body


app.get('/', function(req, res) {
    res.send("Welcome to my Hotel, How can i help you...?")
})


// Person Routes
const personRoutes = require('./routes/personRoutes');
app.use('/person', personRoutes)

// Menu Item Routes
const menuItemsRoutes = require('./routes/menuItemsRoutes')
app.use('/menuItems', menuItemsRoutes)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log("listening on port 3000");
});