const httpStatus = require('http-status');

const ApiError = require('../scripts/responses/error/api-error');
const ApiDataSuccess = require('../scripts/responses/success/api-data-success');
const {
    
    getAll,
    getOneById,
    getAllByQuery,
    runQuery,

} = require('../services/base-service');

const Student = require('../models/student.model');
const Approval = require('../models/approval.model');




const getStudents = async (req, res, next) => {
    let result;

    try {
        result = await getAll(Student.name);
    } catch (error) {
        return next(new ApiError(error.message, httpStatus.NOT_FOUND));
    }
    console.log(result);

    if (!result && !result[0].length === 0) {
        return next(
            new ApiError('There have been an error', httpStatus.BAD_REQUEST)
        );
    }
    


    ApiDataSuccess.send(
        'Students fetched succesfully',
        httpStatus.OK,
        res,
        result[0]
    );
};

const getStudentById = async (req, res, next) => {
    const { id } = req.params;
    let student;

    try {
        student = await getOneById(Student.name, id, next);
    } catch (error) {
        return next(new ApiError(error.message, httpStatus.NOT_FOUND));
    }

    if (student[0].length === 0) {
        return next(
            new ApiError(
                `There is no student with this id: ${id}`,
                httpStatus.BAD_REQUEST
            )
        );
    }

    ApiDataSuccess.send(
        'Student with given id found',
        httpStatus.OK,
        res,
        student[0]
    );
};

const getStudentsByTechnology = async (req, res, next) => {
    const { technology } = req.params;
    let studentsWithGivenTech;

    try {
        studentsWithGivenTech = await getAllByQuery(
            Student.name,
            'Technologies',
            technology
        );
    } catch (error) {
        return next(new ApiError(error.message, httpStatus.NOT_FOUND));
    }

    if (studentsWithGivenTech[0].length === 0) {
        return next(
            new ApiError(
                `There is no student with given tech ${technology}`,
                httpStatus.BAD_REQUEST
            )
        );
    }

    ApiDataSuccess.send(
        'Students with given skill found',
        httpStatus.OK,
        res,
        studentsWithGivenTech[0]
    );
};

const approveStudent = async (req, res, next) => {
    const { 
        studentId, 
        lecturerId
    } = req.body;

    try {
        const existingApproval = await runQuery(
            `SELECT * FROM \`bitirme\`.\`${Approval.name}\` 
            WHERE studentId = '${studentId}' 
            AND lecturerId = '${lecturerId}';`

        ); 
   

        if (existingApproval && existingApproval[0].length !== 0 
        && existingApproval[0].length > 0
        ) {
        
            await runQuery(
                `DELETE FROM ${Approval.name} 
                WHERE studentId = '${studentId}' 
                AND lecturerId = '${lecturerId}'`
            );

            ApiDataSuccess.send(
                'Student has been disapproved',
                httpStatus.OK,
                res
            );
        
        }

        else {
            await runQuery(
                `INSERT INTO ${Approval.name} 
                (studentId, lecturerId, createdAt, updatedAt) 
            VALUES ('${studentId}', '${lecturerId}', NOW(), NOW())`
            );

            ApiDataSuccess.send(
                'Student has been approved',
                httpStatus.OK,
                res
            );

        }
    }
    catch (error) {
        return next(new ApiError(error.message, 
            httpStatus.INTERNAL_SERVER_ERROR));
        
    }
};


    

module.exports = {
    getStudents,
    getStudentById,
    getStudentsByTechnology,
    approveStudent

};
