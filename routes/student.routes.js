const express = require('express');
const studentController = require('../controllers/student.controller');
const router = express.Router();


router
    .route('/')
    .get(studentController.getStudents);

router
    .route('/:id')
    .get(studentController.getStudentById);

router
    .route('/approve/')
    .post(studentController.approveStudent);



router
    .route('/technologies/:technology')
    .get(studentController.getStudentsByTechnology);


module.exports = router;
