const User = require('./User');
const Post = require('./Post');
const Group = require('./Group');

User.hasMany(Post, {
    foreignKey: 'user_id'
});

Group.hasMany(Post, {
    foreignKey: 'post_id'
});

// User.hasMany(Group, {
//     foreignKey: 'user_id'
// });

Post.belongsTo(User, {
    foreignKey: 'user_id'
});

Post.belongsTo(Group, {
    foreignKey: 'group_id'
});

// Group.belongsTo(User, {
//     foreignKey: 'user_id'
// });

module.exports = { User, Post, Group };