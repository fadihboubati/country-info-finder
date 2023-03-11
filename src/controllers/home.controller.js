'use strict';

require('dotenv').config();
const DEVMODE = process.env.DEVMODE;
const { getHelloWorldService } = require('../services/home.service');


const path = require('path');
async function getHome(req, res, next) {
    try {
        const msg = 'Hello world';
        const greetingMessage = await getHelloWorldService(msg);

        // res.status(200).sendFile(__dirname + '/../html/index.html');
        // res.status(200).sendFile(__dirname + '/my.html');
        // res.status(200).send('./src/view/index.html');

        res.sendFile(path.join(__dirname, 'public', 'html', 'index.html'));
        // res.redirect('/html/index.html'); // works

    } catch (error) {
        res.statusCode = 500;
        next(DEVMODE ? error.message : 'Ops, Something wrong happened :( ');
    }
}



module.exports = {
    getHome,
};