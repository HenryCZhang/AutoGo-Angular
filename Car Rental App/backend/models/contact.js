const Sequelize = require('sequelize');
const config = require('../config');

const Contact = config.define('Contacts',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    first_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    last_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lessor_email: {
        type: Sequelize.STRING,
        allowNull: true
    },
    contact_picture: {
        type: Sequelize.STRING,
        allowNull: true
    }
},{timestamps:false});

module.exports = Contact;