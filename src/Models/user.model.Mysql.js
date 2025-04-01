const { DataTypes } = require('sequelize');
const sequelize = require('../config/mysql'); // ✅ Importer sequelize

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: false,
    tableName: 'users',
});

module.exports = User;
