const bcrypt = require('bcryptjs');

const passwordToHash = async (plainPassword) => {
    // ? Generate Password Salt
    const salt = await bcrypt.genSalt(10);

    // ? Hash Password With Salt
    const hashedPassword = await bcrypt.hash(plainPassword, salt);

    return  hashedPassword;
  
};

const comparePassword =  async (comingPassword, passwordFromDB) => {
    console.log('comingPassword: ',comingPassword );
    console.log(passwordFromDB);

    return bcrypt.compare(comingPassword,passwordFromDB );
};

module.exports = {
    passwordToHash,
    comparePassword
};
