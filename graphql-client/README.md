# Old Sport - GraphQL Client with Apollo

## Getting Started
This Web application was created with ```create-react-app```.  If you're unfamiliar with it, follow the steps [here](https://reactjs.org/docs/create-a-new-react-app.html) to get started.

Once you have the React application, add Apollo.  I followed the steps [here](https://www.apollographql.com/docs/react/essentials/get-started.html).  I provide some of the steps below to help bootstrap your app.

```npm i apollo-boost react-apollo graphql --save```

I had to run ```npm install``` again afterward as it couldn't _find_ react-scripts for some reason.

This should be all you need to start coding using the Apollo Client.

## Apollo Client

**NOTE: This code assumes you are using the GraphQL Yoga server from the ```graphql-server``` folder.**

### index.js
Add the following imports:
```javascript
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
```

Now you may use the Apollo Client.  Create the following methods. (Note: This points to the GraphQL server running locally.)
```javascript
const httpLink = createHttpLink({
    uri: 'http://localhost:4000'
});

const client = new ApolloClient({
    uri: "https://localhost:4000/graphql",
    link: httpLink,
    cache: new InMemoryCache()
});
```

Apply the Apollo Provider to your application.  Apollo recommend applying the provider at a relatively high level in your component hierarchy.  I applied it at the highest level by wrapping the ```<App/>``` inside it.
```javascript
ReactDOM.render(
    <ApolloProvider client={client}>
        <App/>
    </ApolloProvider>
    , document.getElementById('root'));
registerServiceWorker();
```

### Application Structure
The Web application will provide a component to list the closest 100 stars.  Each star will also render a link to the details about that star. To accomplish this we will create three (3) components:

- Home (Home)
- List (StarDataListComponent)
- Details (StarDataComponent)

*Note: Why only 100?  This is to improve overall performance.  The REST endpoint returns all 46,000+ stars.  Rendering that many is silly so we'll restrict the list.*

### Home
```javascript
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <div>
    <p><Link to="/list">List of the closest 100 stars</Link></p>
  </div>
)

export default Home
```

### StarDataListComponent
This is way more interesting.  Here we see our first use of the Apollo GraphQL client.  The complete code for this file is below.  A breakdown of the salient details follows.

```javascript
import React, { Component } from 'react';
import gql from "graphql-tag";
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';

class StarDataListComponent extends Component {
    render() {
        return (
        <div>
        <h2>The Closest 100 Stars</h2>
        <Query
            query={gql`
            {
                starDataList {
                id
                CommonName
                }
            }
            `}>
            {({ loading, error, data }) => {
                if (loading) return <p>loading...</p>;
                if (error) return <p>error :(</p>;
                return data.starDataList.slice(0, 101).map(({id, CommonName}) => (
                    <div key={id}>
                        <div>{`(${id}) ${CommonName}`} <Link to={`/star/${id}`}>Details</Link></div>
                    </div>
                ));
            }}
        </Query>
        </div>
        );
    }
}

export default StarDataListComponent;
```

Look at the body of the <code>Query</code> tag, we can see in the ```return``` statement how the result of the query is processed.  

Our query only fetches the ID and the Common Name of the star.  ```gql``` is what allows us to write GraphQL queries in the ```<Query>``` component (which is imported from ```react-apollo```). 

We extract the first 100 items from the array.  Then we use the ```map``` function to render a line for each star in the subset. In each line, we provide a link to the star details page passing the ID of the star as a URI parameter.  (The routes are established in the ```App``` component.)

### StarDataComponent
The details for the star data are rendered by this component.  The setup is pretty much the same as ```StarDataListComponent``` so those details are omitted. Below is the Apollo query and resulting rendering for the details. Notice how the URI parameter is extracted from the route path.

```javascript
        <Query
            query={gql`
            {
                starData(id: ${this.props.match.params.id}) {
                CommonName
                DistanceInParsecs
                x
                y
                z
                AbsoluteMagnitude
                SpectralType
                ProperName
                }
            }
            `}>
            {({ loading, error, data }) => {
                if (loading) return <p>loading...</p>;
                if (error) return <p>error :( ID: {this.props.match.params.id}</p>;
                return <div>
                    <h2>{data.starData.CommonName}</h2>
                    <Link to="/list/">Back to List</Link>
                    <div align="center">
                    <table>
                        <tbody>
                            <tr>
                                <td>Distance (parsecs)</td>
                                <td align="right">{data.starData.DistanceInParsecs}</td>
                            </tr>
                            <tr>
                                <td>Spectral Type</td>
                                <td align="right">{data.starData.SpectralType}</td>
                            </tr>
                            <tr>
                                <td>Absolute Magnitude</td>
                                <td align="right">{data.starData.AbsoluteMagnitude}</td>
                            </tr>
                            <tr>
                                <td>Location (x,y,z)</td>
                                <td align="right">{`${data.starData.x},${data.starData.y},${data.starData.z}`}</td>
                            </tr>
                        </tbody>
                    </table>
                    </div>
                </div>
            }}
        </Query>
```

### Embedding _StarDataComponent_ in the Application
Apply the following routes to the application by modifying ```App.js```.  Be sure to import the three components at the top of the file.'

```html
  <Switch>
    <Route exact path="/" component={Home}></Route>
    <Route path="/list" component={StarDataListComponent}></Route>
    <Route path='/star/:id' component={StarDataComponent}></Route>
  </Switch>
```

## Get Involved!
Try your new application. First, start your GraphQL Yoga server.
```bash
<terminal>$ node src/index.js
```
Now run your client.
```bash
<terminal>$ npm run start
```