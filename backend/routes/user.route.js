const express = require('express');
const {register, login, logOut, uploadThumbnail, addBlog, removeBlog, allBlogs, uploadAvatar, userdata, myBlogs, pendingBlogs, approveBlog, rejectBlog, blogDetail, getBlog, addComments, totalUser, totalBlogs, usersWithBlogsAndComments, commentsOnMyBlogs, deleteComment, getActivityLogs } = require('../controllers/user.controller.js');
const isAuthenticated = require('../middleware/isAuthenticated.js');
const {upload, avatarUpload} = require('../middleware/multer.js');
const isAdmin = require('../middleware/isAdmin.js');




const router = express.Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logout').get(isAuthenticated, logOut);
router.route('/upload/blogimage').post(upload.single('blogimage'), uploadThumbnail);
router.route('/upload/avatar').post(avatarUpload.single('avatar'), uploadAvatar);
router.route('/upload/blog').post( isAuthenticated,addBlog);



router.route('/myblogs').get( isAuthenticated,myBlogs);
router.route('/pending-blogs').get( isAuthenticated, isAdmin ,pendingBlogs );
router.route('/blog/:id/approve').post(isAuthenticated, isAdmin, approveBlog);
router.route('/blog/:id/reject').post(isAuthenticated, isAdmin, rejectBlog);


router.route('/remove/blog').post(removeBlog);
router.route('/allblogs').get(allBlogs);
router.route('/blog/:id').get(blogDetail);
router.route('/myblogs/comments').get(isAuthenticated, commentsOnMyBlogs);
router.route('/auth').get( isAuthenticated, userdata);

router.route('/blog/:blogId/comments').get(getBlog);
router.route('/blog/:blogId/comment').post(isAuthenticated, addComments);
router.route('/admin/total/blog').get(isAuthenticated, isAdmin, totalBlogs);
router.route('/admin/total/users').get(isAuthenticated, isAdmin, totalUser );
router.route('/admin/users-with-blogs-comments' ).get(isAuthenticated, isAdmin, usersWithBlogsAndComments)
router.route('/admin/delete/comment').post(deleteComment);


router.route('/admin/activity/logs').get(isAuthenticated, isAdmin, getActivityLogs);



module.exports = router;