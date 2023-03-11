'use strict';
require('dotenv').config();
const DEVMODE = process.env.DEVMODE;

module.exports = async (req, res, next) => {

    try {
        const isAdmin = req.headers['x-admin'] === '1';
        if (!isAdmin) {
            res.statusCode = 401;
            next('Unauthorized');
            return;
        }

        next();
        return;

    } catch (error) {
        res.statusCode = 500;
        next(DEVMODE ? error.message : 'Ops, Something wrong happened :( ');
    }



};