const sequelize = require('../config/connection');
const { Blog, Comment } = require('../models');

const BlogData = require('./BlogData.json');
const CommentData = require('./CommentData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const Blogs = await Blog.bulkCreate(BlogData, {
    individualHooks: true,
    returning: true,
  });

  for (const Comment of CommentData) {
    await Comment.create({
      ...Comment,
      Blog_id: Blogs[Math.floor(Math.random() * Blogs.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
