const { DataTypes } = require('sequelize');
const sequelize = require('../scripts/helpers/sequelize.helper');

const Post = sequelize.define(
    'Post',
    {
        _id: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        'postType': {
            type: DataTypes.STRING,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING,
        },
        description: {
            type: DataTypes.STRING,
        },
        company: {
            type: DataTypes.STRING,
        },
        role: {
            type: DataTypes.STRING,
        },
        technologies: {
            type: DataTypes.JSON, // TODO: JSON.toString()
        },
        image: {
            type: DataTypes.STRING,
        },
        isRemote: {
            type: DataTypes.BOOLEAN,
        },
        salary: {
            type: DataTypes.STRING,
        },
        employerId: {
            type: DataTypes.STRING,
           
        },
        studentId: {
            type: DataTypes.STRING,
        },

        
        
    },
    {
        charset: 'utf8',
        collate: 'utf8_unicode_ci',
    },
);



module.exports = Post;
