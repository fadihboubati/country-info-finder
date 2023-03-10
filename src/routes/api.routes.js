'use strict';

const express = require('express');
const router = express.Router();


const { getCountries, getCountryCurrenciesByCCA2, groupCountriesByLanguage, groupCountriesByRegion, saveCountriesToJSON, downloadJsonFile } = require('../controllers/api.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const queryValidateMiddleware = require('../middlewares/query.validate.middleware');

router.get('/countries', queryValidateMiddleware, getCountries);
router.get('/countries/:cca2/currencies', queryValidateMiddleware, getCountryCurrenciesByCCA2);
router.get('/countries/grouped/by-region', groupCountriesByRegion);
router.get('/countries/grouped/by-language', groupCountriesByLanguage);
router.get('/countries/save', saveCountriesToJSON);
router.get('/countries/download-json', authMiddleware, downloadJsonFile);




module.exports = router;