'use strict';

require('dotenv').config();
const DEVMODE = process.env.DEVMODE;
const { getHelloWorldService } = require('../services/home.service');



async function getHome(req, res, next) {
    try {
        const msg = 'Hello world';
        const greetingMessage = await getHelloWorldService(msg);
        res.status(200).send(greetingMessage);
    } catch (error) {
        next(DEVMODE ? error.message : 'Ops, Something wrong during singing up process');
    }
}



module.exports = {
    getHome,
};