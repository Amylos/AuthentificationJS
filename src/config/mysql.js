require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.MYSQL_DATABASE,
    process.env.MYSQL_USERNAME,
    process.env.MYSQL_PASSWORD,
    {
        host: process.env.MYSQL_HOST,
        dialect: 'mysql',
        logging: false,
    }
);

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connected to MYSQL DB.');
    } catch (error) {
        console.error('Failed to connect to MYSQL DB :', error);
    }
})();

module.exports = sequelize;