const Sequelize =  require('sequelize');
const config = require('../config');

const Car  = config.define('Cars',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    lessor_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    seats: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    type: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    make: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    model: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    country: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    city: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    model_year: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    start_date:{
        type: Sequelize.DATE,
        allowNull: false,
    },
    end_date:{
        type: Sequelize.DATE,
        allowNull: false,
    },
    toggled:{
        type: Sequelize.BOOLEAN,
        allowNull: true,
    },
    return_location:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    rented:{
        type: Sequelize.BOOLEAN,
        allowNull: true,
    },
    car_picture:{
        type: Sequelize.STRING,
        allowNull: true,
    }
},{timestamps:false});

module.exports = Car;