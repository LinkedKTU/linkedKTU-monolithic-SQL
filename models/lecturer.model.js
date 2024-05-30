const { DataTypes } = require('sequelize');
const sequelize = require('../scripts/helpers/sequelize.helper');
const Student = require('./student.model');

const Lecturer = sequelize.define(
    'Lecturer',
    {
        _id: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING,
        },
        address: {
            type: DataTypes.STRING,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING,
        },
        accountType: {
            type: DataTypes.STRING,
            allowNull: false,
        },
      
    },
    {
        charset: 'utf8',
        collate: 'utf8_unicode_ci',
    },
    {
        hasMany: Student,
        
    },
);

module.exports = Lecturer;
