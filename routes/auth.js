const { Router } = require('express');
const auth = require('../controllers/auth');

const router = new Router();

// @desc Handle Login
// @route POST users/login
router.post("/login", auth.handleLogin);

module.exports = router;
