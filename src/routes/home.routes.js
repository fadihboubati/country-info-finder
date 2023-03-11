'use strict';

const express = require('express');
const router = express.Router();


// const { getHome } = require('../controllers/home/home.controller');
const { getHome } = require('../../home/index');


router.get('/', getHome);



module.exports = router;