const router = require("express").Router();
const { Post, Blogger, Comment } = require("../models");
const withAuth = require("../utils/auth");

// Render homepage with recent posts from all users
router.get("/", async (req, res) => {
  try {
    // Retrieve all posts including associated blogger data
    const postData = await Post.findAll({
      include: [
        {
          model: Blogger,
          attributes: ["username"],
        },
      ],
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    // Render the homepage template with posts data and login status
    res.render("homepage", {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Render dashboard if logged in
router.get("/dashboard", withAuth, async (req, res) => {
  try {
    // Retrieve logged-in blogger data including their posts
    const bloggerData = await Blogger.findByPk(req.session.blogger_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Post }],
    });

    const blogger = bloggerData.get({ plain: true });

    // Render the dashboard template with blogger data and login status
    res.render("dashboard", {
      ...blogger,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Render form for new post
router.get("/new-post", withAuth, async (req, res) => {
  try {
    // Retrieve logged-in blogger data including their posts
    const bloggerData = await Blogger.findByPk(req.session.blogger_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Post }],
    });

    const blogger = bloggerData.get({ plain: true });

    // Render the new-post template with blogger data and login status
    res.render("new-post", {
      ...blogger,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Render individual post route with comments
router.get("/post/:id", withAuth, async (req, res) => {
  try {
    // Retrieve specific post data including associated comments and bloggers
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: Comment,
          include: [Blogger],
        },
        {
          model: Blogger,
          attributes: ["username", "id"],
        },
      ],
    });

    const post = postData.get({ plain: true });

    // Determine which template to render based on the logged-in blogger's ownership
    const renderTemplate = post.blogger_id === req.session.blogger_id ? "post" : "comment";

    // Render the chosen template with post data, blogger info, and login status
    res.render(renderTemplate, {
      ...post,
      blogger_id: req.session.blogger_id,
      blogger_name: req.session.blogger_name,
      commenter: req.session.commenter,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Render login route
router.get("/login", (req, res) => {
  try {
    // Redirect to the dashboard if already logged in, otherwise render login template
    if (req.session.logged_in) {
      res.redirect("./dashboard");
      return;
    }
    res.render("login");
  } catch (err) {
    res.status(500).json(err);
  }
});

// Render signup route
router.get("/signup", (req, res) => {
  try {
    // Render the signup template
    res.render("signup");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
