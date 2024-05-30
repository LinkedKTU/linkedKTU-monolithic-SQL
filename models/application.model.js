const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../scripts/helpers/sequelize.helper');



const Application = sequelize.define(
    'Application', 
    {
        createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        },
        updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        },


        studentId: {
            type: DataTypes.STRING,
           
        },
        postId: {
            type: DataTypes.STRING,
           
        }
    }, 
    {
        charset: 'utf8',
        collate: 'utf8_unicode_ci',
        freezeTableName: true
    },
);



module.exports = Application;
