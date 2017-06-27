const models = require('../models');
const express = require('express');

const router = express.Router();
const Hours = models.hours;

//Routes for all chef queries
router.get('/chef/:ID', getHours);

//Get the hours of the chef by ID
function getHours(req, res){
    Hours.findAll({
        where: {
            ID: req.params.ID
        }
    }).then(function(chef){
        res.status(200).send({"success": true, "data": chef});
    }).catch(function(error){
        res.status(404).send({"success": false, error});
    });
}

module.exports = router;