const express = require('express');
const router = express.Router();
const mdb = require('../mongodb');
const Dino = require('../MongoSchemas/DinoSchema');
const validate = require('../validate');

const { check, validationResult } = require('express-validator');

router.get('/', async (req, res) => {
    try {
        const all = await Dino.find();
        res.status(200).send(all);
    }
    catch(err) {
        res.status(404).send({msg: 'Could not retrieve.'});
        console.log(err);
    }
});

router.post('/', check('content').notEmpty().withMessage('content cannot be empty'), (req, res) => {
    console.log(req.body.content);
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors : errors.array() });
    }
    
    const { name, image, info, description } = req.body.content;
    if(name) {
        try {
            const dino = new Dino({ name: name, image: image, info: info, description: description});
            dino.save().then(() => {
                console.log("Dino Saved", dino);
            });
            res.status(201).send(
                {
                    msg:'Added Dino'
                });
        }
        catch(err) {
            console.log(err);
        }
    }
});

router.get('/:name', async (req, res) => {
    try {
        const all = await Dino.find({name: req.params.name});
        res.status(200).send(all);
    }
    catch(err) {
        console.log(err);
    }
});

module.exports = router;