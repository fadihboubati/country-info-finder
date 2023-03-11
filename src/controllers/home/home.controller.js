'use strict';

require('dotenv').config();
const DEVMODE = process.env.DEVMODE;
const { getHelloWorldService } = require('../../services/home.service');


async function getHome(req, res, next) {
    try {
        const msg = 'Hello world';
        // const greetingMessage = await getHelloWorldService(msg);
        // res.sendFile(__dirname, 'view/html/index.html');
        res.status(200).sendFile(__dirname + '/view/html/index.html');
        // res.redirect('/html/index.html');

    } catch (error) {
        res.statusCode = 500;
        next(DEVMODE ? error.message : 'Ops, Something wrong happened :( ');
    }
}



module.exports = {
    getHome,
};