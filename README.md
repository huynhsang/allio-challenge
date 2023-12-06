## Check list

- [x] Document the local deployment workflow
- [x] Utilizes Time Series Stock Data APIs
  (https://www.alphavantage.co/documentation/#time-series-data)
- [x] Implement a GraphQL resolver to query stock price data
- [x] The query should be able to fetch historical market data based on tickers and all
supported parameters in the API document
- [x] (Optional) Implement a GraphQL resolver to mutate and store some information
about the user’s stock preferences or portfolio in a database
- [x] (Optional) Can use whichever database, SQL, NoSQL, or any other kinds of
database to store user’s portfolio (choices of tickers), recommend using
Mikro-ORM for interacting with the database
- [x] Use Typescript
- [x] Environment should be reproducible on any machine

## Project Architecture
I applies The Clean Architecture (https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
.
* [db-data](./db-data)
* [src](./src)
    * [api](./src/api)
    * [auth](./src/auth)
    * [common](./src/common)
    * [configuration](./src/configuration)
    * [domain](./src/domain)
    * [infrastructure](./src/infrastructure)
    * [migrations](./src/migrations)
    * [usecases](./src/usecases)
* [test](./test)
* [Dockerfile](./Dockerfile)
* [docker-compose.yml](./docker-compose.yml)
* [README.md](./README.md)

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```

## Functionalities

1. Query stock price data
````
The request:
query {
  stockPrices(function: "TIME_SERIES_DAILY", symbol:"IBM") {
    symbol
    timezone
    prices {
      dateTime
      open
    }
  }
}

The response:
{
  "data": {
    "stockPrices": {
      "symbol": "IBM",
      "timezone": "US/Eastern",
      "prices": [
        {
          "dateTime": "2023-12-05T00:00:00.000Z",
          "open": "160.7600"
        },
        {
          "dateTime": "2023-12-04T00:00:00.000Z",
          "open": "160.2900"
        },
        {
          "dateTime": "2023-12-01T00:00:00.000Z",
          "open": "158.4100"
        },
        {
          "dateTime": "2023-11-30T00:00:00.000Z",
          "open": "156.9500"
        },
        {
          "dateTime": "2023-11-29T00:00:00.000Z",
          "open": "156.1500"
        },
        {
          "dateTime": "2023-11-28T00:00:00.000Z",
          "open": "155.4400"
        },
        {
          "dateTime": "2023-11-27T00:00:00.000Z",
          "open": "154.9900"
        },
      ]
    }
  }
}
````
2. Search stocks by keyword
````
The request:
query {
  search(keyword: "IBM") {
    symbol
    name
    type
    region
    timezone
    currency
  }
}

The response:
{
  "data": {
    "search": [
      {
        "symbol": "IBM",
        "name": "International Business Machines Corp",
        "type": "Equity",
        "region": "United States",
        "timezone": "UTC-04",
        "currency": "USD"
      },
      {
        "symbol": "IBML",
        "name": "iShares iBonds Dec 2023 Term Muni Bond ETF",
        "type": "ETF",
        "region": "United States",
        "timezone": "UTC-04",
        "currency": "USD"
      },
    },
  },  
}  
````
3. Create a user
````
The Request:
mutation {
  signup(
    user: {
      username: "abcd",
      password: "abcd",
    },
  ) {
    id,
    username,
    password,
  }
}

The Response:
{
  "data": {
    "signup": {
      "id": 2,
      "username": "abcd",
      "password": "abcd"
    }
  }
}
````
4. Create Stock's preference for user
````
The request With Header:
{
  "Authorization": "Basic YWJjOmFiYw=="
}

mutation {
  createPreference(
    symbol: "abcde"
  ) {
    id,
    symbol,
    user {
      id
    }
  }
}

The response:
{
  "data": {
    "createPreference": {
      "id": 7,
      "symbol": "abcde",
      "user": {
        "id": 1
      }
    }
  }
}
````

## License

Nest is [MIT licensed](LICENSE).
