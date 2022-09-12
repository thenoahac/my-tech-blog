const express = require('express');
const router = express.Router();
const userRoutes = require('./userRoutes.js');
const blogRoutes = require('./postRoutes.js');
const { User, blog } = require('../models');
const { Op } = require('sequelize');

router.use('/users', userRoutes);
router.use('/blog', blogRoutes);


module.exports = router;