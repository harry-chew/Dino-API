const express = require('express');
const router = express.Router();
const validate = require('../validate');

router.get('/', async (req, res) => {
    try {
        res.render('api');
    }
    catch(err) {
        res.status(404).send({msg: 'Could not retrieve.'});
        console.log(err);
    }
});

module.exports = router;