'use strict';

require('dotenv').config();
const DEVMODE = process.env.DEVMODE;

async function getHome(req, res, next) {
    try {
        res.status(200).sendFile(__dirname + '/view/index.html');
    } catch (error) {
        res.statusCode = 500;
        next(DEVMODE ? error.message : 'Ops, Something wrong happened :( ');
    }
}

module.exports = {
    getHome,
};