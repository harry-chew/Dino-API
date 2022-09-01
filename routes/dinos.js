const express = require('express');
const router = express.Router();
const db = require('../database');
router.get('/', (req, res) => {
    res.send('Get All Dinos');
});

router.post('/', (req, res) => {
    const { name } = req.body;
    if(name) {
        console.log(name);
    }
});

router.get('/:id', (req, res) => {
    res.send(`Get Dino with ID: ${req.params.id}`);
});



module.exports = router;