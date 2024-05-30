const httpStatus = require('http-status');
const ApiDataSuccess = require('../scripts/responses/success/api-data-success');
const ApiError = require('../scripts/responses/error/api-error');
const {
    getAll,
    getOneById,
    
    
} = require('../services/base-service');
const Employer = require('../models/employer.model');


const getEmployers = async (req, res, next) => {
    let employers;

    try {
        employers = await getAll(Employer.name);
    } catch (error) {
        return next(new ApiError(error.message, httpStatus.NOT_FOUND));
    }

    if (employers && employers[0].length === 0) {
        return next(
            new ApiError('There have been an error!', httpStatus.NOT_FOUND)
        );
    }
    ApiDataSuccess.send(
        'Employers fetched succesfully!',
        httpStatus.OK,
        res,
        employers[0]
    );
};

const getEmployerById = async (req, res, next) => {
    const { id } = req.params;
    let employer;

    try {
        employer = await getOneById(Employer.name, id);
    } catch (error) {
        return next(new ApiError(error.message, httpStatus.NOT_FOUND));
    }

    if (employer && employer[0].length === 0) {
        return next(
            new ApiError(
                `There are no employers with this id: ${id}`,
                httpStatus.BAD_REQUEST
            )
        );
    }

    ApiDataSuccess.send(
        `Employer ${id} fetched!`,
        httpStatus.OK,
        res,
        employer[0]
    );
};



module.exports = { 
    getEmployers, 
    getEmployerById, 
   
};
