const User = require('./User');
const blogPost = require('./blogPost');
const Comment = require('./Comment');

blogPost.belongsTo(User, {
    foreignKey: 'user_id'
});
Comment.belongsTo(User, {
    foreignKey: 'user_id'
});
Comment.belongsTo(blogPost, {
    foreignKey: 'blogPost_id'
});
module.exports = {
    blogPost,
    User,
    Comment,
};