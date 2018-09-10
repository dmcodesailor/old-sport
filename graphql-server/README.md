# Old Sport - GraphQL Server with Apollo

## To Run...
Install node modules:
```bash
npm install
```
Star the server:
```bash
node src/index.js
```
This runs the GraphQL Yoga server on [port 4000](http://localhost:4000).

## Source

### Queries
There are two queries specified in the schema file (src/schema.graphql) as follows:

* starData(id: Int!): StarData - This query fetches a single star by ID (zero-based).
* starDataList: [StarData] - This query fetches all the stars in the catalog (>46,000).

The queries are implemented in the server file (src/index.js).

```javascript
const BASE_URL = 'http://dmapi.loticfactor.com/api/HabHyg_Lite/';

function fetchResponseByUrl(relativeURL) {
    console.log(`index::fetchResponseByUrl::${BASE_URL}${relativeURL}`);
    const zeroId = relativeURL === 0 ? `0` : relativeURL;
    const idParm = zeroId ? zeroId : ``;
    console.log(`fetching ${BASE_URL}${idParm}`);
    return fetch(`${BASE_URL}${idParm}`).then(res => res.json());
}

function StarData(id) {
    return fetchResponseByUrl(id).then(json => json);
}

function StarDataList() {
    return fetchResponseByUrl().then(json => json);
}

const resolvers = {
    Query: {
        starDataList() {
            return StarDataList();
        },
        starData(parent, args) {
            return StarData(args.id);
        },
    },
    // Mutation omitted...
}
```

## Mutation
There is a single mutation in this example.  It allows consumers to create a new star record.  The schema file (src/schema.graphql) defines the mutation as follows:

* createStarData(newStarData: NewStarData!): StarData!

The server (src/index.js) implements the mutation using the following code elements:
```javascript
const BASE_URL = 'http://dmapi.loticfactor.com/api/HabHyg_Lite/';

function CreateStarData(starData) {
    return fetch(`${BASE_URL}`,
    {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(starData)
    })
    .then(res => res.json());
}

const resolvers = {
    // Query omitted...
    Mutation: {
        createStarData: (_, { newStarData }) => {
            return CreateStarData(newStarData);
        },
    },
}
```