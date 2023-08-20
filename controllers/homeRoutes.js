const router = require('express').Router();
const { Project, User } = require('../models');
const withAuth = require('../utils/auth');
const raceTheTurtle = require('../utils/randomRaceTurtle');

// Home page route
router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const projectData = await Project.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const projects = projectData.map((project) => project.get({ plain: true }));

    // Render homepage template with projects data and login status
    res.render('homepage', {
      projects,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Specific project route
router.get('/project/:id', async (req, res) => {
  try {
    // Find a specific project by ID and include user data
    const projectData = await Project.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize project data for rendering
    const project = projectData.get({ plain: true });

    // Render project template with project data and login status
    res.render('project', {
      ...project,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Profile route (requires authentication)
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged-in user's data including associated projects
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Project }],
    });

    // Serialize user data for rendering
    const user = userData.get({ plain: true });

    // Render profile template with user data and login status
    res.render('profile', {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Login page route
router.get('/login', (req, res) => {
  // Redirect to profile if already logged in
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  // Render login template
  res.render('login');
});

// Race the Turtle route
router.get('/race-turtle', raceTheTurtle, (req, res) => {
  // Render turtle template with race data
  res.render("turtle", req.turtle);
});

module.exports = router;
