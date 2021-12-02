const User = require('./User');
const Post = require('./Post');
const Group = require('./Group');
const Comment = require('./Comment');

User.hasMany(Post, {
    foreignKey: 'user_id'
});

Group.hasMany(Post, {
    foreignKey: 'group_id'
});

User.hasMany(Group, {
    foreignKey: 'user_id'
});

Post.belongsTo(User, {
    foreignKey: 'user_id'
});

Post.belongsTo(Group, {
    foreignKey: 'group_id'
});

Group.belongsTo(User, {
    foreignKey: 'user_id'
});

User.hasMany(Comment, {
    foreignKey: 'user_id'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

Post.hasMany(Comment, {
    foreignKey: 'post_id'
});

Comment.belongsTo(Post, {
    foreignKey: 'post_id'
});

module.exports = { User, Post, Group, Comment };