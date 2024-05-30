const ApiError = require('../scripts/responses/error/api-error');
const ApiDataSuccess = require('../scripts/responses/success/api-data-success');
const {
    runQuery,
    create,
  
} = require('../services/base-service');
const Post = require('../models/post.model');
const httpStatus = require('http-status');
const Application = require('../models/application.model');
const { v4: uuidv4 } = require('uuid');

const getJobPosts = async (req, res, next) => {
    try {
        const jobPosts = await runQuery(`SELECT 
            posts._id, 
            posts.title, 
            posts.description, 
            posts.company, 
            posts.role, 
            posts.technologies, 
            posts.isRemote, 
            posts.salary, 
            posts.employerId, 
            employers.name, 
            employers.email, 
            employers.phone,
            employers.image
        FROM 
            \`bitirme\`.\`posts\`
        JOIN 
            \`bitirme\`.\`employers\`
        ON 
            posts.employerId = employers._id;
        `); 

        console.log(jobPosts);

        if (!jobPosts || jobPosts.length === 0 
            || jobPosts[0].length === 0) {
            return next(new ApiError(
                'There are no Job Posts available',
                httpStatus.NOT_FOUND));
        }

        return ApiDataSuccess.send(
            'Job Posts fetched successfully',
            httpStatus.OK,
            res,
            jobPosts
        );
    } catch (error) {
        console.error('Failed to fetch job posts:', error);
        return next(new ApiError(
            'Failed to fetch job posts', 
            httpStatus.INTERNAL_SERVER_ERROR));
    }
};

const getJobPostsOfEmployer = async (req, res, next) => {
    try {
        const jobPosts = await runQuery(
            `SELECT
            posts._id, 
            posts.title, 
            posts.description, 
            posts.company, 
            posts.role, 
            posts.technologies, 
            posts.isRemote, 
            posts.salary, 
            posts.employerId, 
            employers.name, 
            employers.email, 
            employers.phone 
        FROM 
            \`bitirme\`.\`posts\`
        JOIN 
            \`bitirme\`.\`employers\`
        ON 
            posts.employerId = employers._id
        WHERE
            posts.employerId = '${req.params.employerId}';
        `);

        if (!jobPosts || jobPosts.length === 0) {
            return next(new ApiError(
                'There are no Job Posts available',
                httpStatus.NOT_FOUND));
        }

        return ApiDataSuccess.send(
            'Job Posts fetched successfully',
            httpStatus.OK,
            res,
            jobPosts
        );
    } catch (error) {
        console.error('Failed to fetch job posts:', error);
        return next(new ApiError(
            'Failed to fetch job posts',
            httpStatus.INTERNAL_SERVER_ERROR));
    }
};

const getJobPostById = async (req, res, next) => {
    try {
        const jobPost = await runQuery(`SELECT 
            posts._id, 
            posts.title, 
            posts.description, 
            posts.company, 
            posts.role, 
            posts.technologies, 
            posts.isRemote, 
            posts.salary, 
            posts.employerId, 
            employers.name, 
            employers.email, 
            employers.phone 
        FROM 
            \`bitirme\`.\`posts\`
        JOIN 
            \`bitirme\`.\`employers\`
        ON 
            posts.employerId = employers._id
        WHERE 
            posts._id = '${req.params.id}';
        `);

        if (!jobPost || jobPost.length === 0) {
            return next(new ApiError('There is no Job Post available', 
                httpStatus.NOT_FOUND));
        }

        return ApiDataSuccess.send(
            'Job Post fetched successfully',
            httpStatus.OK,
            res,
            jobPost
        );

    } catch (error) {
        console.error('Failed to fetch job post:', error);
        return next(new ApiError('Failed to fetch job post', 
            httpStatus.INTERNAL_SERVER_ERROR));
    }
};

const createJobPost = async (req, res, next) => {
    const {
        title,
        description,
        company,
        role,
        technologies,
        isRemote,
        salary,
        employerId,
    } = req.body;
    console.log(req.body);

    if (
        !title
        || !description 
        || !company
        || !role 
        || !technologies 
        || isRemote === undefined
        || !salary 
        || !employerId
    ) {
        return next(new ApiError('Required fields are missing', 
            httpStatus.BAD_REQUEST));
    }
    console.log(title, description, company, role, technologies, isRemote, salary, employerId);


    try {
        const existingJobPost = await runQuery(
            `SELECT * FROM \`bitirme\`.\`posts\` 
            WHERE title = '${title}' 
            AND employerId = '${employerId}';
        `);

        console.log(existingJobPost);

        if (existingJobPost && existingJobPost.length > 0 
            && existingJobPost[0].length > 0) {
            return next(new ApiError('Job Post already exists', 
                httpStatus.BAD_REQUEST));
        }

        const postData = {
            _id: uuidv4(),
            title : title,
            description : description,
            company : company,
            role : role,
            technologies : technologies,
            isRemote : isRemote,
            salary : salary,
            employerId : employerId,
            postType: 'Job',
        };

        console.log(postData);

        const newPost = await create(Post.name, postData);

        ApiDataSuccess.send(
            'Job Post created successfully',
            httpStatus.OK,
            res,
            { post: newPost }
        ); 
    } catch (error) {
        console.error('Failed to create job post:', error);
        next(new ApiError(error.message, httpStatus.INTERNAL_SERVER_ERROR));
    }
};

const deleteJobPost = async (req, res, next) => {
    try {
        const jobPost = await runQuery(
            `SELECT * FROM \`bitirme\`.\`posts\` 
            WHERE _id = '${req.params.id}';
        `);

        if (!jobPost || jobPost.length === 0) {
            return next(new ApiError('There is no Job Post available', 
                httpStatus.NOT_FOUND));
        }

        await runQuery(
            `DELETE FROM \`bitirme\`.\`posts\` 
            WHERE _id = '${req.params.id}';
        `);

        ApiDataSuccess.send(
            'Job Post deleted successfully',
            httpStatus.OK,
            res,
            jobPost
        );

    } catch (error) {    
        console.error('Failed to delete job post:', error);
        return next(new ApiError('Failed to delete job post', 
            httpStatus.INTERNAL_SERVER_ERROR));
    }
};

const updateJobPost = async (req, res, next) => {
    const {
        title,
        description,
        company,
        role,
        technologies,
        isRemote,
        salary,
        employerId,
    } = req.body;

    if (
        !title
        || !description 
        || !company
        || !role 
        || !technologies 
        || !isRemote 
        || !salary 
        || !employerId
    ) {
        return next(new ApiError('Required fields are missing', 
            httpStatus.BAD_REQUEST));
    }

    try {
        const existingJobPost = await runQuery(
            `SELECT * FROM \`bitirme\`.\`posts\` 
            WHERE _id = '${req.params.id}';
        `);

        if (!existingJobPost || existingJobPost.length === 0) {
            return next(new ApiError('There is no Job Post available', 
                httpStatus.NOT_FOUND));
        }

        await runQuery(
            `UPDATE \`bitirme\`.\`posts\` 
            SET 
            title = '${title}', 
            description = '${description}', 
            company = '${company}', 
            role = '${role}', 
            technologies = '${technologies}', 
            isRemote = '${isRemote}', 
            salary = '${salary}', 
            employerId = '${employerId}' 
            WHERE _id = '${req.params.id}';
        `);

        const updatedPost = await runQuery(
            `SELECT * FROM \`bitirme\`.\`posts\` 
            WHERE _id = '${req.params.id}';
        `);

        ApiDataSuccess.send(
            'Job Post updated successfully',
            httpStatus.OK,
            res,
            updatedPost
        );

    } catch (error) {
        console.error('Failed to update job post:', error);
        return next(new ApiError('Failed to update job post', 
            httpStatus.INTERNAL_SERVER_ERROR));
    }
};

const getPosts = async (req, res, next) => {
    try {
        const posts = await runQuery(`SELECT
            posts._id,
            posts.title,
            posts.description,
            posts.company,
            posts.role,
            posts.technologies,
            posts.image,
            posts.studentId,
            students.name,
            students.email,
            students.phone,
            students.image
        FROM
            \`bitirme\`.\`posts\`
        JOIN
            \`bitirme\`.\`students\`
        ON
            posts.studentId = students._id;
        `);
        console.log(posts);

        if(!posts || posts.length === 0
            || posts[0].length === 0
        ) {
            return next(new ApiError(
                'There are no posts available',
                httpStatus.NOT_FOUND));
        }

        return ApiDataSuccess.send(
            'Posts fetched successfully',
            httpStatus.OK,
            res,
            posts
        );
    } catch (error) {
        console.error('Failed to fetch posts:', error);
        return next(new ApiError('Failed to fetch posts',
            httpStatus.INTERNAL_SERVER_ERROR));
    }
};

const getPostsOfStudent = async (req, res, next) => {
    try {
        const posts = await runQuery(`SELECT
            posts._id,
            posts.title,
            posts.description,
            posts.company,
            posts.role,
            posts.technologies,
            posts.image,
            posts.studentId,
            students.name,
            students.email,
            students.phone,
            students.image
        FROM
            \`bitirme\`.\`posts\`
        JOIN
            \`bitirme\`.\`students\`
        ON
            posts.studentId = students._id
        WHERE
            posts.studentId = '${req.params.studentId}';
        `);

        if(!posts || posts.length === 0) {
            return next(new ApiError('There are no posts available',
                httpStatus.NOT_FOUND));
        }

        return ApiDataSuccess.send(
            'Posts fetched successfully',
            httpStatus.OK,
            res,
            posts
        );
    } catch (error) {
        console.error('Failed to fetch posts:', error);
        return next(new ApiError('Failed to fetch posts',
            httpStatus.INTERNAL_SERVER_ERROR));
    }
};

const getPostById = async (req, res, next) => {
    try {
        const post = await runQuery(`SELECT
            posts._id,
            posts.title,
            posts.description,
            posts.company,
            posts.role,
            posts.technologies,
            posts.image,
            posts.studentId,
            students.name,
            students.email,
            students.phone,
            students.image
        FROM
            \`bitirme\`.\`posts\`
        JOIN
            \`bitirme\`.\`students\`
        ON
            posts.studentId = students._id
        WHERE
            posts._id = '${req.params.id}';
        `);

        if(!post || post.length === 0) {
            return next(new ApiError('There is no post available',
                httpStatus.NOT_FOUND));
        }

        return ApiDataSuccess.send(
            'Post fetched successfully',
            httpStatus.OK,
            res,
            post
        );

    } catch (error) {
        console.error('Failed to fetch post:', error);
        return next(new ApiError('Failed to fetch post',
            httpStatus.INTERNAL_SERVER_ERROR));
    }
};

const createPost = async (req, res, next) => {
    const {
        title,
        description,
        company,
        role,
        technologies,
        image,
        studentId,
    
    } = req.body;
    console.log(req.body);

    if (
        !title
        || !description 
        || !company
        || !role 
        || !technologies 
        || !image 
        || !studentId
     
    ) {
        return next(new ApiError('Required fields are missing', 
            httpStatus.BAD_REQUEST));
    }

    try {
        const existingPost = await runQuery(
            `SELECT * FROM \`bitirme\`.\`posts\` 
            WHERE title = '${title}' 
            AND studentId = '${studentId}';
        `);

        if (existingPost && existingPost.length > 0 
            && existingPost[0].length > 0
        ) {
            return next(new ApiError('Post already exists', 
                httpStatus.BAD_REQUEST));
        }

        const postData = {
            _id: uuidv4(),
            title : title,
            description : description,
            company : company,
            role : role,
            technologies : technologies,
            image : image,
            studentId : studentId,
            'postType': 'Post'
        };

        const newPost = await create(Post.name, postData);

        ApiDataSuccess.send(
            'Post created successfully',
            httpStatus.OK,
            res,
            { post: newPost }
        ); 
    } catch (error) {
        console.error('Failed to create post:', error);
        next(new ApiError(error.message, httpStatus.INTERNAL_SERVER_ERROR));
    }
};

const deletePost = async (req, res, next) => {
    try {
        const post = await runQuery(
            `SELECT * FROM \`bitirme\`.\`posts\` 
            WHERE _id = '${req.params.id}';
        `);

        if (!post || post.length === 0) {
            return next(new ApiError('There is no post available', 
                httpStatus.NOT_FOUND));
        }

        await runQuery(
            `DELETE FROM \`bitirme\`.\`posts\` 
            WHERE _id = '${req.params.id}';
        `);

        ApiDataSuccess.send(
            'Post deleted successfully',
            httpStatus.OK,
            res,
            post
        );

    } catch (error) {    
        console.error('Failed to delete post:', error);
        return next(new ApiError('Failed to delete post', 
            httpStatus.INTERNAL_SERVER_ERROR));
    }
};

const updatePost = async (req, res, next) => {
    try {
        const {
            title,
            description,
            company,
            role,
            technologies,
            image,
            studentId,
        } = req.body;

        if (
            !title
            || !description 
            || !company
            || !role 
            || !technologies 
            || !image 
            || !studentId
        ) {
            return next(new ApiError('Required fields are missing', 
                httpStatus.BAD_REQUEST));
        }

        const existingPost = await runQuery(
            `SELECT * FROM \`bitirme\`.\`posts\` 
            WHERE _id = '${req.params.id}';
        `);

        if (!existingPost || existingPost.length === 0) {
            return next(new ApiError('There is no post available', 
                httpStatus.NOT_FOUND));
        }

        await runQuery(
            `UPDATE \`bitirme\`.\`posts\` 
            SET 
            title = '${title}', 
            description = '${description}', 
            company = '${company}', 
            role = '${role}', 
            technologies = '${technologies}', 
            image = '${image}', 
            studentId = '${studentId}' 
            WHERE _id = '${req.params.id}';
        `);

        const updatedPost = await runQuery(
            `SELECT * FROM \`bitirme\`.\`posts\` 
            WHERE _id = '${req.params.id}';
        `);

        ApiDataSuccess.send(
            'Post updated successfully',
            httpStatus.OK,
            res,
            updatedPost
        );

    } catch (error) {
        console.error('Failed to update post:', error);
        return next(new ApiError('Failed to update post', 
            httpStatus.INTERNAL_SERVER_ERROR));
    }
};

const applyJobpost = async (req, res, next) => {
    try {
        const { studentId,postId } = req.body;
      

        console.log(studentId, postId);

        if (!studentId || !postId) {
            return next(new ApiError('Required fields are missing', 
                httpStatus.BAD_REQUEST));
        }

        const existingApplication = await runQuery(
            `SELECT * FROM \`bitirme\`.\`${Application.name}\` 
            WHERE studentId = '${studentId}' 
            AND postId = '${postId}';
        `);

        if (existingApplication && existingApplication.length > 0 
            && existingApplication[0].length > 0) {
            await runQuery(
                `DELETE FROM \`bitirme\`.\`${Application.name}\` 
                WHERE studentId = '${studentId}' 
                AND postId = '${postId}';
            `);

            return ApiDataSuccess.send(
                'Application deleted successfully',
                httpStatus.OK,
                res,
                existingApplication
            );
        } else {
            await runQuery(
                `INSERT INTO
                 \`bitirme\`.\`${Application.name}\` 
                 (studentId, postId,createdAt,updatedAt)
                VALUES ('${studentId}', '${postId}', NOW(), NOW());
            `);
            ApiDataSuccess.send(
                'Application created successfully',
                httpStatus.OK,
                res,
                { studentId, postId }
            );

        }
    } catch (error) {
        console.error('Failed to apply job post:', error);
        return next(new ApiError('Failed to apply job post', 
            httpStatus.INTERNAL_SERVER_ERROR));
    }
};

const getApplications = async (req, res, next) => {

    const { id } = req.params;
    console.log(id);
    try {
        const applications = await runQuery(
            `SELECT * FROM \`bitirme\`.\`${Application.name}\` 
            JOIN \`bitirme\`.\`students\`
            ON application.studentId = \`bitirme\`.\`students\`._id
            WHERE postId = '${id}';
        `);

        if (!applications || applications.length === 0) {
            return next(new ApiError('There are no applications available', 
                httpStatus.NOT_FOUND));
        }

        return ApiDataSuccess.send(
            'Applications fetched successfully',
            httpStatus.OK,
            res,
            applications
        );
    } catch (error) {
        console.error('Failed to fetch applications:', error);
        return next(new ApiError('Failed to fetch applications', 
            httpStatus.INTERNAL_SERVER_ERROR));
    }
};


module.exports = { 
    getJobPosts, 
    getJobPostById, 
    createJobPost, 
    deleteJobPost,
    updateJobPost,
    getPosts,
    getPostById,
    createPost,
    deletePost,
    updatePost,
    getJobPostsOfEmployer,
    getPostsOfStudent,
    applyJobpost,
    getApplications,
};
