const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const HealthCheck = sequelize.define('HealthCheck', {
    CheckId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    DateTime: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
    },
}, {
    timestamps: false,
});

module.exports = HealthCheck;
