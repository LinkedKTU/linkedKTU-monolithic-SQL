const sequelize = require('../scripts/helpers/sequelize.helper');
// const eventEmitter = require('../events/event-emitter.event');
// const ApiError = require('../scripts/responses/error/api-error');
// const httpStatus = require('http-status');



// function sendEmail(email, fullName, password) {

// return new ApiError('Not implemented', httpStatus.NOT_IMPLEMENTED);

/* eventEmitter.emit('send_email', {
        to: email,
        subject: 'linkedKTU verification',
        template: 'student-password-template',
        context: {
            fullName: fullName,
            password: password,
        },
    });
    */
// }


const runQuery = async (query) => {
    const result = await sequelize.query(query);
    return result;
};

const getAll = async (model) => {
    const result = await sequelize.models[model].findAll();
    return result;


};


const getAllByQuery = async (model, key, query) => {
    const result = await sequelize.models[model].findAll({
        where: {
            [key]: query,
        },
    });
    return result;

};

const getAllbyInclude = async (model, include) => {
    const result = await sequelize.models[model].findAll({
        include: include,
    });
    return result;
};





const getAllWithInclude = async (model, include) => {  
    const result = await sequelize.models[model].findAll({
        include: include,
    });
    return result;
};
  

const getOneById = async (model, id) => {
    const result = await sequelize.models[model].findAll({
        where: {
            _id: id,
        },
    });
    return result;

};

const getOneByQuery = async (model, key, query) => {
    const result = await sequelize.models[model].findAll({
        where: {
            [key]: query,
        },
    });
    return result;


};

const getOneWithIncludeById = async (model,id, include) => {
    const result  = await sequelize.models[model].findAll( {
        where: {
            _id : id
        },
        include: include
    });

    return result;
        
};

const create = async (model, data) => {
    const result = await sequelize.models[model].create(data);
    return result;

};


const updateById = async (model, id, data) => {
    const result = await sequelize.models[model].update(data, {
        where: {
            _id: id,
        },
    });
    return result;


};

const updateByQuery = async (model, key,  query, data) =>{
    const result = await sequelize.models[model].update(data, {
        where: {
            [key]: query,
        },
    });
    return result;
};

const deleteById = async (model, id) => {
    const result = await sequelize.models[model].destroy({
        where: {
            _id: id,
        },
    });
    return result;


};

const deleteByQuery = async (model, key,  query) => {
    const result = await sequelize.models[model].destroy({
        where: {
            [key]: query,
        },
    });
    return result;


};

module.exports = {
    getAll,
    getAllWithInclude,
    getOneById,
    getOneByQuery,
    getOneWithIncludeById,
    getAllByQuery,
    runQuery,
    create,
    updateById,
    updateByQuery,
    deleteById,
    deleteByQuery,
    // sendEmail,
    getAllbyInclude,
};
