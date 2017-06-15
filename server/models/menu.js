const Sequelize = require('sequelize');
const {db} = require('../config/index.js');

const sequelize = new Sequelize(db.name, db.user, db.password, db.info);

const Menu = sequelize.define('menus', {
    menu_item_number: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    item_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    price: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    chef_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

module.exports = {Menu};