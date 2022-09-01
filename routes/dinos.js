const express = require('express');
const router = express.Router();
const db = require('../database');
const dinodb = require('../dinodb');

router.get('/', (req, res) => {
    res.status(200).send(dinodb);
});

router.post('/', (req, res) => {
    const { authorization } = req.headers;
    if(authorization && authorization === '123') {
        const dino = req.body;
        dinodb.push(dino);
        res.status(201).send(dinodb);
    }
    else {
        res.status(403).send('Forbidden');
    }

});

router.get('/:id', (req, res) => {
    res.send(`Get Dino with ID: ${req.params.id}`);
});



module.exports = router;