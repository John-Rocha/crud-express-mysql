const {Sequelize} = require('sequelize')

//Conexão com o banco de dados MySql
const sequelize = new Sequelize('postapp', 'root', '131087', {
    host: "localhost",
    dialect: 'mysql',
    timezone: '-03:00'
})

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}