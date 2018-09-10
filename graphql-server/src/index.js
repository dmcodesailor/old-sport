const { GraphQLServer } = require('graphql-yoga');
const fetch = require('node-fetch');

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

function CreateStarData(starData) {
    console.log(starData);
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
    Query: {
        starDataList() {
            return StarDataList();
        },
        starData(parent, args) {
            return StarData(args.id);
        },
    },
    Mutation: {
        createStarData: (_, { newStarData }) => {
            return CreateStarData(newStarData);
        },
    },
}

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
});

server.start(() => console.log(`index::server.start::running on http://localhost:4000`));