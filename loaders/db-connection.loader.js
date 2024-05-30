const { fillTheDB } = require('../scripts/helpers/seeder.js');
const sequelize = require('../scripts/helpers/sequelize.helper.js');

sequelize
    .authenticate()
    .then(() => {
        console.log('DB Connected Successfully');
        sequelize.sync({alter : true}).then(() => {
            console.log('All models were synchronized successfully.');
            fillTheDB();
        });
    })
    .catch((error) => {
        console.error(`Unable to connect to the database: ${error}`);
    });

module.exports = {
    sequelize,
};

