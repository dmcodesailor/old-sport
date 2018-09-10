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
                console.log(data);
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