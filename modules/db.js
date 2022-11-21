//Fazendo conexão com banco de dados
const Sequelize = require('sequelize');
const sequelize = new Sequelize('noteapp', 'root', 'javascript_node', {
    host: 'localhost', 
    dialect: 'mysql'
});

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}