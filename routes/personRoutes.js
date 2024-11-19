const express = require('express');
const router = express.Router();
const Person = require('./../models/Person');
const {jwtAuthMiddleware, generateToken} = require('./../jwt');

// Sign-Up Route
router.post('/signup', async (req, res) => {
    try {
        const data = req.body // Assuming the request body conatains the Person Data.

        // Create a newPerson Document using the Mongoose models
        const newPerson = new Person(data);

        // Save the new person data to the database
        const response = await newPerson.save();
        
        // jwt token generation
        const token = generateToken(response.name);
        console.log(`Token is : ${token}`);

        console.log("Person Data saved Successfully.");
        res.status(200).json({response : response, token : token});

    } catch (error) {
        console.log(error);
        res.status(500).json({error:'Internal Server Error'});
    }
})

// Login Route
router.post('/login', async (req, res) => {
    try {
        // extract the username and password from the request body
        const {username, password} = req.body;

        // find the user by username
        const user = await Person.findOne({username: username})
        
        // if user does'nt exists or incoorect password , then return error
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({error : 'Invalid username or password'})
        }

        const payLoad = {
            id : user.id,
            username : user.username
        };
        const token = generateToken(payLoad);

        return res.json({token : token})

    } catch (error) {
        console.log(error);
        res.status(500).json({error:'Internal Server Error'});
    }
})

// Profile Route
router.get('/profile', jwtAuthMiddleware, async (req, res)=>{
    try {
        const userData = req.userData;
        // console.log(userData);
        const response = await Person.findById(userData.id)

        res.status(200).json({response})
    } catch (error) {
        console.log(error);
        res.status(500).json({error:'Internal Server Error'});
    }
})


router.get('/', jwtAuthMiddleware, async (req, res) => {
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