/* eslint-disable indent */
const httpStatus = require('http-status');
const ApiDataSuccess = require('../scripts/responses/success/api-data-success');
const ApiError = require('../scripts/responses/error/api-error');
const { 
    getOneByQuery, 
    create, 
    sendEmail } = require('../services/base-service');
const Student = require('../models/student.model');
const Employer = require('../models/employer.model');
const Lecturer = require('../models/lecturer.model');
const { v4: uuidv4 } = require('uuid');
const { createLoginToken } = require('../scripts/helpers/jwt.helper');
const passwordHelper = require('../scripts/helpers/password.helper');

async function login(req, res, next) {

    const {
         email,
          password,
          accountType
         } = req.body;

    if (!email || !password) {
        return next(
            new ApiError('Email and password are required',
             httpStatus.BAD_REQUEST));
    }

    switch (accountType) {
        case 'Student':
            await loginStudent(email, password, res, next);
            break;
        case 'Employer':
            await loginEmployer(email, password, res, next);
            break;
        case 'Lecturer':
            await loginLecturer(email, password, res, next);
            break;
        default:
            next(new ApiError('Invalid account type', httpStatus.BAD_REQUEST));
    }
}


const loginStudent = async (email, password, res, next) => {
    try {
        const student = await getOneByQuery(Student.name, 'email', email);
        if (!student || student.length === 0) {
            return next(new ApiError(
                'Invalid email or password',
                 httpStatus.UNAUTHORIZED));
        }

        const studentObject = student[0];
        const isPasswordValid = await passwordHelper
        .comparePassword(password, studentObject.password);
        if (!isPasswordValid) {
            return next(new ApiError('Invalid email or password', 
            httpStatus.UNAUTHORIZED));
        }

        const accessToken = createLoginToken(studentObject,res);
        ApiDataSuccess.send('Login successful',
         httpStatus.OK,
        res,
        { accessToken });

    } catch (error) {
        next(new ApiError(error.message, httpStatus.INTERNAL_SERVER_ERROR));


    }
    
};

const loginEmployer = async (email, password, res, next) => {
    try {
        const employer = await getOneByQuery(Employer.name, 'email', email);
        if (!employer || employer.length === 0) {
            return next(new ApiError(
                'Invalid email or password',
                 httpStatus.UNAUTHORIZED));
        }

        const employerObject = employer[0];
        const isPasswordValid = await passwordHelper
        .comparePassword(password, employerObject.password);
        if (!isPasswordValid) {
            return next(new ApiError('Invalid email or password',
                httpStatus.UNAUTHORIZED));
        }

        const accessToken = createLoginToken(employerObject,res);
        ApiDataSuccess.send('Login successful',
            httpStatus.OK,
            res,
            { accessToken });

    } catch (error) {
        next(new ApiError(error.message, httpStatus.INTERNAL_SERVER_ERROR));
    }
};

const loginLecturer = async (email, password, res, next) => {
    try {
        const lecturer = await getOneByQuery(Lecturer.name, 'email', email);
        if (!lecturer || lecturer.length === 0) {
            return next(new ApiError(
                'Invalid email or password',
                 httpStatus.UNAUTHORIZED));
        }
        console.log(lecturer);

        const lecturerObject = lecturer[0];
        console.log(lecturerObject);
        
        const isPasswordValid = await passwordHelper
        .comparePassword(password, lecturerObject.password);
        console.log(isPasswordValid);
        if (!isPasswordValid) {
            return next(new ApiError('Invalid email or password',
                httpStatus.UNAUTHORIZED));
        }

        const accessToken = createLoginToken(lecturerObject,res);
        ApiDataSuccess.send('Login successful',
            httpStatus.OK,
            res,
            { accessToken });

    } catch (error) {
        next(new ApiError(error.message, httpStatus.INTERNAL_SERVER_ERROR));
    }
};




async function register(req, res, next) {
    
    const { accountType } = req.body;
    console.log(accountType);
    if (!accountType) {
        return next(new ApiError('Account type is required', 
        httpStatus.BAD_REQUEST));
    }

    switch (accountType) {
    case 'Student':
        await createStudent(req, res, next);
        break;
    case 'Employer':
        await createEmployer(req, res, next);
        break;
    case 'Lecturer':
        await createLecturer(req, res, next);
        break;
    default:
        next(new ApiError('Invalid account type', httpStatus.BAD_REQUEST));
    }
}

async function updatePassword(req, res , next) {
    // TODO: Implement password update
    
    next(new ApiError('Not implemented', httpStatus.NOT_IMPLEMENTED));

}

async function createStudent(req, res, next) {
    const {
         email, 
         password,
         name,
         description,
         image, 
         phone, 
         address, 
         school,
         city,
         
         technologies,
         languages,
    } = req.body;
    

    if (!email || !password || !name) {
        return next(new ApiError(
            'Required fields are missing',
             httpStatus.BAD_REQUEST));
    }

    try {
        const existingStudent = await getOneByQuery(
            Student.name, 'email', email
        );
        if (existingStudent && existingStudent.length > 0) {
            return next(new ApiError('Email already exists', 
            httpStatus.BAD_REQUEST
        ));
        }

        const hashedPassword = await passwordHelper.passwordToHash(password);
        
        const studentData = {
            _id: uuidv4(),
            email: email,
            password: hashedPassword,
            name: name,
            description: description,
            image: image,
            phone: phone,
            address: address,
            school: school,
            city: city,
            technologies: technologies ?? {},
            languages: languages ?? {},
            accountType: 'Student'
        };


        const newStudent = await create(Student.name, studentData);
       /* try {
            await sendEmail(email, 
                'Welcome to our platform!',
                'Your registration is complete.');
        } catch (emailError) {
            // Log the error and optionally handle it
            console.error('Failed to send email:', emailError);
            // Optionally continue or handle differently
        }*/

        ApiDataSuccess.send('Student created successfully',
         httpStatus.OK, 
         res, 
         { student: newStudent }
        );
    } catch (error) {
        console.error('Failed to create student:', error);
        next(new ApiError(error.message, httpStatus.INTERNAL_SERVER_ERROR));
    }
}

async function createEmployer(req, res, next) {
    const {
        email,
        password,
        name,
        description,
        image,
        phone,
        address,
        company,
        city,
        technologies,
        languages,
    } = req.body;


    if(!email || !password || !name) {
        return next(new ApiError('Required fields are missing',
         httpStatus.BAD_REQUEST));

    }

    try {
        const existingEmployee = await getOneByQuery(
            Employer.name, 'email', email
        );
        console.log(existingEmployee);
        if(existingEmployee && existingEmployee.length > 0) {
            return next(new ApiError('Email already exists',
             httpStatus.BAD_REQUEST));
        }

        const hashedPassword = await passwordHelper.passwordToHash(password);
       
   
        console.log('Password type:', typeof hashedPassword);
         console.log('Password: ', hashedPassword);



        const employerData = {
            _id: uuidv4(),
            email: email,
            password: hashedPassword,
            name: name,
            description: description,
            image: image ?? '',
            phone: phone,
            address: address,
            company: company,
            city: city,
            technologies: technologies ?? {},
            languages: languages ?? {},
            accountType: 'Employer'
        };

        const newEmployer = await create(Employer.name, employerData);

        ApiDataSuccess.send('Employer created successfully',
            httpStatus.OK,
            res,
            { employer: newEmployer }
            );
        } catch (error) {
            console.error('Failed to create employer:', error);
            next(new ApiError(error.message, httpStatus.INTERNAL_SERVER_ERROR));
        }

    
 }
      
   
    

async function createLecturer(req, res, next) {
    const {
        email,
        password,
        name,
        description,
        image,
        phone,
        address,
      
    
    } = req.body;

    if(!email || !password || !name) {
        return next(new ApiError('Required fields are missing',
         httpStatus.BAD_REQUEST));

    }

    try {
        const existingLecturer = await getOneByQuery(
            Lecturer.name, 'email', email
        );

    if(existingLecturer && existingLecturer.length > 0) {
        return next(new ApiError('Email already exists',
         httpStatus.BAD_REQUEST));
    }

    const hashedPassword = await passwordHelper.passwordToHash(password);

    const lecturerData = {
        _id: uuidv4(),
        email: email,
        password: hashedPassword,
        name: name,
        description: description,
        image: image ?? '',
        phone: phone,
        address: address,
        accountType: 'Lecturer'
    };

    const newLecturer = await create(Lecturer.name, lecturerData);

    ApiDataSuccess.send('Lecturer created successfully',
        httpStatus.OK,
        res,
        { lecturer: newLecturer }
        );
    } catch (error) {
        console.error('Failed to create lecturer:', error);
        next(new ApiError(error.message, httpStatus.INTERNAL_SERVER_ERROR));
    }




        

    
}







module.exports = {
    login,
    register,
    updatePassword,
    createStudent,
    createEmployer,
    createLecturer,
    
};
