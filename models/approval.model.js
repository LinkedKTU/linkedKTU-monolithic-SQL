const {Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../scripts/helpers/sequelize.helper');


const Approval = sequelize.define(
    'Approval', 
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

        lecturerId: {
            type: DataTypes.STRING,
        
        },
        studentId: {
            type: DataTypes.STRING,
        } 
    }, 
    {
        charset: 'utf8',
        collate: 'utf8_unicode_ci',
        freezeTableName: true
    });



module.exports = Approval;
