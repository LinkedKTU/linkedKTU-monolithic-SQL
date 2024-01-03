const httpStatus = require('http-status');
const ApiDataSuccess = require('../scripts/responses/success/api-data-success');
const ApiError = require('../scripts/responses/error/api-error');
const {
    getAll,
    getOneById,
    create,
    getOneByQuery,
    sendEmail,
} = require('../services/base-service');
const Lecturer = require('../models/lecturer.model');
const {Approval} = require('../models');
const {Student} = require('../models/student.model');
const { v4: uuidv4 } = require('uuid');
const { createLoginToken } = require('../scripts/helpers/jwt.helper');

const login = async (req, res, next) => {
    let lecturer;

    try {
        lecturer = await getOneByQuery(lecturer.name, 'Email', req.body.email);
    } catch (error) {
        return next(new ApiError(error.message, httpStatus.NOT_FOUND));
    }

    if (lecturer && lecturer[0].length === 0) {
        return next(
            new ApiError(
                'Email or password is incorrect!',
                httpStatus.BAD_REQUEST
            )
        );
    }

    const lecturerObject = lecturer[0][0];

    const validPassword = lecturerObject.Password === req.body.password;

    if (!validPassword) {
        return next(
            new ApiError('Email or passwors is incorrect!'),
            httpStatus.BAD_REQUEST
        );
    }

    const access_token = createLoginToken(lecturerObject, res);

    ApiDataSuccess.send('Login succesfull!', httpStatus.OK, res, {
        access_token: access_token,
    });
};

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

    if (lecturers && lecturer[0].length === 0) {
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

const createLecturer = async (req, res, next) => {
    const {
        email,
        password,
        fullname,
        description,
        image,
        phone,
        address,
        isInternshipRemote,
        isWorkRemote,
        city,
    } = req.body;

    const lecturerData = {
        ID: uuidv4(),
        Email: email,
        Password: password,
        Fullname: fullname,
        Description: description,
        Image: image,
        Phone: phone,
        Address: address,
        IsInternshipRemote: isInternshipRemote,
        IsWorkRemote: isWorkRemote,
        City: city,
    };

    let lecturer;

    try {
        lecturer = await create(Lecturer.name, lecturerData);
    } catch (error) {
        return next(new ApiError(error.message, httpStatus.NOT_FOUND));
    }

    sendEmail(email, fullname, password);

    ApiDataSuccess.send(
        'Lecturer created succesfully!',
        httpStatus.OK,
        res,
        lecturer[0]
    );
};

const createApproval = async (req, res, next) => {
    try {
      const { lecturerId, studentId } = req.body;
      const approval = await Approval.create({ lecturerId, studentId });
  
      res.send({ message: 'Approval created', approval });
    } catch (error) {
      next(error);
    }
  };
  
  const deleteApproval = async (req, res, next) => {
    try {
      const { lecturerId, studentId } = req.body;
      const approval = await Approval.destroy({ where: { lecturerId, studentId } });
  
      if (!approval) {
        return res.status(404).send({ message: 'Approval not found' });
      }
  
      res.send({ message: 'Approval deleted' });
    } catch (error) {
      next(error);
    }
  };
    

   
module.exports = { 
    getLecturers, 
    getLecturerById, 
    createLecturer, 
    createApproval,
    deleteApproval,
    login 
};
