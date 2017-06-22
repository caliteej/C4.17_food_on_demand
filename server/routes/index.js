const chef = require('./chef');
const menu = require('./menu');
const user = require('./user');
const email = require('./email');

const express = require('express');
const router = express.Router();

router.use('/chef', chef);
router.use('/menu', menu);
router.use('/user', user);
router.use('/email', email);

module.exports = router;