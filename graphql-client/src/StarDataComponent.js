import React, { Component } from 'react';
import gql from "graphql-tag";
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';

class StarDataComponent extends Component {
    render() {
        return (
        <div>
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
        </div>
        );
    }
}

export default StarDataComponent;