'use strict';
const Joi = require('joi');

const querySchema = Joi.object({

    name: Joi.string()
        .alphanum()
        .min(2)
        .max(56)
        .custom((value, helpers) => alphabet_validation_method(value, helpers, 'name')),

    // CCA2(country code alpha - 2)
    cca2: Joi.string()
        .alphanum()
        .length(2)
        .custom((value, helpers) => alphabet_validation_method(value, helpers, 'cca2')),

    // CCA3(country code alpha - 3)
    cca3: Joi.string()
        .alphanum()
        .length(3)
        .custom((value, helpers) => alphabet_validation_method(value, helpers, 'cca3')),

    // CCN3(country codes 3 digit numeric)
    ccn3: Joi.number()
        .integer()
        .max(999),

});


function alphabet_validation_method(value, helpers, propName) {
    let isAlphabet = /^[a-zA-Z]+$/.test(value);
    if (!isAlphabet) {
        throw new Error(`${propName} must be alphabet!`);
    }

    return;
}

module.exports = {
    querySchema,
};
