'use strict';

require('dotenv').config();
const DEVMODE = process.env.DEVMODE;
const { getHelloWorldService } = require('../services/home.service');



async function getHome(req, res, next) {
    try {
        const msg = 'Hello world';
        const greetingMessage = await getHelloWorldService(msg);
        // res.status(200).sendFile(__dirname + '/index.html');
        // res.status(200).send('./src/view/index.html');
        res.redirect('/html/index.html');

        // greetingMessage);
    } catch (error) {
        next(DEVMODE ? error.message : 'Ops, Something wrong happened :( ');
    }
}



module.exports = {
    getHome,
};