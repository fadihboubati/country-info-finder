'use strict';

const express = require('express');
const router = express.Router();


const { getCountries, getCountryCurrenciesByCCA2, groupCountriesByLanguage, groupCountriesByRegion, saveCountriesToJSON, downloadJsonFile } = require('../controllers/api.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/countries', getCountries);
router.get('/countries/:cca2/currencies', getCountryCurrenciesByCCA2);
router.get('/countries/groupedByRegion', groupCountriesByRegion);
router.get('/countries/groupedByLanguage', groupCountriesByLanguage);
router.get('/countries/save', saveCountriesToJSON);
router.get('/countries/download-json', authMiddleware, downloadJsonFile);




module.exports = router;