'use strict';
const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

app.use(express.json());

const handle404Error = require('./error-handlers/404');
const handle500Error = require('./error-handlers/500');

const homeRoute = require('./routes/home.routes');
const apiRoutes = require('./routes/api.routes');

//  ----- Routes -----  //
app.use('/', homeRoute);
app.use('/api', apiRoutes);


//  ----- Error handlers -----  //
app.use(handle404Error);
app.use(handle500Error);


async function start(port, prisma) {

    app.listen(port, () => console.log(`The server is running on port: ${port}`));

    // when we are finished using the prisma instance, we should close the connection with prisma.$disconnect(),
    // if you don't, it could cause an unexpected behavior,
    // like memory leaks or resource starvation.
    process.on('SIGINT', () => {
        prisma.$disconnect();
        process.exit();
    });

}


module.exports = {
    start,
    app, // to import it in the test file for testing the routes
};
