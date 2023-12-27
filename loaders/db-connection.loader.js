const sequelize = require('../scripts/helpers/sequelize.helper.js');

sequelize
    .authenticate()
    .then(() => {
        console.log('DB Connected Successfully');
    })
    .catch((error) => {
        console.error(`Unable to connect to the database: ${error}`);
    });

module.exports = {
    sequelize,
};
