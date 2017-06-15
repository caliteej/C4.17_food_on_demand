const Sequelize = require('sequelize');
const {db} = require('../config/index.js');

const sequelize = new Sequelize(db.name, db.user, db.password, db.info);

const User = sequelize.define('users', {
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
    foodType: {
        type: Sequelize.STRING,
        allowNull: false
    },
    bio:{
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = {User};