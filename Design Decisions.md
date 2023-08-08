## FE / UI

I've used the [**shadcn ui**](https://ui.shadcn.com/) as a component library to provide consistend experience and reduce the amount spent on building proprietry ui components

## Types

Basic types shared between the BE and FE have been used to describe the data model of a widget

| Field        | Type   |
| ------------ | ------ |
| ID           | string |
| Name         | string |
| Manufacturer | string |
| Stock Level  | number |

## State

I've defined a context housing the state of the app and handling the API requests to the BE based on the actions triggered by the UI

```
/src/widget-context.tsx
```

## API

A layer housing the definitions of the CRUD API requests

```
/src/effects/index.ts
```

## Backend

I've used the [**express**](https://www.npmjs.com/package/express) package to provide the server request handling for all CRUD operations. The server handles the interractions with the DB. In this particular case it's almost to the point replicating the utilities of the DB with one exception - when creating a widget it generates a UUID for it.

```
/api/index.ts
```

## DB

Provided by [**json-server**](https://www.npmjs.com/package/json-server) - which is a simple json based DB. For this particular task, there's no need to over complicate the DB by implementing a relational DB.
