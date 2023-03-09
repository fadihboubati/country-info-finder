'use strict';
require('dotenv').config();
const DEVMODE = process.env.DEVMODE;

module.exports = async (req, res, next) => {

    try {

        let res = true;
        if (res) {
            next();
            return;
        }


    } catch (error) {
        next(DEVMODE ? error.message : 'Ops, Something wrong happened :( ');
    }



};