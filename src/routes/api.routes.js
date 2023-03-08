'use strict';

const express = require('express');
const router = express.Router();


const { getApiData } = require('../controllers/api.controller');

router.get('/', getApiData);



module.exports = router;