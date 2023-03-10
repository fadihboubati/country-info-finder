'use strict';

const { default: axios } = require('axios');

const prisma = require('../models/index');

require('dotenv').config();

const DEVMODE = process.env.DEVMODE;


async function getCountriesService(apiUrl, officialName, cca2, cca3, ccn3) {
    try {
        // Only fetch from API if there are no countries in the database
        // and Save the result in the Database
        const countriesCount = await prisma.country.count();
        if (countriesCount === 0) {
            const res = await axios.get(apiUrl);
            const data = res.data;
            await data.forEach(async country => {
                let name = country.name.official;
                let cca2 = country.cca2;
                let cca3 = country.cca3;
                let ccn3 = country.ccn3;
                if (isNaN(ccn3)) {
                    ccn3 = 0;
                } else {
                    ccn3 = parseInt(ccn3);
                }
                let region = country.region;
                let latitude = country.latlng[0];
                let longitude = country.latlng[1];

                let languages = [];
                for (const key in country.languages) {
                    languages.push({ name: country.languages[key], isoCode: key });
                }

                let currencies = [];
                for (const key in country.currencies) {
                    currencies.push({ code: key, name: country.currencies[key]['name'], symbol: country.currencies[key]['symbol'] });
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

                const countryInfo = {
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
                await prisma.country.create({ data: countryInfo });
            });
        }

        // support search by CCA2/CCA3/CCN3 and official country name
        let countries = [];
        let where = {};
        if (officialName) {
            where = { name: { contains: officialName } };
        } else if (cca2) {
            cca2 = cca2.toUpperCase();
            where = { cca2 };
        } else if (cca3) {
            cca3 = cca3.toUpperCase();
            where = { cca3 };
        } else if (ccn3) {
            ccn3 = Number(ccn3);
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
        throw new Error(DEVMODE ? error.message : 'Ops, Something wrong happened :( ');
    }
}

async function getCountryCurrenciesByCCA2Service(cca2) {
    try {
        cca2 = cca2.toUpperCase();
        const singleCountry = await prisma.country.findFirst({
            where: {
                cca2: cca2,
            },
            select: {
                name: true,
                currencies: true,
            },
        });
        return singleCountry;
    } catch (error) {
        throw new Error(DEVMODE ? error.message : 'Ops, Something wrong happened :(');
    }
}

async function groupCountriesByRegionService() {
    try {
        const countriesByRegion = await prisma.country.groupBy({
            by: ['name', 'region'],
            orderBy: [{ region: 'asc' }],
        });

        const groupedCountries = countriesByRegion.reduce((acc, country) => {

            // Get the region property of the current country
            const region = country.region;

            // Find the index of the group in the acc array that matches the current country's region 
            const index = acc.findIndex(group => group.region === region);

            // If a matching group is found,
            // add the current country's name to that group's countries array:
            if (index !== -1) {
                acc[index].countries.push(country.name);

            }
            // If a matching group is not found,
            // create a new group object with the current country's region and name properties and push it to the acc array:
            else {
                acc.push({ region: region, countries: [country.name] });
            }

            // return the updated acc array
            return acc;
        }, []);

        return groupedCountries;

    } catch (error) {
        throw new Error(DEVMODE ? error.message : 'Ops, Something wrong happened :(');
    }
}

async function groupCountriesByLanguageService() {
    try {
        const countriesByLanguages = await prisma.country.findMany({
            select: {
                name: true,
                languages: true,
            },
            orderBy: [{ name: 'asc' }],
        });
        return countriesByLanguages;

    } catch (error) {
        throw new Error(DEVMODE ? error.message : 'Ops, Something wrong happened :(');
    }
}

module.exports = {
    getCountriesService,
    getCountryCurrenciesByCCA2Service,
    groupCountriesByRegionService,
    groupCountriesByLanguageService,
};
