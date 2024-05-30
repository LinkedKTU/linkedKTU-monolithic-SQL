const httpStatus = require('http-status');
const ApiDataSuccess = require('../scripts/responses/success/api-data-success');
const ApiError = require('../scripts/responses/error/api-error');
const {
    getAll,
    getOneById,
   
   
} = require('../services/base-service');
const Lecturer = require('../models/lecturer.model');




const getLecturers = async (req, res, next) => {
    let lecturers;

    try {
        lecturers = await getAll(Lecturer.name);
    } catch (error) {
        return next(new ApiError(error.message, httpStatus.NOT_FOUND));
    }

    if (lecturers && lecturers[0].length === 0) {
        return next(
            new ApiError('There have been an error!', httpStatus.NOT_FOUND)
        );
    }
    ApiDataSuccess.send(
        'Lecturers fetched succesfully!',
        httpStatus.OK,
        res,
        lecturers[0]
    );
};

const getLecturerById = async (req, res, next) => {
    const { id } = req.params;
    let lecturer;

    try {
        lecturer = await getOneById(Lecturer.name, id);
    } catch (error) {
        return next(new ApiError(error.message, httpStatus.NOT_FOUND));
    }

    if (lecturer && lecturer[0].length === 0) {
        return next(
            new ApiError(
                `There are no lecturers with this id: ${id}`,
                httpStatus.BAD_REQUEST
            )
        );
    }

    ApiDataSuccess.send(
        `Lecturer ${id} fetched!`,
        httpStatus.OK,
        res,
        lecturer[0]
    );
};




    

   
module.exports = { 
    getLecturers, 
    getLecturerById, 

  
};
