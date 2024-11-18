const express = require('express');
const router = express.Router();
const MenuItem = require('./../models/menuItems');

//for Menu Item --start

router.post('/', async (req, res) => {

    try {
        const menuData = req.body 

        const newItem = new MenuItem(menuData);

        const response = await newItem.save();

        console.log("Menu Item saved Successfully");
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({error:'Internal Server Error'});
    }
})

router.get('/', async (req, res) => {
    try {
        const data = await MenuItem.find()
        console.log("Data Fetched Successfully for Menu Items.");
        res.status(200).json(data);

    } catch (error) {
        console.log(error);
        res.status(500).json({error:'Internal Server Error'});
    }
})

router.get('/:tasteType', async(req, res) => {
    try {
        const tasteType = req.params.tasteType;
        if (tasteType == 'Sweet' || tasteType == 'Sour' || tasteType == 'Spicy') {

            const response = await MenuItem.find({taste:tasteType})
            console.log('Response fetched for Tastetype.');
            res.status(200).json(response)
        } else {
            res.status(404).json({error: "Invalid work type given"})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({error :'Internal Server Error'})
    }
})

router.put('/:id', async (req, res) => {
    try {
        const itemId = req.params.id;
        const updatedData = req.body;

        const response = await MenuItem.findByIdAndUpdate(itemId, updatedData, {
            new : true,
            runValidators : true
        })

        if (!response) {
            return res.status(404).json({error: 'Item Not Found'})
        }
        console.log('Data updated for Menu Item.');
        res.status(200).json(response)

    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Internal Server Error'})
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const itemId = req.params.id;
        const response = await MenuItem.findByIdAndDelete(itemId);

        if (!response) {
            return res.status(404).json({error: 'Item Not Found'})
        }
        console.log('Item Deleted Successfully.');
        res.status(200).json(response)

    } catch (error) {
        console.log(error);
        res.status(500).json({error : 'Internal Server Error.'})
    }
})

module.exports = router;

//for Menu Item --end