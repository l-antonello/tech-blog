const router = require("express").Router();
const { Comment } = require("../../models");
const withAuth = require("../../utils/auth");

// Get all comments
router.get("/", async (req, res) => {
  try {
    const commentData = await Comment.findAll();
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get a specific comment by ID
router.get("/:id", async (req, res) => {
  try {
    const commentData = await Comment.findByPk(req.params.id);
    if (!commentData) {
      res.status(404).json({ message: "Comment not found." });
      return;
    }
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a new comment (requires authentication)
router.post("/", withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.blogger_id,
    });

    res.status(201).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
