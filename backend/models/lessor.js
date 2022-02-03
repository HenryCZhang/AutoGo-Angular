const Sequelize = require('sequelize');
const config = require('../config');

const Lessor = config.define('Lessors',{
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
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lessor_picture:{
        type: Sequelize.STRING,
        allowNull: true,
    },
    phone_number:{
        type: Sequelize.STRING,
        allowNull: true,
    }
},{timestamps:false});

module.exports = Lessor;