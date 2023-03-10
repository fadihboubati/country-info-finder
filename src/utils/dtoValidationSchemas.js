'use strict';

const Joi = require('joi');


const querySchema = Joi.object({


    name: Joi.string()
        .alphanum()
        .min(2)
        .max(56),

    // CCA2(country code alpha - 2)
    cca2: Joi.string()
        .alphanum()
        .uppercase()
        .length(2),

    // CCA3(country code alpha - 3)
    cca3: Joi.string()
        .alphanum()
        .uppercase()
        .length(3),

    // CCN3(country codes 3 digit numeric)
    ccn3: Joi.number()
        .integer()
        .max(999),

});


module.exports = {
    querySchema,
};
