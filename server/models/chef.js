const Sequelize = require('sequelize');
const {db} = require('../config/index.js');

const sequelize = new Sequelize(db.name, db.user, db.password, db.info);

const Chef = sequelize.define('chefs', {
    firstName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    city: {
        type: Sequelize.STRING,
        allowNull: false
    },
    address: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lat: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    lng: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    foodType: {
        type: Sequelize.STRING,
        allowNull: false
    },
    bio:{
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = {Chef};