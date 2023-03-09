'use strict';

require('dotenv').config();
const DEVMODE = process.env.DEVMODE;
const { getDataService } = require('../services/api.service');
const { binaryToUrl } = require('../utils/binaryToUrl');


const apiBinary = process.env.API_BINARY;
const apiUrl = binaryToUrl(apiBinary);


async function getApiData(req, res, next) {
    try {
        // http://localhost:3030?name=Germany&cca2=DE&cca3=DEU&ccn3=276

        // name: officialName
        const { name, cca2, cca3, ccn3 } = req.query;
        const data = await getDataService(apiUrl, name, cca2, cca3, ccn3);

        res.status(200).send(data);
    } catch (error) {
        next(DEVMODE ? error.message : 'Ops, Something wrong happened :( ');
    }
}


module.exports = {
    getApiData,
};