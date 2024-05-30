const { DataTypes } = require('sequelize');
const sequelize = require('../scripts/helpers/sequelize.helper');



const Employer = sequelize.define(
    'Employer',
    {
        _id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
            unique: true,
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

        city: {
            type: DataTypes.STRING,
        },
        isInternshipRemote: {
            type: DataTypes.BOOLEAN,
        },
        isWorkRemote: {
            type: DataTypes.BOOLEAN,
        },
        technologies: {
            type: DataTypes.JSON,
         
        },
        languages: {
            type: DataTypes.JSON,
        },
        
      
    },
    {
        charset: 'utf8',
        collate: 'utf8_unicode_ci',
    },
    
);


module.exports = Employer;
