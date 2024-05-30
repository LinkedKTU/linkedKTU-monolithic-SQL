const express = require('express');
const postController = require('../controllers/post.controller');

const router = express.Router();

router
    .route('/job/')
    .get(postController.getJobPosts);

router
    .route('/job/employer/:id')
    .get(postController.getJobPostsOfEmployer);

router
    .route('/job/:id')
    .get(postController.getJobPostById);

router
    .route('/job/')
    .post(postController.createJobPost);

router
    .route('/job/:id')
    .delete(postController.deleteJobPost);

router
    .route('/job/:id')
    .put(postController.updateJobPost);


router
    .route('/default/')
    .get(postController.getPosts);

router
    .route('/default/student/:id')
    .get(postController.getPostsOfStudent);

router
    .route('/default/:id')
    .get(postController.getPostById);

router
    .route('/default/')
    .post(postController.createPost);

router
    .route('/default/:id')
    .delete(postController.deletePost);

router
    .route('/default/:id')
    .put(postController.updatePost);
router
    .route('/job/apply/')
    .post(postController.applyJobpost);

router
    .route('/job/apply/:id')
    .get(postController.getApplications);
      







module.exports = router;
