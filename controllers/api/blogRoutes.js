const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      const router = require("express").Router();
      const { Blogger } = require("../../models");
      
      router.post("/register", async (req, res) => {
        try {
          const bloggerData = await Blogger.create(req.body);
      
          req.session.blogger_id = bloggerData.id;
          req.session.blogger_name = bloggerData.username;
          req.session.commenter = bloggerData.username;
          req.session.logged_in = true;
          req.session.is_author = true;
      
          req.session.save(() => {
            res.status(200).json(bloggerData);
          });
        } catch (err) {
          res.status(400).json(err);
        }
      });
      
      router.post("/login", async (req, res) => {
        try {
          const { email, password } = req.body;
      
          const bloggerData = await Blogger.findOne({
            where: { email },
            attributes: ["id", "username", "password"],
          });
      
          if (!bloggerData) {
            return res.status(400).json({ message: "Incorrect email or password." });
          }
      
          const validPassword = await bloggerData.checkPassword(password);
      
          if (!validPassword) {
            return res.status(400).json({ message: "Incorrect email or password." });
          }
      
          req.session.blogger_id = bloggerData.id;
          req.session.blogger_name = bloggerData.username;
          req.session.commenter = bloggerData.username;
          req.session.logged_in = true;
      
          req.session.save(() => {
            res.json({ blogger: bloggerData, message: "You are now logged in" });
          });
        } catch (err) {
          res.status(400).json(err);
        }
      });
      
      router.post("/logout", (req, res) => {
        if (req.session.logged_in) {
          req.session.destroy(() => {
            res.status(204).end();
          });
        } else {
          res.status(404).end();
        }
      });
      
      module.exports = router;
      
      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
