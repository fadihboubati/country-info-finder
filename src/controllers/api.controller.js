'use strict';

require('dotenv').config();
const DEVMODE = process.env.DEVMODE;
const { getCountriesService, getCountryCurrenciesByCCA2Service, groupCountriesByRegionService, groupCountriesByLanguageService } = require('../services/api.service');
const { binaryToUrl } = require('../utils/binaryToUrl');


const apiBinary = process.env.API_BINARY;
const apiUrl = binaryToUrl(apiBinary);


async function getCountries(req, res, next) {
    try {
        // http://localhost:3030?name=Germany&cca2=DE&cca3=DEU&ccn3=276

        // name: officialName
        const { name, cca2, cca3, ccn3 } = req.query;
        const data = await getCountriesService(apiUrl, name, cca2, cca3, ccn3);

        res.status(200).send(data);
    } catch (error) {
        next(DEVMODE ? error.message : 'Ops, Something wrong happened :( ');
    }
}

async function getCountryCurrenciesByCCA2(req, res, next) {
    try {
        const { cca2 } = req.params;
        const data = await getCountryCurrenciesByCCA2Service(cca2);
        res.status(200).send(data);
    } catch (error) {
        next(DEVMODE ? error.message : 'Ops, Something wrong happened :( ');
    }
}

async function groupCountriesByRegion(req, res, next) {
    try {
        const data = await groupCountriesByRegionService();
        res.status(200).send(data);
    } catch (error) {
        // throw new Error(DEVMODE ? error.message : 'Ops, Something wrong happened :(');
        next(DEVMODE ? error.message : 'Ops, Something wrong happened :( ');
    }
}




async function groupCountriesByLanguage(req, res, next) {
    try {
        const data = await groupCountriesByLanguageService();
        res.status(200).send(data);
    } catch (error) {
        next(DEVMODE ? error.message : 'Ops, Something wrong happened :( ');
    }
}

module.exports = {
    getCountries,
    getCountryCurrenciesByCCA2,
    groupCountriesByRegion,
    groupCountriesByLanguage,
};
