const router = require('express').Router();

const userRoutes = require('./user-routes');
const groupRoutes = require('./group-routes');
const postRoutes = require('./post-routes');
const commentRoutes = require('./comment-routes');

// api/<route_name>
router.use('/users', userRoutes);
router.use('/groups', groupRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes);

module.exports = router;