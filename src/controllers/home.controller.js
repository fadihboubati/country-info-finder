'use strict';

require('dotenv').config();
const DEVMODE = process.env.DEVMODE;
const { getHelloWorldService } = require('../services/home.service');


const path = require('path');
async function getHome(req, res, next) {
    try {
        const msg = 'Hello world';
        const greetingMessage = await getHelloWorldService(msg);
        res.redirect('/html/index.html');

    } catch (error) {
        res.statusCode = 500;
        next(DEVMODE ? error.message : 'Ops, Something wrong happened :( ');
    }
}



module.exports = {
    getHome,
};