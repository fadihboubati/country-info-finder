'use strict';
const { querySchema } = require('../utils/dtoValidationSchemas');

require('dotenv').config();
const DEVMODE = process.env.DEVMODE;

module.exports = async (req, res, next) => {
    try {
        let { name, cca2, cca3, ccn3 } = req.query;

        // Make sure that only one query at a time can be used for searching
        let arryOfQueries = [name, cca2, cca3, ccn3];
        let queryNumber = 0;
        for (let query of arryOfQueries) {
            if (typeof query !== 'undefined') {
                queryNumber++;
                if (queryNumber > 1) {
                    res.statusCode = 422;
                    next('Only one query at a time can be used in searching!');
                }
            }
        }


        let query = querySchema.validate({ name, cca2, cca3, ccn3 });
        if (query.error) {
            res.statusCode = 422;
            next(query.error.message);
            return;
        }
        next();
        return;

    } catch (error) {
        res.statusCode = 500;
        next(DEVMODE ? error : 'Ops, Something wrong happened :( ');
    }
};