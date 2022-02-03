const Sequelize = require('sequelize');

let database = 'car-rental-app';
let username = 'root';
let password = '13758981888Zc@';
let host = "localhost";
let dialect = 'mysql';

const config = new Sequelize(database,username,password,{host,dialect});

module.exports=config;
