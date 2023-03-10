# country-info-finder

This project implements an API for countries using Node.js, Express, and Prisma ORM. The API provides endpoints to retrieve information about countries, their currencies, and to group countries by region or language.

## Getting Started

### Setup
#### Requirements
- Node.js
- npm or yarn
- PostgreSQL database
- Prisma CLI
- Joi

#### Installation
- Clone the repository: git clone `https://github.com/fadihboubati/country-info-finder.git`
- Install dependencies: `npm install` or `yarn install`

#### Database setup
- Create a PostgreSQL database for the project
- Copy the `.env.sample` file to `.env` and update the database connection details accordingly
- Migrate the database schema: `npx prisma migrate dev`

#### Running the server
- To start the server, run npm start or yarn start. By default, the server runs on port 3030.

#### Endpoints

1. **Get all countries**   

    `GET /countries`

    Returns a list of all countries, with the following fields:

    + id: String (UUID)
    + name: String
    + cca2: String
    + cca3: String
    + ccn3: Int
    + region: String
    + latitude: Float
    + longitude: Float
    + languages: Array of Language objects
    + currencies: Array of Currency objects

    - Query parameters
        - name: String
        - cca2: string
        - cca3: string
        - ccn3: string  

        Search for countries by name or code (CCA2/CCA3/CCN3)


2. **Get country currencies by CCA2**  

    `GET /countries/:cca2/currencies`

    Returns a list of currencies used in the specified country, with the following fields:

    - name: String
    - currencies: Array of Currency objects

3. Group countries

    3.1. **By region**

    `GET /countries/grouped/by-region`

    Returns a list of countries grouped by region, with the following fields:

    - region: String
    - countries: Array of Country objects

    3.2. **By language**

    `GET /countries/grouped/by-language`

    Returns a list of countries grouped by language, with the following fields:

    - language: String
    - countries: Array of Country objects

4. **Download countries.json**

    `GET /download/countries.json`

    - Downloads a JSON file containing all countries data.
    - This endpoint is only accessible to users with admin privileges.
    - To access this endpoint, include the X-ADMIN header in the request with a value of 1.


# Note: API provided as a binary code !!
- In this project, I needed to access an API provided as a binary code.
- The binary code is saved in the .env.sample file, and it represents the API URL in a more secure format.
- To access the API, I used the `binaryToUrl` function provided in this repository to convert the binary code to the actual API URL.  
- you can find the function here `src/utils/binaryToUrl.js`


### Author
 - Fadi Hboubati

### Acknowledgments
 - The data is provided by https://restcountries.com/.