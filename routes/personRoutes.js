const express = require('express');
const router = express.Router();
const Person = require('./../models/Person');

// for person --start

router.post('/', async (req, res) => {
    try {
        const data = req.body // Assuming the request body conatains the Person Data.

        // Create a newPerson Document using the Mongoose models
        const newPerson = new Person(data);

        // Save the new person data to the database
        const response = await newPerson.save();

        console.log("Person Data saved Successfully.");
        res.status(200).json(response);

    } catch (error) {
        console.log(error);
        res.status(500).json({error:'Internal Server Error'});
    }
})

router.get('/', async (req, res) => {
    try {
        const data = await Person.find()
        console.log("Data Fetched Successfully for Person.");
        res.status(200).json(data);

    } catch (error) {
        console.log(error);
        res.status(500).json({error:'Internal Server Error'});
    }
})

router.get('/:workType', async (req, res) => {
    try {
        const workType = req.params.workType;
        if (workType == 'Chef' || workType == 'Waiter' || workType == 'Manager'){
            
            const response = await Person.find({work: workType})
            console.log('Response fetched for Worktype.');
            res.status(200).json(response)

        } else {
            res.status(404).json({error: 'Invalid work type given.'})
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Internal Server Error'})
    }
})

router.put('/:id', async (req, res) => {
    try {
        const personId = req.params.id;
        const updatedData = req.body

        const response = await Person.findByIdAndUpdate(personId, updatedData, {
            new : true, // return the updated document
            runValidators : true // Run Mongoose Validation
        })
        
        if (!response) {
            return res.status(404).json({error:'Person Not Found.'})
        }
        console.log('Data updated for Person');
        res.status(200).json(response)

    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Internal Server Error'})
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const personId = req.params.id;
        const response = await Person.findByIdAndDelete(personId);

        if (!response) {
            return res.status(404).json({error:'Person Not Found'})
        }
        console.log('Person Deleted Successfully');
        res.status(200).json(response)

    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Internal Server Error'})
    }
})

module.exports = router;
// for person --end