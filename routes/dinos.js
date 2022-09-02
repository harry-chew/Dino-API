const express = require('express');
const router = express.Router();
const db = require('../database');
const dinodb = require('../dinodb');
const validate = require('../validate');

router.get('/', async (req, res) => {
    try {
        const results = await db.promise().query(`SELECT * FROM dino`);
        console.log(results[0]);
        res.status(200).send(results[0]);
    }
    catch(err) {
        res.status(404).send({msg: 'Could not retrieve.'});
        console.log(err);
    }
});

router.post('/', (req, res) => {
    //const dino = req.body;
    //dinodb.push(dino);
    const { name } = req.body;
    if(name) {
        console.log(name);
        try {
            db.promise().query(`INSERT INTO dino (name) VALUES('${name}')`);
            res.status(201).send({msg:'Added Dino'});
        }
        catch(err) {
            console.log(err);
        }
    }
    //res.status(201).send(dinodb);
});

router.get('/:id', async (req, res) => {
    try {
        const results = await db.promise().query(`SELECT * FROM dino WHERE id=${req.params.id}`);
        res.status(200).send(results[0]);
    }
    catch(err) {
        console.log(err);
    }
});

module.exports = router;