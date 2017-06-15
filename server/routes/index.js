const Sequelize = require('sequelize');
const express = require('express');
const bodyParser = require('body-parser');

const {Chef} = require('./../models/chef.js');
const {Menu} = require('./../models/menu.js');
const {User} = require('./../models/user.js');
const {db} = require('./../config/index.js');

const app = express();

app.use(bodyParser.json());

const sequelize = new Sequelize(db.name, db.user, db.password, db.info);

//Get all chefs in the database
app.get('/chef', function(req, res){
    Chef.findAll()
        .then(function(chefs){
            res.status(200).send({"success": true, chefs});
        }).catch(function(error){
            res.status(404).send({"success": false, error});
        });
});

//Get all chefs by food type - will be a search results query
app.get('/chef/foodtype/:foodType', function(req, res){
    Chef.findAll({
        where: {
            foodType: req.params.foodType
        }
    }).then(function(chef){
            res.status(200).send({"success": true, chef});
        }).catch(function(error){
            res.status(404).send({"success": false, error});
        });
});

//Get all chefs by city - will be a search results query
app.get('/chef/city/:city', function(req, res){
    Chef.findAll({
        where: {
            city: req.params.city
        }
    }).then(function(chef){
            res.status(200).send({"success": true, chef});
        }).catch(function(error){
            res.status(404).send({"success": false, error});
        });
});

//Get all chefs by city and food type - will be a search results query
app.get('/chef/city-foodtype/:city/:foodType', function(req, res){
    Chef.findAll({
        where: {
            foodType: req.params.foodType,
            city: req.params.city
        }
    }).then(function(chef){
            res.status(200).send({"success": true, chef});
        }).catch(function(error){
            res.status(404).send({"success": false, error});
        });
});

//Get Chef and their menu
app.get('/chef/id/:ID', function(req, res){
    sequelize.Promise.all([
        Chef.findAll({
            where: {
                ID: req.params.ID
            }
        }),
        Menu.findAll({
            where: {
                chef_id: req.params.ID
            }
        })
    ]).then(function(chef){
        res.status(200).send({"success": true, "data": chef});
    }).catch(function(error){
        res.status(404).send({"success": false, error});
    });
});

// //Get chef by ID
// app.get('/chef/id/:ID', function(req, res){
//     Chef.findAll({
//         where: {
//             ID: req.params.ID
//         }
//     })
//         .then(function(chef){
//             res.send({chef});
//         }).catch(function(error){
//             res.status(400).send(error);
//         });
// });
// asdfasdfasdfasdf
//Get menu of chef by chef_id
app.get('/chef/menu/:chef_id', function(req, res){
    Menu.findAll({
        where: {
            chef_id: req.params.chef_id
        }
    }).then(function(menu){
            res.status(200).send({"success": true, menu});
        }).catch(function(error){
            res.status(404).send({"success": false, error});
        });
});

//Create new Chef profile - personal details only
app.post('/register/chef', function(req, res){
    var newChef = Chef.build({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        city: req.body.city,
        address: req.body.address,
        lat: req.body.lat,
        lng: req.body.lng,
        foodType: req.body.foodType,
        bio: req.body.bio
    });
    newChef.save()
        .then(function(chef){
            res.status(200).send({"success": true, chef});
        }).catch(function(error){
            res.status(404).send({"success": false, error});
    });
});

//Create new Chef menu - part of creating a chef profile
app.post('/register/menu', function(req, res){
    var newMenu = Menu.build({
        menu_item_number: req.body.menu_item_number,
        item_name: req.body.item_name,
        description: req.body.description,
        price: req.body.price,
        chef_id: req.body.chef_id
    });
    newMenu.save()
        .then(function(item){
            res.status(200).send({"success": true, item});
        }).catch(function(error){
            res.status(404).send({"success": false, error});
    });
});

//Create new User profile
app.post('/register/user', function(req, res){
    var newUser = User.build({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        city: req.body.city,
        foodType: req.body.foodType,
        bio: req.body.bio
    });
    newUser.save()
        .then(function(user){
            res.status(200).send({"success": true, user});
        }).catch(function(error){
            res.status(404).send({"success": false, error});
    });
});

app.listen(3000, function(){
    console.log('Listening on port 3000');
});