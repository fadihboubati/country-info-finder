'use strict';
const { querySchema } = require('../utils/dtoValidationSchemas');

require('dotenv').config();
const DEVMODE = process.env.DEVMODE;

module.exports = async (req, res, next) => {
    try {
        let { name, cca2, cca3, ccn3 } = req.query;
        let query = querySchema.validate({ name, cca2, cca3, ccn3 });
        if (query.error) {
            next(query.error.message);
        }
        next();
        return;

    } catch (error) {
        next(DEVMODE ? error : 'Ops, Something wrong happened :( ');
    }
};