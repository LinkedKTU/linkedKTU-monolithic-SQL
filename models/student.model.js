const { DataTypes } = require('sequelize');
const sequelize = require('../scripts/helpers/sequelize.helper');




const Student = sequelize.define(
    'Students',
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

        school: {
            type: DataTypes.STRING,
         
        },
        city: {
            type: DataTypes.STRING, 
     
        },
        technologies: {
            type: DataTypes.JSON, // TODO: JSON.toString()
      
        },
        languages: {
            type: DataTypes.JSON, // TODO: JSON.toString()
        }
        
        
        
    },
    {
        charset: 'utf8',
        collate: 'utf8_unicode_ci',
      
    },
    
);


module.exports = Student;
