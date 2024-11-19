const mongoose = require('mongoose')
const bcrypt = require('bcrypt');

// Define the Person Schema
const personSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    age:{
        type: Number,  
    },
    work:{
        type: String,
        enum: ['Chef', 'Waiter', 'Manager'],
        required: true
    },
    mobile:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required : true,
        unique : true
    },
    address:{
        type: String,
    },
    salary: {
        type : Number,
        required: true
    },
    username : {
        required: true,
        type : String
    },
    password : {
        required : true,
        type : String
    }
})

personSchema.pre('save', async function(next) {
    const person = this;

    // Hash the password only if it is modified (or is new)
    if (!person.isModified('password')) {
        return next();
    }

    try {
        // salt generation for hashing
        const salt = await bcrypt.genSalt(10);

        // hash password generation
        const hashedPassword = await bcrypt.hash(person.password, salt);

        // override the plain password with hashed password.
        person.password = hashedPassword;

        next();
    } catch (err) {
        return next(err);
    }
})

personSchema.methods.comparePassword = async function(candidatePassword) {
    try {
        // use bcrypt to campare the provide password with the hashed password.
        const isMatched = await bcrypt.compare(candidatePassword, this.password);
        return isMatched;

    } catch (err) {
        throw err;
    }
}

// Create the Person model
const Person = mongoose.model('Person', personSchema);
module.exports = Person;