# Dependencies

- [json-server](https://www.npmjs.com/package/json-server)

### To install it run

```bash
npm install -g json-server
```

# App

### To run the app

Navigate to the root folder and run

```bash
yarn && yarn dev
```

This will load:

- **json-server** as http://localhost:3001
- **web app** as http://localhost:3000
- **back end** as http://localhost:3002

### The database is stored as a JSON file in

```
json-server/db.json
```

### To browse the DB

Navigate to http://localhost:3001/widgets

### To run the tests

Make sure the app is already running before you run the tests by executing in the root folder of the app.

```bash
yarn test
```
