const Sequelize = require('sequelize');
const sequelize = require('./config/connection');

// Import models
const Blog = require('./models/Blog');
const Post = require('./models/Post');
const Comment = require('./models/Comment');

// Define associations
Blog.hasMany(Post, {
  foreignKey: 'blog_id',
  onDelete: 'CASCADE',
});

Post.belongsTo(Blog, {
  foreignKey: 'blog_id',
});

Blog.hasMany(Comment, {
  foreignKey: 'blog_id',
  onDelete: 'CASCADE',
});

Comment.belongsTo(Blog, {
  foreignKey: 'blog_id',
});

Post.hasMany(Comment, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE',
});

Comment.belongsTo(Post, {
  foreignKey: 'post_id',
});

// Sync all models with the database
sequelize.sync({ force: false }).then(() => {
  console.log('Database synced!');
});

// Export models
module.exports = {
  Blog,
  Post,
  Comment,
};
