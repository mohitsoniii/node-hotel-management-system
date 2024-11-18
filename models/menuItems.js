const mongoose = require('mongoose')

const menuItemSchema = new mongoose.Schema({
    name: {
        type : String,
        required : true
    },
    price:{
        type: Number,
        required : true
    },
    taste:{
        type: String,
        enum: ['Spicy', 'Sweet', 'Sour'],
        required: true
    },
    isDrinkable:{
        type: Boolean,
        default: false
    },
    ingredients:{
        type: [String],
        default: []
    },
    num_Sales:{
        type : Number,
        default: 0,
        required: true
    }
})

const menuItem = mongoose.model('MenuItem', menuItemSchema);

module.exports = menuItem;