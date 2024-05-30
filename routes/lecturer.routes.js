const express = require('express');
const router = express.Router();
const lecturerController = require('../controllers/lecturer.controller');

router.route('/').get(lecturerController.getLecturers);

router.route('/:id').get(lecturerController.getLecturerById);


module.exports = router;
