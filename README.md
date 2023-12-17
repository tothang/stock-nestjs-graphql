<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>
## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project Description
Simple project to interact with Alpha Vantage API to get a list of stocks based on available conditions

## Technology required

Technology required on the device to run the application
- Nodejs version 18-20
- Yarn

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev
```

## Place your .env file in the root directory

```bash
# .env
ALPHA_VANTAGE_API_KEY=your_key
```
## App running
- Visit http://localhost:3300/graphql to see Graphql playground and API documentation
- Example Query 
```bash
query GetStockPrice {
    getStockPrice(input: {ticker: "IBM", date: "2022-12-15", interval: "THIRTY_MINUTES"}) {
        close
        date
        high
        low
        open
        ticker
        volume
    }
}
```
to retrieve stock data

## Video guideline
- check this video for guideline https://www.loom.com/share/c5034c01d531449a99bdd55f3f3caf91?focus_title=1&muted=1&from_recorder=1