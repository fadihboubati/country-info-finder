'use strict';

const { default: axios } = require('axios');

const prisma = require('../models/index');

require('dotenv').config();

const DEVMODE = process.env.DEVMODE;


async function getDataService(apiUrl, officialName, cca2, cca3, ccn3) {
    try {

        // Only fetch from API if there are no countries in the database
        // and Save the result in the Database
        const countriesCount = await prisma.country.count();
        if (countriesCount === 0) {
            const res = await axios.get(apiUrl);
            const data = res.data;
            await data.forEach(async c => {
                let name = c.name.official;
                let cca2 = c.cca2;
                let cca3 = c.cca3;
                let ccn3 = c.ccn3;
                if (isNaN(ccn3)) {
                    ccn3 = 0;
                } else {
                    ccn3 = parseInt(ccn3);
                }
                let region = c.region;
                let latitude = c.latlng[0];
                let longitude = c.latlng[1];
                let languages = [];
                for (const key in c.languages) {
                    languages.push({ name: c.languages[key], isoCode: key });
                }

                let currencies = [];
                for (const key in c.currencies) {
                    currencies.push({ code: key, name: c.currencies[key]['name'], symbol: c.currencies[key]['symbol'] });
                }


                const createdLanguages = await Promise.all(
                    languages.map(async (language) => {
                        return await prisma.language.create({ data: language });
                    }),
                );

                const createdCurrencies = await Promise.all(
                    currencies.map(async (currency) => {
                        return await prisma.currency.create({ data: currency });
                    }),
                );

                const country = {
                    name,
                    cca2,
                    cca3,
                    ccn3,
                    region,
                    latitude,
                    longitude,
                    languages: {
                        connect: createdLanguages.map((language) => ({ id: language.id })),
                    },
                    currencies: {
                        connect: createdCurrencies.map((currency) => ({ id: currency.id })),
                    },
                };
                await prisma.country.create({ data: country });
            });
        }

        // support search by CCA2/CCA3/CCN3 and official country name
        let countries = [];
        let where = {};
        if (officialName) {
            where = { name: { contains: officialName } };
        } else if (cca2) {
            where = { cca2 };
        } else if (cca3) {
            where = { cca3 };
        } else if (ccn3) {
            where = { ccn3 };
        }

        countries = await prisma.country.findMany({
            where,
            include: {
                languages: true,
                currencies: true,
            },
        });
        return countries;

    } catch (error) {
        throw new Error(DEVMODE ? error.message : 'Ops, Something wrong during singing up process');
    }
}

module.exports = {
    getDataService,
};


// async function getDataServiceXXX(apiUrl, name, cca2, cca3, ccn3) {
//     try {
//         let countries = [];

//         let where = {};
//         if (name) {
//             where = { name: { contains: name } };
//         } else if (cca2) {
//             where = { cca2 };
//         } else if (cca3) {
//             where = { cca3 };
//         } else if (ccn3) {
//             where = { ccn3 };
//         }

//         countries = await prisma.country.findMany({
//             where,
//             include: {
//                 languages: true,
//                 currencies: true,
//             },
//         });

//         // Only fetch from API if there are no countries in the database
//         if (countries.length === 0) {
//             const res = await axios.get(apiUrl);
//             const data = res.data;
//             data.forEach(async c => {
//                 let name = c.name.official;
//                 let cca2 = c.cca2;
//                 let cca3 = c.cca3;
//                 let ccn3 = c.ccn3;
//                 if (isNaN(ccn3)) {
//                     ccn3 = 0;
//                 } else {
//                     ccn3 = parseInt(ccn3);
//                 }
//                 let region = c.region;
//                 let latitude = c.latlng[0];
//                 let longitude = c.latlng[1];

//                 let languages = [];
//                 for (const key in c.languages) {
//                     languages.push({ name: c.languages[key], isoCode: key });
//                 }

//                 let currencies = [];
//                 for (const key in c.currencies) {
//                     currencies.push({ code: key, name: c.currencies[key]['name'], symbol: c.currencies[key]['symbol'] });
//                 }

//                 const createdLanguages = await Promise.all(
//                     languages.map(async (language) => {
//                         return await prisma.language.create({ data: language });
//                     }),
//                 );

//                 const createdCurrencies = await Promise.all(
//                     currencies.map(async (currency) => {
//                         return await prisma.currency.create({ data: currency });
//                     }),
//                 );

//                 const country = {
//                     name,
//                     cca2,
//                     cca3,
//                     ccn3,
//                     region,
//                     latitude,
//                     longitude,
//                     languages: {
//                         connect: createdLanguages.map((language) => ({ id: language.id })),
//                     },
//                     currencies: {
//                         connect: createdCurrencies.map((currency) => ({ id: currency.id })),
//                     },
//                 };

//                 await prisma.country.create({ data: country });
//             });

//             countries = await prisma.country.findMany({
//                 include: {
//                     languages: true,
//                     currencies: true,
//                 },
//             });
//         }

//         return countries;
//     } catch (error) {
//         throw new Error(DEVMODE ? error.message : 'Ops, Something wrong during singing up process');
//     }
// }

// module.exports = {
//     getDataService,
// };





// // =============== Old Way
// async function getDataService2(apiUrl) {
//     try {
//         const countriesCount = await prisma.country.count();
//         if (countriesCount === 0) {
//             const res = await axios.get(apiUrl);
//             const data = res.data;
//             data.forEach(async c => {
//                 let name = c.name.official;
//                 let cca2 = c.cca2;
//                 let cca3 = c.cca3;
//                 let ccn3 = c.ccn3;
//                 if (isNaN(ccn3)) {
//                     ccn3 = 0;
//                 } else {
//                     ccn3 = parseInt(ccn3);
//                 }
//                 let region = c.region;
//                 let latitude = c.latlng[0];
//                 let longitude = c.latlng[1];
//                 let languages = [];
//                 for (const key in c.languages) {
//                     languages.push({ name: c.languages[key], isoCode: key });
//                 }

//                 let currencies = [];
//                 for (const key in c.currencies) {
//                     currencies.push({ code: key, name: c.currencies[key]['name'], symbol: c.currencies[key]['symbol'] });
//                 }


//                 const createdLanguages = await Promise.all(
//                     languages.map(async (language) => {
//                         return await prisma.language.create({ data: language });
//                     }),
//                 );

//                 const createdCurrencies = await Promise.all(
//                     currencies.map(async (currency) => {
//                         return await prisma.currency.create({ data: currency });
//                     }),
//                 );

//                 const country = {
//                     name,
//                     cca2,
//                     cca3,
//                     ccn3,
//                     region,
//                     latitude,
//                     longitude,
//                     languages: {
//                         connect: createdLanguages.map((language) => ({ id: language.id })),
//                     },
//                     currencies: {
//                         connect: createdCurrencies.map((currency) => ({ id: currency.id })),
//                     },
//                 };
//                 await prisma.country.create({ data: country });
//             });
//         }
//         const countries = await prisma.country.findMany({
//             include: {
//                 languages: true,
//                 currencies: true,
//             },
//         });
//         return countries;

//     } catch (error) {
//         throw new Error(DEVMODE ? error.message : 'Ops, Something wrong during singing up process');
//     }
// }
