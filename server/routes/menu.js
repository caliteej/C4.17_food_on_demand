const models = require('../models');
const express = require('express');

const router = express.Router();
const Menu = models.menus;

//Routes for all menu queries
router.get('/id/:chef_id', getChefMenu);
router.post('/register', createNewMenu);

//Get menu of chef by chef_id
function getChefMenu(req, res){
    Menu.findAll({
        where: {
            chef_id: req.params.chef_id
        }
    }).then(function(menu){
        res.status(200).send({"success": true, "data": menu});
    }).catch(function(error){
        res.status(404).send({"success": false, error});
    });
}

//Create new Chef menu - part of creating a chef profile
function createNewMenu(req, res){
    var newMenu = Menu.build({
        menu_item_number: req.body.menu_item_number,
        item_name: req.body.item_name,
        description: req.body.description,
        price: req.body.price,
        chef_id: req.body.chef_id
    });
    newMenu.save()
        .then(function(item){
            res.status(200).send({"success": true, "data": item});
        }).catch(function(error){
            res.status(404).send({"success": false, error});
    });
}

module.exports = router;