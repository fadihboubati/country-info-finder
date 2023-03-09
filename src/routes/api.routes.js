'use strict';

const express = require('express');
const router = express.Router();


const { getCountries, getCountryCurrenciesByCCA2, groupCountriesByLanguage, groupCountriesByRegion } = require('../controllers/api.controller');

router.get('/countries', getCountries);
router.get('/countries/:cca2/currencies', getCountryCurrenciesByCCA2);
router.get('/countries/groupedByRegion', groupCountriesByRegion);
router.get('/countries/groupedByLanguage', groupCountriesByLanguage);




module.exports = router;